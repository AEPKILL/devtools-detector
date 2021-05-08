export interface DevtoolsStatusChecker {
  /** checker 名称 */
  readonly name: string;

  /** 检查控制台是否打开 */
  isOpen(): Promise<boolean>;

  /** 当前环境下该 checker 时候可用 */
  isEnable(): Promise<boolean>;
}
