import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrl: './confirmbox.component.css'
})
export class ConfirmboxComponent {
  @Input() display_message:string='';
  @Input() data:any;
  delete():void{
    alert(this.data);
  }
}
