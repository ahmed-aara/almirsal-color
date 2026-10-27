import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { ServiceService } from './services/service.service';

declare const UIkit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  option: any;
  navbar_type: any;
  newTheme: boolean | null = null;

  // Routes (first path segment) that use the new landing page design
  private newThemeRoutes = ['', 'product', 'products', 'about'];

  //Data
  messageData = {
    name: null,
    phone: null,
  }

  //Variable
  error_msg: string = '';

  constructor(private router: Router, private service: ServiceService, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.option = false

    // Router fragment scrolling ignores scroll-padding; offset it by the sticky header instead
    this.viewportScroller.setOffset(() => {
      const header = document.querySelector('app-home-header, app-nav-bar') as HTMLElement | null;
      return [0, header?.offsetHeight ?? 0];
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];
        this.newTheme = this.newThemeRoutes.includes(currentUrlPath);

        var route = ['']
        for (var i = 0; i <= route.length; i++) {
          if (route[i] != currentUrlPath) {
            this.option = true
            this.navbar_type = 'two'
          } else {
            this.option = false
            this.navbar_type = 'one'
            break
          }
        }

      }
    });

    this.controlPopup();

  }

  controlPopup() {
    let offer = localStorage.getItem('offer')
    
    if (!offer) {
      UIkit.modal('#modal-close-default').show();
    }
  }

  sendMessage() {
    this.error_msg = '';

    if (this.messageData.name && this.messageData.phone) {
      let Link = `https://wa.me/+2${this.service.phoneNumber}?text=أريد%20أن%20أحصل%20على%20العرض.%0A%0Aالاسم:%20${this.messageData.name}.%0A%0Aرقم%20الهاتف:%20${this.messageData.phone}`
      window.open(Link, '_blank');
    } else {
      this.error_msg = 'يجب استكمال البيانات';
    }

  }

  closeModal() {
    localStorage.setItem('offer', 'false')
    UIkit.modal('#modal-close-default').hide();
  }
}
