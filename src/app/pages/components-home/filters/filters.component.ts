import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { StoreService } from '../../../services/store.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})

export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categorySubsciption: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeService: StoreService){}

  ngOnInit(): void {
    this.categorySubsciption = this.storeService.getAllCategories()
    .subscribe((response) => {
      this.categories = response;
    })
  }

 

  onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if(this.categorySubsciption){
      this.categorySubsciption.unsubscribe();
    }
  }

}
