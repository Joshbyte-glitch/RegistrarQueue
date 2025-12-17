// Queue storage and management functions for admin panel

const QUEUE_STORAGE_KEY = "queueEntries";
const QUEUE_COUNTER_KEY = "queueNumberCounter";
const KIOSK_STATUS_KEY = "kioskStatus";

// Get all queue entries
export function getAllQueueEntries() {
  try {
    const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save queue entry
export function saveQueueEntry(queueData) {
  try {
    const entries = getAllQueueEntries();
    const entry = {
      ...queueData,
      id: Date.now().toString(),
      status: "pending", // pending, called, served
      createdAt: new Date().toISOString(),
    };
    entries.push(entry);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(entries));
    return entry;
  } catch {
    return null;
  }
}

// Update queue entry status
export function updateQueueStatus(queueId, status) {
  try {
    const entries = getAllQueueEntries();
    const updated = entries.map((entry) =>
      entry.id === queueId ? { ...entry, status, updatedAt: new Date().toISOString() } : entry
    );
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

// Get pending queue entries
export function getPendingQueue() {
  const entries = getAllQueueEntries();
  return entries.filter((e) => e.status === "pending").sort((a, b) => {
    const numA = parseInt(a.queueNumber) || 0;
    const numB = parseInt(b.queueNumber) || 0;
    return numA - numB;
  });
}

// Get queue by window
export function getQueueByWindow(window) {
  const entries = getAllQueueEntries();
  return entries
    .filter((e) => e.window === window && e.status === "pending")
    .sort((a, b) => {
      const numA = parseInt(a.queueNumber) || 0;
      const numB = parseInt(b.queueNumber) || 0;
      return numA - numB;
    });
}

// Get statistics
export function getQueueStatistics() {
  const entries = getAllQueueEntries();
  const today = new Date().toDateString();
  const todayEntries = entries.filter((e) => {
    const entryDate = new Date(e.createdAt).toDateString();
    return entryDate === today;
  });

  return {
    totalToday: todayEntries.length,
    pending: entries.filter((e) => e.status === "pending").length,
    called: entries.filter((e) => e.status === "called").length,
    served: entries.filter((e) => e.status === "served").length,
    byWindow: {
      1: getQueueByWindow(1).length,
      2: getQueueByWindow(2).length,
      3: getQueueByWindow(3).length,
      4: getQueueByWindow(4).length,
      5: getQueueByWindow(5).length,
      6: getQueueByWindow(6).length,
      7: getQueueByWindow(7).length,
      8: getQueueByWindow(8).length,
      9: getQueueByWindow(9).length,
      10: getQueueByWindow(10).length,
    },
  };
}

// Reset queue counter
export function resetQueueCounter() {
  try {
    localStorage.setItem(QUEUE_COUNTER_KEY, "0");
    return true;
  } catch {
    return false;
  }
}

// Clear all queue entries
export function clearAllQueueEntries() {
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

// Kiosk status management
export function getKioskStatus() {
  try {
    const status = localStorage.getItem(KIOSK_STATUS_KEY);
    // Default to true (available) if not set
    return status === null ? true : status === "true";
  } catch {
    return true;
  }
}

export function setKioskStatus(isAvailable) {
  try {
    localStorage.setItem(KIOSK_STATUS_KEY, isAvailable.toString());
    return true;
  } catch {
    return false;
  }
}

