import { NgModule } from '@angular/core';
import { NestedKeyPipe } from '../models/nested-key.pipe.ts';

@NgModule({
  declarations: [NestedKeyPipe],
  exports: [NestedKeyPipe]
})
export class SharedModule {}
