import { Component } from '@angular/core';
import { IMG } from 'src/app/page/landing-page/landing-assets';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {

  partnerArr = [
    { image: IMG + 'Group 529.png', name: 'Egyptian Engineering Company' },
    { image: IMG + 'cf8b3f96-ddd7-4301-995d-2d5da08b9577.png', name: 'Haibacon for construction' },
    { image: IMG + '404a96d2-a13c-480c-966e-c903131afa3c.png', name: 'المتحدة' },
    { image: IMG + '24dfa04d-16fd-4fff-ab2e-f9d166e614a9.png', name: 'البروج للإنشاء والتعمير' },
    { image: IMG + '4e38141f-3c5c-4ea3-ac00-2b165d32941f.png', name: 'دجلة تاورز' },
    { image: IMG + '1.png', name: 'NBIG Developments' },
    { image: IMG + 'برو-تاتش-لوجو-كبير.png', name: 'Pro Touch' },
    { image: IMG + 'logo9 1.png', name: 'Cairo Capital' },
    { image: IMG + '6f79adb8-cf51-4e99-9791-cb2edc07c7d5.png', name: 'El-Sehami Construction' },
  ]

}
