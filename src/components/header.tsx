import Link from "next/link";
import { MountainIcon } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="sr-only">Kanak's AI Portfolio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#projects"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80 hover:text-foreground"
          prefetch={false}
        >
          Projects
        </Link>
        <Link
          href="#tools-demo"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80 hover:text-foreground"
          prefetch={false}
        >
          Tools
        </Link>
        <Link
          href="#experience"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80 hover:text-foreground"
          prefetch={false}
        >
          Experience
        </Link>
        <Link
          href="#contact"
          className="text-sm font-medium hover:underline underline-offset-4 text-foreground/80 hover:text-foreground"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
