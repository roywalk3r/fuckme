import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden border bg-background">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

