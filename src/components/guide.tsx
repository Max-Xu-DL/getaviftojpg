import { guideSections, steps } from "@/content/copy";

export function Guide() {
  return (
    <article id="guide" className="mt-14 space-y-10">
      {guideSections.map((section) => (
        <section key={section.id} id={section.id} className="space-y-4">
          <h2>{section.title}</h2>
          {(section.id === "how-to" ? section.paragraphs.slice(0, 1) : section.paragraphs).map(
            (paragraph) => (
              <p key={paragraph} className="text-base leading-7 text-foreground/90">
                {paragraph}
              </p>
            ),
          )}
          {section.id === "how-to" ? (
            <>
              <ol className="space-y-5 pt-2">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      <h3>{step.title}</h3>
                      <p className="text-base leading-7 text-foreground/90">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {section.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </>
          ) : null}
        </section>
      ))}
    </article>
  );
}
