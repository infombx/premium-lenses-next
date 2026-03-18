import { 
  Eye, Glasses, Sparkles, Heart, Star, ShoppingCart, Search, 
  User, Mail, Phone, MapPin, Calendar, Clock, Settings,
  ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, ChevronDown,
  Check, X, Plus, Minus, AlertCircle, Info, Menu
} from 'lucide-react';

export function Icons() {
  const iconSizes = [
    { size: 16, label: 'Small', class: 'w-4 h-4' },
    { size: 20, label: 'Medium', class: 'w-5 h-5' },
    { size: 24, label: 'Large', class: 'w-6 h-6' },
    { size: 32, label: 'XL', class: 'w-8 h-8' },
  ];

  const commonIcons = [
    { Icon: Eye, name: 'Eye' },
    { Icon: Glasses, name: 'Glasses' },
    { Icon: Sparkles, name: 'Sparkles' },
    { Icon: Heart, name: 'Heart' },
    { Icon: Star, name: 'Star' },
    { Icon: ShoppingCart, name: 'Shopping Cart' },
    { Icon: Search, name: 'Search' },
    { Icon: User, name: 'User' },
    { Icon: Mail, name: 'Mail' },
    { Icon: Phone, name: 'Phone' },
    { Icon: MapPin, name: 'Map Pin' },
    { Icon: Calendar, name: 'Calendar' },
    { Icon: Clock, name: 'Clock' },
    { Icon: Settings, name: 'Settings' },
  ];

  const arrowIcons = [
    { Icon: ArrowRight, name: 'Arrow Right' },
    { Icon: ArrowLeft, name: 'Arrow Left' },
    { Icon: ChevronRight, name: 'Chevron Right' },
    { Icon: ChevronLeft, name: 'Chevron Left' },
    { Icon: ChevronDown, name: 'Chevron Down' },
  ];

  const actionIcons = [
    { Icon: Check, name: 'Check' },
    { Icon: X, name: 'Close' },
    { Icon: Plus, name: 'Plus' },
    { Icon: Minus, name: 'Minus' },
    { Icon: Menu, name: 'Menu' },
  ];

  const statusIcons = [
    { Icon: AlertCircle, name: 'Alert' },
    { Icon: Info, name: 'Info' },
    { Icon: Check, name: 'Success' },
    { Icon: X, name: 'Error' },
  ];

  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Icons</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        A comprehensive icon system using Lucide React for consistent, scalable vector icons throughout the interface.
      </p>

      {/* Icon Sizes */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Icon Sizes</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex items-end gap-8">
            {iconSizes.map((size, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <Eye className={size.class} />
                <div className="text-center">
                  <p className="text-sm">{size.label}</p>
                  <p className="text-xs text-black/40">{size.size}px</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Icons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Common Icons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {commonIcons.map(({ Icon, name }, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4 hover:bg-black/5 rounded-sm transition-colors">
                <Icon className="w-6 h-6" />
                <p className="text-xs text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow Icons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Navigation Icons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {arrowIcons.map(({ Icon, name }, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4 hover:bg-black/5 rounded-sm transition-colors">
                <Icon className="w-6 h-6" />
                <p className="text-xs text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Icons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Action Icons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {actionIcons.map(({ Icon, name }, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4 hover:bg-black/5 rounded-sm transition-colors">
                <Icon className="w-6 h-6" />
                <p className="text-xs text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Icons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Status Icons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-sm">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">Success message</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
              <X className="w-5 h-5 text-red-600" />
              <span className="text-sm text-red-800">Error message</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-yellow-800">Warning message</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-sm">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800">Info message</span>
            </div>
          </div>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Icon Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-black text-black hover:bg-black hover:text-white transition-all">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/5 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-black/20 text-black/40 cursor-not-allowed">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Icon with Text */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Icons with Text</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-black/60" />
            <span className="text-sm">contact@visionlens.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-black/60" />
            <span className="text-sm">1-800-VISION</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-black/60" />
            <span className="text-sm">123 Vision Street, CA 94000</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-black/60" />
            <span className="text-sm">Monday - Friday, 9AM - 6PM</span>
          </div>
        </div>
      </div>

      {/* Icon Backgrounds */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Icon Backgrounds</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap gap-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center">
              <Glasses className="w-8 h-8 text-black" />
            </div>
            <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <div className="w-16 h-16 bg-black rounded-sm flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 bg-black/10 rounded-sm flex items-center justify-center">
              <Star className="w-8 h-8 text-black" />
            </div>
            <div className="w-16 h-16 border-2 border-black rounded-sm flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
