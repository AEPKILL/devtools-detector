import { ua } from "./browser-context";

export const isMobile = /mobile/i.test(ua);
