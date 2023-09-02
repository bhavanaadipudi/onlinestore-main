import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$ = this.cartService.getCartItems();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
    alert('your product is removed from cart')
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }
}
