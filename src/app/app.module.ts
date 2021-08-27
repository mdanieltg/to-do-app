import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ListItemComponent } from './list-item/list-item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    NewItemComponent,
    ItemDetailComponent,
    ItemsListComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot([
      { path: 'detalle/:id', component: ItemDetailComponent },
      { path: 'options', component: OptionsComponent },
      { path: '', pathMatch: 'full', component: ItemsListComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
