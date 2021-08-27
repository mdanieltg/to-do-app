import { Injectable } from '@angular/core';
import { Options } from '../options';
import { readFromLocalStorage, writeToLocalStorage } from '../utils/storage-utils';
import { DEFAULT_OPTIONS } from '../utils/options-utils';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor() { }

  getOptions(): Options {
    const options = readFromLocalStorage<Options>('options');
    return options ?? DEFAULT_OPTIONS;
  }

  setOptions(options: Options): void {
    writeToLocalStorage('options', options);
  }
}
