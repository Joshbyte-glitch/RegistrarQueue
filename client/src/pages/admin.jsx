import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Home, RefreshCw, Bell, CheckCircle, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  getAllQueueEntries,
  getPendingQueue,
  getQueueByWindow,
  getQueueStatistics,
  updateQueueStatus,
  resetQueueCounter,
  clearAllQueueEntries,
  getKioskStatus,
  setKioskStatus,
} from "@/lib/queueStorage";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [pendingQueue, setPendingQueue] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedWindow, setSelectedWindow] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [kioskAvailable, setKioskAvailable] = useState(true);

  // Simple password check (you can change this)
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (isAuthenticated) {
      loadQueueData();
      setKioskAvailable(getKioskStatus());
      const interval = setInterval(loadQueueData, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadQueueData = () => {
    const pending = getPendingQueue();
    setPendingQueue(pending);
    setStats(getQueueStatistics());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadQueueData();
    } else {
      alert("Incorrect password");
    }
  };

  const handleCallNext = (queueId) => {
    if (updateQueueStatus(queueId, "called")) {
      loadQueueData();
    }
  };

  const handleMarkServed = (queueId) => {
    if (updateQueueStatus(queueId, "served")) {
      loadQueueData();
    }
  };

  const handleResetCounter = () => {
    if (confirm("Reset queue counter to 0001? This will not delete existing queue entries.")) {
      resetQueueCounter();
      alert("Queue counter reset successfully");
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear ALL queue entries? This action cannot be undone.")) {
      clearAllQueueEntries();
      loadQueueData();
      alert("All queue entries cleared");
    }
  };

  const handleToggleKiosk = () => {
    const newStatus = !kioskAvailable;
    setKioskStatus(newStatus);
    setKioskAvailable(newStatus);
  };

  const filteredQueue = selectedWindow
    ? getQueueByWindow(selectedWindow)
    : pendingQueue;

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.92), rgba(0,51,102,0.88)), url('plv-background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,51,102,0.92), rgba(0,51,102,0.88)), url('plv-background.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-blue-900/80 backdrop-blur-sm border-b border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="text-white hover:bg-white/10"
        >
          <Home className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
            <Label htmlFor="kiosk-toggle" className="text-white text-sm cursor-pointer">
              Kiosk {kioskAvailable ? "Available" : "Closed"}
            </Label>
            <Switch
              id="kiosk-toggle"
              checked={kioskAvailable}
              onCheckedChange={handleToggleKiosk}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAuthenticated(false)}
            className="text-white hover:bg-white/10"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Statistics Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalToday}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">       
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Called
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.called}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Served
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.served}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Window Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Filter by Window
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedWindow === null ? "default" : "outline"}
                  onClick={() => setSelectedWindow(null)}
                  size="sm"
                >
                  All Windows
                </Button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((win) => (
                  <Button
                    key={win}
                    variant={selectedWindow === win ? "default" : "outline"}
                    onClick={() => setSelectedWindow(win)}
                    size="sm"
                  >
                    Window {win} ({stats?.byWindow[win] || 0})
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Queue List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Current Queue ({filteredQueue.length})
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetCounter}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Counter
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearAll}
                  >
                    Clear All
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredQueue.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No pending queue entries
                </p>
              ) : (
                <div className="space-y-2">
                  {filteredQueue.map((entry) => {
                    const isCalled = entry.status === "called";
                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center justify-between p-4 border rounded-lg bg-white ${
                          isCalled ? "border-blue-500 bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-blue-800">
                            {entry.queueNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{entry.fullName}</p>
                              {isCalled && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                                  Called
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {entry.transactionName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Window {entry.window} • {entry.category}
                            </p>
                            {entry.studentNumber && (
                              <p className="text-xs text-muted-foreground">
                                Student #: {entry.studentNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => !isCalled && handleCallNext(entry.id)}
                            className={`bg-blue-600 hover:bg-blue-700 ${
                              isCalled ? "opacity-60 cursor-default" : ""
                            }`}
                            disabled={isCalled}
                            title={isCalled ? "This number has already been called" : "Call this number"}
                          >
                            <Bell className="h-4 w-4 mr-2" />
                            {isCalled ? "Called" : "Call"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleMarkServed(entry.id)}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Served
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

