import { Calculator } from "./components/Calculator";

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with Logos */}
      <header role="banner" className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Logo Container */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              {/* PU Logo */}
              <div className="h-10 flex-shrink-0">
                <img
                  src="/assets/images/pu-logo-tp-wide.png"
                  alt="Purrfect Universe Logo"
                  className="h-10 w-auto"
                />
              </div>

              {/* MM Logo */}
              <div className="h-10 flex-shrink-0">
                <img
                  src="/assets/images/mm-logo-tp-dark.png"
                  alt="Motion Mechanics Logo"
                  className="h-10 w-auto"
                />
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content with Brand Background */}
      <div className="relative min-h-[calc(100vh-5rem)]">
        {/* Branded Background - Green gradient theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(22,122,66,0.3),rgba(0,0,0,0))]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        {/* Content */}
        <div className="relative z-10">
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
