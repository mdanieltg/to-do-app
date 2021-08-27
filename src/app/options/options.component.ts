import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../options-service/options.service';
import { Router } from '@angular/router';
import { areEqualOptions as equal, DEFAULT_OPTIONS } from '../utils/options-utils';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  originalOptions = DEFAULT_OPTIONS;
  options = DEFAULT_OPTIONS;

  constructor(private optionsService: OptionsService,
              private router: Router) {
  }

  save(): void {
    if (!equal(this.options, this.originalOptions)) {
      this.optionsService.setOptions(this.options);
    }

    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.originalOptions = this.optionsService.getOptions();
    this.options = { ...this.originalOptions };
  }
}
