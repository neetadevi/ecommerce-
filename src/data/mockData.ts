export interface Product {
  id: string
  title: string
  category: 'Suit Sets' | 'Kurta Sets' | 'Co-ord Sets' | 'Kurtas & Kurtis' | 'Dresses' | 'Jewellery'
  price: number
  originalPrice: number
  discount: number
  image: string
  hoverImage: string
  description: string
  fabric: string
  fit: string
  sizes: string[]
  isNew?: boolean
  isBestSeller?: boolean
  rating: number
  reviewsCount: number
}

export interface Category {
  id: string
  name: string
  image: string
  itemCount: string
  tagline: string
}

export interface CelebrityLook {
  name: string
  role: string
  image: string
  outfitTitle: string
  price: number
}

export const HERO_SLIDES = [
  {
    id: 1,
    type: 'video',
    videoUrl: 'https://cdn.shopify.com/videos/c/o/v/4c378eceefa844188e8babd74a46f40d.mp4',
    poster: 'https://www.lakshita.com/cdn/shop/files/DESKTOP_ee498332-86ea-425b-b0a7-7908cafc40cf.jpg?v=1793332457&width=1800',
    subtitle: 'SHAADI SPECIALS • SPRING 2025',
    title: 'Celebrate Grand Elegance',
    description: 'Intricately embroidered velvet, pure silk, and chanderi ensembles designed for regal celebrations.',
    ctaText: 'EXPLORE THE COLLECTION',
    link: '#collections'
  },
  {
    id: 2,
    type: 'image',
    imageUrl: 'https://www.lakshita.com/cdn/shop/files/DESKTOP_ee498332-86ea-425b-b0a7-7908cafc40cf.jpg?v=1793332457&width=1800',
    subtitle: 'VELVET EDIT',
    title: 'Royal Velvet Heirlooms',
    description: 'Impeccable craftsmanship meets plush heritage velvet for statement festive style.',
    ctaText: 'SHOP VELVET',
    link: '#collections'
  },
  {
    id: 3,
    type: 'image',
    imageUrl: 'https://www.lakshita.com/cdn/shop/files/DESKTOP_copy_f1d2e77c-9499-47ae-bcaf-1ec3f7b78c2b.jpg?v=1793333460&width=1800',
    subtitle: 'NEW IN STOCK',
    title: 'Spring Symphony 2025',
    description: 'Breathable linens, fluid cottons, and blooming hand-printed motifs.',
    ctaText: 'VIEW LOOKBOOK',
    link: '#collections'
  }
]

export const CATEGORIES: Category[] = [
  {
    id: 'suit-sets',
    name: 'Suit Sets',
    image: 'https://www.lakshita.com/cdn/shop/files/Suit_sets_ab028390-b35b-4cb7-ad7b-2c34b2af6584.jpg?v=1791555315&width=800',
    itemCount: '120+ Styles',
    tagline: 'Complete 3-Piece Elegance'
  },
  {
    id: 'kurta-sets',
    name: 'Kurta Sets',
    image: 'https://www.lakshita.com/cdn/shop/files/kurta_sets_26d84f5b-c3d3-4e39-8090-a913a7a1def4.jpg?v=1791555315&width=800',
    itemCount: '95+ Styles',
    tagline: 'Contemporary & Classic'
  },
  {
    id: 'coord-sets',
    name: 'Co-ord Sets',
    image: 'https://www.lakshita.com/cdn/shop/files/Co-ord_sets_f51d14df-5d99-47cc-b719-b81986e33bef.jpg?v=1791555315&width=800',
    itemCount: '60+ Styles',
    tagline: 'Modern Chic Comfort'
  },
  {
    id: 'kurtas',
    name: 'Kurtas & Kurtis',
    image: 'https://www.lakshita.com/cdn/shop/files/kurtas_kurtis_08aa992c-72cc-416c-b194-1e0ea418640b.jpg?v=1791555315&width=800',
    itemCount: '180+ Styles',
    tagline: 'Daily Everyday Glam'
  },
  {
    id: 'dresses',
    name: 'Dresses & Tunics',
    image: 'https://www.lakshita.com/cdn/shop/files/1_d208b808-4580-4b85-8d98-aeba703d6c86.jpg?v=1791555315&width=800',
    itemCount: '45+ Styles',
    tagline: 'Indo-Western Fusion'
  },
  {
    id: 'bottoms',
    name: 'Bottoms & Pants',
    image: 'https://www.lakshita.com/cdn/shop/files/3_b1b00766-e76f-486b-aef9-9be024337018.jpg?v=1791555315&width=800',
    itemCount: '50+ Styles',
    tagline: 'Palazzos, Pants & Salwars'
  }
]

