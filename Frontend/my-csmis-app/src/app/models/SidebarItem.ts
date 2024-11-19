export interface SidebarItem {
  title: string;
  icon: string;  // You can use an icon library like FontAwesome, Material Icons, or SVGs
  subitems: SidebarItem[];  // Nested subitems for dropdowns or submenus
}
