import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English Locales
import commonEn from "./locales/en/common.json";
import navbarEn from "./locales/en/navbar.json";
import homeEn from "./locales/en/home.json";
import shopEn from "./locales/en/shop.json";
import footerEn from "./locales/en/footer.json";

// Arabic Locales
import commonAr from "./locales/ar/common.json";
import navbarAr from "./locales/ar/navbar.json";
import homeAr from "./locales/ar/home.json";
import shopAr from "./locales/ar/shop.json";
import footerAr from "./locales/ar/footer.json";

const resources = {
  en: {
    common: commonEn,
    navbar: navbarEn,
    home: homeEn,
    shop: shopEn,
    footer: footerEn,
  },
  ar: {
    common: commonAr,
    navbar: navbarAr,
    home: homeAr,
    shop: shopAr,
    footer: footerAr,
  },
};

const updateDocumentAttributes = (lng) => {
  const currentLang = lng || i18n.language || "en";
  const isRtl = currentLang.startsWith("ar");
  document.documentElement.classList.add("switching-lang");
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = currentLang;

  setTimeout(() => {
    document.documentElement.classList.remove("switching-lang");
  }, 50);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    defaultNS: "common",
    ns: ["common", "navbar", "home", "shop", "footer"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

updateDocumentAttributes(i18n.language);

i18n.on("languageChanged", (lng) => {
  updateDocumentAttributes(lng);
});

export default i18n;
