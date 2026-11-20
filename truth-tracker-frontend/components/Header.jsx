"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How it works" },
  { id: "about", label: "About" },
];

export default function Header() {
  const [active, setActive] = useState("home");
  const lockUntil = useRef(0); // ignore scroll-spy briefly after a click

  // Highlight the nav link of the section currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && Date.now() > lockUntil.current && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-forest-dark bg-forest text-sand shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a href="#home" aria-label="Truth Tracker home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-sand/25 bg-paper-card p-1">
            <Image src="/logo-mark.png" alt="" width={34} height={40} priority className="h-8 w-auto" />
          </div>
          <span className="leading-none">
            <span className="block font-serif text-[16px] font-bold tracking-tight text-white">Truth</span>
            <span className="block font-serif text-[16px] font-bold tracking-tight text-sand-warm">Tracker</span>
            <span className="mt-1 block text-[8px] font-semibold tracking-[0.14em] text-sand/85 uppercase">
              AI FACT VERIFICATION
            </span>
          </span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => { setActive(l.id); lockUntil.current = Date.now() + 900; }}
                    aria-current={isActive ? "true" : undefined}
                    className={`border-b-2 py-2 transition-colors ${
                      isActive
                        ? "border-sand font-semibold text-white"
                        : "border-transparent text-sand/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}