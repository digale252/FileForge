"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 pt-4 px-4 pb-2">
      <nav className="mx-auto max-w-6xl rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-background/50 transition-all duration-300">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-1.5 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M8 13h2" />
                <path d="M8 17h2" />
                <path d="M14 13h2" />
                <path d="M14 17h2" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">FileForge</span>
          </Link>
          
          <div className="hidden md:flex gap-1 items-center bg-muted/40 p-1 rounded-full border border-border/50">
            <Link href="/" className="text-sm font-semibold px-5 py-2 rounded-full hover:bg-background hover:shadow-sm hover:text-primary transition-all duration-300">
              Home
            </Link>
            <Link href="/convert" className="text-sm font-semibold px-5 py-2 rounded-full hover:bg-background hover:shadow-sm hover:text-primary transition-all duration-300">
              Convert
            </Link>
            <Link href="/about" className="text-sm font-semibold px-5 py-2 rounded-full hover:bg-background hover:shadow-sm hover:text-primary transition-all duration-300">
              About
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/convert">
              <Button className="rounded-full px-4 md:px-6 text-xs md:text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                <span className="hidden sm:inline">Start Converting</span>
                <span className="sm:hidden">Convert</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full hover:bg-primary/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-foreground" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-2xl md:hidden flex flex-col gap-2 z-50">
          <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary font-semibold transition-colors">
            Home
          </Link>
          <Link href="/convert" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary font-semibold transition-colors">
            Convert
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary font-semibold transition-colors">
            About
          </Link>
        </div>
      )}
    </div>
  );
}
