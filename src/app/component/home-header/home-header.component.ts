import { Component } from '@angular/core';

declare const UIkit: any

interface NavLink {
  name: string
  route?: string
  fragment?: string
  active?: boolean
}

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {

  menuId = 'home-offcanvas-menu'

  links: NavLink[] = [
    { name: 'الرئيسية', route: '/', active: true },
    { name: 'عن الشركة', route: '/about' },
    { name: 'المنتجات', fragment: 'products' },
    { name: 'مشروعات', fragment: 'projects' },
  ]

  scrollTo(event: Event, fragment: string) {
    event.preventDefault();
    UIkit.offcanvas(`#${this.menuId}`)?.hide();
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }

  closeMenu() {
    UIkit.offcanvas(`#${this.menuId}`)?.hide();
  }

}
