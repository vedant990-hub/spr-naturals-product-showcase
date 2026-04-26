"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Droplet, ShieldCheck, Sparkles, Send, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn, getAllCategoriesWithCounts, getProductsByCategoryId } from "@/lib/utils";
import ScrollFloat from "@/components/ui/ScrollFloat";
import Chatbot from "@/components/Chatbot";
import CountrySelector from "@/components/CountrySelector";
import GoogleTranslate from "@/components/GoogleTranslate";
import FloatingSocialIcons from "@/components/FloatingSocialIcons";
import { Country } from "@/lib/countries";
import DotSpinner from "@/components/DotSpinner";

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [mobileVideoLoaded, setMobileVideoLoaded] = useState(false);
  const [desktopVideoLoaded, setDesktopVideoLoaded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isNavSolid, setIsNavSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSolid(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle mute/unmute functionality
  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
    
    // Update all videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = !isVideoMuted;
    });
  };

  // Handle autoplay - start videos with sound enabled by default
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      // Start videos unmuted (sound enabled by default)
      video.muted = false;
      setIsVideoMuted(false);
      video.play().catch(() => {
        // If autoplay with sound fails (browser restriction), fall back to muted
        video.muted = true;
        setIsVideoMuted(true);
        video.play().catch(() => {});
        // Set up user interaction handlers to unmute
        const playOnInteraction = () => {
          video.muted = false;
          setIsVideoMuted(false);
          video.play().catch(() => {});
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('keydown', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
      });
    });
  }, []);


  // Handle video loading state
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const hasVideoLoaded = isMobile ? mobileVideoLoaded : desktopVideoLoaded;
    
    if (hasVideoLoaded) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsVideoLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [mobileVideoLoaded, desktopVideoLoaded]);

  // Fallback: Hide loading after 5 seconds if videos fail to load
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsVideoLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry form temporarily unavailable. Please contact us directly at info@sprnaturals.in");
  };

  // products grid removed per request; homepage now focuses on categories

  const benefits = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "Made with pure, natural ingredients from sustainable sources"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cruelty-Free",
      description: "Never tested on animals, always ethical and compassionate"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Chemical-Free",
      description: "No harmful chemicals, parabens, or synthetic fragrances"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Eco-Sustainable",
      description: "Environmentally responsible packaging and production"
    }
  ];

  const testimonials = [
    {
      name: "Marcus Thompson",
      role: "Restaurant Owner, London",
      content: "SPR Naturals' areca leaf plates have been a game-changer for our eco-friendly restaurant. Our customers love the natural look and we feel good about reducing plastic waste.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Catering Manager, Mumbai",
      content: "The sugarcane bagasse containers are perfect for our outdoor events. They're sturdy, compostable, and handle hot food beautifully. Excellent quality and service!",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Retail Chain Owner, Singapore",
      content: "We've been sourcing from SPR Naturals for over 2 years. Their paper cups and straws are consistently high quality, and their export documentation is always perfect.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero H1 - Hidden visually but accessible for SEO */}
      <h1 className="sr-only">SPR Naturals - Eco-Friendly Tableware Exporter from India | Areca Leaf Plates, Sugarcane Bagasse, Paper Cups</h1>

      {/* Navigation */}

  
      {/* Hero Section - Natural Layout with background video */}
      <section className="relative min-h-screen flex items-center justify-center">
        <nav
        className={cn(
          "fixed top-0 left-0 w-full transition-all duration-300 z-50",
          isNavSolid ? "bg-black/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
        )}
      >
      
        <div
          className={cn(
            "container mx-auto px-6 transition-all duration-300",
            isNavSolid ? "py-3" : "py-4"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo2.0.png" alt="SPR Naturals Logo - Eco-friendly tableware exporter from India" width={88} height={88} className="rounded" />
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                SPR Naturals
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-white hover:text-nature-green transition-colors text-lg font-medium">About</a>
              <a href="#products" className="text-white hover:text-nature-green transition-colors text-lg font-medium">Products</a>
              <a href="#benefits" className="text-white hover:text-nature-green transition-colors text-lg font-medium">Benefits</a>
              <a href="#testimonials" className="text-white hover:text-nature-green transition-colors text-lg font-medium">Testimonials</a>
              <a href="#contact" className="text-white hover:text-nature-green transition-colors text-lg font-medium">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </nav>
        {/* Video Loading Overlay */}
        {isVideoLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-nature-green to-leaf-green flex items-center justify-center z-10">
            <div className="text-center flex flex-col items-center justify-center">
              <DotSpinner size="lg" color="white" className="mb-6" />
              <p className="text-white text-lg font-medium">Loading Experience...</p>
              <p className="text-white/80 text-sm mt-2">Preparing your journey with SPR Naturals</p>
            </div>
          </div>
        )}

        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          {/* Mobile Video */}
          <video
            id="mobile-bg-video"
            autoPlay
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
            muted={isVideoMuted}
            className={`w-full h-full object-cover sm:hidden transition-opacity duration-500 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ zIndex: -1 }}
            onLoadedData={() => {
              setMobileVideoLoaded(true);
            }}
            onError={() => setMobileVideoLoaded(false)}
            onCanPlay={() => {
              setMobileVideoLoaded(true);
            }}
            onLoadStart={() => setMobileVideoLoaded(false)}
          >
            <source src="/mobilebgvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Desktop Video */}
          <video
            id="desktop-bg-video"
            autoPlay
            loop
            playsInline
            preload="auto"
            muted={isVideoMuted}
            className={`w-full h-full object-cover hidden sm:block transition-opacity duration-500 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ zIndex: -1 }}
            onLoadedData={() => {
              setDesktopVideoLoaded(true);
            }}
            onError={() => setDesktopVideoLoaded(false)}
            onCanPlay={() => {
              setDesktopVideoLoaded(true);
            }}
            onLoadStart={() => setDesktopVideoLoaded(false)}
          >
            <source src="/bg_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Fallback background image - shown if video fails */}
        {(!mobileVideoLoaded && !desktopVideoLoaded) && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/bgimage.jpeg)',
              zIndex: -2
            }}
          ></div>
        )}
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        
        {/* Mute/Unmute Button */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white cursor-pointer hover:bg-black/70 transition-all duration-300 z-20" onClick={toggleVideoMute}>
          {isVideoMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
          <span className="sr-only">{isVideoMuted ? 'Unmute video' : 'Mute video'}</span>
        </div>

        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-leaf-green/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-nature-green/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage-green/10 rounded-full blur-2xl"></div>
        </div>


      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="mb-6 text-nature-green"
              textClassName="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to SPR Naturals
            </ScrollFloat>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a Indian Exporter from Nagpur, India, supplying sustainable food‑service and packaging
              products worldwide. Our focus is eco‑friendly alternatives that reduce plastic waste while delivering
              reliable performance for restaurants, caterers, airlines and retailers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our catalog includes Areca leaf tableware, sugarcane bagasse plates and trays, paper cups and straws,
              kraft paper bags, meal boxes, aluminium foil containers, and wooden cutlery. We offer consistent
              quality, export‑grade packaging, documentation support, and on‑time shipments — with options for
              private‑label branding on request.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section (with images) */}
      <section id="products" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <ScrollFloat
              animationDuration={0.9}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.025}
              containerClassName="mb-4 text-nature-green"
              textClassName="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Category
            </ScrollFloat>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a category to explore eco-friendly products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getAllCategoriesWithCounts().map((cat) => (
              <Link key={cat.id} href={`/products/category/${cat.id}`}>
                <Card className="overflow-hidden hover-lift cursor-pointer border-sage-green/20 bg-white h-full flex flex-col">
                  <div className="relative aspect-[4/3] bg-cream">
                    {(() => {
                      const first = getProductsByCategoryId(cat.id)[0];
                      const img = cat.image ?? first?.image ?? "/window.svg";
                      const alt = `${cat.name} - Eco-friendly ${cat.name.toLowerCase()} products from SPR Naturals`;
                      return (
                        <Image
                          src={img}
                          alt={alt}
                          fill
                          className="object-cover p-0 brightness-110 contrast-110 saturate-[1.1]"
                          loading="lazy"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      );
                    })()}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{cat.name}</h4>
                      <span className="text-xs font-medium text-nature-green bg-sage-green/20 rounded-full px-2 py-1">
                        {cat.count}
                      </span>
                    </div>
                    {cat.blurb ? (
                      <p className="text-sm text-muted-foreground flex-grow">{cat.blurb}</p>
                    ) : null}
                    <div className="mt-4 pt-3 border-t border-sage-green/10">
                      <Button size="sm" className="bg-nature-green hover:bg-leaf-green text-white">View Category</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-gradient-nature">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollFloat
              animationDuration={1.1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="mb-4 text-nature-green"
              textClassName="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose SPR Naturals?
            </ScrollFloat>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Our commitment to purity, sustainability, and your well-being
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl hover-lift">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-nature-green/20 rounded-full mb-4 text-nature-green">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="mb-4 text-nature-green"
              textClassName="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Our Customers Say
            </ScrollFloat>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from people who trust SPR Naturals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-white border-sage-green/20 hover-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-leaf-green fill-leaf-green" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <ScrollFloat
                animationDuration={0.9}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.02}
                containerClassName="mb-4 text-nature-green"
                textClassName="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get in Touch
              </ScrollFloat>
              <p className="text-lg text-muted-foreground">
                Have questions? We'd love to hear from you.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <Card className="p-8 bg-white border-sage-green/20 h-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-green"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Your Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-green"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-green"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="user_phone"
                        value={formData.user_phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-green"
                        placeholder="+91 1234567890"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Country <span className="text-red-500">*</span></label>
                      <CountrySelector
                        value={selectedCountry?.code}
                        onChange={setSelectedCountry}
                        placeholder="Select Country"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-sage-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-green resize-none"
                      placeholder="Tell us how we can help..."
                      required
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        {submitStatus.type === 'success' ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">!</span>
                          </div>
                        )}
                        <span className="text-sm font-medium">{submitStatus.message}</span>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    disabled
                    style={{
                      opacity: 0.6,
                      cursor: "not-allowed"
                    }}
                    className="w-full bg-nature-green text-white py-6 text-lg"
                  >
                    Form temporarily unavailable
                  </Button>
                </form>
              </Card>

              <div className="relative rounded-xl overflow-hidden shadow-lg border border-sage-green/20 bg-white">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps?q=21.125203270486647,79.05828187557697&z=15&output=embed"
                  className="w-full h-[300px] md:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nature-green text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo2.0.png" alt="SPR Naturals" width={32} height={32} className="rounded" />
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>SPR Naturals</span>
              </div>
              <p className="text-white/80 text-sm">Indian Exporter of premium natural and eco-friendly products. Global shipping from Nagpur, India.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Categories</Link></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Why Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/products/category/natural-tableware" className="hover:text-white transition-colors">Natural Tableware</Link></li>
                <li><Link href="/products/category/sugarcane-fiber-tableware" className="hover:text-white transition-colors">Sugarcane Fiber Tableware</Link></li>
                <li><Link href="/products/category/paper-drinkware" className="hover:text-white transition-colors">Paper Drinkware</Link></li>
                <li><Link href="/products/category/paper-packaging" className="hover:text-white transition-colors">Paper Packaging</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="https://x.com/Exporter_Indian" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    @Exporter_Indian
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/exporter_indian1983/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @exporter_indian1983
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/exporterindian1983" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    @exporterindian1983
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/india-true-global-exims-4699a6378/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    India True Global Exims
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Email: <a href="mailto:info@sprnaturals.in" className="hover:text-white hover:underline transition-colors">info@sprnaturals.in</a></li>
                <li>Location: Nagpur, India</li>
                <li>Hours: Mon–Sat, 9AM – 6PM IST</li>
              </ul>
            </div>
          </div>
          {/* Catalogue Button */}
1          <div className="mb-6 flex justify-center">
            <Button asChild size="sm" className="bg-white text-nature-green hover:bg-cream text-sm py-2 px-4 font-medium">
              <a href="/catalog.pdf" download aria-label="Download catalog PDF">
                📄 Download Catalogue
              </a>
            </Button>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/80 gap-4">
            <p>&copy; 2025 SPR Naturals. A brand owned and operated by India True Global Exim.</p>
            <p className="text-sm">
              Website designed by{" "}
              <a
                href="https://pawarvedant.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-white transition-colors"
                style={{ textUnderlineOffset: '4px' }}
              >
                Vedant Pawar
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Social Icons */}
      <FloatingSocialIcons />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}