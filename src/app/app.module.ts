import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { DoneItemComponent } from './done-item/done-item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoItemComponent,
    DoneItemComponent,
    NewItemComponent,
    ItemDetailComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
