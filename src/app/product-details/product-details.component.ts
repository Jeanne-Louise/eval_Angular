import { Component,OnInit} from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import {ActivatedRoute, Params} from '@angular/router';
import { Customer } from '../model/customer';
import { NgClass } from '@angular/common';
import { CustomerService } from '../services/customer.service';





@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})

export class ProductDetailsComponent implements OnInit{
  
  products : Product[] = [];
  product: Product;
  
  constructor(
    
    private productService: ProductService,
    private customerService: CustomerService,
   
    private route: ActivatedRoute) {}

    
    
    ngOnInit()
    {
      
      this.route.params.subscribe((params: Params): void => {
        const id: string = params.id;
        this.productService.getProduct(id).subscribe(result => this.product = result);
      });
      this.productService.getProducts().subscribe(data => this.products = data)
      console.log(this.products);
      

    }

    isTheLast(product: Product): boolean {
      return this.productService.isTheLast(product);
      // if (product.stock === 1) {
       
    }

    isAvailable(product: Product): boolean {
      return this.productService.isAvailable(product);
    }
      
    addToBasket(event:Product):void {
      this.customerService.addProduct(event);
      this.productService.decreaseStock(event);
}

}