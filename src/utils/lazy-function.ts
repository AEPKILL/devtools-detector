// tslint:disable-next-line:no-any
export default function layzFunction<T extends (...args: any[]) => any>(
  fn: T
): T {
  let wasRun = false;
  let result!: ReturnType<T>;
  // tslint:disable-next-line:only-arrow-functions no-any
  return function(...args: any[]) {
    if (wasRun) {
      return result;
    }
    wasRun = true;
    return (result = fn(...args));
  } as T;
}
