import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is AI Photo to Cartoon?",
    a: "AI Photo to Cartoon is a technology that transforms your photos into cartoon-style images using artificial intelligence.",
  },
  {
    q: "How does AI Photo to Cartoon work?",
    a: "AI Photo to Cartoon uses AI algorithms to analyze your photo and recreate it with cartoon-like features and effects.",
  },
  {
    q: "Can I use AI Photo to Cartoon for any photo?",
    a: "AI Photo to Cartoon works best with clear, well-lit photos, but it can be applied to most types of images.",
  },
  {
    q: "Is AI Photo to Cartoon easy to use?",
    a: "Yes, AI Photo to Cartoon tools are designed to be user-friendly, allowing you to convert photos into cartoons quickly.",
  },
  {
    q: "Are the results from AI Photo to Cartoon customizable?",
    a: "Some AI Photo to Cartoon tools offer options to adjust the style or intensity of the cartoon effect.",
  },
  {
    q: "Can AI Photo to Cartoon be used for professional purposes?",
    a: "AI Photo to Cartoon can be used for various purposes, including personal and creative projects, depending on the quality needed.",
  },
  {
    q: "Is AI Photo to Cartoon safe to use?",
    a: "AI Photo to Cartoon services generally prioritize user privacy and data security, but it's good to review each service's policies.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8 md:py-12" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-title">FAQ</h2>
        </div>

        {/* FAQ list */}
        <div className="max-w-[750px] mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl bg-card shadow-sm transition-all duration-200 border border-border/60 border-l-[3px]",
                  isOpen ? "border-l-primary shadow-md" : "border-l-transparent hover:border-l-primary/40"
                )}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                >
                  <span
                    itemProp="name"
                    className={cn(
                      "text-base font-semibold transition-colors",
                      isOpen ? "text-title" : "text-title group-hover:text-primary"
                    )}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p itemProp="text" className="px-6 pb-5 text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
