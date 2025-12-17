import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Transactions from "@/pages/transactions";
import Submit from "@/pages/submit";
import Ticket from "@/pages/ticket";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Default title
    let title = "Registrar's office";

    // Page-specific titles
    if (location.startsWith("/admin")) {
      title = "Registrar Admin";
    } else if (location.startsWith("/transactions")) {
      title = "Transactions - Registrar's office";
    } else if (location === "/submit") {
      title = "Submit - Registrar's office";
    } else if (location === "/ticket") {
      title = "Ticket - Registrar's office";
    } else if (location === "/") {
      title = "Registrar's office";
    }

    document.title = title;
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/submit" component={Submit} />
      <Route path="/ticket" component={Ticket} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
