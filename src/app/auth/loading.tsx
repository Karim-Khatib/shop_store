import React, { ReactNode } from 'react'

export default function Loading():ReactNode {
    return (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-4 text-lg">Loading...</span>
        </div>
      )
}
