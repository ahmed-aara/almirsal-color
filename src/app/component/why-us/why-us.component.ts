import { Component } from '@angular/core';
import { IMG } from 'src/app/page/landing-page/landing-assets';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent {

  img = IMG

  featureArr = [
    { icon: IMG + 'delivery-svgrepo-com 3.svg', title: 'الجودة', description: 'نلتزم بتقديم منتجات بمستوى جودة يواكب متطلبات أعمال التشطيب المختلفة.' },
    { icon: IMG + 'delivery-svgrepo-com 2.svg', title: 'التوفير', description: 'أسعار تنافسية تمنحك قيمة أفضل مقابل ما تدفعه، وتساعدك على التحكم في تكلفة مشروعك.' },
    { icon: IMG + 'icons/truck.svg', title: 'سرعة التوصيل', description: 'نلتزم بسرعة التوريد لتصلك منتجاتك في الوقت المناسب وتستمر أعمالك بدون تعطيل.' },
  ]

}
