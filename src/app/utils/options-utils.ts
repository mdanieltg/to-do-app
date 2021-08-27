import { Options } from '../options';

export const DEFAULT_OPTIONS: Options = {
  displayCompletedTasks: false
};

export function areEqualOptions(optionsA: Options, optionsB: Options): boolean {
  return optionsA.displayCompletedTasks === optionsB.displayCompletedTasks;
}
