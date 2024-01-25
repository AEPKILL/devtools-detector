export type MethodToAsyncFunction<T extends Function> = T extends (
  ...args: infer Args
) => infer Return
  ? (...args: Args) => Promise<Return>
  : never;
