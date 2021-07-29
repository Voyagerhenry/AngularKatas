import { Component, OnInit } from '@angular/core';

import * as data from './../persona.json';
@Component({
  selector: 'persona',
  template: `
    <div>
      <pre>{{ persona | json }}</pre>
    </div>
    <div>
      <pre>?{{ params }}</pre>
    </div>
  `
})
export class PersonaComponent implements OnInit {
  persona: any = (data as any).default;
  params: URLSearchParams;
  constructor() {}
  fixFormat(stringData: any): any {
    //fix format date to iso
    let bValidDate: boolean = false;
    let isoDate: string;
    if (stringData && isNaN(stringData)) {
      let nbrDate = Date.parse(stringData);
      if (!isNaN(nbrDate)) {
        isoDate = new Date(nbrDate).toISOString();
        bValidDate = true;
      }
    }
    return bValidDate ? isoDate : stringData;
  }
  ngOnInit() {
    this.params = new URLSearchParams();
    let value: string;
    for (let key in this.persona) {
      value = this.fixFormat(this.persona[key]);
      this.params.set(key, value);
    }
    console.log(this.params.toString());
  }
}
