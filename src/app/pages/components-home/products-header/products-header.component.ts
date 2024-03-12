import { Component, Output, EventEmitter } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-products-header',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})

export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort ='desc';
  itemsShowsCount = 12;

  onSortUpdated(newSort: string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdate(count: number):void{
    this.itemsShowsCount = count;
    this.itemsCountChange.emit(count); 
  }

  onColumnsUpdated(colsNum: number):void{
    this.columnsCountChange.emit(colsNum)
  }
}
