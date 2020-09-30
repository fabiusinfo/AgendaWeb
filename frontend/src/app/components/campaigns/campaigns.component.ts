import { Component, OnInit, ViewChild } from '@angular/core';
import { CampanaService } from '../../services/campana.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampaignsDialogComponent } from '../campaigns-dialog/campaigns-dialog.component';
//componente para mostrar las campañas
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  displayedColumns: string[] = ['place_name', 'dia_inicio', 'dia_termino', 'hora_inicio', 'hora_termino'];
  campaigns;
  campanas: MatTableDataSource<any>;
  selectedCampana;
  image_src;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: CampanaService, public dialog: MatDialog){
    this.getCampanas();
    this.selectedCampana={id:-1,place_name:'d',dia_inicio:0,dia_termino:0,hora_inicio:0,hora_termino:0,imagen:''};
  }
  //funcion flecha para obtener las campañas
  getCampanas = () =>{
    this.api.getAllCampanas().subscribe(
      data=>{
        this.campaigns = data;
        this.campanas = new MatTableDataSource<any>(data);
        this.campanas.paginator = this.paginator;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  //funcion flecha para ver una campaña
  verCampana=(campana) =>{
    console.log(campana);
    this.api.getOneCampana(campana.id).subscribe(
      data=>{
        this.selectedCampana=data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  openDialog(entry): void {
    const dialogRef = this.dialog.open(CampaignsDialogComponent, {
      //width: '250px',
      data: {
        image: entry.imagen
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ocultarInfo=() =>{

    this.selectedCampana.id=-1;

  }

  ngOnInit(): void {
  }

}
