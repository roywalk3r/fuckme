"use client"

import { useState } from "react"
import { AppwriteUpload } from "@/components/appwrite/appwrite-upload"
import { AppwriteImg } from "@/components/appwrite/appwrite-img"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function TestUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleUploadSuccess = (urls: string[]) => {
    setUploadedImages((prev) => [...prev, ...urls])
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Test Appwrite Upload</CardTitle>
          <CardDescription>
            This page tests the Appwrite upload functionality. Upload an image to see if it works.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AppwriteUpload onUploadSuccess={handleUploadSuccess} buttonText="Upload Test Image" multiple={true} />

          {uploadedImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Uploaded Images ({uploadedImages.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-md border">
                      <AppwriteImg
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

