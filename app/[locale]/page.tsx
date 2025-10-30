import Navbar from "@/components/layout/navbar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });
  return {
    title: t("title"),
  };
}

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="relative h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <div className="absolute inset-0 grid place-items-center">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      </div>
    </main>
  );
}
