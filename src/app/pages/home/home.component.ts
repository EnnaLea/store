import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductsHeaderComponent } from '../components-home/products-header/products-header.component';
import { FiltersComponent } from '../components-home/filters/filters.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductBoxComponent } from '../components-home/product-box/product-box.component';


const ROWS_HEIGHT:{[id:number]: number} = {1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    CommonModule,
    MatSidenavModule,
    ProductsHeaderComponent,
    FiltersComponent,
    MatGridListModule,
    ProductBoxComponent
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() fullWidthMode = false
  
  category: string | undefined
  cols = 3;
  rowHeigth = ROWS_HEIGHT[this.cols];

  onColumnsCountChange(colsNum: number):void{
    this.cols = colsNum;
  }

  onShowCategory(newCategory: string):void{
    this.category = newCategory;
    this.rowHeigth = ROWS_HEIGHT[this.cols];
  }
}
