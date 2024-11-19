import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarToggleService } from '../../services/Sidebar/sidebar-toggle.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  // isOpen: boolean = true;
  // selectedItem: any = null;
  // activeItem: string | null = null;

  // sidebarItems = [
  //   { label: 'Dashboard', path: '/', icon: 'fa fa-dashboard' },
  //   {
  //     label: 'Settings',
  //     path: '/settings',
  //     children: [
  //       { label: 'Profile', path: '/settings/profile', icon: 'fa fa-user' },
  //       { label: 'Account', path: '/settings/account', icon: 'fa fa-key' }
  //     ],
  //     isOpen: false
  //   },
  //   { label: 'Reports', path: '/reports', icon: 'fa fa-chart-line' }
  // ];

  // constructor(private sidebarToggleService: SidebarToggleService,private router: Router,private cdr: ChangeDetectorRef) {}

  // ngOnInit(): void {
  //   this.sidebarToggleService.sidebarToggleState$.subscribe((state: boolean) => {
  //     this.isOpen = state;
  //     console.log('Sidebar state updated:', this.isOpen);
  //   });

  //   this.sidebarToggleService.activeItem$.subscribe(item => {
  //     this.activeItem = item;
  //   });


  // }

  // onToggleSidebar() {
  //   console.log('Toggle button clicked');
  //   this.sidebarToggleService.toggleSidebar();
  // }

  // setActiveItem(item: any): void {
  //   this.selectedItem = item;
  // }

  // navigateTo(item: any): void {
  //   this.setActiveItem(item);
  //   this.router.navigate([item.path]);
  //   this.sidebarItems.forEach(i => i.isOpen = false);
  // }

  // toggleDropdown(item: any): void {
  //   this.sidebarItems.forEach(i => {
  //     if (i !== item) i.isOpen = false;
  //   });
  //   item.isOpen = !item.isOpen;
  // }

  // closeAllDropdowns(): void {
  //   this.sidebarItems.forEach(item => item.isOpen = false);
  // }

  isOpen: boolean = true;
  selectedItem: any = null;
  activeItem: string | null = null;

  sidebarItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'fa fa-dashboard' },
    { label: 'Profile', path: '/operator/dashboard', icon: 'fa fa-address-card' }
    ,{
      label: 'Employee',
      path: 'employee',
      children: [
        { label: 'EmployeeList', path: '/employees', icon: 'fa fa-users' },
        { label: 'Upload Employee', path: '/employee/upload', icon: 'fa fa-file' },
        { label: 'Add Employee', path: '/employee/add', icon: 'fa fa-plus' },
      ],
      isOpen: false
    },{
      label: 'DoorLog Data',
      path: 'doorlog',
      children: [
        { label: 'Upload DoorLog Data', path: '/doorlog/upload', icon: 'fa fa-door-open' },
        { label: 'Add Employee', path: '/employee/add', icon: 'fa fa-plus' },
      ],
      isOpen: false
    },{
      label: 'User',
      path: '/user',
      children: [
        { label: 'UserList', path: '/users', icon: 'fa fa-users' },
        { label: 'Upload User', path: '/user/upload', icon: 'fa fa-file' },
        { label: 'Add User', path: '/user/add', icon: 'fa fa-plus' },
        // { label: 'Update Employee', path: '/Employee/edit', icon: 'fa fa-pencil' },
        // { label: 'Add Employee', path: '/Employee/upload', icon: 'fa fa-plus' }
      ],
      isOpen: false
    },
    { label: 'Reports', path: '/reports', icon: 'fa fa-chart-line' }
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
    this.selectedItem = item; // Set the selected item immediately
    this.router.navigate([item.path]);
    this.closeAllDropdowns();
    this.cdr.detectChanges(); // Force immediate update
  }

  toggleDropdown(item: any): void {
    this.sidebarItems.forEach(i => {
      if (i !== item) i.isOpen = false;
    });
    item.isOpen = !item.isOpen;
  }

  closeAllDropdowns(): void {
    this.sidebarItems.forEach(item => item.isOpen = false);
  }

  onToggleSidebar() {
    console.log('Toggle button clicked');
    this.sidebarToggleService.toggleSidebar();
  }
}
