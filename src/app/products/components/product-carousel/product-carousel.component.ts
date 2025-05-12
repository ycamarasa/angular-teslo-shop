import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { environment } from 'src/environments/environment';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  swiper: Swiper | undefined = undefined;

  // baseUrl = environment.baseUrl;
  // imageUrl = (imageName: string) => `${this.baseUrl}/files/product/${imageName}`;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) return;

    if (!this.swiper) return;

    this.swiper.destroy(true, true);

    const paginationElement: HTMLDivElement =
      this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');

    // console.log('paginationElement', paginationElement);
    paginationElement.innerHTML = '';

    setTimeout(() => {
      this.swiperInit();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;

    if (!element) return;

    // console.log({ element });

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
