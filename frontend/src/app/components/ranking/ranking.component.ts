import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RankingService } from 'src/app/services/ranking/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'points'];
  rankingPoints;
  rankingPointsTable: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private api: RankingService) {
    this.getRanking();
  }

  //funcion flecha para obtener las campañas
  getRanking = () =>{
    this.api.getRankingPoints().subscribe(
      data=>{
        this.rankingPoints = data;
        this.rankingPointsTable = new MatTableDataSource<any>(data);
        this.rankingPointsTable.paginator = this.paginator;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
