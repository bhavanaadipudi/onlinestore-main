import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(item: any): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.cartItemsSubject.next(updatedItems);
  }

  removeFromCart(index: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item, i) => i !== index);
    this.cartItemsSubject.next(updatedItems);
  }

  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  calculateTotal(): number {
    const cartItems = this.cartItemsSubject.value;
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    return total;
  }
}
