import { useLocation, useSearch } from "wouter";
import { ChevronLeft, Printer, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Ticket() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const dataParam = params.get("data");

  let queueData = null;
  try {
    if (dataParam) {
      queueData = JSON.parse(decodeURIComponent(dataParam));
    }
  } catch (e) {
    console.error("Failed to parse queue data");
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (!queueData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No ticket data found</p>
          <Button onClick={() => setLocation("/")} data-testid="button-go-home">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.9), rgba(0,51,102,0.85)), url('plv-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-blue-900/80 backdrop-blur-sm border-b border-white/10 print:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/transactions")}
          className="text-white hover:bg-white/10"
          data-testid="button-back"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold text-white">Queue Ticket</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/10"
          data-testid="button-home"
        >
          <Home className="h-6 w-6" />
        </Button>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <Card className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-6 py-4 text-center">
            <h2 className="text-xs font-medium uppercase tracking-wider mb-1">
              Pamantasan ng Lungsod ng Valenzuela
            </h2>
            <h3 className="text-sm font-bold uppercase">
              Registrar's Office
            </h3>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{formatDate(queueData.timestamp)}</span>
              <span>{formatTime(queueData.timestamp)}</span>
            </div>
          </div>

          <div className="px-6 py-8 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              Queue No.
            </p>
            <div className="text-7xl font-bold text-blue-800 tracking-wider mb-4" data-testid="text-queue-number">
              {queueData.queueNumber}
            </div>
            
            <Separator className="my-4" />
            
            <p className="text-xs text-gray-500 mb-1">
              Please monitor the Queue Screen for your turn
            </p>
            <p className="text-xs text-gray-500 mb-3">
              and proceed to
            </p>
            <p className="text-2xl font-bold text-blue-700 mb-4" data-testid="text-window">
              WINDOW {queueData.window}
            </p>
            
            <Separator className="my-4" />
            
            <div className="text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction:</span>
                <span className="text-gray-800 font-medium text-right max-w-[60%]" data-testid="text-transaction">
                  {queueData.transactionName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="text-gray-800 font-medium" data-testid="text-name">
                  {queueData.fullName}
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-center text-xs text-gray-500 italic">
              Please don't lose this ticket
            </p>
          </div>

          <div className="bg-gray-100 py-3 flex items-center justify-center gap-2">
            {[...Array(30)].map((_, i) => (
              <div key={i} className={`w-1 h-8 ${i % 2 === 0 ? 'bg-gray-800' : 'bg-white'}`} />
            ))}
          </div>
        </Card>
      </div>

      <div className="px-4 pb-6 print:hidden">
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <Button
            onClick={handlePrint}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold flex items-center justify-center gap-2"
            data-testid="button-print"
          >
            <Printer className="h-5 w-5" />
            Print Ticket
          </Button>
          <Button
            variant="outline"
            onClick={() => setLocation("/transactions")}
            className="w-full h-12 rounded-lg font-semibold bg-white/90"
            data-testid="button-new-transaction"
          >
            New Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
