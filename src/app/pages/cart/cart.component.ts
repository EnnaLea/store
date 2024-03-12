import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    RouterOutlet, 
    RouterLink, 
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit, OnDestroy {

  cart: Cart = {items: []};
  displayedColumns: Array<string> = [
    'product', 
    'name', 
    'price', 
    'quantity', 
    'total', 
    'action'
  ];

  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient){}


  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

onCheckout():void{
  this.http.post('http://localhost:4242/checkout', {
    items: this.cart.items
  }).subscribe(async (res: any) => {
    let stripe = await loadStripe('pk_test_51OtZWTAiWCRGsVDBRjEuz8JMUc5ZMyNBaytjaqsMVOxvJBLC2VNRXtg9KUCIsL8lRth3gk4yMXgIfP6KxYv4rRwR00ytu8PzmQ');
    stripe?.redirectToCheckout({
      sessionId: res.id
    })
  })
}


  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
