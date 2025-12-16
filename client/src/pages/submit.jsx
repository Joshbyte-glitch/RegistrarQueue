js
import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { ChevronLeft, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  transactionCategories, 
  getTransactionById, 
  getCategoryByTransactionId,
  generateQueueNumber,
  assignWindow
} from "@/lib/transactionData";

export default function Submit() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const preselectedTransactionId = params.get("transactionId") || "";

  const [fullName, setFullName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(preselectedTransactionId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [queueData, setQueueData] = useState(null);

  const transaction = selectedTransaction ? getTransactionById(selectedTransaction) : null;
  const category = selectedTransaction ? getCategoryByTransactionId(selectedTransaction) : null;

  const formProgress = () => {
    let filled = 0;
    if (fullName.trim()) filled++;
    if (selectedTransaction) filled++;
    if (yearLevel) filled++;
    // Student number only counted for current students, not alumni/visitors
    const isCurrentStudent =
      yearLevel === "1st-year" ||
      yearLevel === "2nd-year" ||
      yearLevel === "3rd-year" ||
      yearLevel === "4th-year" ||
      yearLevel === "graduate";
    if (isCurrentStudent && studentNumber.trim()) filled++;
    return Math.round((filled / 4) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !selectedTransaction) return;

    // If the user selects a current student year level, require student number.
    const isCurrentStudent =
      yearLevel === "1st-year" ||
      yearLevel === "2nd-year" ||
      yearLevel === "3rd-year" ||
      yearLevel === "4th-year" ||
      yearLevel === "graduate";
    if (isCurrentStudent && !studentNumber.trim()) {
      alert(
        "Please enter your student number, or choose 'Alumni' or 'Visitor (no student number yet)' as Year Level."
      );
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const transactionInfo = getTransactionById(selectedTransaction);
    const categoryInfo = getCategoryByTransactionId(selectedTransaction);
    
    if (transactionInfo && categoryInfo) {
      const data = {
        queueNumber: generateQueueNumber(),
        window: assignWindow(categoryInfo.name),
        transactionName: transactionInfo.name,
        category: categoryInfo.name,
        fullName: fullName.trim(),
        timestamp: new Date()
      };
      setQueueData(data);
      setShowSuccess(true);
    }
    
    setIsSubmitting(false);
  };

  const handleViewTicket = () => {
    if (queueData) {
      const ticketData = encodeURIComponent(JSON.stringify(queueData));
      setLocation(`/ticket?data=${ticketData}`);
    }
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
          onClick={() => setLocation("/transactions")}
          className="text-white hover:bg-white/10"
          data-testid="button-back-transactions"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold text-white">Submit Queue Transaction</h1>
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
              <BreadcrumbLink 
                onClick={() => setLocation("/transactions")}
                className="text-white/70 hover:text-white cursor-pointer text-sm"
              >
                Transactions
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/50" />
            <BreadcrumbItem>
              <span className="text-white font-medium text-sm">Submit</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-4 py-3 bg-blue-900/40">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/70">Form Progress</span>
            <span className="text-xs text-white/70">{formProgress()}%</span>
          </div>
          <Progress value={formProgress()} className="h-2 bg-white/20" />
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Student / Visitor Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white font-medium text-sm">
                Full Name <span className="text-red-300">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white/95 border-0 rounded-lg h-11"
                required
                data-testid="input-fullname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentNumber" className="text-white font-medium text-sm">
                Student Number{" "}
                <span className="text-white/60 text-xs font-normal">
                  (required for current students and visitors can leave it blank)
                </span>
              </Label>
              <Input
                id="studentNumber"
                type="text"
                placeholder="e.g., 22-2222 (leave blank only if visitor) "
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                className="bg-white/95 border-0 rounded-lg h-11"
                data-testid="input-student-number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearLevel" className="text-white font-medium text-sm">
                Year Level
              </Label>
              <Select value={yearLevel} onValueChange={setYearLevel}>
                <SelectTrigger 
                  className="bg-white/95 border-0 rounded-lg h-11"
                  data-testid="select-year-level"
                >
                  <SelectValue placeholder="Select year level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st-year">1st Year</SelectItem>
                  <SelectItem value="2nd-year">2nd Year</SelectItem>
                  <SelectItem value="3rd-year">3rd Year</SelectItem>
                  <SelectItem value="4th-year">4th Year</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Contact Details 
            </h3>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium text-sm">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 border-0 rounded-lg h-11"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-medium text-sm">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="09XX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/95 border-0 rounded-lg h-11"
                data-testid="input-phone"
              />
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Transaction Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="transaction" className="text-white font-medium text-sm">
                Transaction Type <span className="text-red-300">*</span>
              </Label>
              <Select 
                value={selectedTransaction} 
                onValueChange={setSelectedTransaction}
              >
                <SelectTrigger 
                  className="bg-white/95 border-0 rounded-lg h-11"
                  data-testid="select-transaction"
                >
                  <SelectValue placeholder="Select a transaction" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {transactionCategories.map(category => (
                    <div key={category.id}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50">
                        {category.name}
                      </div>
                      {category.transactions.map(t => (
                        <SelectItem 
                          key={t.id} 
                          value={t.id}
                          className="pl-4"
                        >
                          {t.name}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              {transaction && (
                <p className="text-xs text-white/60 mt-1">
                  Category: {category?.name}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!fullName.trim() || !selectedTransaction || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold text-base disabled:opacity-50"
              data-testid="button-submit"
            >
              {isSubmitting ? "Processing..." : "SUBMIT"}
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm mx-auto bg-white rounded-xl p-6">
          <DialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Submission Successful!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Thank you! Your Request will be queued
            </DialogDescription>
          </DialogHeader>
          
          {queueData && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">This is your Queue Number</p>
              <div className="text-6xl font-bold text-blue-800 tracking-wider">
                {queueData.queueNumber}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Please wait/look at the Queue Number Screen for your turn and proceed to
              </p>
              <p className="text-lg font-semibold text-blue-700 mt-1">
                WINDOW {queueData.window}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={handleViewTicket}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold"
              data-testid="button-print-ticket"
            >
              PRINT TICKET
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false);
                setFullName("");
                setStudentNumber("");
                setEmail("");
                setPhone("");
                setYearLevel("");
                setSelectedTransaction("");
                setLocation("/transactions");
              }}
              className="w-full h-12 rounded-lg font-semibold"
              data-testid="button-new-transaction"
            >
              New Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
