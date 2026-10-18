import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  //Array
  aboutArr: any = [
    {
      title: 'الجودة',
      description: 'الوصول الى معايير الدرجة الاولي'
    },
    {
      title: 'أسعار منافسة شاملة التوصيل',
      description: 'تلتزم بالتوريد خلال 48ساعه'
    },
    {
      title: 'السرعة في التنفيذ والتوريد',
      description: 'نحن نسعى إلى تحقيق الامتياز في كل عمل نؤديه'
    },
  ]

  prefProductArr: any = [
    {
      name: 'دهان الجرافيت',
      desc: 'دهان خارجي للواجهات',
      productDescription: 'عباره عن دهان خارجي للواجهات محبب للحفاظ عليها من الشمس والعوامل الجوية ويخفي عيوب المحاره والمعجون والدهان القديم ومن مميزاته أيضا أن ضد البري والاحتكاك ومقاومة عاليه جدا للماءومتعدد الاشكال منها الناعم والخشن ومتوسطة السمك وينقسم إلى نوعين',
      basicUses: '-خامه أساسها اكريليك: عبارة عن مادة ملونة معجونه جاهزه على الفرد المباشر ذات تركيبه كميائيه شديدة الصلابه واقوي ٣مرات من الدهان الاسمنتي.\n',
    },
    {
      name: 'دهان الماربل',
      desc: 'طلاء زخرفي فائق الجودة',
      productDescription: 'طلاء زخرفي فائق الجودة  ذو أساس مائي أكريليك و يحتوي على حبيبات صخرية صخرية صلبة من الرخام .',
      basicUses: '-مثالي لتجميل و حماية الأسطح الخارجية ومقاوم للظروف الجوية .\n-سهل التطبيق و الاستخدام .\n-ناعم مكون من مواد عالية الجودة.\n-يتمتع  بطرق مختلفة للتشطيب .\n-متوفر بألوان جذابة متعددة حسب كارتلة الألوان.\n-ذو مقاومة عالية للعوامل الجوية و تاثيرات ثاني أكسيد الكربون.\n',
    },
    {
      name: 'جوتاشليد',
      desc: 'دهان جوتاشيلد سوبر',
      productDescription: 'دهان جوتاشيلد سوبر يعمل كطبقة خارجية ذات أساس مائي عالية الجودة من أكرليك السيلكون. تركيبة مصممة خصيصاً لتعزز الحماية والأداء.  جودة أداء المنتج تضمن لك حاجة أقل لصيانة جدرانك الخارجية.',
      basicUses: '-حماية لمدة 20 عام.\n-تقنية أكرليك السيلكون المتقدمة.\n-ملمس حريري جميل.\n-ألوان تدوم طويلاً.\n'
    }
  ]

  productArr: any = []

  //variable

  //Data
  messageData: any = {
    name: null,
    email: null,
    phone: null,
    message: null,
  }

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.service.getProduct().subscribe(
      response => {
        this.productArr = response
      },
      err => {
        console.log(err)
      }
    )
  }

  sendMessage() {
    let message = `الاسم: ${this.messageData.name}%0aالهاتف: ${this.messageData.phone}%0aالبريد اللإلكتروني: ${this.messageData.email}%0aالرسالة: ${this.messageData.message}%أريد التواصل معك`
    let Link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
    window.open(Link, '_blank');
  }

  sendToKnowMore() {
    let message = "أريد معرفة المزيد"
    let Link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=moreDetails`
    window.open(Link, '_blank');
  }

}
