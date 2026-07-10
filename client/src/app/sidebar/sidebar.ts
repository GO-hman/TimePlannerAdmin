import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NavItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
