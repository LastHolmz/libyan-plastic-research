import { Cairo, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n-config";
import Header from "../(interface)/components/header";
import Footer from "../(interface)/components/footer";

const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>) {
  const lang = (await params).lang;
  return (
    <div
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={cn(
        lang === "ar" ? cairo.className : outfit.className,
        "relative"
      )}
    >
      <Header
        className="border-b border-b-foreground/20"
        lang={lang as Locale}
      />

      <div className="md:mt-28 mt-20">{children}</div>
      <Footer className="bg-secondary" lang={lang} />
    </div>
  );
}
