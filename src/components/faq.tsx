import { faqs } from "@/content/copy";

export function Faq() {
  return (
    <section id="faq" className="mt-14">
      <h2>Questions</h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-heading text-primary group-open:hidden"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 hidden font-heading text-primary group-open:inline"
                >
                  –
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
