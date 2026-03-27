import { useState, useRef, useCallback } from "react";
import { ImageIcon, X, Check, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ritaLogo from "@/assets/rita-logo.webp";

const EXAMPLE_QUESTIONS = [
  { type: "text", text: "A right triangle has legs measuring 3 cm and 4 cm. Find the length of the hypotenuse." },
  { type: "text", text: "Solve: ∫ x² dx" },
  { type: "text", text: "Factor: x² - 5x + 6" },
  { type: "text", text: "Find the derivative of f(x) = 3x³ + 2x² - x + 5" },
];

export function MathInputPanel({ onSolve, isSolving }: {
  onSolve?: (question: string, imageBase64?: string) => void;
  isSolving?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [activeTab, setActiveTab] = useState<"type" | "upload">("type");
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    setActiveTab("upload");

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImageBase64(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = () => {
    if (isSolving) return;
    if (!questionText.trim() && !imageBase64) return;
    onSolve?.(questionText.trim(), imageBase64 || undefined);
  };

  const handleExampleClick = (text: string) => {
    setQuestionText(text);
    setActiveTab("type");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header - desktop only */}
      <div className="hidden lg:flex items-center gap-2.5 px-5 py-4 border-b border-border/50">
        <img src={ritaLogo} alt="Rita" className="h-8 w-8 rounded-lg" />
        <span className="text-base font-bold text-title">Rita Math Solver</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-5 space-y-4">
        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted/50 border border-border/30">
          <button
            onClick={() => setActiveTab("type")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all",
              activeTab === "type"
                ? "bg-card text-title shadow-sm"
                : "text-muted-foreground hover:text-title"
            )}
          >
            <Send className="w-3.5 h-3.5" />
            Type Question
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all",
              activeTab === "upload"
                ? "bg-card text-title shadow-sm"
                : "text-muted-foreground hover:text-title"
            )}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Image
          </button>
        </div>

        {/* Text input area */}
        {activeTab === "type" && (
          <div className="animate-fade-in">
            <label className="text-xs font-medium text-title mb-1.5 block">Type your math problem</label>
            <textarea
              ref={textareaRef}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Solve x² + 3x - 4 = 0..."
              className="w-full h-32 lg:h-44 rounded-lg border border-border/50 bg-card px-3 py-2.5 text-sm text-title placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <p className="text-[11px] text-muted-foreground mt-1">Press Enter to solve, Shift+Enter for new line</p>
          </div>
        )}

        {/* Upload area */}
        {activeTab === "upload" && (
          <div className="animate-fade-in">
            <label className="text-xs font-medium text-title mb-1.5 block">Upload math problem image</label>
            {uploadedImage ? (
              <div className="relative rounded-lg border border-border/50 overflow-hidden">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-36 lg:h-48 object-contain bg-muted/20" />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foreground/60 hover:bg-foreground/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-background" />
                </button>
                <div className="flex items-center gap-1.5 p-2">
                  <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary" />
                  </div>
                  <span className="text-xs text-primary">Image uploaded</span>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "h-36 lg:h-48 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
              >
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">Drag & drop image, or click to browse</p>
                <p className="text-xs text-muted-foreground/60">Supports PNG / JPG / WEBP, up to 20 MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
            
            {/* Optional text with image */}
            <div className="mt-3">
              <label className="text-xs font-medium text-title mb-1.5 block">Additional context (optional)</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Add extra details about the problem..."
                className="w-full h-16 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm text-title placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>
        )}

        {/* Example questions */}
        <div>
          <label className="text-xs font-medium text-title mb-2 block">Try these examples</label>
          <div className="flex flex-col gap-1.5">
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(q.text)}
                className="text-left px-3 py-2 rounded-lg border border-border/30 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-xs text-body-desc leading-relaxed"
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom: solve button */}
      <div className="border-t border-border/50 p-3 md:p-4 lg:p-5">
        <Button
          variant="gradient"
          size="default"
          className="w-full"
          disabled={isSolving || (!questionText.trim() && !imageBase64)}
          onClick={handleSubmit}
        >
          {isSolving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Solving...
            </span>
          ) : (
            "Get Answer"
          )}
        </Button>
      </div>
    </div>
  );
}
