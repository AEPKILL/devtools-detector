export interface MatchOptions {
  includes?: boolean[];
  excludes?: boolean[];
}

export function match(options: MatchOptions = {}): boolean {
  const { includes = [], excludes = [] } = options;

  let included = false;
  let excluded = false;

  for (const item of includes) {
    if (item === true) {
      included = true;
      break;
    }
  }

  for (const item of excludes) {
    if (item === true) {
      excluded = true;
      break;
    }
  }

  return included && !excluded;
}
