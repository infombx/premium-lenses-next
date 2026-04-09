import Image from 'next/image'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-10">
        <Image
          src="/logo_black_white.svg"
          alt="Premium Lenses"
          width={160}
          height={48}
          className="mx-auto"
        />

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide">Coming Soon</h1>
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            We&apos;re putting the finishing touches on something special.<br />
            Premium contact lenses, delivered to you.
          </p>
        </div>
      </div>
    </div>
  )
}
