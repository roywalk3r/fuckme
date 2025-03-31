"use client"

import { useState, useEffect } from "react"

type ApiResponse<T> = {
  data?: T
  error?: string | string[] | Record<string, string[]>
}

type UseApiOptions = {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  enabled?: boolean
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { onSuccess, onError, enabled = true } = options

  const fetchData = async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      const result: ApiResponse<T> = await response.json()

      if (!response.ok) {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : Array.isArray(result.error)
              ? result.error.join(", ")
              : "An error occurred"

        throw new Error(errorMessage)
      }

      if (result.data) {
        setData(result.data)
        setIsSuccess(true)
        onSuccess?.(result.data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      onError?.(errorMessage)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url, enabled])

  return {
    data,
    error,
    isLoading,
    isSuccess,
    refetch: fetchData,
  }
}

export function useApiMutation<T, U = any>(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST",
  options: UseApiOptions = {},
) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const { onSuccess, onError } = options

  const mutate = async (payload?: U) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : undefined,
      })

      const result: ApiResponse<T> = await response.json()

      if (!response.ok) {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : Array.isArray(result.error)
              ? result.error.join(", ")
              : "An error occurred"

        throw new Error(errorMessage)
      }

      if (result.data) {
        setData(result.data)
        setIsSuccess(true)
        onSuccess?.(result.data)
      }

      return result.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      onError?.(errorMessage)
      setIsSuccess(false)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mutate,
    data,
    error,
    isLoading,
    isSuccess,
    reset: () => {
      setData(undefined)
      setError(null)
      setIsSuccess(false)
    },
  }
}
