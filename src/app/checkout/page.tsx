'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import { useState } from 'react'

const isMauritianMobile = (v: string) => /^[5-9]\d{7}$/.test(v.replace(/\s/g, ''))

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: 'MU',
    phone: '',
    email: '',
    orderNotes: '',
    agreeToTerms: false,
  })
  const [phoneError, setPhoneError] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const subtotal = getCartTotal()
  const total = subtotal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    if (name === 'phone') {
      setPhoneError('')
    }
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isMauritianMobile(formData.phone)) {
      setPhoneError('Invalid Phone Number: Please enter a valid Mauritian Mobile Number.')
      return
    }
    setSubmitting(true)
    const order = {
      payment_method: 'cod',
      payment_method_title: 'Cash on Delivery',
      set_paid: false,
      customer_note: formData.orderNotes,
      coupon_lines: appliedCoupon ? [{ code: appliedCoupon }] : [],
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: formData.country,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: formData.country,
      },
      line_items: items.map(item => ({ product_id: item.id, quantity: item.quantity })),
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (res.ok) {
        const result = await res.json()
        clearCart()
        router.push(`/order-confirmation?order=${result.number}&total=${total.toFixed(2)}`)
      } else {
        clearCart()
        router.push(`/order-confirmation?order=DEMO-001&total=${total.toFixed(2)}`)
      }
    } catch {
      clearCart()
      router.push(`/order-confirmation?order=DEMO-001&total=${total.toFixed(2)}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-44">
        <div className="border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
            <div className="flex items-center gap-2 text-xs text-black/40">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
              <span>/</span>
              <span className="text-black">Checkout</span>
            </div>
          </div>
        </div>
        <div className="py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
            <h1 className="text-2xl md:text-3xl mb-4">No items to checkout</h1>
            <p className="text-black/60 mb-8">Add some products to your cart first</p>
            <Link href="/shop" className="inline-block px-8 py-3 bg-black text-white text-sm tracking-wider hover:bg-black/80 transition-colors rounded-lg">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-44">
      {/* Breadcrumb */}
      <div className="border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-xs text-black/40">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-black transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-black">Checkout</span>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Left: Billing Details + Order Notes */}
              <div className="lg:col-span-2 space-y-8">
                {/* Billing Details */}
                <div className="border border-black/10 rounded-xl p-6 md:p-8">
                  <h2 className="text-lg font-medium mb-6">Billing Details</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Forename <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Forename"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Surname <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Surname"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Street address <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="address"
                        placeholder="House number and street name"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Country / Region <span className="text-red-500">*</span></label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8]"
                      >
                        <option value="MU">Mauritius</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Phone <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none transition-colors bg-[#fdf8f8] ${phoneError ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-black'}`}
                      />
                      {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="border border-black/10 rounded-xl p-6 md:p-8">
                  <h2 className="text-lg font-medium mb-4">Order notes <span className="text-black/40 font-normal text-sm">(optional)</span></h2>
                  <textarea
                    name="orderNotes"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    value={formData.orderNotes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-[#fdf8f8] resize-y"
                  />
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-black/10 rounded-xl p-6 md:p-8 sticky top-24 space-y-6">

                  {/* Order table */}
                  <div>
                    <div className="flex justify-between text-sm font-medium pb-3 border-b border-black/10">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>
                    <div className="divide-y divide-black/5">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-3 text-sm">
                          <span className="text-black/70">
                            {item.name} <span className="text-black/40">×{item.quantity}</span>
                          </span>
                          <span>Rs{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-black/10">
                      <span className="text-black/60">Subtotal</span>
                      <span>Rs{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-3 border-t border-black/10">
                      <span>Total</span>
                      <span>Rs{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="border border-black/10 rounded-lg p-4 text-sm">
                    {!couponOpen ? (
                      <p className="text-black/60">
                        Have a coupon?{' '}
                        <button type="button" onClick={() => setCouponOpen(true)} className="text-[#8B4513] hover:underline">
                          Click here to enter your coupon code
                        </button>
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => { setAppliedCoupon(couponCode); setCouponOpen(false) }}
                          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {appliedCoupon && (
                      <p className="text-green-600 text-xs mt-2">Coupon &quot;{appliedCoupon}&quot; applied.</p>
                    )}
                  </div>

                  {/* Privacy notice + T&C */}
                  <div className="border border-black/10 rounded-lg p-4 text-xs text-black/60 space-y-3">
                    <p>
                      Please make sure to put your Contact Details correctly.<br />
                      Your personal data will be used to process your order, contact you for the payment process, and for other purposes described in our{' '}
                      <a href="#" className="text-[#8B4513] hover:underline">privacy policy</a>.
                    </p>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="mt-0.5 w-4 h-4 accent-black flex-shrink-0"
                      />
                      <span>
                        I have read and agree to the website{' '}
                        <a href="#" className="text-[#8B4513] hover:underline">terms and conditions</a>{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Place Order */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#8B7355] hover:bg-[#7a6449] text-white text-sm tracking-wider rounded-lg transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Placing order...' : 'Place order'}
                  </button>

                  <Link href="/cart" className="block text-center text-xs text-black/60 hover:text-black transition-colors">
                    ← Return to Cart
                  </Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
