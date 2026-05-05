import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getHomepageContent } from '@/lib/wordpress'

export default async function NotFound() {
  const cms = await getHomepageContent()

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background image — same as hero */}
      <div className="absolute inset-0">
        <img
          src={cms.hero_image}
          alt="404 background"
          className="w-full h-full object-cover object-[75%_center] md:object-center"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/60 md:via-black/40 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-80 md:pt-56 pb-12 md:pb-16 lg:pb-24 h-full min-h-screen z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">
          <div className="space-y-6 md:space-y-8 max-w-xl">
            {/* Error label */}
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase">Error 404</p>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight text-white">
              We are not seeing the page you are looking for.
            </h1>

            {/* CTA */}
            <div>
              <Link href="/shop">
                <button className="group relative px-8 py-3 bg-white text-black overflow-hidden transition-all duration-300 rounded-lg">
                  <span className="relative z-10 text-sm tracking-wider group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                    See our lenses
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
