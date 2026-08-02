"use client";

import { useEffect, useState } from "react";
import { site, socials, stack } from "@/lib/content";
import Reveal from "./Reveal";

const TYPE_MS = 55;
const ERASE_MS = 28;
const HOLD_MS = 1800;
const PAUSE_MS = 320;

/** Types the roles out one character at a time, then erases and moves on. */
function useTypedRole(roles: readonly string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const full = roles[index];

    if (!erasing && text === full) {
      const t = setTimeout(() => setErasing(true), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (erasing && text === "") {
      const t = setTimeout(() => {
        setErasing(false);
        setIndex((i) => (i + 1) % roles.length);
      }, PAUSE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          erasing ? prev.slice(0, -1) : full.slice(0, prev.length + 1),
        ),
      erasing ? ERASE_MS : TYPE_MS,
    );
    return () => clearTimeout(t);
  }, [text, erasing, index, roles]);

  return text;
}

export default function Hero() {
  const typed = useTypedRole(site.roles);

  return (
    <section id="top" className="relative px-6 pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        {site.available && (
          <Reveal className="mb-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-3 text-xs text-muted backdrop-blur">
              <span className="animate-pulse-ring h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availableLabel}
            </span>
          </Reveal>
        )}

        <Reveal delay={60}>
          <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-8xl">
            {site.name}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 font-mono text-lg text-accent sm:text-2xl">
            <span className="text-faint">&gt;&nbsp;</span>
            {typed}
            <span className="animate-caret ml-0.5 inline-block w-[0.5ch] bg-accent align-baseline text-transparent select-none">
              _
            </span>
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
            {site.intro}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group relative overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">View my work</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
            >
              Get in touch
            </a>

            <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

            {/* Kept in one flex child so the set wraps together, not one-by-one. */}
            <div className="flex items-center gap-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-2 py-3 text-sm text-faint underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Endlessly scrolling stack strip. */}
      <Reveal delay={420} className="mt-20 sm:mt-28">
        <div
          className="relative flex overflow-hidden border-y border-line/60 py-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {/* Two identical copies so translateX(-50%) loops seamlessly. */}
          <div className="animate-marquee flex">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-sm whitespace-nowrap text-faint"
                  >
                    {tech}
                    <span className="mx-8 text-line">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