export const CELEBRITY_LOOKS: CelebrityLook[] = [
  {
    name: 'Neeru Bajwa',
    role: 'Actor & Producer',
    image: 'https://www.lakshita.com/cdn/shop/files/Neeru_Bajwa_jpg.jpg',
    outfitTitle: 'Varnika Royal Purple Velvet Set',
    price: 6995
  },
  {
    name: 'Gauahar Khan',
    role: 'Bollywood Celebrity',
    image: 'https://www.lakshita.com/cdn/shop/files/Gauahar_Khan.jpg_2.jpg',
    outfitTitle: 'Shreya Red Embroidered Velvet Set',
    price: 8495
  },
  {
    name: 'Rasha Thadani',
    role: 'Youth Icon & Artist',
    image: 'https://www.lakshita.com/cdn/shop/files/Rasha_Thadani.jpg',
    outfitTitle: 'Pihu Mulberry Purple Suit Set',
    price: 7495
  },
  {
    name: 'Parul Gulati',
    role: 'Entrepreneur & Actor',
    image: 'https://www.lakshita.com/cdn/shop/files/Parul_Gulati.jpg',
    outfitTitle: 'Vritika Shamrock Green Suit Set',
    price: 6395
  }
]

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Varnika Royal Purple Embroidered Velvet Kurta Set',
    category: 'Kurta Sets',
    price: 6995,
    originalPrice: 8995,
    discount: 22,
    image: 'https://www.lakshita.com/cdn/shop/files/1_880480f9-27cb-4c42-bc34-49aa348ca7ae.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/202681.jpg',
    description: 'Curated with rich royal micro-velvet, embellished with intricate zari embroidery, sequins, and scalloped hemline. Paired with coordinating velvet straight trousers and organza dupatta.',
    fabric: 'Micro Velvet & Organza',
    fit: 'Regular Tailored Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'prod-2',
    title: 'Shreya Red Embroidered Velvet Suit Set',
    category: 'Suit Sets',
    price: 8495,
    originalPrice: 10495,
    discount: 19,
    image: 'https://www.lakshita.com/cdn/shop/files/202681.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_cc2464d0-3cf1-43c7-ba19-6664085d4982.jpg',
    description: 'A crimson royal bridal masterpiece featuring floral tilla threadwork, sweetheart neck detail, velvet churidar pants, and a heavily embroidered contrasting dupatta.',
    fabric: 'Pure Silk Velvet',
    fit: 'Anarkali Flared Fit',
    sizes: ['M', 'L', 'XL', 'XXL'],
    isBestSeller: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 98
  },
  {
    id: 'prod-3',
    title: 'Shreya Teal Blue Embroidered Velvet Suit Set',
    category: 'Suit Sets',
    price: 7495,
    originalPrice: 9495,
    discount: 21,
    image: 'https://www.lakshita.com/cdn/shop/files/203184.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/203235.jpg',
    description: 'Imbued with ocean teal hue, this outfit brings traditional Kashmiri floral motifs to life on premium velvet with silver zari accents and woven borders.',
    fabric: 'Opulent Silk Velvet',
    fit: 'Straight Cut',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 65
  },
  {
    id: 'prod-4',
    title: 'Pihu Mulberry Purple Embroidered Velvet Suit Set',
    category: 'Suit Sets',
    price: 7995,
    originalPrice: 9995,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/203235.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_880480f9-27cb-4c42-bc34-49aa348ca7ae.jpg',
    description: 'A breathtaking mulberry purple silhouette tailored for festive evenings and wedding cocktail nights with handcrafted sequins on neckline and sleeves.',
    fabric: 'Velvet with Silk Dupatta',
    fit: 'Relaxed Luxe Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 110
  },
  {
    id: 'prod-5',
    title: 'Riddhi Espresso Brown Embroidered Velvet Suit Set',
    category: 'Suit Sets',
    price: 6395,
    originalPrice: 7995,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/1_f90d9e1e-e3e8-4ced-b740-08660c07581a.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_e083d23a-6d07-45d8-b9ca-d6705906fb36.jpg',
    description: 'Warm, earthy espresso brown velvet accented with antique gold embroidery. Designed for refined subtlety and all-day comfort during winter festivities.',
    fabric: 'Fine Micro Velvet',
    fit: 'Straight Silhouette',
    sizes: ['M', 'L', 'XL', 'XXL'],
    isBestSeller: false,
    isNew: true,
    rating: 4.7,
    reviewsCount: 48
  },
  {
    id: 'prod-6',
    title: 'Riddhi Regal Violet Embroidered Velvet Suit Set',
    category: 'Suit Sets',
    price: 6595,
    originalPrice: 8495,
    discount: 22,
    image: 'https://www.lakshita.com/cdn/shop/files/1_e083d23a-6d07-45d8-b9ca-d6705906fb36.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_f90d9e1e-e3e8-4ced-b740-08660c07581a.jpg',
    description: 'Enchanting regal violet tone enriched with fine golden threadwork across neckline, borders, and dupatta. Finished with dainty tassels.',
    fabric: 'Silk Velvet Blend',
    fit: 'Comfort Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 76
  },
  {
    id: 'prod-7',
    title: 'Vritika Shamrock Green Embroidered Suit Set',
    category: 'Kurta Sets',
    price: 6195,
    originalPrice: 7995,
    discount: 22,
    image: 'https://www.lakshita.com/cdn/shop/files/1_7a0c7e1b-3a09-40a7-a168-3607a314cf47.png',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_865692c5-ca6e-4cd9-93e3-b4cef2d0ef9b.png',
    description: 'Vibrant emerald green kurta with traditional floral boota work and sheer organza sleeve cuffs. Accompanied by silk trousers and a printed stole.',
    fabric: 'Chanderi Silk & Organza',
    fit: 'Flared A-Line',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 189
  },
  {
    id: 'prod-8',
    title: 'Pranika Black Pearl Embroidered Anarkali Suit Set',
    category: 'Suit Sets',
    price: 8995,
    originalPrice: 11995,
    discount: 25,
    image: 'https://www.lakshita.com/cdn/shop/files/201980.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/202681.jpg',
    description: 'Majestic midnight black Anarkali adorned with subtle pearl beading and resham embroidery. Features 24 kalis that drape into a dramatic, regal flare.',
    fabric: 'Georgette & Shantoon Silk',
    fit: 'Grand Anarkali',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 215
  },
  {
    id: 'prod-9',
    title: 'Devika Dark Red Embroidered Suit Set',
    category: 'Suit Sets',
    price: 6995,
    originalPrice: 8795,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/1_cc2464d0-3cf1-43c7-ba19-6664085d4982.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/202681.jpg',
    description: 'Sensational crimson red kurta set crafted for Haldi, Mehendi, and Karwa Chauth. Subtle hand-sequin embellishments that reflect festive candlelight.',
    fabric: 'Pure Viscose Silk',
    fit: 'Regular Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: false,
    isNew: true,
    rating: 4.7,
    reviewsCount: 52
  },
  {
    id: 'prod-10',
    title: 'Misha Wine Maroon Embroidered Anarkali Kurta Set',
    category: 'Kurta Sets',
    price: 7495,
    originalPrice: 9495,
    discount: 21,
    image: 'https://www.lakshita.com/cdn/shop/files/2_40f26b21-4df8-4776-88e8-d0e311203ca1.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_880480f9-27cb-4c42-bc34-49aa348ca7ae.jpg',
    description: 'Deep wine tones paired with intricate gota-patti and threadwork. Includes a flared Anarkali kurta, matching cigarette pants, and a dual-shade organza dupatta.',
    fabric: 'Silk Chanderi',
    fit: 'Flared Kalidar',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 134
  },
  {
    id: 'prod-11',
    title: 'Vritika Persian Pink Embroidered Suit Set',
    category: 'Suit Sets',
    price: 6495,
    originalPrice: 8195,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/1_865692c5-ca6e-4cd9-93e3-b4cef2d0ef9b.png',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_7a0c7e1b-3a09-40a7-a168-3607a314cf47.png',
    description: 'Delicate Persian pink embroidered ensemble evoking spring romance. Adorned with pastel floral stitches and scalloped organza dupatta.',
    fabric: 'Chanderi Silk Blend',
    fit: 'Regular Fit',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestSeller: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: 'prod-12',
    title: 'Ishita Pastel Pink Embroidered Suit Set',
    category: 'Suit Sets',
    price: 5995,
    originalPrice: 7495,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/3_a5e80c16-439f-4fe7-96f5-4adbcf36e7b3.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_865692c5-ca6e-4cd9-93e3-b4cef2d0ef9b.png',
    description: 'Effortlessly feminine and soothing pastel pink suit set featuring floral vine embroidery on yoke and hemline. Perfectly suited for daytime celebrations.',
    fabric: 'Pure Cotton Silk',
    fit: 'Straight Cut',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isBestSeller: false,
    isNew: false,
    rating: 4.6,
    reviewsCount: 42
  },
  {
    id: 'prod-13',
    title: 'Emerald Green Vanya Multilayer Bead Necklace',
    category: 'Jewellery',
    price: 1995,
    originalPrice: 2495,
    discount: 20,
    image: 'https://www.lakshita.com/cdn/shop/files/1_d5397157-0fb7-4e35-841c-48faccf4b572.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_941dddb6-4b48-49b9-aa0e-c8e4947495e4.jpg',
    description: 'Handcrafted multilayer faux emerald glass beads connected with gold-plated filigree accents. Elevates any ethnic neckline with royal charm.',
    fabric: 'Brass & High-Grade Glass Beads',
    fit: 'Adjustable Dori',
    sizes: ['One Size'],
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 67
  },
  {
    id: 'prod-14',
    title: 'Meher Amethyst Druzy Crystal Necklace',
    category: 'Jewellery',
    price: 2195,
    originalPrice: 2795,
    discount: 21,
    image: 'https://www.lakshita.com/cdn/shop/files/1_941dddb6-4b48-49b9-aa0e-c8e4947495e4.jpg',
    hoverImage: 'https://www.lakshita.com/cdn/shop/files/1_d5397157-0fb7-4e35-841c-48faccf4b572.jpg',
    description: 'Natural amethyst tone druzy stone encased in 18k gold micropolish. Contemporary artisanal touch for classic sarees and modern suits.',
    fabric: 'Gold Plated Alloy & Natural Druzy',
    fit: 'Adjustable Clasp',
    sizes: ['One Size'],
    isBestSeller: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 39
  }
]

export const BRAND_PROMISES = [
  {
    title: '25+ Years of Trust',
    desc: 'Generations of women trust our signature fit and quality.',
    icon: 'ShieldCheck'
  },
  {
    title: 'In-House Craftsmanship',
    desc: 'Designed by master artisans with precision zari & resham work.',
    icon: 'Sparkles'
  },
  {
    title: 'Signature Embroidery',
    desc: 'Intricate Kashmiri, Gota Patti, and Zardozi needlework.',
    icon: 'Scissors'
  },
  {
    title: 'Inclusive Sizing (XS - 4XL)',
    desc: 'Tailored for every silhouette with flattering cuts.',
    icon: 'UserCheck'
  },
  {
    title: 'Free Lifetime Alterations',
    desc: 'Complimentary fit adjustments across all brand stores.',
    icon: 'RefreshCw'
  },
  {
    title: 'Express Same-Day Dispatch',
    desc: 'Fast express shipping with insured transit across India.',
    icon: 'Truck'
  }
]
