import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarToggleService } from '../../services/Sidebar/sidebar-toggle.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-operator-sidebar',
  templateUrl: './operator-sidebar.component.html',
  styleUrl: './operator-sidebar.component.css'
})
export class OperatorSidebarComponent {

  isOpen: boolean = true;
  selectedItem: any = null;
  activeItem: string | null = null;

  sidebarItems = [
    { label: 'Dashboard', path: '/operator/dashboard', icon: 'fa fa-dashboard' },
    { label: 'Profile', path: '/operator/profile', icon: 'fa fa-address-card' },
    { label: 'Lunch Register', path: '/operator/lunch/reigster', icon: 'fa fa-chart-line' },
    { label: 'Avoid Meat', path: '/operator/avoide/meat', icon: 'fa fa-chart-line' },
    { label: 'Lunch Register', path: '/operator/salary/history', icon: 'fa fa-chart-line' },
    { label: 'Avoid Meat', path: '/operator/doorlog/history', icon: 'fa fa-chart-line' }
  ];

  constructor(
    private sidebarToggleService: SidebarToggleService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Update sidebar open/close state
    this.sidebarToggleService.sidebarToggleState$.subscribe((state: boolean) => {
      this.isOpen = state;
    });

    // Listen for route changes and update active item based on URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveItem(this.router.url);
    });

    // Initial setup of active item based on current route
    this.updateActiveItem(this.router.url);
  }

  updateActiveItem(route: string): void {
    this.selectedItem = this.findItemByRoute(this.sidebarItems, route);
    this.cdr.detectChanges(); // Ensure Angular applies changes immediately
  }

  findItemByRoute(items: any[], route: string): any {
    for (const item of items) {
      if (item.path === route) {
        return item;
      }
      if (item.children) {
        const childItem = this.findItemByRoute(item.children, route);
        if (childItem) {
          item.isOpen = true; // Open dropdown if a child is active
          return childItem;
        }
      }
    }
    return null;
  }

  navigateTo(item: any): void {
    this.selectedItem = item;
    this.router.navigate([item.path]);
    // this.closeAllDropdowns();
    this.cdr.detectChanges();
  }

  // toggleDropdown(item: any): void {
  //   this.sidebarItems.forEach(i => {
  //     if (i !== item) i.isOpen = false;
  //   });
  //   item.isOpen = !item.isOpen;
  // }

  // closeAllDropdowns(): void {
  //   this.sidebarItems.forEach(item => item.isOpen = false);
  // }

  onToggleSidebar() {
    console.log('Toggle button clicked');
    this.sidebarToggleService.toggleSidebar();
  }
}
