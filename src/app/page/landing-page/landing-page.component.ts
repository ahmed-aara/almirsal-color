import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServiceService } from 'src/app/services/service.service';

declare const UIkit: any;

const IMG = 'assets/img/new-landing-page/';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {

  img = IMG

  //Array
  // Product ids from assets/json/product.json, in the order shown in the design (right to left)
  featuredProductIds = ['015', '006', '007', '008']
  productArr: any = []

  featureArr = [
    { icon: IMG + 'delivery-svgrepo-com 3.svg', title: 'الجودة', description: 'نلتزم بتقديم منتجات بمستوى جودة يواكب متطلبات أعمال التشطيب المختلفة.' },
    { icon: IMG + 'delivery-svgrepo-com 2.svg', title: 'التوفير', description: 'أسعار تنافسية تمنحك قيمة أفضل مقابل ما تدفعه، وتساعدك على التحكم في تكلفة مشروعك.' },
    { icon: IMG + 'icons/truck.svg', title: 'سرعة التوصيل', description: 'نلتزم بسرعة التوريد لتصلك منتجاتك في الوقت المناسب وتستمر أعمالك بدون تعطيل.' },
  ]

  statArr = [
    { value: 500, comma: false, label: 'عميل سعيد' },
    { value: 10000, comma: true, label: 'موقع عمل' },
    { value: 1000, comma: false, label: 'شركة مقاولات' },
    { value: 28, comma: false, label: 'محافظة وصلنا إليها' },
    { value: 23, comma: false, label: 'سنة من الخبرة' },
  ]

  // Count up only when the browser can tell us the stats are visible and motion is allowed
  private countUpEnabled = 'IntersectionObserver' in window
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  statDisplay = this.statArr.map(item => this.formatStat(item, this.countUpEnabled ? 0 : item.value))

  sectorArr = [
    { icon: IMG + 'user-svgrepo-com 4.svg', title: 'المطورون العقاريون', description: 'حلول ومنتجات تساعدك على تنفيذ مشروعاتك بكفاءة وعلى نطاق واسع.' },
    { icon: IMG + 'user-svgrepo-com 3.svg', title: 'شركات المقاولات', description: 'منتجات موثوقة وتوريد يساعدك على الحفاظ على سير العمل في مواعيده.' },
    { icon: IMG + 'user-svgrepo-com 2.svg', title: 'تجار مواد البناء', description: 'مجموعة متنوعة من المنتجات وفرص شراكة وتوزيع تناسب احتياجات السوق.' },
    { icon: IMG + 'Group 4653.svg', title: 'الأفراد', description: 'منتجات وحلول تشطيب تساعدك على اختيار الأنسب لمشروعك ومنزلك.' },
  ]

  projectArr = [
    { image: IMG + 'a1f6b083-5f88-48a6-8f58-1c40c3ea0712.png', title: 'مشروع 1' },
    { image: IMG + 'f58d837e-c500-4b00-9608-f68ff787b2dc.png', title: 'مشروع 2' },
    { image: IMG + '8e06486f-681d-4204-bcf9-ddcd6e99cb96.png', title: 'مشروع 3' },
    { image: IMG + 'be066fbb-c9c4-4fd8-8e5f-a5c7b4401b1a.png', title: 'مشروع 4' },
  ]

  // TODO: replace with real customer reviews; text is the placeholder copy from the Figma design
  testimonialArr = [1, 2, 3].map(() => ({
    rating: 5,
    text: 'هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة',
    name: 'احمد محمد',
  }))

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

  // TODO: replace with real questions and answers; text is the placeholder copy from the Figma design
  faqArr = Array.from({ length: 6 }, () => ({
    question: 'ما هو "لوريم إيبسوم" ؟',
    answer: 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم',
  }))

  contactInfoArr = [
    { icon: IMG + 'icons/email.svg', title: 'البريد الإلكتروني', lines: ['info@almersalcolour.com'], href: 'mailto:info@almersalcolour.com' },
    { icon: IMG + 'icons/phone.svg', title: 'الهاتف', lines: ['01033545417', '01124722618'], href: 'tel:+201033545417' },
    { icon: IMG + 'icons/location.svg', title: 'الموقع', lines: ['اداره المبيعات: مدينه العبور محافظة القليوبيه'], href: '' },
  ]

  // Order matches the design (right to left). Icons without a known account URL are not rendered.
  socialArr = [
    { icon: IMG + 'icons/twitter.svg', name: 'X (Twitter)', url: '' },
    { icon: IMG + 'icons/tiktok.svg', name: 'TikTok', url: '' },
    { icon: IMG + 'icons/linkedin.svg', name: 'LinkedIn', url: '' },
    { icon: IMG + 'icons/snapchat.svg', name: 'Snapchat', url: '' },
    { icon: IMG + 'icons/instagram.svg', name: 'Instagram', url: '' },
    { icon: IMG + 'icons/whatsapp.svg', name: 'WhatsApp', url: `https://wa.me/+2${this.service.phoneNumber}` },
  ]

  catalogPages = Array.from({ length: 11 }, (_, i) => `assets/img/document/${i + 1}.png`)

  //variable
  openFaq = 0
  isWide = false
  projectPos = 0
  testimonialPos = 1
  mapUrl: SafeResourceUrl
  error_msg = ''

  //Data
  messageData: any = {
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    message: null,
  }

  private wideQuery = window.matchMedia('(min-width: 960px)')
  private onWideChange = () => this.zone.run(() => this.setWide(this.wideQuery.matches))
  private touchStartX: number | null = null
  private statsObserver?: IntersectionObserver
  private countUpFrame = 0

  @ViewChild('statsGrid') statsGrid?: ElementRef<HTMLElement>

  constructor(private service: ServiceService, private sanitizer: DomSanitizer, private zone: NgZone) {
    const query = encodeURIComponent('مصنع المرسال كلر للدهانات والبويات الحديثة، سبين، الغربية');
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${query}&z=16&output=embed`);
  }

  ngOnInit(): void {
    this.getProduct()
    this.setWide(this.wideQuery.matches)
    this.wideQuery.addEventListener('change', this.onWideChange)
  }

  ngAfterViewInit(): void {
    if (!this.countUpEnabled || !this.statsGrid) return;

    this.statsObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.statsObserver?.disconnect();
        this.countUp();
      }
    }, { threshold: 0.4 });
    this.statsObserver.observe(this.statsGrid.nativeElement);
  }

  ngOnDestroy(): void {
    this.wideQuery.removeEventListener('change', this.onWideChange)
    this.statsObserver?.disconnect()
    cancelAnimationFrame(this.countUpFrame)
  }

  getProduct() {
    this.service.getProduct().subscribe(
      response => {
        this.productArr = this.featuredProductIds
          .map(id => response.find((item: any) => item.id === id))
          .filter(Boolean)
      },
      err => {
        console.log(err)
      }
    )
  }

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openCatalog() {
    UIkit.lightboxPanel({
      items: this.catalogPages.map(source => ({ source, type: 'image' }))
    }).show();
  }

  /*
  * Stats count-up
  ********/
  countUp(duration = 1800) {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.statDisplay = this.statArr.map(item => this.formatStat(item, Math.round(item.value * eased)));
      if (progress < 1) this.countUpFrame = requestAnimationFrame(tick);
    };

    this.countUpFrame = requestAnimationFrame(tick);
  }

  formatStat(item: { comma: boolean }, value: number) {
    return '+' + (item.comma ? value.toLocaleString('en-US') : value);
  }

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? -1 : index;
  }

  /*
  * Carousels
  * A position is the slide index centred in the viewport. On wide screens the
  * projects carousel centres the gap between two cards, as in the design.
  ********/
  setWide(wide: boolean) {
    this.isWide = wide;
    this.projectPos = Math.floor((this.projectPositions.length - 1) / 2);
  }

  get projectPositions(): number[] {
    const count = this.isWide ? this.projectArr.length - 1 : this.projectArr.length;
    return Array.from({ length: Math.max(count, 1) }, (_, i) => i);
  }

  get projectOffset(): number {
    const center = this.isWide ? this.projectPos + 0.5 : this.projectPos;
    return center - (this.projectArr.length - 1) / 2;
  }

  get testimonialOffset(): number {
    return this.testimonialPos - (this.testimonialArr.length - 1) / 2;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent, carousel: 'project' | 'testimonial') {
    if (this.touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(delta) < 40) return;

    // RTL: swiping left reveals the next slide
    const step = delta < 0 ? 1 : -1;
    if (carousel === 'project') {
      this.projectPos = this.clamp(this.projectPos + step, this.projectPositions.length);
    } else {
      this.testimonialPos = this.clamp(this.testimonialPos + step, this.testimonialArr.length);
    }
  }

  private clamp(pos: number, count: number) {
    return Math.min(Math.max(pos, 0), count - 1);
  }

  sendMessage() {
    this.error_msg = '';
    const { firstName, lastName, phone, email, message } = this.messageData;

    if (!firstName || !lastName || !phone || !email || !message) {
      this.error_msg = 'يجب استكمال البيانات';
      return;
    }

    let text = `الاسم: ${firstName} ${lastName}\nالهاتف: +20${phone}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message}\nأريد التواصل معك`
    let Link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0&type_of_request=ContactUs`
    window.open(Link, '_blank');
  }

}
