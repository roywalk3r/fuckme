"use client"

import type React from "react"

import { useState } from "react"

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  async function uploadFile() {
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      // Ensure response is not empty before parsing
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (!res.ok) {
        setMessage(data.error || "Upload failed")
      } else {
        setMessage("Upload success")
      }
    } catch (error) {
      setMessage(String(error))
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={uploadFile}
        disabled={uploading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  )
}

