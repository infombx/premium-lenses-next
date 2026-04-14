'use client'

import { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Truck, Shield, RotateCcw, ShoppingCart, Star, Facebook, Twitter, Instagram, Linkedin, Minus, Plus, ArrowLeft, Check, Eye, Award } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { useCart } from '@/app/context/CartContext'
import { motion, AnimatePresence } from 'motion/react'
import type { Product } from '@/app/data/products'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: Props) {
  useEffect(() => {
    posthog.capture('product_viewed', {
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      product_price: product.price,
      product_category: product.category,
      currency: 'MUR',
    })
  }, [product.id, product.name, product.slug, product.price, product.category])

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'features'>('description')
  const router = useRouter()
  const { addToCart } = useCart()

  const thumbnails = product.images?.length ? product.images : [product.image, product.image, product.image, product.image]

  const benefits = [
    { icon: Truck, text: 'Free Shipping' },
    { icon: Shield, text: 'FDA Approved' },
    { icon: RotateCcw, text: 'Easy Returns' },
    { icon: Award, text: 'Premium Quality' },
  ]

  return (
    <div className="min-h-screen bg-white pt-44">
      {/* Breadcrumb */}
      <div className="border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-xs text-black/40">
            <Link href="/home" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Left: Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <motion.div className="relative bg-gradient-to-br from-black/[0.02] to-black/[0.05] rounded-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center p-4 md:p-8 border border-black/5" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={selectedImage} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="w-full h-full">
                    <ImageWithFallback src={thumbnails[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
                  </motion.div>
                </AnimatePresence>
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-black/10">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 fill-black" />
                    <span className="text-xs">Premium</span>
                  </div>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-4 gap-3">
                {thumbnails.map((thumb, index) => (
                  <motion.button key={index} onClick={() => setSelectedImage(index)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`bg-gradient-to-br from-black/[0.02] to-black/[0.05] rounded-lg overflow-hidden aspect-square p-4 transition-all border ${selectedImage === index ? 'ring-2 ring-black border-black/20' : 'border-black/5 hover:border-black/20'}`}>
                    <ImageWithFallback src={thumb} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-contain" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-4 border border-black/10">
                <Eye className="w-3 h-3 text-black/60" />
                <p className="text-xs text-black/60 tracking-wider">{product.category}</p>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl md:text-5xl mb-4">{product.name}</motion.h1>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-baseline gap-3 mb-6">
                <p className="text-3xl">Rs{product.price}</p>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-sm text-black/60 leading-relaxed mb-8">
                {product.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="grid grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div key={benefit.text} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + index * 0.1 }} whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-3 px-4 py-3 bg-black/[0.02] rounded-lg border border-black/5 hover:border-black/10 transition-all">
                      <Icon className="w-4 h-4 text-black/40" strokeWidth={1.5} />
                      <span className="text-xs text-black/60">{benefit.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Quantity & Add to Cart */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-3 mb-8">
                <div className="flex items-center border border-black/10 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"><Minus className="w-4 h-4" /></button>
                  <div className="w-14 h-14 flex items-center justify-center border-x border-black/10 text-sm">{quantity}</div>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group relative flex-1 px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                  onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); router.push('/cart') }}
                >
                  <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />ADD TO CART
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* Specs */}
              {product.specs && Object.values(product.specs).some(Boolean) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mb-8 p-6 bg-gradient-to-br from-black/[0.02] to-black/[0.05] rounded-xl border border-black/5">
                  <h3 className="text-xs tracking-wider text-black/40 mb-4">SPECIFICATIONS</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.specs.dia && <div><p className="text-xs text-black/40 mb-1">Diameter</p><p className="text-sm">{product.specs.dia}</p></div>}
                    {product.specs.bc && <div><p className="text-xs text-black/40 mb-1">Base Curve</p><p className="text-sm">{product.specs.bc}</p></div>}
                    {product.specs.waterContent && <div><p className="text-xs text-black/40 mb-1">Water Content</p><p className="text-sm">{product.specs.waterContent}</p></div>}
                    {product.specs.duration && <div><p className="text-xs text-black/40 mb-1">Duration</p><p className="text-sm">{product.specs.duration}</p></div>}
                  </div>
                </motion.div>
              )}

              {/* Social Share */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="pt-6 border-t border-black/10">
                <p className="text-xs text-black/40 mb-3 tracking-wider">SHARE THIS PRODUCT</p>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-9 h-9 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
                      <Icon className="w-3.5 h-3.5" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + Key Features Tabs */}
      <section className="py-12 md:py-16 border-t border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Tab bar */}
          <div className="flex gap-8 mb-8 border-b border-black/10">
            <button onClick={() => setActiveTab('description')} className={`pb-4 text-sm relative transition-colors ${activeTab === 'description' ? 'text-black' : 'text-black/40'}`}>
              Description
              {activeTab === 'description' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
            </button>
            {product.features.length > 0 && (
              <button onClick={() => setActiveTab('features')} className={`pb-4 text-sm relative transition-colors ${activeTab === 'features' ? 'text-black' : 'text-black/40'}`}>
                Key Features
                {activeTab === 'features' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div key="description" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className="text-sm text-black/60 leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
              </motion.div>
            )}
            {activeTab === 'features' && product.features.length > 0 && (
              <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                <div className={`grid gap-3 ${product.features.length > 6 ? 'md:grid-cols-3' : product.features.length > 3 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {product.features.map((feature, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-black/5 hover:border-black/10 transition-all">
                      <div className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 mt-0.5"><Check className="w-3 h-3 text-black/60" /></div>
                      <span className="text-sm text-black/60">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20 border-t border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <p className="text-xs tracking-wider text-black/40 mb-3">YOU MAY ALSO LIKE</p>
              <h2 className="text-3xl md:text-4xl mb-4">Related Products</h2>
              <div className="w-16 h-[2px] bg-black mx-auto" />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Link href={`/shop/${p.slug}`} className="group block">
                    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                      <div className="bg-gradient-to-br from-black/[0.02] to-black/[0.05] rounded-xl overflow-hidden aspect-square p-8 mb-3 border border-black/5 group-hover:border-black/10 transition-all">
                        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <p className="text-xs text-black/40 mb-1">{p.category}</p>
                      <h3 className="text-sm mb-1 group-hover:text-black/80 transition-colors">{p.name}</h3>
                      <p className="text-sm">Rs{p.price}</p>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="pb-12 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to Shop
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
