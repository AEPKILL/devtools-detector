import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type';

declare global {
  const eruda:
    | {
        _devTools?: {
          _isShow?: boolean;
        };
      }
    | undefined;
}

export const erudaChecker: DevtoolsStatusChecker = {
  name: 'eruda',
  async isOpen(): Promise<boolean> {
    if (typeof eruda !== 'undefined') {
      return eruda?._devTools?._isShow === true;
    }
    return false;
  },
  async isEnable(): Promise<boolean> {
    return true;
  },
};
