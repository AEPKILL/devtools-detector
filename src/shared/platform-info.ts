import { userAgent } from "./browser-context";

export const isMobile = /mobile/i.test(userAgent);
