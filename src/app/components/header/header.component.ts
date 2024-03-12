import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterOutlet, 
    RouterLink, 
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  private _cart: Cart = {items: []}
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  };

  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item)=> item.quantity)
      .reduce((prev, current) => prev + current, 0);
    
  }

  constructor(private cartService: CartService){}
  
  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }

onClearCart(){
  this.cartService.clearCart();
}


}
