'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  Droplets,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Plus,
  Minus,
  Sun,
  Moon,
  Calendar,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  XCircle,
  Heart,
  Shield,
  Info
} from 'lucide-react';
import Link from 'next/link';
import type { GuideContent as GuideContentType } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { PAGE_IDS } from '@/lib/cmsFields';

const TIP_ICONS = [ThumbsUp, Clock, Droplets, Moon, Sun, Calendar];

interface PaymentInfo {
  juice_number: string
  bank_account_number: string
  bank_name: string
  account_holder_name: string
  whatsapp_number: string
}

interface Props {
  content: GuideContentType
  orderNumber?: string
  orderTotal?: string
  paymentInfo?: PaymentInfo | null
}

export default function GuideContent({ content, orderNumber, orderTotal, paymentInfo }: Props) {
  const [scrollY, setScrollY] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const guideTopics = [
    {
      icon: ShoppingBag,
      title: 'Choosing the Right Lenses',
      content: [
        {
          title: 'Daily Disposables',
          description: 'Perfect for occasional wearers, travelers, or anyone who wants ultimate convenience. Wear once and throw away—no cleaning solution needed.',
          pros: ['No maintenance required', 'Most hygienic option', 'Great for allergies', 'Perfect for travel'],
          bestFor: 'Occasional wearers, active lifestyles, people with allergies'
        },
        {
          title: 'Monthly Lenses',
          description: 'Ideal for daily wearers seeking cost-effective comfort. Designed for 30 days of wear with proper daily cleaning and storage.',
          pros: ['Cost-effective for daily wear', 'Comfortable for all-day use', 'Wide variety of options', 'Environmentally friendlier'],
          bestFor: 'Regular daily wearers, budget-conscious users'
        },
        {
          title: 'Colored Lenses',
          description: 'Change or enhance your eye color while maintaining vision correction. Available in prescription and non-prescription varieties.',
          pros: ['Aesthetic enhancement', 'Wide color selection', 'Same comfort as clear lenses', 'FDA approved options'],
          bestFor: 'Style-conscious wearers, special occasions'
        },
        {
          title: 'Specialty Lenses',
          description: 'Designed for specific vision needs like astigmatism (toric) or age-related focus issues (multifocal/progressive).',
          pros: ['Addresses specific vision needs', 'Advanced technology', 'Customized correction', 'High precision'],
          bestFor: 'Astigmatism, presbyopia, unique prescriptions'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How to Insert & Remove Lenses',
      steps: [
        {
          number: 1,
          title: 'Prepare Your Workspace',
          description: 'Wash hands thoroughly with soap and water. Dry with a lint-free towel. Ensure your work area is clean and well-lit.',
          tips: ['Use antibacterial soap', 'Avoid hand lotions before handling', 'Keep nails trimmed and filed']
        },
        {
          number: 2,
          title: 'Check the Lens',
          description: 'Place lens on your index finger. Make sure it\'s not inside out—it should look like a bowl, not a plate with flared edges.',
          tips: ['Hold lens up to light', 'Edges should curve inward', 'If edges flare out, flip it over']
        },
        {
          number: 3,
          title: 'Insert the Lens',
          description: 'Use your free hand to hold your upper eyelid. Pull down lower lid with middle finger of hand holding lens. Look up and gently place lens on eye.',
          tips: ['Relax and breathe', 'Look upward, not at the lens', 'Release lid slowly after placing']
        },
        {
          number: 4,
          title: 'Center and Settle',
          description: 'Close your eye gently and roll it around to center the lens. Blink a few times. The lens should feel comfortable.',
          tips: ['Don\'t rub your eyes', 'If discomfort persists, remove and retry', 'May take practice—be patient']
        },
        {
          number: 5,
          title: 'Removing Lenses',
          description: 'Wash hands. Look up, pull down lower lid, and gently pinch the lens with thumb and index finger. Remove gently.',
          tips: ['Never remove with fingernails', 'Always remove before sleeping', 'Store immediately in solution']
        }
      ]
    },
    {
      icon: Droplets,
      title: 'Care & Maintenance',
      content: [
        {
          title: 'Daily Cleaning Routine',
          description: 'After removing lenses, rub each lens with solution for 5 seconds on each side. Rinse thoroughly and store in fresh solution.',
          dos: ['Use fresh solution daily', 'Rub lenses even with "no-rub" solution', 'Clean case with solution', 'Air dry case upside down'],
          donts: ['Never use tap water', 'Never reuse old solution', 'Never use saliva', 'Never sleep in daily lenses']
        },
        {
          title: 'Storage Best Practices',
          description: 'Store lenses in a clean case filled with fresh multipurpose or prescribed solution. Never add new solution to old.',
          dos: ['Replace case every 3 months', 'Use only recommended solutions', 'Keep case clean and dry', 'Store in cool, dry place'],
          donts: ['Don\'t mix solution brands', 'Don\'t use expired solution', 'Don\'t share lenses or cases', 'Don\'t store in water']
        }
      ]
    },
    {
      icon: AlertCircle,
      title: 'Troubleshooting Common Issues',
      problems: [
        {
          issue: 'Lens Feels Uncomfortable',
          causes: ['Inside-out lens', 'Debris on lens', 'Dry eyes', 'Damaged lens'],
          solutions: ['Remove and check orientation', 'Rinse with solution', 'Use rewetting drops', 'Replace if torn']
        },
        {
          issue: 'Blurry Vision',
          causes: ['Dirty lens', 'Wrong lens in wrong eye', 'Prescription changed', 'Lens decentered'],
          solutions: ['Clean thoroughly', 'Check left/right markings', 'Get eye exam', 'Blink and reposition']
        },
        {
          issue: 'Red or Irritated Eyes',
          causes: ['Overwear', 'Poor hygiene', 'Allergic reaction', 'Eye infection'],
          solutions: ['Remove lenses immediately', 'Clean hands and lenses', 'Try different solution', 'See eye doctor if persists']
        },
        {
          issue: 'Dry Eyes',
          causes: ['Low humidity', 'Extended screen time', 'Certain medications', 'Insufficient blinking'],
          solutions: ['Use rewetting drops', 'Take screen breaks', 'Use humidifier', 'Blink more frequently']
        }
      ]
    }
  ];

  const faqs = content.faqs;
  const quickTips = content.safety_tips.map((tip, i) => ({
    icon: TIP_ICONS[i % TIP_ICONS.length],
    tip,
    color: 'bg-black',
  }));

  const waMessage = orderNumber
    ? encodeURIComponent(`Hi, I have completed payment for Order #${orderNumber}. Please find my payment screenshot attached.`)
    : ''

  return (
    <div className="min-h-screen bg-white">
      {/* Order Confirmation Block — only shown when coming from checkout */}
      {orderNumber && paymentInfo && (
        <div className="pt-44 pb-0 bg-white">
          <div className="max-w-xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl mb-1">Order Confirmed!</h1>
                <p className="text-black/60 text-sm mb-0.5">Thank you for your purchase.</p>
                <p className="text-xs text-black/40">Order #{orderNumber}</p>
              </div>

              {/* Payment Instructions */}
              <div className="border border-black/10 rounded-xl p-6 space-y-4">
                <div>
                  <h2 className="text-base font-semibold mb-1">Payment Instructions</h2>
                  <p className="text-sm text-black/60">Please complete your payment to confirm your order.</p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4 text-sm space-y-1">
                  {orderTotal && (
                    <div className="flex justify-between">
                      <span className="text-black/60">Amount to pay</span>
                      <span className="font-semibold">Rs {orderTotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-black/60">Reference</span>
                    <span className="font-medium">Order #{orderNumber}</span>
                  </div>
                </div>

                {paymentInfo.juice_number && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">Pay via Juice</p>
                    <div className="text-sm flex justify-between">
                      <span className="text-black/60">Number</span>
                      <span className="font-medium">{paymentInfo.juice_number}</span>
                    </div>
                  </div>
                )}

                {(paymentInfo.bank_name || paymentInfo.bank_account_number) && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">Pay via Bank Transfer</p>
                    <div className="text-sm space-y-1">
                      {paymentInfo.bank_name && (
                        <div className="flex justify-between">
                          <span className="text-black/60">Bank</span>
                          <span className="font-medium">{paymentInfo.bank_name}</span>
                        </div>
                      )}
                      {paymentInfo.account_holder_name && (
                        <div className="flex justify-between">
                          <span className="text-black/60">Account Name</span>
                          <span className="font-medium">{paymentInfo.account_holder_name}</span>
                        </div>
                      )}
                      {paymentInfo.bank_account_number && (
                        <div className="flex justify-between">
                          <span className="text-black/60">Account No.</span>
                          <span className="font-medium">{paymentInfo.bank_account_number}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp proof */}
              {paymentInfo.whatsapp_number && (
                <div className="border border-black/10 rounded-xl p-5 text-center space-y-3">
                  <p className="text-sm text-black/60">Once payment is done, send us your screenshot on WhatsApp:</p>
                  <a
                    href={`https://wa.me/${paymentInfo.whatsapp_number}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#1ebe5d] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send Proof of Payment
                  </a>
                </div>
              )}

            </motion.div>

            {/* Guide teaser — makes it obvious there's content below */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-2 bg-black text-white rounded-xl p-5 text-center"
            >
              <p className="text-sm font-medium mb-1">While you complete payment</p>
              <p className="text-white/60 text-xs mb-3">Read our lens care guide below — tips on insertion, cleaning, and more.</p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5 mx-auto text-white/50" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative pb-20 md:pb-32 bg-black text-white overflow-hidden ${orderNumber ? 'pt-16 md:pt-20' : '-mt-32 pt-52 md:-mt-36 md:pt-68'}`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"
            style={{
              top: '10%',
              left: '5%',
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-80 h-80 md:w-[500px] md:h-[500px] bg-white/3 rounded-full blur-3xl"
            style={{
              bottom: '5%',
              right: '10%',
              transform: `translate(-${scrollY * 0.2}px, -${scrollY * 0.3}px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-white/20 rounded-full backdrop-blur-sm">
              <Info className="w-3 h-3 md:w-4 md:h-4 text-white/70" />
              <EditableField pageId={PAGE_IDS.guide} fieldName="hero_badge" value={content.hero_badge}>
              <span className="text-xs tracking-widest text-white/70">{content.hero_badge}</span>
            </EditableField>
            </div>
          </motion.div>

          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-6xl lg:text-7xl mb-6 md:mb-8 leading-tight px-4"
            >
              <EditableField pageId={PAGE_IDS.guide} fieldName="hero_title" value={content.hero_title}>
                {content.hero_title}
              </EditableField>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            >
              <EditableField pageId={PAGE_IDS.guide} fieldName="hero_subtitle" value={content.hero_subtitle} multiline>
                {content.hero_subtitle}
              </EditableField>
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-6 px-4"
            >
              {[
                { icon: Eye, text: '4 Key Topics' },
                { icon: CheckCircle, text: 'Expert Tips' },
                { icon: Shield, text: 'Safety First' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 md:px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                >
                  <feature.icon className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
                  <span className="text-xs md:text-sm text-white/80">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </section>

      {/* Quick Tips Banner */}
      <section className="py-12 md:py-16 bg-black/[0.02] border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <h2 className="text-xl md:text-2xl text-center mb-8 md:mb-12">Quick Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {quickTips.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-start gap-4 p-6 bg-white border border-black/10 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <EditableField pageId={PAGE_IDS.guide} fieldName={`safety_tip_${index + 1}`} value={item.tip} multiline>
                  <p className="text-sm leading-relaxed pt-2">{item.tip}</p>
                </EditableField>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guide Content - Accordion Style */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Comprehensive Guide</h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              Click on each section to explore detailed information
            </p>
          </div>

          <div className="space-y-4">
            {guideTopics.map((topic, index) => (
              <GuideAccordion
                key={index}
                topic={topic}
                index={index}
                isActive={activeAccordion === index}
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-black/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              Common questions from contact lens wearers
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border border-black/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-black/[0.02] transition-colors"
                >
                  <EditableField pageId={PAGE_IDS.guide} fieldName={`faq_${index + 1}_question`} value={faq.question}>
                    <span className="text-sm md:text-base font-normal">{faq.question}</span>
                  </EditableField>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-black/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-5 md:pb-6 text-sm md:text-base text-black/60 leading-relaxed border-t border-black/5 pt-5">
                        <EditableField pageId={PAGE_IDS.guide} fieldName={`faq_${index + 1}_answer`} value={faq.answer} multiline>
                          {faq.answer}
                        </EditableField>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-white/70" />
            <EditableField pageId={PAGE_IDS.guide} fieldName="cta_title" value={content.cta_title}>
              <h2 className="text-3xl md:text-5xl mb-6">{content.cta_title}</h2>
            </EditableField>
            <EditableField pageId={PAGE_IDS.guide} fieldName="cta_description" value={content.cta_description} multiline>
              <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg mb-8 leading-relaxed">{content.cta_description}</p>
            </EditableField>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-white text-black overflow-hidden transition-all duration-300 rounded-lg"
              >
                <span className="relative z-10 text-xs md:text-sm tracking-widest group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  {content.cta_button}
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Guide Accordion Component
function GuideAccordion({
  topic,
  index,
  isActive,
  onClick
}: {
  topic: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = topic.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive ? 'border-black shadow-xl' : 'border-black/10 hover:border-black/20'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 md:px-8 py-6 md:py-8 flex items-center gap-4 md:gap-6 text-left hover:bg-black/[0.01] transition-colors"
      >
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
          isActive ? 'bg-black' : 'bg-black/5'
        }`}>
          <Icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-black/60'
          }`} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg md:text-2xl mb-1">{topic.title}</h3>
          <p className="text-xs md:text-sm text-black/50">Click to expand</p>
        </div>

        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-black/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-black/5">
              {/* Content based on topic type */}
              {topic.content && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {topic.content.map((item: any, idx: number) => (
                    <div key={idx} className="border border-black/10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-black" />
                        {item.title}
                      </h4>
                      <p className="text-sm text-black/60 mb-4 leading-relaxed">{item.description}</p>

                      {item.pros && (
                        <div className="space-y-2 mb-4">
                          <p className="text-xs font-medium text-black/80">Benefits:</p>
                          <ul className="space-y-1">
                            {item.pros.map((pro: string, i: number) => (
                              <li key={i} className="text-xs text-black/60 flex items-start gap-2">
                                <span className="text-black/40 mt-1">•</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.dos && (
                        <>
                          <div className="mb-3">
                            <p className="text-xs font-medium text-black/80 mb-2 flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" /> Do:
                            </p>
                            <ul className="space-y-1">
                              {item.dos.map((d: string, i: number) => (
                                <li key={i} className="text-xs text-black/60 flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-black/80 mb-2 flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Don&apos;t:
                            </p>
                            <ul className="space-y-1">
                              {item.donts.map((d: string, i: number) => (
                                <li key={i} className="text-xs text-black/60 flex items-start gap-2">
                                  <XCircle className="w-3 h-3 text-red-600 flex-shrink-0 mt-0.5" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                      {item.bestFor && (
                        <div className="mt-4 pt-4 border-t border-black/5">
                          <p className="text-xs text-black/50">Best for: <span className="text-black/70">{item.bestFor}</span></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {topic.steps && (
                <div className="space-y-4 mt-6">
                  {topic.steps.map((step: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex gap-4 md:gap-6 p-4 md:p-6 bg-black/[0.02] rounded-xl hover:bg-black/[0.04] transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center text-lg md:text-xl font-light">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base md:text-lg mb-2">{step.title}</h4>
                        <p className="text-sm text-black/60 mb-3 leading-relaxed">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.tips.map((tip: string, i: number) => (
                            <span key={i} className="text-xs px-3 py-1 bg-white border border-black/10 rounded-full text-black/60">
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {topic.problems && (
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {topic.problems.map((problem: any, idx: number) => (
                    <div key={idx} className="border border-black/10 rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <AlertCircle className="w-5 h-5 text-black/60 flex-shrink-0 mt-0.5" />
                        <h4 className="text-base font-medium">{problem.issue}</h4>
                      </div>

                      <div className="mb-3">
                        <p className="text-xs text-black/50 mb-2">Common Causes:</p>
                        <ul className="space-y-1">
                          {problem.causes.map((cause: string, i: number) => (
                            <li key={i} className="text-xs text-black/60 flex items-start gap-2">
                              <span className="text-black/40">•</span>
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs text-black/50 mb-2">Solutions:</p>
                        <ul className="space-y-1">
                          {problem.solutions.map((solution: string, i: number) => (
                            <li key={i} className="text-xs text-black/60 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
