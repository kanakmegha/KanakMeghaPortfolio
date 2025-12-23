"use client"

import * as React from "react"

export interface CalendarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function Calendar({ className = "", ...props }: CalendarProps) {
  return (
    <div
      className={`rounded-lg border border-dashed border-neutral-300 p-4 text-sm text-muted-foreground ${className}`}
      {...props}
    >
      Calendar component placeholder – date picker library removed.
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
