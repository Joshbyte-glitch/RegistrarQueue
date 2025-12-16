import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.85), rgba(0,51,102,0.7)), url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-32 h-32 mb-6 rounded-full bg-white/90 flex items-center justify-center shadow-xl border-4 border-white/50">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center">
            <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none"/>
              <path d="M30 70 L50 30 L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M35 60 L65 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="50" cy="25" r="5" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
          KiosKonnekt
        </h1>
        <p className="text-white/80 text-sm mb-2">
          Pamantasan ng Lungsod ng Valenzuela
        </p>
        <p className="text-white/70 text-xs mb-8">
          "Your all-in-one campus information kiosk"
        </p>
        
        <Button 
          onClick={() => setLocation("/transactions")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg border-2 border-white/30"
          data-testid="button-see-transactions"
        >
          See Transactions
        </Button>
      </div>
    </div>
  );
}
