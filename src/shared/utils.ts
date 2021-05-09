import { compare, CompareOperator } from 'compare-versions';
import { versionMap } from './version-map';

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

export function specificVersionMatch(
  specific: string,
  firstVersion: string,
  secondVersion: string,
  operator: CompareOperator
): boolean {
  const version = versionMap[specific];

  if (version === undefined) {
    return false;
  }

  return compare(firstVersion, secondVersion, operator);
}
