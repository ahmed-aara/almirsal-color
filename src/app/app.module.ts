import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { AboutComponent } from './page/about/about.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { IncludePipe } from './pipe/include.pipe';
import { HomeHeaderComponent } from './component/home-header/home-header.component';
import { SectionHeadingComponent } from './component/section-heading/section-heading.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { SiteFooterComponent } from './component/site-footer/site-footer.component';
import { StatsComponent } from './component/stats/stats.component';
import { CoverageCalculatorComponent } from './component/coverage-calculator/coverage-calculator.component';
import { ProductsComponent } from './page/products/products.component';
import { WaCtaComponent } from './component/wa-cta/wa-cta.component';
import { WhyUsComponent } from './component/why-us/why-us.component';
import { FeaturedProductsComponent } from './component/featured-products/featured-products.component';
import { StatsSectionComponent } from './component/stats-section/stats-section.component';
import { ProjectsCarouselComponent } from './component/projects-carousel/projects-carousel.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { PartnersComponent } from './component/partners/partners.component';
import { ContactSectionComponent } from './component/contact-section/contact-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutComponent,
    ProductDetailComponent,
    FooterComponent,
    NavBarComponent,
    IncludePipe,
    HomeHeaderComponent,
    SectionHeadingComponent,
    ProductCardComponent,
    SiteFooterComponent,
    StatsComponent,
    CoverageCalculatorComponent,
    ProductsComponent,
    WaCtaComponent,
    WhyUsComponent,
    FeaturedProductsComponent,
    StatsSectionComponent,
    ProjectsCarouselComponent,
    TestimonialsComponent,
    PartnersComponent,
    ContactSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule, FormsModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
