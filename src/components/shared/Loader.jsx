import { cn } from "@/lib/utils";

export function Spinner({ className, size = 48, ...props }) {
  return (
    <div
      className={cn("animate-spin rounded-full border-b-2 border-[#FF0055]", className)}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}

export function FullPageLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
        <Spinner size={64} />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}