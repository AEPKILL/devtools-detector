export type FnArguments<T extends (...args: any[]) => any> = T extends (
  ...args: infer Args
) => any
  ? Args
  : never;
