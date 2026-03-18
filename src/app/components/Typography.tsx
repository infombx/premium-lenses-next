export function Typography() {
  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Typography</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        A refined typographic system emphasizing hierarchy, readability, and elegance through careful use of weight and spacing.
      </p>

      {/* Font Stack */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Font Stack</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <p className="text-2xl mb-4">System Font Stack</p>
          <code className="text-sm text-black/60 block bg-black/5 p-4 rounded">
            -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
          </code>
        </div>
      </div>

      {/* Heading Styles */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Headings</h2>
        <div className="border border-black/10 rounded-sm divide-y divide-black/10">
          <div className="p-8">
            <h1 className="text-7xl font-light tracking-tight">Display Large</h1>
            <p className="text-sm text-black/40 mt-2">72px / Light / -0.02em</p>
          </div>
          <div className="p-8">
            <h1 className="text-6xl font-light tracking-tight">Display Medium</h1>
            <p className="text-sm text-black/40 mt-2">60px / Light / -0.02em</p>
          </div>
          <div className="p-8">
            <h2 className="text-5xl font-light tracking-tight">Heading 1</h2>
            <p className="text-sm text-black/40 mt-2">48px / Light / -0.01em</p>
          </div>
          <div className="p-8">
            <h3 className="text-4xl font-light tracking-tight">Heading 2</h3>
            <p className="text-sm text-black/40 mt-2">36px / Light / -0.01em</p>
          </div>
          <div className="p-8">
            <h4 className="text-3xl font-light">Heading 3</h4>
            <p className="text-sm text-black/40 mt-2">30px / Light / 0</p>
          </div>
          <div className="p-8">
            <h5 className="text-2xl">Heading 4</h5>
            <p className="text-sm text-black/40 mt-2">24px / Regular / 0</p>
          </div>
          <div className="p-8">
            <h6 className="text-xl">Heading 5</h6>
            <p className="text-sm text-black/40 mt-2">20px / Regular / 0</p>
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Body Text</h2>
        <div className="border border-black/10 rounded-sm divide-y divide-black/10">
          <div className="p-8">
            <p className="text-lg leading-relaxed">
              Body Large - The quick brown fox jumps over the lazy dog. Perfect for introductory paragraphs and important body content.
            </p>
            <p className="text-sm text-black/40 mt-2">18px / Regular / 1.7</p>
          </div>
          <div className="p-8">
            <p className="text-base leading-relaxed">
              Body Regular - The quick brown fox jumps over the lazy dog. Standard body text for most content and paragraphs throughout the interface.
            </p>
            <p className="text-sm text-black/40 mt-2">16px / Regular / 1.6</p>
          </div>
          <div className="p-8">
            <p className="text-sm leading-relaxed">
              Body Small - The quick brown fox jumps over the lazy dog. Used for captions, helper text, and secondary information.
            </p>
            <p className="text-sm text-black/40 mt-2">14px / Regular / 1.5</p>
          </div>
          <div className="p-8">
            <p className="text-xs leading-relaxed">
              Caption - The quick brown fox jumps over the lazy dog. For labels, metadata, and minimal text.
            </p>
            <p className="text-sm text-black/40 mt-2">12px / Regular / 1.4</p>
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Font Weights</h2>
        <div className="border border-black/10 rounded-sm divide-y divide-black/10">
          <div className="p-8 flex items-center justify-between">
            <span className="text-2xl font-light">Light (300)</span>
            <span className="text-sm text-black/40">Display headings</span>
          </div>
          <div className="p-8 flex items-center justify-between">
            <span className="text-2xl font-normal">Regular (400)</span>
            <span className="text-sm text-black/40">Body text</span>
          </div>
          <div className="p-8 flex items-center justify-between">
            <span className="text-2xl font-medium">Medium (500)</span>
            <span className="text-sm text-black/40">Emphasis, labels</span>
          </div>
          <div className="p-8 flex items-center justify-between">
            <span className="text-2xl font-semibold">Semibold (600)</span>
            <span className="text-sm text-black/40">Strong emphasis</span>
          </div>
        </div>
      </div>

      {/* Text Hierarchy Example */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Hierarchy Example</h2>
        <div className="border border-black/10 rounded-sm p-12 bg-white">
          <p className="text-xs uppercase tracking-wider text-black/40 mb-4">CATEGORY</p>
          <h2 className="text-5xl font-light tracking-tight mb-6">
            The Future of Vision
          </h2>
          <p className="text-lg text-black/60 leading-relaxed mb-6">
            Discover a new way to see the world with our advanced contact lens technology. 
            Designed for comfort, clarity, and style.
          </p>
          <p className="text-base text-black/60 leading-relaxed">
            Our lenses combine cutting-edge materials with precision engineering to deliver 
            an unparalleled wearing experience. Whether you're looking for daily disposables 
            or extended wear options, we have the perfect solution for your lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
}
