"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Heart, ShieldCheck, Droplet, Star, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCatalogProductById } from "@/lib/utils";

const productsData = {
  "herbal-face-cream": {
    id: "herbal-face-cream",
    name: "Herbal Face Cream",
    category: "Skincare",
    price: 29.99,
    rating: 4.8,
    reviews: 124,
    description: "Our luxurious Herbal Face Cream combines the finest botanical ingredients to nourish, hydrate, and rejuvenate your skin. Infused with natural herbs and plant extracts, this lightweight formula absorbs quickly to deliver deep moisture and protection.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4d178a5b-a1ab-42ce-932c-5c72dd6a6434/generated_images/natural-organic-skincare-cream-jar-with--46835619-20251006072918.jpg",
    ingredients: ["Aloe Vera", "Chamomile Extract", "Jojoba Oil", "Shea Butter", "Vitamin E", "Lavender Oil"],
    benefits: [
      "Deep hydration for 24 hours",
      "Reduces fine lines and wrinkles",
      "Improves skin elasticity",
      "Soothes and calms irritation",
      "Non-greasy formula",
      "Suitable for all skin types"
    ],
    features: [
      
      { icon: <Heart className="w-5 h-5" />, text: "Cruelty-Free" },
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Dermatologist Tested" },
      { icon: <Droplet className="w-5 h-5" />, text: "Chemical-Free" }
    ],
    volume: "50ml"
  },
  "organic-hair-oil": {
    id: "organic-hair-oil",
    name: "Organic Hair Oil",
    category: "Haircare",
    price: 24.99,
    rating: 4.9,
    reviews: 98,
    description: "Transform your hair with our Organic Hair Oil, a powerful blend of cold-pressed oils and botanical extracts. This nourishing treatment strengthens hair from root to tip, promotes healthy growth, and adds natural shine.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4d178a5b-a1ab-42ce-932c-5c72dd6a6434/generated_images/organic-hair-oil-bottle-with-natural-ing-91ce27fd-20251006072926.jpg",
    ingredients: ["Coconut Oil", "Argan Oil", "Rosemary Extract", "Castor Oil", "Vitamin B Complex", "Tea Tree Oil"],
    benefits: [
      "Strengthens hair follicles",
      "Reduces hair fall and breakage",
      "Promotes natural hair growth",
      "Adds shine and luster",
      "Repairs damaged hair",
      "Controls dandruff naturally"
    ],
    features: [
      { icon: <Leaf className="w-5 h-5" />, text: "Cold-Pressed Oils" },
      { icon: <Heart className="w-5 h-5" />, text: "Vegan Formula" },
      { icon: <ShieldCheck className="w-5 h-5" />, text: "No Mineral Oil" },
      { icon: <Droplet className="w-5 h-5" />, text: "Paraben-Free" }
    ],
    volume: "100ml"
  },
  "essential-oil-set": {
    id: "essential-oil-set",
    name: "Essential Oil Set",
    category: "Natural Oils",
    price: 39.99,
    rating: 5.0,
    reviews: 156,
    description: "Discover the therapeutic power of nature with our Premium Essential Oil Set. This carefully curated collection features five pure, therapeutic-grade essential oils perfect for aromatherapy, massage, and natural wellness.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4d178a5b-a1ab-42ce-932c-5c72dd6a6434/generated_images/natural-essential-oil-bottles-with-fresh-9fce7945-20251006072937.jpg",
    ingredients: ["Lavender Oil", "Peppermint Oil", "Eucalyptus Oil", "Tea Tree Oil", "Lemon Oil"],
    benefits: [
      "Promotes relaxation and calm",
      "Boosts energy and focus",
      "Supports respiratory health",
      "Natural antibacterial properties",
      "Enhances mood and wellness",
      "Purifies air naturally"
    ],
    features: [
      { icon: <Leaf className="w-5 h-5" />, text: "100% Pure Oils" },
      { icon: <Heart className="w-5 h-5" />, text: "Therapeutic Grade" },
      { icon: <ShieldCheck className="w-5 h-5" />, text: "GC/MS Tested" },
      { icon: <Droplet className="w-5 h-5" />, text: "Undiluted" }
    ],
    volume: "5 x 10ml"
  },
  "natural-body-lotion": {
    id: "natural-body-lotion",
    name: "Natural Body Lotion",
    category: "Skincare",
    price: 19.99,
    rating: 4.7,
    reviews: 89,
    description: "Indulge your skin with our Natural Body Lotion, a silky-smooth formula enriched with plant-based ingredients. This fast-absorbing lotion provides long-lasting hydration while leaving your skin soft, supple, and naturally fragrant.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ingredients: ["Cocoa Butter", "Sweet Almond Oil", "Calendula Extract", "Coconut Oil", "Vitamin C", "Chamomile"],
    benefits: [
      "Intense moisture for dry skin",
      "Improves skin texture",
      "Reduces stretch marks",
      "Anti-aging properties",
      "Fast absorption",
      "Pleasant natural scent"
    ],
    features: [
      { icon: <Leaf className="w-5 h-5" />, text: "Plant-Based" },
      { icon: <Heart className="w-5 h-5" />, text: "No Animal Testing" },
      { icon: <ShieldCheck className="w-5 h-5" />, text: "Hypoallergenic" },
      { icon: <Droplet className="w-5 h-5" />, text: "Fragrance-Free" }
    ],
    volume: "200ml"
  }
};

