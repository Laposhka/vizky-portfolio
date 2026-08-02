"use client";

import { useEffect, useState } from "react";
import { site, socials } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission) —
      // the mailto link next to this button still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line px-5 py-3 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
    >
      {copied ? "Copied to clipboard" : "Copy email"}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" title="Contact" />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/50 px-7 py-14 text-center sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="animate-drift pointer-events-none absolute -top-32 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent-2) 0%, transparent 70%)",
              }}
            />

            <p className="relative font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {site.available ? site.availableLabel : "Say hello"}
            </p>

            <h2 className="relative mt-6 text-4xl leading-tight font-semibold tracking-[-0.035em] text-balance sm:text-6xl">
              Let&apos;s build something
              <br className="hidden sm:block" /> worth shipping.
            </h2>

            <p className="relative mx-auto mt-6 max-w-lg text-lg text-muted text-pretty">
              Have a project, a role, or just a good problem? My inbox is open —
              I read everything and reply to most of it.
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group relative overflow-hidden rounded-full bg-ink px-7 py-3 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">{site.email}</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <CopyEmailButton />
            </div>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-faint underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
