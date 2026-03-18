'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { ShoppingCart, ChevronDown, Eye, Star, Sparkles } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import type { Product } from '@/app/data/products'

const shopHeroImage = '/assets/d57cdca6fd40b75203c33e78dffacd20f4175fc8.png'
const shopHeroImageMobile = '/assets/3a74539b273495185fd1bd4324da22c3f1ca7f98.png'

interface Props {
  products: Product[]
  categories: string[]
}

export default function ShopContent({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('ALL ITEMS')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { addToCart } = useCart()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const filteredProducts = activeCategory === 'ALL ITEMS'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative -mt-32 pt-48 pb-20 md:-mt-36 md:pt-56 md:pb-32 lg:pb-40 xl:pb-48 overflow-hidden min-h-[280px] md:min-h-[800px]">
        <div className="absolute inset-0">
          <img src={shopHeroImageMobile} alt="Shop hero" className="md:hidden w-full h-full object-cover object-[center_40%]" />
          <img src={shopHeroImage} alt="Shop hero" className="hidden md:block w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/35 md:from-black/30 md:via-black/20 md:to-black/40" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 mt-24 md:mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-white/20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white/70" />
              <span className="text-xs tracking-widest text-white/70">BEAUTY COLLECTION</span>
            </div>
          </motion.div>

          <div className="text-center max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-32 md:mb-48 lg:mb-64 leading-tight transition-transform duration-200 ease-out text-white"
              style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * 15}deg)`, transformStyle: 'preserve-3d' }}
            >
              Express Your Style
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-2xl text-white/70 mb-6 max-w-3xl mx-auto leading-relaxed transition-transform duration-200 ease-out px-4"
              style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`, transformStyle: 'preserve-3d' }}
            >
              Curated selection of stunning colored contact lenses designed for effortless beauty, all-day comfort, and mesmerizing looks
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4">
              {[{ icon: Eye, text: 'Safe & Certified' }, { icon: Star, text: 'Stunning Colors' }, { icon: Sparkles, text: 'Free Shipping' }].map((f, i) => (
                <motion.div key={f.text} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }} whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <f.icon className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
                  <span className="text-xs md:text-sm text-white/80">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-white text-black overflow-hidden transition-all duration-300 rounded-lg"
              >
                <span className="relative z-10 text-xs md:text-sm tracking-widest group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  EXPLORE COLLECTION
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="py-6 md:py-8 sticky top-16 md:top-20 z-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-black/10 px-6 py-4 relative" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <motion.button key={category} onClick={() => setActiveCategory(category)} className="relative text-xs tracking-wider whitespace-nowrap pb-2 transition-colors" whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                  <span className={activeCategory === category ? 'text-black' : 'text-black/40'}>{category}</span>
                  {activeCategory === category && (
                    <motion.div layoutId="activeCategory" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent pointer-events-none rounded-r-2xl" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20" id="products">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-black/40">
              <p className="text-lg mb-2">No products found</p>
              <p className="text-sm">Check back soon or try a different category</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group relative" onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                    <Link href={`/shop/${product.id}`}>
                      <div className="relative bg-[#F5F5F5] rounded-xl md:rounded-2xl overflow-hidden aspect-square">
                        <motion.div className="w-full h-full p-4 md:p-8" animate={{ scale: hoveredProduct === product.id ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </motion.div>
                        <AnimatePresence>
                          {hoveredProduct === product.id && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }} className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                className="w-full py-2 md:py-3 bg-black text-white text-xs md:text-sm tracking-wider rounded-lg flex items-center justify-center gap-2"
                                onClick={(e) => { e.preventDefault(); addToCart(product) }}
                              >
                                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="hidden md:inline">ADD TO CART</span>
                                <span className="md:hidden">ADD</span>
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="mt-3 md:mt-4">
                        <h3 className="text-xs md:text-sm mb-1 truncate">{product.name}</h3>
                        <p className="text-xs md:text-sm text-black/60">${product.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  )
}
