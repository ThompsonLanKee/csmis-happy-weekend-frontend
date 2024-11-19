export class Division {
  id: number;
  name: string ;
  isDelete:boolean;

  constructor(id:number=0,name:string="",isDelete:boolean=false){
    this.id=id;
      this.name=name;
      this.isDelete=isDelete;
  }
}
