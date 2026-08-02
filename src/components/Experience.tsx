import { experience } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="Experience"
          description="Where I've been, and what I left behind me."
        />

        <ol className="relative border-l border-line pl-8 sm:pl-12">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 110} as="li" className="group relative pb-14 last:pb-0">
              {/* Timeline node */}
              <span className="absolute top-2 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full border border-line bg-canvas transition-colors group-hover:border-accent group-hover:bg-accent sm:-left-[calc(3rem+4.5px)]" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{job.role}</h3>
                <span className="text-muted">·</span>
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-xl font-semibold tracking-[-0.02em] text-transparent">
                  {job.company}
                </span>
              </div>

              <p className="mt-2 font-mono text-xs tracking-[0.12em] text-faint uppercase">
                {job.period} — {job.location}
              </p>

              <p className="mt-4 max-w-2xl text-muted text-pretty">{job.summary}</p>

              <ul className="mt-4 max-w-2xl space-y-2.5">
                {job.highlights.map((h) => (
                  <li key={h} className="relative pl-5 text-[0.95rem] leading-relaxed text-muted">
                    <span className="absolute top-[0.7em] left-0 h-1 w-1 rounded-full bg-faint" />
                    {h}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line/80 px-2 py-1 font-mono text-[0.7rem] text-faint"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
