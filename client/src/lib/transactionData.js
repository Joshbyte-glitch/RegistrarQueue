import { FileText, BookOpen, User, Award, GraduationCap, MoreHorizontal } from "lucide-react";

export const transactionCategories = [
  {
    id: "academic-records",
    name: "Academic Records",
    icon: FileText,
    color: "bg-blue-600",
    transactions: [
      { id: "tor", name: "Request for Transcript of Records (TOR)", category: "Academic Records" },
      { id: "cog", name: "Request for Certificate of Grades", category: "Academic Records" },
      { id: "tcg", name: "Request for True Copy of Grades", category: "Academic Records" },
      { id: "diploma", name: "Request for Diploma / Certified True Copy of Diploma", category: "Academic Records" },
      { id: "hd", name: "Issuance of Honorable Dismissal / Transfer Credentials", category: "Academic Records" },
      { id: "cav", name: "Request for CAV (Certification, Authentication, and Verification)", category: "Academic Records" },
    ]
  },
  {
    id: "enrollment-registration",
    name: "Enrollment & Registration",
    icon: BookOpen,
    color: "bg-green-600",
    transactions: [
      { id: "enroll", name: "Subject enrollment / registration", category: "Enrollment & Registration" },
      { id: "add-drop", name: "Adding / Dropping of subjects", category: "Enrollment & Registration" },
      { id: "change-sched", name: "Change of schedule or section", category: "Enrollment & Registration" },
      { id: "late-enroll", name: "Late enrollment processing", category: "Enrollment & Registration" },
      { id: "validate", name: "Validation of enrollment", category: "Enrollment & Registration" },
    ]
  },
  {
    id: "student-info",
    name: "Student Information Updates",
    icon: User,
    color: "bg-purple-600",
    transactions: [
      { id: "correct-name", name: "Correction of name, birthdate, or personal details", category: "Student Information Updates" },
      { id: "civil-status", name: "Change of civil status (if applicable)", category: "Student Information Updates" },
      { id: "update-records", name: "Updating student records", category: "Student Information Updates" },
      { id: "student-number", name: "Issuance of student number verification", category: "Student Information Updates" },
    ]
  },
  {
    id: "certificates",
    name: "Certificates & Certifications",
    icon: Award,
    color: "bg-orange-600",
    transactions: [
      { id: "coe", name: "Certificate of Enrollment", category: "Certificates & Certifications" },
      { id: "cog-cert", name: "Certificate of Graduation", category: "Certificates & Certifications" },
      { id: "cue", name: "Certificate of Units Earned", category: "Certificates & Certifications" },
      { id: "cgmc", name: "Certificate of Good Moral Character", category: "Certificates & Certifications" },
      { id: "cert-purpose", name: "Certificate for Scholarship / Employment / Board Exam", category: "Certificates & Certifications" },
    ]
  },
  {
    id: "graduation",
    name: "Graduation-related Transactions",
    icon: GraduationCap,
    color: "bg-red-600",
    transactions: [
      { id: "apply-grad", name: "Application for graduation", category: "Graduation-related Transactions" },
      { id: "grad-status", name: "Graduation status verification", category: "Graduation-related Transactions" },
      { id: "clearance", name: "Clearance verification (academic-related)", category: "Graduation-related Transactions" },
      { id: "release-docs", name: "Release of graduation documents", category: "Graduation-related Transactions" },
    ]
  },
  {
    id: "others",
    name: "Others",
    icon: MoreHorizontal,
    color: "bg-gray-600",
    transactions: [
      { id: "verify-records", name: "Verification of academic records", category: "Others" },
      { id: "cross-enroll", name: "Processing of cross-enrollment", category: "Others" },
      { id: "readmission", name: "Re-admission of returning students", category: "Others" },
      { id: "alumni", name: "Assistance for alumni records", category: "Others" },
    ]
  }
];

export function getTransactionById(id) {
  for (const category of transactionCategories) {
    const transaction = category.transactions.find(t => t.id === id);
    if (transaction) return transaction;
  }
  return undefined;
}

export function getCategoryByTransactionId(id) {
  for (const category of transactionCategories) {
    const transaction = category.transactions.find(t => t.id === id);
    if (transaction) return category;
  }
  return undefined;
}

export function generateQueueNumber() {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return num.toString().padStart(4, '0');
}

export function assignWindow(category) {
  const windowMap = {
    "Academic Records": [1, 2],
    "Enrollment & Registration": [3, 4],
    "Student Information Updates": [5],
    "Certificates & Certifications": [6, 7],
    "Graduation-related Transactions": [8],
    "Others": [9, 10],
  };
  const windows = windowMap[category] || [1];
  return windows[Math.floor(Math.random() * windows.length)];
}
