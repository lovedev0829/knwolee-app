import { registerLocale, getNames } from "@cospired/i18n-iso-languages";
import localeEn from "@cospired/i18n-iso-languages/langs/en.json";

registerLocale(localeEn);

export const languageNames = getNames("en");
