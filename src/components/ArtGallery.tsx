import styleGhibli from "@/assets/style-ghibli.webp";
import stylePixel from "@/assets/style-pixel.webp";
import styleRealistic from "@/assets/style-realistic.webp";
import styleInk from "@/assets/style-ink.webp";
import styleCartoon from "@/assets/style-cartoon.webp";
import styleClassic from "@/assets/style-classic.webp";
import styleCute from "@/assets/style-cute.webp";
import styleMinimal from "@/assets/style-minimal.webp";
import sectionPortrait from "@/assets/section-portrait.webp";
import sectionPet from "@/assets/section-pet.webp";
import sectionLandscape from "@/assets/section-landscape.webp";
import afterImg from "@/assets/after.webp";
import beforeImg from "@/assets/before.webp";

const galleryImages = [
  { src: styleGhibli, label: "吉卜力风格" },
  { src: sectionPortrait, label: "人像卡通" },
  { src: stylePixel, label: "像素艺术" },
  { src: styleCute, label: "可爱风格" },
  { src: sectionPet, label: "宠物卡通" },
  { src: styleRealistic, label: "写实艺术" },
  { src: styleInk, label: "水墨风格" },
  { src: afterImg, label: "动漫风格" },
  { src: styleCartoon, label: "卡通风格" },
  { src: sectionLandscape, label: "风景卡通" },
  { src: styleClassic, label: "复古风格" },
  { src: styleMinimal, label: "极简风格" },
  { src: beforeImg, label: "原图参考" },
  { src: styleCute, label: "萌系风格" },
];

const row1 = galleryImages.slice(0, 7);
const row2 = galleryImages.slice(7);

function GalleryRow({ items, reverse = false }: { items: typeof galleryImages; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <div className={`flex gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {repeated.map((img, i) => (
          <div
            key={i}
            className="shrink-0 w-[200px] md:w-[240px] group"
          >
            <div className="rounded-xl overflow-hidden border border-border/50 shadow-soft group-hover:shadow-soft-lg transition-shadow duration-300">
              <img
                src={img.src}
                alt={img.label}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-body-desc text-center mt-2">{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArtGallery() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-8 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-title text-center mb-3">
          在线创意画廊
        </h2>
        <p className="text-body-desc text-center">
          探索 Rita AI 生成的多种风格卡通作品
        </p>
      </div>
      <div className="space-y-5">
        <GalleryRow items={row1} />
        <GalleryRow items={row2} reverse />
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-soft"
        >
          ✨ 立即体验 AI 创作
        </button>
      </div>
    </section>
  );
}
