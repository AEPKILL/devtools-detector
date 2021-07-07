export interface BrowserInfo {
  name: string;
  version: string;
}

export interface OperatorSystemInfo {
  name: string;
  version: string;
  versionName: string;
}

export interface PlatformInfo {
  type: string;
}

export interface EngineInfo {
  name: string;
  version: string;
}

export class UserAgent {
  constructor(private readonly userAgent: string) {}
}
