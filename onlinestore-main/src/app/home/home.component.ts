import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Array to store products
  cartItems: any[] = []; // Array to store cart items

  constructor(private productService: ProductService, private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    // Subscribe to cartItems$ observable to get updated cart items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('The product is added to cart')
  }
  logout() {
    // Display a confirmation prompt
    const confirmLogout = window.confirm('Are you sure you want to logout from MyShop application?');
  
    // If user confirms, navigate to login page
    if (confirmLogout) {
      this.router.navigate(['/login']);
    }
  }
}