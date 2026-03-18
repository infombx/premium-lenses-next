export function ColorSystem() {
  const colors = [
    { name: 'Primary Black', hex: '#000000', usage: 'Headings, icons, primary actions' },
    { name: 'Secondary Black', hex: '#1A1A1A', usage: 'Secondary text, backgrounds' },
    { name: 'Gray 60', hex: '#666666', usage: 'Body text, secondary information' },
    { name: 'Gray 40', hex: '#999999', usage: 'Placeholder text, disabled states' },
    { name: 'Gray 20', hex: '#CCCCCC', usage: 'Borders, dividers' },
    { name: 'Gray 10', hex: '#E5E5E5', usage: 'Subtle backgrounds, hover states' },
    { name: 'Gray 5', hex: '#F5F5F5', usage: 'Card backgrounds, section dividers' },
    { name: 'White', hex: '#FFFFFF', usage: 'Background, text on dark' },
  ];

  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Color System</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        A monochromatic palette focused on black, white, and grayscale tones for a clean, sophisticated aesthetic.
      </p>

      {/* Primary Colors */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Primary Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color, index) => (
            <div key={index} className="border border-black/10 rounded-sm overflow-hidden">
              <div
                className="h-32 border-b border-black/10"
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-4">
                <h3 className="text-lg mb-1">{color.name}</h3>
                <p className="text-sm text-black/40 font-mono mb-3">{color.hex}</p>
                <p className="text-xs text-black/60">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Opacity Scale */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Opacity Scale</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="space-y-4">
            {[100, 80, 60, 40, 20, 10, 5].map((opacity) => (
              <div key={opacity} className="flex items-center gap-4">
                <div
                  className="w-32 h-12 border border-black/10"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${opacity / 100})` }}
                />
                <span className="text-sm font-mono">Black {opacity}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Usage Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Light on Dark */}
          <div className="bg-black p-8 rounded-sm">
            <h3 className="text-white text-2xl mb-2">Light on Dark</h3>
            <p className="text-white/60">
              White text on black background for high contrast sections and dramatic emphasis.
            </p>
          </div>

          {/* Dark on Light */}
          <div className="bg-white border border-black/10 p-8 rounded-sm">
            <h3 className="text-black text-2xl mb-2">Dark on Light</h3>
            <p className="text-black/60">
              Black text on white background for maximum readability and clean presentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
