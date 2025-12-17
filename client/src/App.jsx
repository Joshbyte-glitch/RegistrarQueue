import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Transactions from "@/pages/transactions";
import Submit from "@/pages/submit";
import Ticket from "@/pages/ticket";
<<<<<<< HEAD
import Admin from "@/pages/admin";
=======
>>>>>>> 4be2deb93f067ef9f6bd5ec65df9118893a4f06c
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/submit" component={Submit} />
      <Route path="/ticket" component={Ticket} />
<<<<<<< HEAD
      <Route path="/admin" component={Admin} />
=======
>>>>>>> 4be2deb93f067ef9f6bd5ec65df9118893a4f06c
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
