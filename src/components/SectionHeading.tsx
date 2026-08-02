import Reveal from "./Reveal";

type Props = {
  /** Monospace index shown above the title, e.g. "01". */
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ index, title, description }: Props) {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-faint uppercase">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span>{title}</span>
      </div>
      {description && (
        <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
          {description}
        </h2>
      )}
    </Reveal>
  );
}
