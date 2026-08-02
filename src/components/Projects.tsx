import { projects, type Project } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const [from, to] = project.gradient;

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 sm:p-8"
      style={{ "--from": from, "--to": to } as React.CSSProperties}
    >
      {/* Gradient wash that warms up on hover. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--from) 14%, transparent) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, var(--from), var(--to), transparent)" }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3
            className={`font-semibold tracking-[-0.02em] ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{project.blurb}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-faint">{project.year}</span>
      </div>

      <p className="relative mt-5 text-[0.95rem] leading-relaxed text-muted text-pretty">
        {project.description}
      </p>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-line/80 px-2 py-1 font-mono text-[0.7rem] text-faint"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="relative mt-7 flex items-center gap-5 pt-1">
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 text-sm text-ink underline-offset-4 hover:underline"
          >
            Live site
            <ArrowIcon />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Source
            <ArrowIcon />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          title="Selected work"
          description="Things I've designed, built, and kept running."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.title} delay={i * 100} className="h-full">
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={i * 100} className="h-full">
              <ProjectCard project={project} featured={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
