import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {

  private sidebarState = new BehaviorSubject<boolean>(true); // Sidebar initially open

  sidebarToggleState$ = this.sidebarState.asObservable();

  toggleSidebar() {
    const newState = !this.sidebarState.value;
    this.sidebarState.next(newState);
    console.log('Toggling sidebar, new state:', newState);
  }

  private activeItemSubject = new BehaviorSubject<string | null>(null);

  // Observable for the active item
  activeItem$ = this.activeItemSubject.asObservable();

  constructor() {}

  // Method to update the active item
  setActiveItem(item: string) {
    this.activeItemSubject.next(item);
  }

  // Method to reset the active item
  resetActiveItem() {
    this.activeItemSubject.next(null);
  }
}
