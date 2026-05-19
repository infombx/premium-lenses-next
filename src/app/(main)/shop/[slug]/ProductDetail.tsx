'use client'

import { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import Link from 'next/link'
import { Truck, Shield, RotateCcw, ShoppingCart, Star, Facebook, Minus, Plus, ArrowLeft, Check, Eye, Award } from 'lucide-react'
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
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [variantError, setVariantError] = useState(false)
  const { addToCart } = useCart()

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://premiumlenses.mu/shop/${product.slug}`
  const shareText = `Check out ${product.name} on Premium Lenses`

  const shareLinks = [
    {
      label: 'Facebook',
      icon: <Facebook className="w-3.5 h-3.5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'WhatsApp',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText}: ${shareUrl}`)}`,
    },
  ]


  const hasVariants = product.variants && product.variants.length > 0
  const activeVariant = selectedVariant !== null ? product.variants?.[selectedVariant] : undefined
  const displayPrice = activeVariant?.price ?? product.price

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
                {hasVariants && selectedVariant === null ? (
                  <p className="text-3xl">From Rs{product.price}</p>
                ) : (
                  <p className="text-3xl">Rs{displayPrice}</p>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-sm text-black/60 leading-relaxed mb-8 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed [&_p]:mb-3 [&_strong]:text-black/80" dangerouslySetInnerHTML={{ __html: product.description }} />

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

              {/* Variant selector */}
              {hasVariants && product.inStock !== false && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs tracking-wider text-black/50">{(product.variantLabel || 'PRESCRIPTION POWER').toUpperCase()}</p>
                    {selectedVariant !== null && (
                      <button
                        onClick={() => { setSelectedVariant(null); setVariantError(false) }}
                        className="text-xs text-black/40 hover:text-black transition-colors underline underline-offset-2"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={selectedVariant ?? ''}
                      onChange={e => {
                        setSelectedVariant(e.target.value === '' ? null : Number(e.target.value))
                        setVariantError(false)
                      }}
                      className={`w-full appearance-none px-4 py-3.5 pr-10 border rounded-lg text-sm bg-white transition-colors focus:outline-none focus:border-black cursor-pointer ${
                        variantError ? 'border-red-400' : selectedVariant !== null ? 'border-black/30' : 'border-black/15'
                      }`}
                    >
                      <option value="">Choose {product.variantLabel ? `a ${product.variantLabel.toLowerCase()}` : 'a prescription power'}</option>
                      {product.variants!.map((v, i) => (
                        <option key={v.label} value={i}>
                          {v.label}{v.price !== product.price ? ` — Rs${v.price}` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {variantError && (
                    <p className="text-xs text-red-500 mt-1.5">Please select {product.variantLabel ? `a ${product.variantLabel.toLowerCase()}` : 'a prescription power'} before adding to cart.</p>
                  )}
                </motion.div>
              )}

              {/* Out of Stock */}
              {product.inStock === false && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mb-8">
                  <div className="flex items-center gap-3 px-5 py-4 bg-black/[0.03] border border-black/10 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-sm text-black/60">This product is currently out of stock.</span>
                  </div>
                </motion.div>
              )}

              {/* Quantity & Add to Cart */}
              {product.inStock !== false && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex gap-3 mb-8">
                <div className="flex items-center border border-black/10 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"><Minus className="w-4 h-4" /></button>
                  <div className="w-14 h-14 flex items-center justify-center border-x border-black/10 text-sm">{quantity}</div>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <motion.button
                  whileHover={!hasVariants || selectedVariant !== null ? { scale: 1.02 } : {}}
                  whileTap={!hasVariants || selectedVariant !== null ? { scale: 0.98 } : {}}
                  className={`group relative flex-1 px-10 py-4 overflow-hidden transition-all duration-300 rounded-lg ${
                    hasVariants && selectedVariant === null
                      ? 'bg-black/20 text-white cursor-not-allowed'
                      : 'bg-black text-white shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => {
                    if (hasVariants && selectedVariant === null) {
                      setVariantError(true)
                      return
                    }
                    for (let i = 0; i < quantity; i++) addToCart({ ...product, price: displayPrice, variant: activeVariant?.label })
                  }}
                >
                  <span className={`relative z-10 text-sm tracking-widest flex items-center justify-center gap-2 ${
                    hasVariants && selectedVariant === null ? '' : 'group-hover:text-black transition-colors duration-300'
                  }`}>
                    <ShoppingCart className="w-4 h-4" />ADD TO CART
                  </span>
                  {(!hasVariants || selectedVariant !== null) && (
                    <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </motion.button>
              </motion.div>
              )}

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
                  {shareLinks.map(({ label, icon, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${label}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                    >
                      {icon}
                    </motion.a>
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
