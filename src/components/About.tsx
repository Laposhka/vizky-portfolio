import { about, skills } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TaoBalance from "./TaoBalance";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          title="About"
          description="Engineer first, but I care about how it feels to use."
        />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 90} as="p" className="text-lg leading-relaxed text-muted text-pretty">
                {p}
              </Reveal>
            ))}

            <Reveal delay={280}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="bg-surface px-5 py-5">
                    <dt className="font-mono text-[0.7rem] tracking-[0.15em] text-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={340} className="pt-4">
              <TaoBalance />
            </Reveal>
          </div>

          <div className="space-y-8">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 90}>
                <h3 className="font-mono text-xs tracking-[0.15em] text-faint uppercase">
                  {group.group}
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-surface/70 px-2.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
