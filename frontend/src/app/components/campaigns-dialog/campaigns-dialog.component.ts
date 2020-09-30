import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-campaigns-dialog',
  templateUrl: './campaigns-dialog.component.html',
  styleUrls: ['./campaigns-dialog.component.css']
})
export class CampaignsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CampaignsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
