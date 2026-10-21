import { Component } from '@angular/core';
import { IMG } from './landing-assets';

declare const UIkit: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  img = IMG

  //Array
  sectorArr = [
    { icon: IMG + 'user-svgrepo-com 4.svg', title: 'المطورون العقاريون', description: 'حلول ومنتجات تساعدك على تنفيذ مشروعاتك بكفاءة وعلى نطاق واسع.' },
    { icon: IMG + 'user-svgrepo-com 3.svg', title: 'شركات المقاولات', description: 'منتجات موثوقة وتوريد يساعدك على الحفاظ على سير العمل في مواعيده.' },
    { icon: IMG + 'user-svgrepo-com 2.svg', title: 'تجار مواد البناء', description: 'مجموعة متنوعة من المنتجات وفرص شراكة وتوزيع تناسب احتياجات السوق.' },
    { icon: IMG + 'Group 4653.svg', title: 'الأفراد', description: 'منتجات وحلول تشطيب تساعدك على اختيار الأنسب لمشروعك ومنزلك.' },
  ]

  // "points" are shown as a list under the answer. "index" is unique across groups (used to open/close).
  faqGroupArr = [
    {
      title: 'جرافيتو الأكريليك ومواصفاته',
      items: [
        {
          question: 'ما هي أسعار جرافيتو الأكريليك؟',
          answer: 'تختلف حسب الفئة:',
          points: ['الطن الاقتصادي: 5500 جنيه.', 'السوبر: 6500 جنيه.', 'الأكسترا سوبر: 7500 جنيه.'],
        },
        {
          question: 'ما الفرق بين درجات الجرافيتو المختلفة؟',
          answer: 'يكمن الفرق في نسبة الأكريليك والمواد الصلبة، مما يؤثر على الصلابة، ثبات اللون، وقدرة المادة على تحمل العوامل الجوية.',
        },
        {
          question: 'كم مساحة يغطيها طن الجرافيتو؟',
          answer: 'الطن الواحد (50 شكارة وزن 20 كجم) يغطي مساحة تقارب 300 متر مربع.',
        },
      ],
    },
    {
      title: 'منتج "المرسال ميكس" (المحارة الجاهزة / السافيتو)',
      items: [
        {
          question: 'ما هي مواصفات "المرسال ميكس" (المحارة الجاهزة/السافيتو)؟',
          answer: 'هي مونة أسمنتية مضاف إليها أكاسيد تلوين وكوارتز ناعم، تتميز بمقاومة عالية للرطوبة والأمطار والاحتكاك، وتتوفر بملمس ناعم أو خشن (1، 2، 3 ملم).',
        },
        {
          question: 'كم يغطي طن مادة "المرسال ميكس"؟',
          answer: '',
          points: ['الملمس الخشن: يغطي من 300 إلى 350 متر مربع لكل طن.', 'الملمس الناعم: يغطي من 350 إلى 400 متر مربع لكل طن.'],
        },
      ],
    },
    {
      title: 'الخدمات والتوصيل',
      items: [
        {
          question: 'هل تتوفر خدمة التوصيل لجميع المحافظات؟',
          answer: 'نعم، التوريد متاح لجميع أنحاء الجمهورية، ويتم التوصيل عادةً خلال 48 ساعة عمل.',
        },
        {
          question: 'هل تقومون بأعمال التنفيذ والمصنعية؟',
          answer: 'نحن مصنع لتوريد الخامات فقط ولا نقدم خدمات التنفيذ.',
        },
      ],
    },
  ].reduce((groups: any[], group) => {
    const start = groups.reduce((count, g) => count + g.items.length, 0)
    return [...groups, { ...group, items: group.items.map((item: any, i) => ({ ...item, index: start + i })) }]
  }, [])

  catalogPages = Array.from({ length: 11 }, (_, i) => `assets/img/document/${i + 1}.png`)

  //variable
  openFaq = 0

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openCatalog() {
    UIkit.lightboxPanel({
      items: this.catalogPages.map(source => ({ source, type: 'image' }))
    }).show();
  }

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? -1 : index;
  }

}
