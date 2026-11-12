import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "fa"] as const;

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const requestedLocale = cookieStore.get("locale")?.value;
  const locale =
    locales.find((supportedLocale) => supportedLocale === requestedLocale) ??
    "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
