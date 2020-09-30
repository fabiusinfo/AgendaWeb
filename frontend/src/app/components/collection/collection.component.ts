import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {
  collectionpoints = [{id:-1,name:'',address:''}]

  constructor(private api: PlaceService) {
    this.getCollections()
   }
   getCollections = () =>{
    this.api.getAllPlaces().subscribe(
      data=>{
        this.collectionpoints=data
        console.log(data)
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
