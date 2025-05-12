import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  // productIdSlug = computed(
  //   () => this.activatedRoute.snapshot.paramMap.get('idSlug') ?? ''
  // );

  productIdSlug = this.activatedRoute.snapshot.paramMap.get('idSlug') ?? '';

  productResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(request.idSlug);
    },
  });
}
