export function Spacing() {
  const spacingScale = [
    { size: '4px', class: 'p-1', name: 'xs' },
    { size: '8px', class: 'p-2', name: 'sm' },
    { size: '12px', class: 'p-3', name: 'md' },
    { size: '16px', class: 'p-4', name: 'lg' },
    { size: '24px', class: 'p-6', name: 'xl' },
    { size: '32px', class: 'p-8', name: '2xl' },
    { size: '48px', class: 'p-12', name: '3xl' },
    { size: '64px', class: 'p-16', name: '4xl' },
    { size: '96px', class: 'p-24', name: '5xl' },
    { size: '128px', class: 'p-32', name: '6xl' },
  ];

  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Spacing</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        A consistent spacing system based on an 8px grid for rhythm and visual harmony throughout the interface.
      </p>

      {/* Spacing Scale */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Spacing Scale</h2>
        <div className="border border-black/10 rounded-sm divide-y divide-black/10">
          {spacingScale.map((space, index) => (
            <div key={index} className="p-6 flex items-center gap-8">
              <div className="w-32 text-sm font-mono text-black/60">{space.size}</div>
              <div className="w-32 text-sm text-black/40">{space.name}</div>
              <div className="flex-1">
                <div className="bg-black h-12" style={{ width: space.size }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Spacing */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Component Spacing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compact */}
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-xl mb-4">Compact</h3>
            <div className="bg-black/5 p-4 space-y-2">
              <div className="bg-white border border-black/10 p-3">
                <p className="text-sm">Small padding (12px)</p>
              </div>
              <div className="bg-white border border-black/10 p-3">
                <p className="text-sm">Minimal gaps (8px)</p>
              </div>
            </div>
            <p className="text-xs text-black/60 mt-4">Dense layouts, forms</p>
          </div>

          {/* Regular */}
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-xl mb-4">Regular</h3>
            <div className="bg-black/5 p-6 space-y-4">
              <div className="bg-white border border-black/10 p-4">
                <p className="text-sm">Standard padding (16px)</p>
              </div>
              <div className="bg-white border border-black/10 p-4">
                <p className="text-sm">Regular gaps (16px)</p>
              </div>
            </div>
            <p className="text-xs text-black/60 mt-4">Cards, standard components</p>
          </div>

          {/* Comfortable */}
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-xl mb-4">Comfortable</h3>
            <div className="bg-black/5 p-8 space-y-6">
              <div className="bg-white border border-black/10 p-6">
                <p className="text-sm">Generous padding (24px)</p>
              </div>
              <div className="bg-white border border-black/10 p-6">
                <p className="text-sm">Spacious gaps (24px)</p>
              </div>
            </div>
            <p className="text-xs text-black/60 mt-4">Feature sections, hero areas</p>
          </div>

          {/* Spacious */}
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-xl mb-4">Spacious</h3>
            <div className="bg-black/5 p-12 space-y-8">
              <div className="bg-white border border-black/10 p-8">
                <p className="text-sm">Large padding (32px+)</p>
              </div>
              <div className="bg-white border border-black/10 p-8">
                <p className="text-sm">Wide gaps (32px+)</p>
              </div>
            </div>
            <p className="text-xs text-black/60 mt-4">Page sections, landing areas</p>
          </div>
        </div>
      </div>

      {/* Section Spacing */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Section Spacing</h2>
        <div className="border border-black/10 rounded-sm p-8 bg-white">
          <div className="space-y-16">
            <div className="border-l-2 border-black pl-6">
              <p className="text-xs uppercase tracking-wider text-black/40 mb-2">SECTION</p>
              <h3 className="text-3xl font-light mb-4">Section Title</h3>
              <p className="text-black/60">
                Sections should have generous vertical spacing (64-96px) to create clear visual separation and breathing room.
              </p>
            </div>

            <div className="border-l-2 border-black pl-6">
              <p className="text-xs uppercase tracking-wider text-black/40 mb-2">SECTION</p>
              <h3 className="text-3xl font-light mb-4">Another Section</h3>
              <p className="text-black/60">
                Consistent spacing creates rhythm and helps users scan and navigate content more easily.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10">
            <p className="text-sm text-black/60">
              <span className="font-medium">Recommendation:</span> Use 48-64px for related sections, 
              96-128px for distinct content areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
