import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position';

@Component({
  selector: 'app-show-position',
  templateUrl: './show-position.component.html',
  styleUrls: ['./show-position.component.css']
})
export class ShowPositionComponent implements OnInit {

  positions: Position[] = [];
  visible = false;
  displayData = [ ...this.positions ];
  searchValue = '';

  constructor(private positionService: PositionService) { }

  ngOnInit() { 
    this.showData();
  } 

  showData(){
    this.positionService.getPositions().then((data: Position[]) => {
      this.positions = data;
      this.displayData = [...this.positions];
    }).catch((error) => console.log(error));
  }

  onDelete(id: string){
    this.positionService.removePosition(id).then((data) => {
      console.log(data);
    }).catch((error) => console.log(error));
    
    this.displayData = this.displayData.filter(value => value.id !== id)
  }

  search() {
    this.displayData = this.positions.filter(training => {
      return Object.keys(training).some(keys => training[keys] != null &&
        training[keys].toString().toLowerCase()
          .includes(this.searchValue.toLowerCase()));
    });
  }
}
