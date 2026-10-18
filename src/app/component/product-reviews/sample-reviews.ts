import { Review } from './product-reviews.component';

// PREVIEW ONLY: made-up reviews used during local development (isDevMode) so the
// ratings design can be seen with content. They are never shown in production
// builds; real reviews belong in the product's "reviews" array in product.json.

const NAMES = [
  'محمد عبد الله', 'أحمد سامي', 'محمود حسن', 'كريم عادل', 'مصطفى علي', 'عمرو خالد',
  'هاني فؤاد', 'إسلام رضا', 'سارة محمود', 'منى إبراهيم', 'ياسر جمال', 'طارق سعيد',
]

const COMMENTS: Record<number, string[]> = {
  5: [
    'جودة ممتازة والنتيجة على الحائط كانت أفضل من المتوقع.',
    'استخدمته في أكثر من مشروع وثابت في الجودة كل مرة.',
    'سهل في الاستخدام والصنايعي كان مبسوط منه جداً.',
    'التوصيل كان سريع والمنتج وصل في ميعاده بالظبط.',
    'سعر مناسب جداً مقارنة بالجودة، أنصح بيه.',
  ],
  4: [
    'منتج كويس جداً، بس كنت أتمنى يكون فيه ألوان أكتر.',
    'جودة عالية والتعامل محترم، التوصيل اتأخر يوم بس.',
    'النتيجة حلوة ومقاوم للشمس والمطر لحد دلوقتي.',
    'كويس جداً للسعر ده، هكرر الطلب إن شاء الله.',
  ],
  3: [
    'المنتج كويس بس محتاج صنايعي فاهم عشان يطلع بشكل حلو.',
    'جيد، لكن الكمية اللي احتجتها كانت أكتر من المتوقع شوية.',
  ],
}

// Deterministic pseudo-random numbers so each product always gets the same samples
function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

export function sampleReviewsFor(productId: string): Review[] {
  const random = seeded(Number(productId) * 7919 || 1)
  const count = 3 + Math.floor(random() * 4)
  const names = [...NAMES].sort(() => random() - .5)
  const used = new Set<string>()

  return Array.from({ length: count }, (_, i) => {
    const roll = random()
    let rating = roll < .6 ? 5 : roll < .9 ? 4 : 3
    // Fall back to another rating when every comment for this one is taken
    if (COMMENTS[rating].every(comment => used.has(comment))) rating = rating === 5 ? 4 : 5
    const comments = COMMENTS[rating].filter(comment => !used.has(comment))
    const comment = comments[Math.floor(random() * comments.length)]
    used.add(comment)
    const month = 1 + Math.floor(random() * 9)
    return {
      name: names[i],
      rating,
      comment,
      date: `2026/${String(month).padStart(2, '0')}/${String(1 + Math.floor(random() * 28)).padStart(2, '0')}`,
    }
  })
}