// Function to get appropriate "How to Use" content based on product category
const getHowToUseContent = (category: string, productName: string): string => {
  const categoryLower = category.toLowerCase();
  const nameLower = productName.toLowerCase();

  if (categoryLower.includes('natural tableware') || nameLower.includes('areca leaf')) {
    return "Perfect for serving appetizers, main courses, and desserts. These plates are microwave-safe for heating food and can be used for both hot and cold dishes. After use, simply dispose in compost or food waste bin - they will naturally decompose within 60-90 days. Store in a cool, dry place to maintain freshness.";
  }
  
  if (categoryLower.includes('sugarcane') || nameLower.includes('bagasse')) {
    return "Ideal for serving meals, snacks, and appetizers. These plates are microwave-safe, freezer-safe, and can handle both hot and cold foods. Perfect for takeaway, catering, and events. After use, dispose in compost or food waste bin - they will biodegrade naturally. Store in a cool, dry place away from direct sunlight.";
  }
  
  if (categoryLower.includes('paper drinkware') || nameLower.includes('paper cups')) {
    return "Perfect for hot and cold beverages. These cups can handle temperatures up to 95°C for hot drinks and are suitable for cold beverages and smoothies. Simply fill with your preferred drink and enjoy. After use, dispose in recycling bin or compost if the cup is certified compostable. Store in a cool, dry place.";
  }
  
  if (categoryLower.includes('straw') || nameLower.includes('straws')) {
    return "Insert into your beverage and enjoy your drink. These straws are perfect for cold drinks, smoothies, cocktails, and milkshakes. They maintain their integrity for the duration of your drink. After use, dispose in compost or food waste bin - they will biodegrade naturally. Store in a cool, dry place.";
  }
  
  if (categoryLower.includes('paper packaging') || nameLower.includes('paper bags')) {
    return "Perfect for carrying retail items, groceries, gifts, and food items. These bags can hold various weights depending on size. Use handles for easy carrying. After use, reuse the bag for storage or dispose in recycling bin. Store in a cool, dry place to maintain durability.";
  }
  
  if (categoryLower.includes('food packaging') || nameLower.includes('meal boxes') || nameLower.includes('aluminium')) {
    return "Ideal for takeaway meals, food storage, and catering. These containers are leak-resistant and can handle both hot and cold foods. Aluminium containers are oven-safe and perfect for reheating. After use, dispose in appropriate recycling bin. Store in a cool, dry place.";
  }
  
  if (categoryLower.includes('cutlery') || nameLower.includes('wooden')) {
    return "Perfect for events, parties, takeaway, and outdoor dining. Use just like regular cutlery - these spoons, forks, and knives are sturdy enough for most foods. Ideal for salads, desserts, finger foods, and light meals. After use, dispose in compost or food waste bin - they will biodegrade naturally. Store in a cool, dry place.";
  }
  
  if (categoryLower.includes('clamshell')) {
    return "Perfect for takeaway meals, salads, sandwiches, and food storage. These containers provide excellent protection for food during transport. Ideal for restaurants, cafes, and food service businesses. After use, dispose in appropriate recycling bin. Store in a cool, dry place to maintain quality.";
  }
  
  // Default fallback
  return "Use according to your specific needs and requirements. This eco-friendly product is designed for sustainable use and can be disposed of in an environmentally responsible manner. Store in a cool, dry place away from direct sunlight to maintain quality and durability.";
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const legacy = productsData[productId as keyof typeof productsData];
  const catalog = getCatalogProductById(productId);
  const product = legacy || (catalog
    ? {
        id: catalog.id,
        name: catalog.name,
        category: catalog.categoryName,
        price: undefined as unknown as number | undefined,
        rating: 5.0,
        reviews: 0,
        description: catalog.description,
        image: catalog.image,
        ingredients: ["Sustainably sourced materials"],
        benefits: ["Eco-friendly", "Compostable or recyclable", "Food-safe where applicable"],
        features: [
          { icon: <Leaf className="w-5 h-5" />, text: "Sustainable" },
          { icon: <ShieldCheck className="w-5 h-5" />, text: "Quality Assured" },
          { icon: <Droplet className="w-5 h-5" />, text: "Safe for Use" },
        ],
        volume: undefined as unknown as string | undefined,
      }
    : undefined);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-nature-green mb-4">Product Not Found</h1>
          <Link href="/">
            <Button className="bg-nature-green hover:bg-leaf-green text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }


  const baseUrl = "https://sprnaturals.in";
  const productImageUrl = product.image.startsWith("http") ? product.image : `${baseUrl}${product.image}`;
  const categoryName = product.category || catalog?.categoryName || "";
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImageUrl,
    brand: {
      "@type": "Brand",
      name: "SPR Naturals",
    },
    category: categoryName,
    material: categoryName.includes("Areca") ? "Areca Palm Leaf" :
              categoryName.includes("Bagasse") || categoryName.includes("Sugarcane") ? "Sugarcane Bagasse" :
              categoryName.includes("Paper") ? "Paper" :
              categoryName.includes("Wooden") || categoryName.includes("Cutlery") ? "Wood" :
              categoryName.includes("Aluminium") ? "Aluminium" : "Eco-friendly Materials",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `${baseUrl}/products/${product.id}`,
    },
    aggregateRating: typeof product.rating === 'number' ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: typeof product.reviews === 'number' ? product.reviews : 0,
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sage-green/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo2.0.png" alt="SPR Naturals Logo - Eco-friendly tableware exporter" width={32} height={32} className="rounded" />
              <span className="text-2xl font-bold text-nature-green" style={{ fontFamily: "'Playfair Display', serif" }}>
                SPR Naturals
              </span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-nature-green text-nature-green hover:bg-sage-green/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Product Detail Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream max-w-md mx-auto">
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.category} from SPR Naturals`}
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:col-span-2">
              <Badge className="mb-4 bg-sage-green/20 text-nature-green hover:bg-sage-green/30">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-nature-green" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-leaf-green fill-leaf-green' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                {typeof product.reviews === 'number' ? (
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                ) : null}
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {(typeof product.price === 'number' || product.volume) ? (
                <div className="flex items-baseline gap-4 mb-8">
                  {typeof product.price === 'number' ? (
                    <span className="text-5xl font-bold text-nature-green">
                      ${product.price}
                    </span>
                  ) : null}
                  {product.volume ? (
                    <span className="text-muted-foreground">• {product.volume}</span>
                  ) : null}
                </div>
              ) : null}


              {/* Action Button */}
              <div className="mb-8">
                <Link href="/#contact">
                  <Button className="w-full bg-nature-green hover:bg-leaf-green text-white py-6 text-lg">
                    Enquire Now
                  </Button>
                </Link>
              </div>

              {/* Features Grid */}
              {Array.isArray(product.features) && product.features.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-cream rounded-xl">
                  {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-nature-green/10 rounded-lg text-nature-green">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            {Array.isArray(product.ingredients) && product.ingredients.length > 0 ? (
              <Card className="p-8 border-sage-green/20 bg-white">
                <h3 className="text-2xl font-bold mb-6 text-nature-green" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Ingredients
                </h3>
                <div className="space-y-3">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-leaf-green" />
                      <span className="text-muted-foreground">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

            {/* Benefits */}
            {Array.isArray(product.benefits) && product.benefits.length > 0 ? (
              <Card className="p-8 border-sage-green/20 bg-white">
                <h3 className="text-2xl font-bold mb-6 text-nature-green" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Benefits
                </h3>
                <div className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-leaf-green mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>

          {/* How to Use Section */}
          <Card className="mt-8 p-8 border-sage-green/20 bg-gradient-earth">
            <h3 className="text-2xl font-bold mb-4 text-nature-green" style={{ fontFamily: "'Playfair Display', serif" }}>
              How to Use
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {getHowToUseContent(product.category, product.name)}
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nature-green text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image src="/logo2.0.png" alt="SPR Naturals" width={24} height={24} className="rounded" />
              <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                SPR Naturals
              </span>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Pure, natural, and sustainable wellness products
            </p>
            <p className="text-white/60 text-xs">
              &copy; 2025 SPR Naturals. A brand owned and operated by India True Global Exim.
            </p>
            <div className="w-full text-right md:text-right text-center text-xs opacity-80 mt-1 pr-3">
              Designed & Developed by{" "}
              <a
                href="https://pawarvedant.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Vedant Pawar
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}