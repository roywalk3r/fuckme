import { ID, Query, type Models } from "appwrite"
import { storage } from "./appwrite-client"
import { toast } from "sonner"

// Bucket ID constant
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET || ""

// Function to upload a file to Appwrite Storage
export async function uploadFile(file: File): Promise<string> {
  try {
    if (!BUCKET_ID) {
      throw new Error("Storage bucket ID is not configured")
    }

    const result = await storage.createFile(BUCKET_ID, ID.unique(), file)
    return result.$id
  } catch (error: any) {
    console.error("Error uploading file:", error)

    // Handle CORS errors specifically
    if (error.message?.includes("CORS") || error.code === 0) {
      toast.error("CORS error: Your application domain is not allowed to access Appwrite")
    } else if (error.code === 401) {
      toast.error("Authentication error: Please log in to upload files")
    } else if (error.code === 403) {
      toast.error("Permission denied: You do not have permission to upload files")
    } else {
      toast.error(`Upload error: ${error.message || "Unknown error"}`)
    }

    throw error
  }
}

// Function to get a file preview URL
export function getFilePreview(fileId: string, width?: number, height?: number): string {
  if (!fileId || !BUCKET_ID) return ""

  try {
    let url = storage.getFilePreview(BUCKET_ID, fileId)

    if (width) {
        url.searchParams.set("width", width.toString())
    }

    if (height) {
        url.searchParams.set("height", height.toString())
    }

    return url.toString()
  } catch (error) {
    console.error("Error getting file preview:", error)
    return ""
  }
}

// Function to delete a file
export async function deleteFile(fileId: string): Promise<boolean> {
  try {
    if (!BUCKET_ID) {
      throw new Error("Storage bucket ID is not configured")
    }

    await storage.deleteFile(BUCKET_ID, fileId)
    return true
  } catch (error: any) {
    console.error("Error deleting file:", error)

    // Handle specific errors
    if (error.code === 401) {
      toast.error("Authentication error: Please log in to delete files")
    } else if (error.code === 403) {
      toast.error("Permission denied: You do not have permission to delete this file")
    } else if (error.code === 404) {
      toast.error("File not found: The file may have been already deleted")
      return true // Consider it deleted if it doesn't exist
    } else {
      toast.error(`Delete error: ${error.message || "Unknown error"}`)
    }

    return false
  }
}

// Function to list files with pagination and search
export async function listFiles(search = "", limit = 10, offset = 0): Promise<{ files: Models.File[]; total: number }> {
  try {
    // Make sure BUCKET_ID is not empty
    if (!BUCKET_ID) {
      console.error("Bucket ID is not defined")
      toast.error("Storage configuration error: Bucket ID is missing")
      return { files: [], total: 0 }
    }

    const queries = []

    // Add search query if provided
    if (search) {
      queries.push(Query.search("name", search))
    }

    // Add limit and offset
    queries.push(Query.limit(limit))
    queries.push(Query.offset(offset))

    const response = await storage.listFiles(BUCKET_ID, queries)

    return {
      files: response.files,
      total: response.total,
    }
  } catch (error: any) {
    console.error("Error listing files:", error)

    // Handle specific errors
    if (error.code === 401) {
      toast.error("Authentication error: Please log in to view files")
    } else if (error.code === 403) {
      toast.error("Permission denied: You do not have permission to view files")
    } else if (error.message?.includes("CORS")) {
      toast.error("CORS error: Your application domain is not allowed to access Appwrite")
    } else {
      toast.error(`Error loading files: ${error.message || "Unknown error"}`)
    }

    // Return empty result instead of throwing
    return { files: [], total: 0 }
  }
}

// Function to get a file by ID
export async function getFile(fileId: string): Promise<Models.File | null> {
  try {
    if (!BUCKET_ID || !fileId) {
      return null
    }

    return await storage.getFile(BUCKET_ID, fileId)
  } catch (error: any) {
    console.error("Error getting file:", error)

    // Only show toast for user-facing errors
    if (error.code !== 404) {
      // Don't show errors for missing files
      toast.error(`Error loading file: ${error.message || "Unknown error"}`)
    }

    return null
  }
}

/**
 * Extract file ID from an Appwrite Storage URL
 */
export function extractFileIdFromUrl(url: string): string | null {
  try {
    // Parse the URL
    const urlObj = new URL(url)

    // The file ID is typically the last part of the path
    const pathParts = urlObj.pathname.split("/")
    const fileId = pathParts[pathParts.length - 1]

    return fileId
  } catch (error) {
    console.error("Error extracting file ID from URL:", error)
    return null
  }
}

/**
 * Check if a string is an Appwrite Storage URL
 */
export function isAppwriteUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes("appwrite") && urlObj.pathname.includes("/storage/")
  } catch {
    return false
  }
}

/**
 * Test Appwrite connection and CORS configuration
 */
export async function testAppwriteConnection(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    // Check if bucket ID is configured
    if (!BUCKET_ID) {
      return {
        success: false,
        message: "Storage bucket ID is not configured",
      }
    }

    // Try to list files (with a small limit)
    const { total } = await storage.listFiles(BUCKET_ID, [Query.limit(1)])

    return {
      success: true,
      message: `Connection successful. Found ${total} files in the bucket.`,
    }
  } catch (error: any) {
    console.error("Appwrite connection test failed:", error)

    // Determine the type of error
    let errorType = "Unknown"
    let details = {}

    if (error.code === 0 || error.message?.includes("CORS")) {
      errorType = "CORS"
      details = {
        suggestion: "Add your application domain to the Appwrite project platform settings",
      }
    } else if (error.code === 401) {
      errorType = "Authentication"
      details = {
        suggestion: "Make sure you are logged in or the resource is publicly accessible",
      }
    } else if (error.code === 403) {
      errorType = "Permission"
      details = {
        suggestion: "Check that your user role has the required permissions",
        missingScope: error.message?.includes("missing scope") ? error.message : "Unknown",
      }
    } else if (error.code === 404) {
      errorType = "Not Found"
      details = {
        suggestion: "Verify that the bucket ID exists and is correctly configured",
      }
    }

    return {
      success: false,
      message: `Connection failed: ${errorType} error - ${error.message || "Unknown error"}`,
      details,
    }
  }
}

