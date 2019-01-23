export interface DevtoolsDetail {
  isOpen: boolean;
  checkerName: string;
}

export interface DevtoolsChecker {
  name: string;
  getDevtoolsDetail(): Promise<DevtoolsDetail>;
}
