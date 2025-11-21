'use client';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-gradient-to-r from-blue-600 to-purple-600">
                B
              </div>
              <span className="font-bold text-lg">Barmentech</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The easiest way to create your online store. Professional templates, integrated payments and powerful tools to grow your business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#templates" className="hover:text-white transition">Templates</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition">Licenses</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} Barmentech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
