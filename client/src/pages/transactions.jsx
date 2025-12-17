import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Search, Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transactionCategories } from "@/lib/transactionData";
import { getKioskStatus } from "@/lib/queueStorage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Transactions() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [kioskAvailable, setKioskAvailable] = useState(true);

  useEffect(() => {
    const checkKioskStatus = () => {
      setKioskAvailable(getKioskStatus());
    };
    checkKioskStatus();
    const interval = setInterval(checkKioskStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredCategories = transactionCategories.map(category => ({
    ...category,
    transactions: category.transactions.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    searchQuery === "" || category.transactions.length > 0
  );

  const handleTransactionSelect = (transaction) => {
    if (!kioskAvailable) {
      alert("The registrar is not accepting queue entries at this time. Please try again later.");
      return;
    }
    setLocation(`/submit?transactionId=${transaction.id}`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.92), rgba(0,51,102,0.88)), url('plv-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-blue-900/80 backdrop-blur-sm border-b border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/10"
          data-testid="button-back-home"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold text-white">Transactions</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/10"
          data-testid="button-menu"
        >
          <Home className="h-6 w-6" />
        </Button>
      </header>

      <div className="px-4 py-2 bg-blue-800/50">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => setLocation("/")}
                className="text-white/70 hover:text-white cursor-pointer text-sm"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/50" />
            <BreadcrumbItem>
              <span className="text-white font-medium text-sm">Transactions</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {!kioskAvailable && (
            <div className="mb-4 p-4 bg-red-500/90 text-white rounded-lg border-2 border-red-600 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Kiosk Temporarily Closed</h3>
                  <p className="text-sm mt-1">The registrar is not accepting queue entries at this time. Please try again later.</p>
                </div>
              </div>
            </div>
          )}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/95 border-0 rounded-lg"
              data-testid="input-search"
            />
          </div>

          <Accordion 
            type="multiple" 
            value={expandedCategories}
            onValueChange={setExpandedCategories}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border-0 rounded-lg overflow-hidden bg-white/95 shadow-md md:self-start"
                >
                  <AccordionTrigger 
                    className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&[data-state=open]]:bg-gray-50"
                    data-testid={`accordion-trigger-${category.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-800 text-left text-sm">
                        {category.name}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-0">
                      {category.transactions.map((transaction, idx) => (
                        <button
                          key={transaction.id}
                          onClick={() => handleTransactionSelect(transaction)}
                          className={`w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors flex items-center gap-2 ${
                            idx !== category.transactions.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          data-testid={`button-transaction-${transaction.id}`}
                        >
                          <ChevronRight className="h-3 w-3 text-blue-600 flex-shrink-0" />
                          <span>{transaction.name}</span>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
