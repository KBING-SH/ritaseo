import { useState, useEffect } from "react";
import { User, PawPrint, Mountain, ChevronRight } from "lucide-react";
import landscapeBefore from "@/assets/landscape-before.jpg";
import landscapeAfter from "@/assets/landscape-after.jpg";
import petBefore from "@/assets/pet-before.jpg";
import petAfter from "@/assets/pet-after.jpg";
import portraitBefore from "@/assets/portrait-before.jpg";
import portraitAfter from "@/assets/portrait-after.jpg";
import { AutoComparisonSlider } from "@/components/AutoComparisonSlider";

const sections = [
  {
    icon: User,
    title: "Turn Portrait Photos into Cartoon Avatars with AI Photo to Cartoon",
    subtitle: "Transform your selfies into unique cartoon avatars",
    image: null,
    comparison: { before: portraitBefore, after: portraitAfter },
    imageAlt: "AI Photo to Cartoon Portrait",
    paragraphs: [
      "A portrait cartoon avatar offers a creative way to transform your photos using AI photo to cartoon technology. With rita, you can upload a clear portrait to create a distinctive cartoon effect that works well for social media profiles or personalized gifts. This AI photo to cartoon tool allows you to achieve a unique look with simple steps.",
      "Suitable for content creators and anyone seeking a creative visual, this cartoon style adds charm and personality to your images. Through rita, you can explore enjoyable AI photo to cartoon transformations that enhance your online presence or create memorable keepsakes. Upload your photo and generate the result to see how straightforward the cartoon effect can be.",
    ],
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "Cartoonize Your Pet Photos for Playful Portraits and Social Sharing with AI Photo to Cartoon",
    subtitle: "Create charming cartoon portraits of your pets",
    image: null,
    comparison: { before: petBefore, after: petAfter },
    imageAlt: "AI Photo to Cartoon Pet",
    paragraphs: [
      "Want to turn a pet photo into a charming cartoon portrait or cartoon effect? Using AI Photo to Cartoon tools like rita, you can upload your favorite pet snapshot and see it transform into a delightful cartoon version. This pet AI Photo to Cartoon feature captures your furry friend's unique personality, making it suitable for creating social avatars that stand out with playful charm. Whether it's your dog's grin or your cat's curious stare, rita helps bring those moments to life with just a few clicks.",
      "This AI Photo to Cartoon approach integrates well into content creation and social media posting, adding a fun twist to your pet's images without complicated steps. You can choose from various cartoon styles or customize prompts to craft a one-of-a-kind portrait that's ideal as gifts for friends or family who appreciate your pet. The process is straightforward and enjoyable, making it easy to share your pet's new cartoon look across platforms. If you want a social avatar or creative visual, upload your photo and generate the result.",
    ],
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "Cartoonize Your Landscape Photos for Unique Artistic Effects with AI Photo to Cartoon",
    subtitle: "Transform scenic photos into cartoon artwork",
    image: null,
    comparison: { before: landscapeBefore, after: landscapeAfter },
    imageAlt: "AI Photo to Cartoon Landscape",
    paragraphs: [
      "Want to turn a landscape photo into a cartoon effect that stands out? With rita's AI Photo to Cartoon tools, you can transform your scenic shots into captivating cartoon artwork, making landscape AI Photo to Cartoon a creative extension of your photo editing. This approach preserves the essence of your original image while adding a playful, artistic touch that's suitable for enhancing your social avatar or sharing on social media platforms. Simply upload a clear landscape photo, and rita will help you explore a variety of cartoon styles without complicated steps.",
      "This AI Photo to Cartoon transformation fits well into content creation projects or personalized gifts for friends and family, offering a fresh way to showcase travel memories or nature scenes. Whether you're designing visuals for a blog background or crafting a unique present, rita's intuitive process allows you to click through options and generate cartoon landscapes with ease. Try rita once and you'll find that turning a photo into a cartoon style is approachable and enjoyable.",
    ],
    imageFirst: true,
  },
];

// Map section index to style index: 0=Ghibli, 1=Cartoon, 2=Ink
const SECTION_STYLE_MAP = [0, 1, 3];

export function ContentSections({ onSelectStyle }: { onSelectStyle?: (styleIndex: number) => void }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = (sectionIndex: number) => {
    if (onSelectStyle) {
      onSelectStyle(SECTION_STYLE_MAP[sectionIndex] ?? 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const checkScrollDone = () => {
        if (window.scrollY <= 5) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        } else {
          requestAnimationFrame(checkScrollDone);
        }
      };
      requestAnimationFrame(checkScrollDone);
    }
  };

  return (
    <>
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="space-y-0">
        <div className="max-w-[1600px] mx-auto space-y-0">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`py-10 md:py-16 lg:py-24 ${i % 2 === 0 ? "bg-muted/40" : "bg-background"}`}
            >
              <article
                className={`px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-5 lg:gap-[80px] ${
                  section.imageFirst ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-[55%] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                    {section.comparison ? (
                      <AutoComparisonSlider
                        beforeSrc={section.comparison.before}
                        afterSrc={section.comparison.after}
                        beforeAlt="Original photo"
                        afterAlt="Cartoon effect"
                      />
                    ) : (
                      <img
                        src={section.image!}
                        alt={section.imageAlt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-[45%] space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">
                      <section.icon className="h-3.5 w-3.5" />
                      <span>{section.subtitle}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-title leading-tight tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base md:text-lg text-body2 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => handleTryNow(i)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-primary text-primary-foreground text-base font-semibold transition-all hover:opacity-90 hover:shadow-lg group"
                    >
                      <span>Try it now</span>
                      <ChevronRight className="h-4 w-4 text-primary-foreground/70 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function UploadTooltip() {
  const [pos, setPos] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("#upload-drop-zone"));
    const el = candidates.find((node) => {
      const rect = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });

    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }
  }, []);

  if (!pos) return null;

  return (
    <div
      className="absolute animate-fade-in flex items-center justify-center"
      style={{ top: pos.top, left: pos.left, width: pos.width, height: pos.height }}
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-[bounce_1s_ease-in-out_3]">
        👆 Upload your image here to get started
      </div>
    </div>
  );
}
