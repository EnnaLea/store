import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductsHeaderComponent } from '../components-home/products-header/products-header.component';
import { FiltersComponent } from '../components-home/filters/filters.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductBoxComponent } from '../components-home/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';


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


export class HomeComponent  implements OnInit, OnDestroy {

  @Input() fullWidthMode = false
  
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products => this.products = _products));
  }

  onColumnsCountChange(colsNum: number):void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string):void{
    this.category = newCategory;
    this.getProducts();
    
  }

  onAddToCart(product: Product):void {
    this.cartService.addToCart({
      product: product.image, 
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
    }

    onItemsCountChange(newCount: number): void {
      this.count = newCount.toString();
      this.getProducts();
    }

    onSortChange(newSort: string): void{
      this.sort = newSort;
      this.getProducts();
    }

    ngOnDestroy(): void {
      if(this.productsSubscription){
        this.productsSubscription.unsubscribe();
      }
    }
}
