import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.85), rgba(0,51,102,0.7)), url('plv-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-28 h-28 mb-6 rounded-full bg-white/90 flex items-center justify-center shadow-lg border-4 border-white/40 overflow-hidden">
          <img
            src="/frame-9.svg"
            alt="KiosKonnekT logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">
          KiosKonnekt
        </h1>
        <p className="text-white/80 text-sm">
          Pamantasan ng Lungsod ng Valenzuela
        </p>
        <p className="text-white/70 text-xs mb-10">
          "Your all-in-one campus information kiosk"
        </p>
        
        <Button 
          onClick={() => setLocation("/transactions")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 text-base rounded-full shadow-lg border border-white/30"
          data-testid="button-see-transactions"
        >
          See Transactions
        </Button>
      </div>
    </div>
  );
}
