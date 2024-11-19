import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
sections: any;
message: any;
// Cheatsheets: Cheatsheet[]=[];
backgroundUrl: string = "../../../assets/image/p1.jpg";
// constructor(private cheatsheetService:CheatsheetsService){
// }


// getAll():void{
//   this.cheatsheetService.getAll().subscribe(data=>{this.Cheatsheets=data;
//     //data ya p mha lote chin tr yae
//   })
// }
}
