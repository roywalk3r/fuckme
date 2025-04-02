"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Check, Loader2, Database, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function FixSchemaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleFixSchema = async () => {
    setIsLoading(true)
    setResult({})

    try {
      const response = await fetch("/api/admin/fix-schema", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast({
          title: "Schema fixed successfully",
          description: "Your database schema has been updated to match the Prisma schema.",
        })
      } else {
        toast({
          title: "Error fixing schema",
          description: data.message || "An unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fix schema",
      })

      toast({
        title: "Error",
        description: "Failed to connect to the API",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fix Database Schema</h1>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertTitle>Database Schema Mismatch</AlertTitle>
        <AlertDescription>
          There appears to be a mismatch between your Prisma schema and the actual database structure. This utility will
          attempt to fix common issues like missing columns or tables.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Schema Repair Utility</CardTitle>
          <CardDescription>
            This will check your database structure and make necessary adjustments to match your Prisma schema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This utility will:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>
              Check if the <code>users</code> table exists and create it if needed
            </li>
            <li>
              Add the <code>role</code> column if it's missing
            </li>
            <li>Migrate table and column names from PascalCase to snake_case</li>
            <li>Create necessary enum types</li>
            <li>Regenerate the Prisma client</li>
          </ul>

          {result.success === true && (
            <Alert className="mt-4" variant="success">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}

          {result.success === false && (
            <Alert className="mt-4" variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
          <Button onClick={handleFixSchema} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fixing Schema...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Fix Database Schema
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

