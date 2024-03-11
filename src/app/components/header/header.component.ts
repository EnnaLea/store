import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';

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

}
