import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare const UIkit: any

interface NavLink {
  name: string
  route?: string
  fragment?: string
  // Paths (without query/fragment) on which the link shows as active
  activeOn: (path: string) => boolean
}

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {

  menuId = 'home-offcanvas-menu'

  links: NavLink[] = [
    { name: 'الرئيسية', route: '/', activeOn: path => path === '/' },
    { name: 'عن الشركة', route: '/about', activeOn: path => path === '/about' },
    { name: 'المنتجات', route: '/products', activeOn: path => path === '/products' || path.startsWith('/product/') },
    { name: 'مشروعات', fragment: 'projects', activeOn: () => false },
  ]

  constructor(private router: Router) { }

  get currentPath(): string {
    return this.router.url.split(/[?#]/)[0];
  }

  isActive(link: NavLink): boolean {
    return link.activeOn(this.currentPath);
  }

  // Home page sections: scroll smoothly when already on the home page, otherwise navigate there
  goToSection(event: Event, fragment: string) {
    event.preventDefault();
    this.closeMenu();

    const target = document.getElementById(fragment);
    if (this.currentPath === '/' && target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment });
    }
  }

  closeMenu() {
    UIkit.offcanvas(`#${this.menuId}`)?.hide();
  }

}
