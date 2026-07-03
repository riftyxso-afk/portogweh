import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Loader2 } from "lucide-react";

interface CVModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lang: "id" | "en" | null;
}

const cvFiles = {
  id: {
    title: "I WAYAN RADEA - CV (Bahasa Indonesia)",
    href: "/I_Wayan_Radea_CV_ID.docx",
  },
  en: {
    title: "I WAYAN RADEA - CV (English)",
    href: "/I_Wayan_Radea_CV_ENG.docx",
  },
};

const CVModal = ({ isOpen, onOpenChange, lang }: CVModalProps) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen || !lang) return;

    const loadDocx = async () => {
      setLoading(true);
      setError(false);
      setHtmlContent(null);

      try {
        const mammoth = await import("mammoth");
        const res = await fetch(cvFiles[lang].href);
        if (!res.ok) throw new Error("Failed to fetch");
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const result = await mammoth.convertToHtml({
          arrayBuffer,
          styleMap: [
            "p[style-name='Title'] => h1:fresh",
            "p[style-name='Heading 1'] => h2:fresh",
            "p[style-name='Heading 2'] => h3:fresh",
          ],
        });
        setHtmlContent(result.value);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDocx();
  }, [isOpen, lang]);

  if (!lang) return null;

  const data = cvFiles[lang];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <DialogTitle className="text-lg">{data.title}</DialogTitle>
          <a
            href={data.href}
            download={data.href.replace('/', '')}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors mr-6"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : error ? (
            <p className="text-sm text-muted-foreground text-center py-16">
              Gagal memuat CV. Silakan unduh file langsung.<br/>Failed to load CV. Please download the file directly.
            </p>
          ) : htmlContent ? (
            <div
              className="cv-preview mx-auto max-w-[650px] text-sm leading-relaxed
                [&_h1]:text-center [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-1
                [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-border
                [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1
                [&_p]:mb-2 [&_p]:text-justify
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-3
                [&_td]:border [&_td]:border-border [&_td]:p-2 [&_td]:align-top
                [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:font-semibold [&_th]:bg-[#F8F9FA] dark:[&_th]:bg-[#18181B]
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                [&_li]:mb-1
                [&_a]:text-primary [&_a]:underline
                [&_br]:mb-1"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { CVModal };
