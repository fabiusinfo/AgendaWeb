import { Component, OnInit } from '@angular/core';
import { PredictionsService } from '../../services/predictions.service';
import { BloodService } from '../../services/blood.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  predictionsData;
  bloodStock;
  public user: any;

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  constructor(private api: PredictionsService, private bloodApi: BloodService, private snackBar: MatSnackBar, public userService: UserService) {
    this.getPredictions();
    this.getBloodStocks();
    this.predictionsData = {n_don: 0, pred: 0};
  }

  getBloodStocks = () => {
    this.bloodApi.getAllBloods().subscribe(
      data => {
        this.bloodStock = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    );
  }

  getPredictions = () => {
    this.api.getPredictionsData().subscribe(
      data => {
        this.predictionsData = data;
        console.log(data);
        if (this.predictionsData.n_don - this.predictionsData.pred < 0) {
          console.log('test');
          this.openSnackBar('¡Alerta de escasez!', 'Cerrar');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateStock = () => {
    this.bloodStock.forEach(blood => {
      console.log(blood);
      this.bloodApi.updateBlood(blood).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    });

  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.userService.login({username: this.user.username, password: this.user.password});
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  logout() {
    this.userService.logout();
  }
}
