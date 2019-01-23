export interface DevtoolsDetail {
  isOpen: boolean;
  checkerName: string;
  directReturn?: boolean;
}

export interface DevtoolsChecker {
  name: string;
  getDevtoolsDetail(this: DevtoolsChecker): Promise<DevtoolsDetail>;
  skip?(): Promise<boolean>;
}
