import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart, Activity, Pill, Calendar, Shield, Users, Smartphone,
  Wifi, WifiOff, FileText, Plus, CheckCircle, AlertTriangle,
  QrCode, Search, RefreshCw, ChevronRight, User, Stethoscope,
  ShoppingBag, ClipboardList, Eye, Lock, ArrowRight, Check,
  Clock, AlertCircle, Baby, Bell, Send, Download, Sliders,
  HelpCircle, CreditCard, ExternalLink, X, ChevronDown, Radio,
  PhoneCall, ShieldAlert, Sparkles, MapPin, Hospital, Layers
} from 'lucide-react';

const I18N = {
  en: {
    appTitle: "ShasthyoBondhu",
    appSub: "National EHR & mHealth BD",
    tagline: "Your Portable Health Identity across Bangladesh",
    online: "Online (4G DGHS Grid)",
    offline: "Offline (Local Queue Active)",
    syncNow: "Sync Queue",
    switchRole: "Switch Portal",
    toggleLang: "বাংলায় দেখুন",
    patient: "Patient & Family",
    doctor: "Physician Console",
    chw: "Health Worker (CHW)",
    pharmacy: "Pharmacy Dispenser",
    fhirInspector: "FHIR R4 Inspector",
    auditLog: "Consent & Audit",
    deviceView: "Device View",
    mobileView: "Mobile Phone View",
    desktopView: "Wide Screen",
    
    // Patient Home
    greeting: "Assalamu Alaikum",
    emergencyHelpline: "National Health Call Center: 16263 | Emergency: 999",
    activeConditions: "Active Conditions",
    currentMeds: "Prescribed Medicines",
    recentVitals: "Latest Vitals",
    lastVisit: "Last Clinical Encounter",
    quickActions: "Quick Health Services",
    symptomChecker: "Symptom Triage",
    vitalsTracker: "Vitals & Trends",
    documentVault: "Report & Rx Vault",
    medReminders: "Dose Alarms & SMS",
    teleConsult: "Book Visit / Telemedicine",
    familyMembers: "Family Health Profiles",
    
    // Doctor
    doctorTitle: "OPD Clinical Consultation Desk",
    drName: "Prof. Dr. Tanvir Hossain, FCPS, MD",
    drDesignation: "Dhaka Medical College & Hospital (BMDC: A-48291)",
    searchPatient: "Search Patient by NID or Phone Number...",
    patientLookupDesc: "Matches national NID or Digital Birth Certificate DB",
    chiefComplaint: "Chief Complaints & History of Present Illness",
    vitalsReview: "Clinical Vitals Review",
    addDiagnosis: "Add Assessment / ICD-11 Diagnosis",
    rxBuilder: "Electronic Prescription (e-Rx)",
    addMedicine: "Add Medicine Line",
    issueRx: "Sign & Issue e-Prescription with QR",
    pastEncounters: "Past Enrolled Encounters",
    
    // CHW
    chwTitle: "Shasthya Kormi Field Worker Portal",
    chwName: "Rashida Begum (Health Worker ID: DGHS-CHW-8832)",
    assignedArea: "Keraniganj Upazila Health Complex, Ward 4",
    registerPatient: "New Assisted Patient Onboarding",
    logVitals: "Record Household Vitals",
    offlineNotice: "Data cached locally in IndexedDB; auto-syncs when 3G/4G returns",
    syncQueueText: "unsynced vital checks in field queue",
    
    // Pharmacy
    pharmaTitle: "Model Pharmacy Dispensing Terminal",
    pharmaName: "Lazz Pharma (Dhanmondi Branch - Lic: DGDA-4912)",
    scanOrEnter: "Enter e-Rx ID or Scan Patient QR Code",
    dispenseAction: "Verify Authenticity & Dispense",
    dispensedState: "Prescription Dispensed",
    notDispensed: "Pending Dispense",
    
    // Triage
    triageTitle: "Bangla Conservative Symptom Triage",
    triageNotice: "This tool does not provide a definitive medical diagnosis. It triages emergency symptoms and directs you to certified medical care.",
    checkSymptomBtn: "Start Assessment",
    emergencyWarning: "RED FLAG EMERGENCY: Visit nearest Upazila Health Complex or Tertiary Hospital immediately!",
    mildAdvice: "Home care & monitoring is appropriate. Consult a registered physician if symptoms persist past 48 hours.",
    
    // Vitals
    bpLabel: "Blood Pressure (BP)",
    glucoseLabel: "Blood Glucose (RBS)",
    heartRate: "Heart Rate",
    weight: "Weight",
    logNewVitals: "Record New Measurement",
    
    // Payment
    mfsTitle: "Digital Health Service Fee",
    payWith: "Select Mobile Financial Service (MFS)",
    bKash: "bKash",
    nagad: "Nagad",
    rocket: "Rocket",
    payAmount: "Pay BDT 150 (Govt Subsidized Consultation / Diagnostic)",
    paySuccess: "Payment Approved via MFS Rail. Transaction ID: TRX9281726"
  },
  bn: {
    appTitle: "স্বাস্থ্যবন্ধু",
    appSub: "জাতীয় ইএইচআর ও এম-হেলথ প্ল্যাটফর্ম",
    tagline: "সারা বাংলাদেশে আপনার ডিজিটাল স্বাস্থ্য পরিচয়",
    online: "অনলাইন (৪জি স্বাস্থ্য অধিদফতর গ্রিড)",
    offline: "অফলাইন (স্থানীয় মেমোরিতে সংরক্ষিত)",
    syncNow: "সিঙ্ক করুন",
    switchRole: "রোল পরিবর্তন",
    toggleLang: "View in English",
    patient: "রোগী ও পরিবার",
    doctor: "ডাক্তার কনসোল",
    chw: "স্বাস্থ্য কর্মী (CHW)",
    pharmacy: "ফার্মেসি বিতরণকারী",
    fhirInspector: "এফএইচআইআর (FHIR R4)",
    auditLog: "অডিট ও অনুমতি লগ",
    deviceView: "ডিভাইস ভিউ",
    mobileView: "মোবাইল ভিউ",
    desktopView: "বড় স্ক্রিন",
    
    // Patient Home
    greeting: "আসসালামু আলাইকুম",
    emergencyHelpline: "স্বাস্থ্য বাতায়ন: ১৬২৬৩ | জরুরি সেবা: ৯৯৯",
    activeConditions: "দীর্ঘমেয়াদী রোগসমূহ",
    currentMeds: "বর্তমান নিয়মিত ওষুধ",
    recentVitals: "সর্বশেষ শারীরিক পরিমাপ",
    lastVisit: "সর্বশেষ ডাক্তার দর্শন",
    quickActions: "জরুরি স্বাস্থ্য সেবা",
    symptomChecker: "লক্ষণ যাচাইকারী",
    vitalsTracker: "প্রেসার ও সুগার চার্ট",
    documentVault: "রিপোর্ট ও প্রেসক্রিপশন ভল্ট",
    medReminders: "ওষুধের অ্যালার্ম ও এসএমএস",
    teleConsult: "ডাক্তার দেখান / পরামর্শ",
    familyMembers: "পরিবারের স্বাস্থ্য প্রোফাইল",
    
    // Doctor
    doctorTitle: "বহির্বিভাগ (OPD) ক্লিনিক্যাল কনসালটেশন ডেস্ক",
    drName: "অধ্যাপক ডাঃ তানভীর হোসেন, এফসিপিএস, এমডি",
    drDesignation: "ঢাকা মেডিকেল কলেজ হাসপাতাল (বিএমডিসি: A-৪৮২৯১)",
    searchPatient: "জাতীয় পরিচয়পত্র (NID) বা মোবাইল নম্বর দিয়ে রোগী খুঁজুন...",
    patientLookupDesc: "জাতীয় এনআইডি অথবা জন্ম নিবন্ধন সার্ভারের সাথে স্বয়ংক্রিয় মিলন",
    chiefComplaint: "প্রধান শারীরিক সমস্যা ও রোগের বিবরণ",
    vitalsReview: "শারীরিক পরিমাপ নিরীক্ষা",
    addDiagnosis: "রোগ নির্ণয় / আইসিডি-১১ কোড",
    rxBuilder: "ই-প্রেসক্রিপশন প্রস্তুতকারক",
    addMedicine: "নতুন ওষুধ যোগ করুন",
    issueRx: "কিউআর কোডসহ ডিজিটাল প্রেসক্রিপশন প্রদান করুন",
    pastEncounters: "পূর্ববর্তী চিকিৎসার ইতিহাস",
    
    // CHW
    chwTitle: "স্বাস্থ্য কর্মী ফিল্ড পোর্টাল",
    chwName: "রাশিদা বেগম (স্বাস্থ্য কর্মী আইডি: DGHS-CHW-৮৮৩২)",
    assignedArea: "কেরানীগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স, ৪ নং ওয়ার্ড",
    registerPatient: "সহায়তাপ্রাপ্ত নতুন রোগী নিবন্ধন",
    logVitals: "বাড়িতে স্বাস্থ্য পরীক্ষা লিপিবদ্ধ করুন",
    offlineNotice: "নেটওয়ার্ক না থাকলেও তথ্য সংরক্ষিত হবে; ইন্টারনেট এলে স্বয়ংক্রিয়ভাবে সার্ভারে জমা হবে",
    syncQueueText: "টি স্বাস্থ্য তথ্য অফলাইনে জমা আছে",
    
    // Pharmacy
    pharmaTitle: "মডেল ফার্মেসি ওষুধ বিতরণ টার্মিনাল",
    pharmaName: "লাজ ফার্মা (ধানমন্ডি শাখা - লাইসেন্স: DGDA-৪৯১২)",
    scanOrEnter: "প্রেসক্রিপশন নম্বর লিখুন বা রোগীর কিউআর স্ক্যান করুন",
    dispenseAction: "সত্যতা যাচাই ও ওষুধ প্রদান করুন",
    dispensedState: "ওষুধ প্রদান সম্পন্ন হয়েছে",
    notDispensed: "ওষুধ প্রদান অপেক্ষমাণ",
    
    // Triage
    triageTitle: "সতর্কতামূলক প্রাথমিক লক্ষণ মূল্যায়ন",
    triageNotice: "এটি কোনো চূড়ান্ত ডাক্তারি পরীক্ষা নয়। কেবল জরুরি অবস্থা নির্ধারণ এবং সঠিক চিকিৎসা পরামর্শে সহায়তার জন্য।",
    checkSymptomBtn: "লক্ষণ পরীক্ষা শুরু করুন",
    emergencyWarning: "জরুরি সতর্কবার্তা (RED FLAG): অবিলম্বে নিকটস্থ উপজেলা স্বাস্থ্য কমপ্লেক্স বা জেলা সদর হাসপাতালে যান!",
    mildAdvice: "ঘরোয়া যত্ন ও বিশ্রাম নিন। যদি লক্ষণ ৪৮ ঘণ্টার বেশি স্থায়ী হয় তবে বিএমডিসি নিবন্ধিত ডাক্তারের পরামর্শ নিন।",
    
    // Vitals
    bpLabel: "রক্তচাপ (BP)",
    glucoseLabel: "রক্তের শর্করা (RBS)",
    heartRate: "হৃদস্পন্দন (পালস)",
    weight: "ওজন",
    logNewVitals: "নতুন পরিমাপ সংরক্ষণ করুন",
    
    // Payment
    mfsTitle: "সরকারি সেবা ফি পরিশোধ",
    payWith: "মোবাইল ফিনান্সিয়াল সার্ভিস (MFS) নির্বাচন করুন",
    bKash: "বিকাশ",
    nagad: "নগদ",
    rocket: "রকেট",
    payAmount: "পরিশোধ করুন ১৫০ টাকা (সরকারি ভর্তুকিপ্রাপ্ত ফি)",
    paySuccess: "বিকাশ/নগদের মাধ্যমে ফি সফলভাবে গৃহীত হয়েছে! লেনদেন আইডি: TRX9281726"
  }
};

const INITIAL_PATIENTS = {
  p1: {
    id: "BD-8830192-2026",
    nid: "19882691200004921",
    brn: null,
    nameEn: "Abdur Rahim",
    nameBn: "আব্দুর রহিম",
    age: 46,
    gender: "Male",
    genderBn: "পুরুষ",
    phone: "01712-491029",
    relation: "Self",
    relationBn: "নিজের প্রোফাইল",
    bloodGroup: "B+",
    address: "Village: Rohitpur, Upazila: Keraniganj, Dhaka",
    conditions: [
      { id: "c1", code: "E11.9", nameEn: "Type 2 Diabetes Mellitus", nameBn: "টাইপ ২ ডায়াবেটিস", severity: "High", since: "2021" },
      { id: "c2", code: "I10", nameEn: "Essential Hypertension", nameBn: "উচ্চ রক্তচাপ (হাইপারটেনশন)", severity: "Moderate", since: "2019" }
    ],
    allergies: [
      { id: "a1", substanceEn: "Penicillin", substanceBn: "পেনিসিলিন", reactionEn: "Skin Rash & Urticaria", reactionBn: "চুলকানি ও লাল দাগ" }
    ],
    medications: [
      { id: "m1", name: "Tab. Metformin 500mg", scheduleEn: "1+0+1 After meal", scheduleBn: "১+০+১ (খাবারের পর)", daysRemaining: 6, totalDays: 30, prescriber: "Dr. Tanvir Hossain" },
      { id: "m2", name: "Tab. Amlodipine 5mg", scheduleEn: "0+0+1 Night", scheduleBn: "০+০+১ (রাতে)", daysRemaining: 14, totalDays: 30, prescriber: "Dr. Tanvir Hossain" },
      { id: "m3", name: "Tab. Atorvastatin 10mg", scheduleEn: "0+0+1 Night", scheduleBn: "০+০+১ (রাতে)", daysRemaining: 2, totalDays: 30, prescriber: "Dr. Farzana Yasmin" }
    ],
    vitalsHistory: [
      { date: "16 Sep", bpSys: 140, bpDia: 90, glucose: 8.8, pulse: 78 },
      { date: "18 Sep", bpSys: 135, bpDia: 88, glucose: 7.9, pulse: 76 },
      { date: "20 Sep", bpSys: 138, bpDia: 85, glucose: 8.2, pulse: 74 },
      { date: "22 Sep", bpSys: 130, bpDia: 82, glucose: 7.1, pulse: 72 }
    ],
    lastEncounter: {
      date: "10 September 2026",
      facility: "Keraniganj Upazila Health Complex",
      facilityBn: "কেরানীগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স",
      doctor: "Dr. Tanvir Hossain (Medicine)",
      type: "OPD General Follow-up",
      typeBn: "সাধারণ বহির্বিভাগ চেকআপ"
    },
    epi: []
  },
  p2: {
    id: "BD-7719201-1958",
    nid: "19581902849102849",
    brn: null,
    nameEn: "Rokeya Begum",
    nameBn: "রোকেয়া বেগম",
    age: 68,
    gender: "Female",
    genderBn: "মহিলা",
    phone: "01712-491029",
    relation: "Mother",
    relationBn: "মা (আম্মা)",
    bloodGroup: "O+",
    address: "Village: Rohitpur, Upazila: Keraniganj, Dhaka",
    conditions: [
      { id: "c3", code: "I10", nameEn: "Severe Hypertension", nameBn: "তীব্র উচ্চ রক্তচাপ", severity: "High", since: "2015" },
      { id: "c4", code: "M19.9", nameEn: "Osteoarthritis Knees", nameBn: "হাঁটুর অস্টিওআর্থ্রাইটিস", severity: "Moderate", since: "2018" }
    ],
    allergies: [
      { id: "a2", substanceEn: "Sulfa Drugs", substanceBn: "সালফা ওষুধ", reactionEn: "Facial edema", reactionBn: "মুখ ফুলে যাওয়া" }
    ],
    medications: [
      { id: "m4", name: "Tab. Losartan Potassium 50mg", scheduleEn: "1+0+0 Morning", scheduleBn: "১+০+০ (সকালে)", daysRemaining: 18, totalDays: 30, prescriber: "Dr. M. Rahman" }
    ],
    vitalsHistory: [
      { date: "15 Sep", bpSys: 155, bpDia: 96, glucose: 6.4, pulse: 82 },
      { date: "18 Sep", bpSys: 148, bpDia: 92, glucose: 6.1, pulse: 80 },
      { date: "22 Sep", bpSys: 142, bpDia: 88, glucose: 6.0, pulse: 78 }
    ],
    lastEncounter: {
      date: "04 August 2026",
      facility: "Dhaka Medical College Hospital OPD",
      facilityBn: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
      doctor: "Prof. Dr. M. Rahman (Cardiology)",
      type: "Cardiology Review",
      typeBn: "হৃদরোগ নিরীক্ষা"
    },
    epi: []
  },
  p3: {
    id: "BD-9912048-2025",
    nid: null,
    brn: "20252691200008819",
    nameEn: "Ayaan Rahim",
    nameBn: "আয়ান রহিম",
    age: 1.5,
    gender: "Male",
    genderBn: "ছেলে শিশু",
    phone: "01712-491029",
    relation: "Son (Child)",
    relationBn: "ছেলে (শিশু)",
    bloodGroup: "B+",
    address: "Village: Rohitpur, Upazila: Keraniganj, Dhaka",
    conditions: [
      { id: "c5", code: "J45", nameEn: "Mild Childhood Wheezing", nameBn: "হালকা অ্যালার্জি ও শ্বাসকষ্ট", severity: "Low", since: "2025" }
    ],
    allergies: [],
    medications: [
      { id: "m5", name: "Syp. Cetirizine 5mg/5ml", scheduleEn: "1/2 tsp night when needed", scheduleBn: "আধ চামচ রাতে (প্রয়োজনে)", daysRemaining: 10, totalDays: 15, prescriber: "Dr. Shafiul Islam" }
    ],
    vitalsHistory: [
      { date: "10 Aug", bpSys: 95, bpDia: 60, glucose: 5.2, pulse: 108 },
      { date: "20 Sep", bpSys: 96, bpDia: 62, glucose: 5.0, pulse: 104 }
    ],
    lastEncounter: {
      date: "20 September 2026",
      facility: "EPI Immunization Clinic, Keraniganj",
      facilityBn: "ইপিআই টিকাদান কেন্দ্র, কেরানীগঞ্জ",
      doctor: "Shasthya Kormi Rashida Begum",
      type: "EPI Routine Vaccination Check",
      typeBn: "নিয়মিত সম্প্রসারিত টিকাদান (EPI)"
    },
    epi: [
      { vaccine: "BCG", dose: "At Birth", status: "Given", date: "Jan 2025" },
      { vaccine: "Penta 1, 2, 3", dose: "6, 10, 14 Wks", status: "Completed", date: "May 2025" },
      { vaccine: "PCV (Pneumococcal)", dose: "Dose 1, 2, 3", status: "Completed", date: "May 2025" },
      { vaccine: "MR 1 (Measles-Rubella)", dose: "9 Months", status: "Given", date: "Oct 2025" },
      { vaccine: "MR 2 Booster", dose: "15 Months", status: "Due Soon", date: "October 2026" }
    ]
  }
};

const INITIAL_RX_RECORDS = [
  {
    id: "RX-BD-2026-9021",
    patientId: "BD-8830192-2026",
    patientName: "Abdur Rahim",
    patientAge: 46,
    doctorName: "Prof. Dr. Tanvir Hossain",
    bmdcReg: "BMDC-A-48291",
    date: "2026-09-21",
    diagnosis: "Type 2 Diabetes Mellitus with Mild Hypertension",
    medicines: [
      { name: "Tab. Metformin 500mg", instructions: "1+0+1 After meal for 30 days", quantity: 60, dispensed: true },
      { name: "Tab. Amlodipine 5mg", instructions: "0+0+1 Night for 30 days", quantity: 30, dispensed: true },
      { name: "Tab. Atorvastatin 10mg", instructions: "0+0+1 Night for 30 days", quantity: 30, dispensed: false }
    ],
    advice: "Check Fasting blood sugar weekly. Reduce extra salt (কাঁচা লবণ পরিহার করুন). 30 mins brisk walk.",
    dispensedStatus: "Partially Dispensed",
    qrPayload: "SHASTHYO-BONDHU:RX-9021:AUTH-DGDA-VALID"
  }
];

const INITIAL_AUDIT_LOGS = [
  { id: "aud-1", timestamp: "2026-09-22 14:10", actor: "Dr. Tanvir Hossain (Dhaka Medical)", role: "Doctor", purpose: "OPD Chart Review", type: "Standard Grant", breakGlass: false },
  { id: "aud-2", timestamp: "2026-09-21 11:32", actor: "Rashida Begum (CHW)", role: "Health Worker", purpose: "Field Vitals Upload", type: "Assigned Worker", breakGlass: false },
  { id: "aud-3", timestamp: "2026-09-18 22:45", actor: "Dr. Anisur Rahman (ER Upazila)", role: "Emergency Doctor", purpose: "Acute Chest Pain Triage", type: "Break-Glass Emergency", breakGlass: true },
  { id: "aud-4", timestamp: "2026-09-15 16:05", actor: "Lazz Pharma Dhanmondi", role: "Pharmacy", purpose: "e-Rx 9021 Dispensing Verification", type: "Prescription Only", breakGlass: false }
];

export default function App() {
  const [lang, setLang] = useState('bn'); // 'bn' | 'en'
  const [role, setRole] = useState('patient'); // 'patient' | 'doctor' | 'chw' | 'pharmacy' | 'fhir' | 'audit'
  const [deviceMode, setDeviceMode] = useState('mobile'); // 'mobile' | 'desktop'
  const [isOnline, setIsOnline] = useState(true);
  const [activePatientKey, setActivePatientKey] = useState('p1');
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [rxList, setRxList] = useState(INITIAL_RX_RECORDS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // Offline sync queue
  const [chwOfflineQueue, setChwOfflineQueue] = useState([
    { id: "queue-1", patientName: "Julekha Bibi", age: 52, bp: "148/92", glucose: "9.4", timestamp: "10 mins ago" },
    { id: "queue-2", patientName: "Mohammad Ali", age: 61, bp: "135/84", glucose: "7.0", timestamp: "35 mins ago" }
  ]);
  
  // Modals & Sub-views
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'triage' | 'vitals' | 'vault' | 'reminders'
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState('bkash');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showLogVitalsModal, setShowLogVitalsModal] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const t = I18N[lang];
  const currentPatient = patients[activePatientKey];

  // Trigger brief floating notifications (SMS / Toast)
  const triggerNotification = (msg) => {
    setToastMessage(msg);
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 5000);
  };

  const handleSyncQueue = () => {
    if (chwOfflineQueue.length === 0) {
      triggerNotification(lang === 'bn' ? "সিঙ্ক করার মতো নতুন কোনো অফলাইন তথ্য নেই।" : "No queued items to sync.");
      return;
    }
    const count = chwOfflineQueue.length;
    setChwOfflineQueue([]);
    triggerNotification(
      lang === 'bn' 
        ? `${count}টি ফিল্ড পরিমাপ সফলভাবে ডিজিএইচএস (DGHS) ক্লাউডে আপলোড হয়েছে!`
        : `Successfully synced ${count} pending vitals to the DGHS National Cloud!`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-emerald-200">
      
      {}
      <header className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & National System Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-inner">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm tracking-wide text-white">{t.appTitle}</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
                  DGHS FHIR-R4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* Network Simulator & Offline Trigger */}
          <div className="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
            <button
              onClick={() => {
                const nextState = !isOnline;
                setIsOnline(nextState);
                triggerNotification(
                  nextState 
                    ? (lang === 'bn' ? "নেটওয়ার্ক সংযুক্ত: ৪জি ডাটা চালু" : "Network Restored: 4G Mobile Data connected")
                    : (lang === 'bn' ? "অফলাইন মোড সক্রিয়: স্থানীয় ড্রাফট হিসেবে জমা হচ্ছে" : "Offline Mode Active: Caching data locally")
                );
              }}
              className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition ${
                isOnline ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
              }`}
              title="Click to toggle network simulation"
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isOnline ? t.online : t.offline}</span>
            </button>

            {chwOfflineQueue.length > 0 && (
              <button
                onClick={handleSyncQueue}
                disabled={!isOnline}
                className={`flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded font-medium transition ${
                  isOnline 
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 animate-pulse" 
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>{chwOfflineQueue.length} {t.syncNow}</span>
              </button>
            )}
          </div>

          {/* Quick Controls: Viewport, Role Switcher, Language Toggle */}
          <div className="flex items-center space-x-2">
            
            {/* Mobile / Desktop Toggle */}
            <div className="hidden md:flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-2 py-1 rounded text-[11px] flex items-center space-x-1 ${
                  deviceMode === 'mobile' ? 'bg-slate-700 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Preview in Mobile Phone Enclosure"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-2 py-1 rounded text-[11px] flex items-center space-x-1 ${
                  deviceMode === 'desktop' ? 'bg-slate-700 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Full Responsive Desktop View"
              >
                <Layers className="w-3 h-3" />
                <span>Full Web</span>
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-2.5 py-1 rounded-md text-[11px] transition shadow flex items-center space-x-1"
            >
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>

        </div>
      </header>

      {}
      <nav className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-sm sticky top-[49px] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 scrollbar-none">
          <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-max">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider hidden sm:inline mr-1">
              {t.switchRole}:
            </span>
            
            <button
              onClick={() => setRole('patient')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'patient' 
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.patient}</span>
            </button>

            <button
              onClick={() => setRole('doctor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'doctor' 
                  ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-600 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t.doctor}</span>
            </button>

            <button
              onClick={() => setRole('chw')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'chw' 
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>{t.chw}</span>
            </button>

            <button
              onClick={() => setRole('pharmacy')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'pharmacy' 
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.pharmacy}</span>
            </button>

            <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block" />

            <button
              onClick={() => setRole('fhir')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                role === 'fhir' 
                  ? 'bg-slate-800 text-emerald-400 font-mono ring-2 ring-slate-700 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.fhirInspector}</span>
            </button>

            <button
              onClick={() => setRole('audit')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                role === 'audit' 
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-1' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.auditLog}</span>
            </button>
          </div>

          {/* Quick Active Patient Indicator */}
          <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
            <span className="text-[11px] text-slate-400">{lang === 'bn' ? 'সক্রিয় প্রোফাইল:' : 'Viewing:'}</span>
            <span className="font-bold text-slate-800">
              {lang === 'bn' ? currentPatient.nameBn : currentPatient.nameEn}
            </span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1 rounded">
              {currentPatient.age}y
            </span>
          </div>
        </div>
      </nav>

      {}
      {showNotificationToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white rounded-xl shadow-2xl p-4 border border-emerald-500/50 flex items-start space-x-3 transition-all animate-bounce">
          <div className="p-2 bg-emerald-600 rounded-lg text-white">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                {lang === 'bn' ? 'টেলিটক / জিপি এসএমএস অ্যালার্ট' : 'Banglalink/GP SMS Fallback'}
              </span>
              <button onClick={() => setShowNotificationToast(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="mt-1 text-slate-200">{toastMessage}</p>
          </div>
        </div>
      )}

      {}
      <main className="flex-1 py-4 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Conditional Layout: Mobile Phone Simulator vs Desktop Expanded */}
          {role === 'patient' && deviceMode === 'mobile' ? (
            <div className="flex justify-center">
              <div className="w-full max-w-[420px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-700">
                {/* Simulated Phone Speaker & Camera Notch */}
                <div className="w-full flex justify-center pb-2">
                  <div className="w-32 h-4 bg-slate-950 rounded-b-xl flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    <div className="w-10 h-1 bg-slate-800 rounded-full" />
                  </div>
                </div>

                {/* Patient Mobile Screen Content */}
                <div className="bg-slate-50 rounded-[28px] overflow-hidden min-h-[680px] max-h-[750px] flex flex-col overflow-y-auto border border-slate-200">
                  <PatientMobileShell
                    lang={lang}
                    t={t}
                    patient={currentPatient}
                    patients={patients}
                    activePatientKey={activePatientKey}
                    setActivePatientKey={setActivePatientKey}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onOpenPayment={() => setShowPaymentModal(true)}
                    onOpenVitalsLog={() => setShowLogVitalsModal(true)}
                    triggerNotification={triggerNotification}
                  />
                </div>
              </div>
            </div>
          ) : role === 'patient' ? (
            /* Desktop Full Layout for Patient */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <PatientDesktopView
                lang={lang}
                t={t}
                patient={currentPatient}
                patients={patients}
                activePatientKey={activePatientKey}
                setActivePatientKey={setActivePatientKey}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOpenPayment={() => setShowPaymentModal(true)}
                onOpenVitalsLog={() => setShowLogVitalsModal(true)}
                triggerNotification={triggerNotification}
              />
            </div>
          ) : role === 'doctor' ? (
            /* Doctor Clinical OPD Console */
            <DoctorConsoleView
              lang={lang}
              t={t}
              currentPatient={currentPatient}
              patients={patients}
              rxList={rxList}
              setRxList={setRxList}
              triggerNotification={triggerNotification}
            />
          ) : role === 'chw' ? (
            /* Community Health Worker View */
            <ChwConsoleView
              lang={lang}
              t={t}
              patients={patients}
              setPatients={setPatients}
              queue={chwOfflineQueue}
              setQueue={setChwOfflineQueue}
              isOnline={isOnline}
              triggerNotification={triggerNotification}
            />
          ) : role === 'pharmacy' ? (
            /* Pharmacy Dispenser Terminal */
            <PharmacyConsoleView
              lang={lang}
              t={t}
              rxList={rxList}
              setRxList={setRxList}
              triggerNotification={triggerNotification}
            />
          ) : role === 'fhir' ? (
            /* HL7 FHIR R4 JSON Resource Inspector */
            <FhirInspectorView
              lang={lang}
              t={t}
              patient={currentPatient}
              rxList={rxList}
            />
          ) : (
            /* Consent & Audit Trail Transparency Screen */
            <AuditLogView
              lang={lang}
              t={t}
              patient={currentPatient}
              logs={auditLogs}
              setLogs={setLogs}
              triggerNotification={triggerNotification}
            />
          )}

        </div>
      </main>

      {}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base">{t.mfsTitle}</h3>
              </div>
              <button onClick={() => { setShowPaymentModal(false); setPaymentSuccess(false); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-1">
                  {lang === 'bn' ? 'পেমেন্ট সফল হয়েছে!' : 'Payment Verified!'}
                </h4>
                <p className="text-xs text-slate-600 mb-4">{t.paySuccess}</p>
                <div className="bg-slate-50 p-3 rounded-lg text-left text-xs font-mono mb-4 border border-slate-200">
                  <div className="flex justify-between"><span>Provider:</span> <span className="font-bold uppercase text-pink-600">{paymentProvider}</span></div>
                  <div className="flex justify-between"><span>Amount:</span> <span>BDT 150.00</span></div>
                  <div className="flex justify-between"><span>Reference:</span> <span>OPD-TELE-4901</span></div>
                </div>
                <button
                  onClick={() => { setShowPaymentModal(false); setPaymentSuccess(false); }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl text-sm transition"
                >
                  {lang === 'bn' ? 'সম্পন্ন করুন' : 'Done'}
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-600 mb-3">{t.payWith}</p>
                
                {/* MFS Providers Selector */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  <button
                    onClick={() => setPaymentProvider('bkash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition ${
                      paymentProvider === 'bkash' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-400' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-pink-600 text-white rounded-md flex items-center justify-center font-black text-xs">
                      bK
                    </div>
                    <span className="text-xs font-bold mt-1.5">bKash</span>
                  </button>

                  <button
                    onClick={() => setPaymentProvider('nagad')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition ${
                      paymentProvider === 'nagad' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-400' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-orange-600 text-white rounded-md flex items-center justify-center font-black text-xs">
                      নগদ
                    </div>
                    <span className="text-xs font-bold mt-1.5">Nagad</span>
                  </button>

                  <button
                    onClick={() => setPaymentProvider('rocket')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition ${
                      paymentProvider === 'rocket' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-400' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 bg-purple-700 text-white rounded-md flex items-center justify-center font-black text-xs">
                      DB
                    </div>
                    <span className="text-xs font-bold mt-1.5">Rocket</span>
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      {lang === 'bn' ? 'বিকাশ / নগদ মোবাইল নম্বর' : 'MFS Account Mobile Number'}
                    </label>
                    <input
                      type="text"
                      defaultValue={currentPatient.phone}
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-1">
                      {lang === 'bn' ? 'গোপন পিন কোড (সিমুলেশন)' : 'Account PIN (Simulation)'}
                    </label>
                    <input
                      type="password"
                      defaultValue="1234"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 p-2.5 rounded-lg text-xs mb-4 flex items-center justify-between">
                  <span>{t.payAmount}</span>
                  <span className="font-bold font-mono">৳ ১৫০</span>
                </div>

                <button
                  onClick={() => {
                    setPaymentSuccess(true);
                    triggerNotification(
                      lang === 'bn' 
                        ? `বিকাশ থেকে ১৫০ টাকা কর্তন করা হয়েছে। নিশ্চিতকরণ এসএমএস পাঠানো হয়েছে: ${currentPatient.phone}`
                        : `BDT 150 charged via bKash. Confirmation SMS dispatched to ${currentPatient.phone}`
                    );
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition shadow"
                >
                  {lang === 'bn' ? 'নিশ্চিত করুন ও ফি প্রদান করুন' : 'Confirm & Authorize Payment'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {showLogVitalsModal && (
        <LogVitalsModal
          lang={lang}
          t={t}
          patient={currentPatient}
          onClose={() => setShowLogVitalsModal(false)}
          onSave={(newVital) => {
            setPatients(prev => ({
              ...prev,
              [activePatientKey]: {
                ...prev[activePatientKey],
                vitalsHistory: [
                  ...prev[activePatientKey].vitalsHistory,
                  {
                    date: lang === 'bn' ? 'আজ' : 'Today',
                    bpSys: Number(newVital.bpSys),
                    bpDia: Number(newVital.bpDia),
                    glucose: Number(newVital.glucose),
                    pulse: Number(newVital.pulse)
                  }
                ]
              }
            }));
            setShowLogVitalsModal(false);
            triggerNotification(
              lang === 'bn' 
                ? "নতুন শারীরিক পরিমাপ সফলভাবে স্বাস্থ্য রেকর্ডে সংরক্ষিত হয়েছে!"
                : "New vitals successfully recorded to personal EHR!"
            );
          }}
        />
      )}

      {}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 px-6 mt-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-medium">
              {lang === 'bn' ? 'ডিজিটাল স্বাস্থ্য অধিদপ্তর (DGHS) ও আইসিটি বিভাগ সমন্বিত প্রোটোটাইপ' : 'MOHFW DGHS & ICT Division Digital Health Architecture Reference'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            {t.emergencyHelpline}
          </div>
        </div>
      </footer>

    </div>
  );
}

function PatientMobileShell({ lang, t, patient, patients, activePatientKey, setActivePatientKey, activeTab, setActiveTab, onOpenPayment, onOpenVitalsLog, triggerNotification }) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      
      {/* Mobile Top Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-4 pt-3 pb-4 shadow-sm">
        
        {/* Family Member Switcher Strip */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 scrollbar-none">
            {Object.keys(patients).map(key => {
              const p = patients[key];
              const isSelected = activePatientKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePatientKey(key)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs transition ${
                    isSelected 
                      ? 'bg-white text-emerald-800 font-bold shadow-sm' 
                      : 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-900/80'
                  }`}
                >
                  <User className="w-3 h-3" />
                  <span>{lang === 'bn' ? p.relationBn : p.relation}</span>
                </button>
              );
            })}
          </div>
          <button 
            onClick={() => triggerNotification(lang === 'bn' ? "জরুরি কল সেন্টার ১৬২৬৩ এ সংযোগ করা হচ্ছে..." : "Connecting to 16263 Shasthya Batayon...")}
            className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full text-[10px] font-bold shadow animate-pulse flex items-center"
            title="Emergency 16263"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-200 font-medium">{t.greeting},</span>
            <h2 className="text-lg font-bold leading-tight">
              {lang === 'bn' ? patient.nameBn : patient.nameEn}
            </h2>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-100 mt-0.5">
              <span>{patient.age} {lang === 'bn' ? 'বছর' : 'yrs'}</span>
              <span>•</span>
              <span className="font-semibold">{patient.bloodGroup}</span>
              <span>•</span>
              <span className="font-mono text-[10px] bg-emerald-900/60 px-1 rounded">
                {patient.nid ? `NID: ...${patient.nid.slice(-4)}` : `BRN: ...${patient.brn?.slice(-4)}`}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
            {patient.age < 5 ? (
              <Baby className="w-7 h-7 text-emerald-200" />
            ) : (
              <Heart className="w-7 h-7 text-emerald-200 fill-emerald-400/40" />
            )}
          </div>
        </div>

      </div>

      {/* Mobile Sub-Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 flex justify-around text-xs font-semibold py-2 px-1 shadow-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 rounded-md transition ${activeTab === 'home' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'}`}
        >
          {lang === 'bn' ? 'হোম' : 'Home'}
        </button>
        <button
          onClick={() => setActiveTab('triage')}
          className={`px-2 py-1 rounded-md transition ${activeTab === 'triage' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'}`}
        >
          {t.symptomChecker}
        </button>
        <button
          onClick={() => setActiveTab('vitals')}
          className={`px-2 py-1 rounded-md transition ${activeTab === 'vitals' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'}`}
        >
          {lang === 'bn' ? 'শারীরিক চার্ট' : 'Vitals'}
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-2 py-1 rounded-md transition ${activeTab === 'vault' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'}`}
        >
          {lang === 'bn' ? 'ভল্ট' : 'Vault'}
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-2 py-1 rounded-md transition ${activeTab === 'reminders' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600'}`}
        >
          {lang === 'bn' ? 'অ্যালার্ম' : 'Meds'}
        </button>
      </div>

      {/* Tab Content Display Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
        {activeTab === 'home' && (
          <PatientHomeTab
            lang={lang}
            t={t}
            patient={patient}
            onOpenPayment={onOpenPayment}
            onOpenVitalsLog={onOpenVitalsLog}
            triggerNotification={triggerNotification}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'triage' && (
          <ConservativeSymptomChecker lang={lang} t={t} triggerNotification={triggerNotification} />
        )}

        {activeTab === 'vitals' && (
          <VitalsTrackerTab
            lang={lang}
            t={t}
            patient={patient}
            onOpenVitalsLog={onOpenVitalsLog}
          />
        )}

        {activeTab === 'vault' && (
          <DocumentVaultTab lang={lang} t={t} patient={patient} triggerNotification={triggerNotification} />
        )}

        {activeTab === 'reminders' && (
          <MedicationRemindersTab lang={lang} t={t} patient={patient} triggerNotification={triggerNotification} />
        )}
      </div>

      {/* Mobile Bottom Quick Booking Bar */}
      <div className="bg-white border-t border-slate-200 p-2.5 flex items-center justify-between">
        <div className="text-[11px] leading-tight">
          <span className="text-slate-500 block">{lang === 'bn' ? 'সরকারি পরামর্শ ফি:' : 'Govt Subsidy Fee:'}</span>
          <span className="font-bold text-emerald-700 font-mono">৳ ১৫০ (MFS)</span>
        </div>
        <button
          onClick={onOpenPayment}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow"
        >
          <span>{t.teleConsult}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}

function PatientDesktopView({ lang, t, patient, patients, activePatientKey, setActivePatientKey, activeTab, setActiveTab, onOpenPayment, onOpenVitalsLog, triggerNotification }) {
  return (
    <div className="space-y-6">
      
      {/* Header with Family Member Selector & Actions */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl text-white p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              {lang === 'bn' ? 'ইলেকট্রনিক স্বাস্থ্য পরিচয়' : 'National Digital Health Passport'}
            </span>
            <span className="text-xs text-emerald-200 font-mono">
              ID: {patient.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold">
            {lang === 'bn' ? patient.nameBn : patient.nameEn}
          </h1>
          <p className="text-xs text-emerald-100 mt-1 max-w-xl">
            {patient.address} • {patient.genderBn || patient.gender} • {patient.age} {lang === 'bn' ? 'বছর' : 'years'} • {lang === 'bn' ? 'রক্তের গ্রুপ:' : 'Blood:'} <strong className="text-white">{patient.bloodGroup}</strong>
          </p>
        </div>

        {/* Switch Household Profile */}
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
          <span className="text-[11px] text-emerald-200 block mb-1.5 font-medium">{t.familyMembers}:</span>
          <div className="flex space-x-2">
            {Object.keys(patients).map(key => {
              const p = patients[key];
              const isSelected = activePatientKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivePatientKey(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                    isSelected ? 'bg-white text-emerald-900 shadow' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? p.nameBn : p.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        {[
          { id: 'home', labelEn: 'Record Summary', labelBn: 'স্বাস্থ্য সারসংক্ষেপ', icon: Activity },
          { id: 'triage', labelEn: 'Symptom Triage', labelBn: 'লক্ষণ যাচাইকারী', icon: Heart },
          { id: 'vitals', labelEn: 'Vitals & Chronic Trends', labelBn: 'রক্তচাপ ও গ্লুকোজ চার্ট', icon: Activity },
          { id: 'vault', labelEn: 'Document Vault', labelBn: 'রিপোর্ট ও প্রেসক্রিপশন ভল্ট', icon: FileText },
          { id: 'reminders', labelEn: 'Medicine & SMS Reminders', labelBn: 'ওষুধ ও এসএমএস এলার্ট', icon: Pill },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-2 border-b-2 text-sm font-semibold transition ${
                isActive 
                  ? 'border-emerald-600 text-emerald-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{lang === 'bn' ? tab.labelBn : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active View in Expanded Mode */}
      <div className="min-h-[480px]">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PatientHomeTab
                lang={lang}
                t={t}
                patient={patient}
                onOpenPayment={onOpenPayment}
                onOpenVitalsLog={onOpenVitalsLog}
                triggerNotification={triggerNotification}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="space-y-6">
              <VitalsTrackerTab
                lang={lang}
                t={t}
                patient={patient}
                onOpenVitalsLog={onOpenVitalsLog}
              />
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                <h4 className="font-bold text-slate-800 text-sm mb-2">{t.teleConsult}</h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {lang === 'bn' 
                    ? 'সরকারি স্বাস্থ্য বাতায়ন ও উপজেলা স্বাস্থ্য কমপ্লেক্সের ডাক্তারের সাথে সরাসরি ভিডিও বা অডিও কলে যোগাযোগ করুন।'
                    : 'Schedule verified BMDC registered physician review subsidized by Directorate General of Health Services.'}
                </p>
                <button
                  onClick={onOpenPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বিকাশ/নগদে ফি পরিশোধ ও বুকিং' : 'Pay BDT 150 & Book Consultation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'triage' && (
          <div className="max-w-2xl mx-auto">
            <ConservativeSymptomChecker lang={lang} t={t} triggerNotification={triggerNotification} />
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="max-w-4xl mx-auto">
            <VitalsTrackerTab lang={lang} t={t} patient={patient} onOpenVitalsLog={onOpenVitalsLog} />
          </div>
        )}

        {activeTab === 'vault' && (
          <DocumentVaultTab lang={lang} t={t} patient={patient} triggerNotification={triggerNotification} />
        )}

        {activeTab === 'reminders' && (
          <div className="max-w-3xl mx-auto">
            <MedicationRemindersTab lang={lang} t={t} patient={patient} triggerNotification={triggerNotification} />
          </div>
        )}
      </div>

    </div>
  );
}

function PatientHomeTab({ lang, t, patient, onOpenPayment, onOpenVitalsLog, triggerNotification, setActiveTab }) {
  const latestVitals = patient.vitalsHistory[patient.vitalsHistory.length - 1];

  return (
    <div className="space-y-4">
      
      {/* Vitals Quick Glances */}
      {latestVitals && (
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.bpLabel}</span>
              <div className="text-base font-extrabold text-slate-800 font-mono">
                {latestVitals.bpSys}/{latestVitals.bpDia} <span className="text-[10px] font-normal text-slate-500">mmHg</span>
              </div>
              <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-1 rounded">
                {latestVitals.bpSys > 130 ? (lang === 'bn' ? 'সতর্কতা: একটু বেশি' : 'Elevated') : (lang === 'bn' ? 'স্বাভাবিক' : 'Normal')}
              </span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.glucoseLabel}</span>
              <div className="text-base font-extrabold text-slate-800 font-mono">
                {latestVitals.glucose} <span className="text-[10px] font-normal text-slate-500">mmol/L</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1 rounded">
                {latestVitals.glucose > 7.8 ? (lang === 'bn' ? 'খাবার পর পরিমাপ' : 'Post-prandial') : (lang === 'bn' ? 'নিয়ন্ত্রিত' : 'Controlled')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Active Chronic Conditions Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{t.activeConditions}</h3>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {patient.conditions.length} {lang === 'bn' ? 'টি নিবন্ধিত' : 'Diagnosed'}
          </span>
        </div>

        <div className="space-y-2">
          {patient.conditions.length > 0 ? (
            patient.conditions.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <span className="font-semibold text-xs text-slate-800 block">
                    {lang === 'bn' ? c.nameBn : c.nameEn}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ICD-11: {c.code} • {lang === 'bn' ? `${c.since} সাল থেকে` : `Since ${c.since}`}
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  c.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {c.severity}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-2 text-center">{lang === 'bn' ? 'কোনো ক্রনিক রোগ লিপিবদ্ধ নেই' : 'No chronic conditions recorded'}</p>
          )}
        </div>
      </div>

      {/* Child EPI Immunization Tracker (Shown if Patient has EPI records) */}
      {patient.epi && patient.epi.length > 0 && (
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Baby className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-emerald-900 text-xs sm:text-sm">
                {lang === 'bn' ? 'ইপিআই টিকাদান কার্ড (MOHFW EPI)' : 'EPI Routine Immunization Tracker'}
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
              EPI Verified
            </span>
          </div>
          <div className="space-y-1.5">
            {patient.epi.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/80 p-2 rounded-lg text-xs border border-emerald-100">
                <div>
                  <span className="font-bold text-slate-800 block">{item.vaccine}</span>
                  <span className="text-[10px] text-slate-500">{item.dose} • {item.date}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  item.status === 'Given' || item.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Medications Strip with Refill Status */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <Pill className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{t.currentMeds}</h3>
          </div>
          <button 
            onClick={() => setActiveTab('reminders')}
            className="text-[11px] text-emerald-700 hover:underline font-semibold"
          >
            {lang === 'bn' ? 'সব দেখুন' : 'View All'}
          </button>
        </div>

        <div className="space-y-2">
          {patient.medications.map(med => (
            <div key={med.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-800 block">{med.name}</span>
                <span className="text-[11px] text-slate-500">
                  {lang === 'bn' ? med.scheduleBn : med.scheduleEn}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block ${
                  med.daysRemaining <= 3 ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {med.daysRemaining} {lang === 'bn' ? 'দিনের বাকি' : 'days left'}
                </span>
                {med.daysRemaining <= 3 && (
                  <span className="text-[9px] text-red-600 font-semibold block mt-0.5">
                    {lang === 'bn' ? 'রিফিল প্রয়োজন' : 'Refill Due'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Encounter Summary */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-slate-600" />
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{t.lastVisit}</h3>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">{lang === 'bn' ? 'তারিখ:' : 'Date:'}</span>
            <span className="font-semibold text-slate-800">{patient.lastEncounter.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{lang === 'bn' ? 'হাসপাতাল/কেন্দ্র:' : 'Facility:'}</span>
            <span className="font-semibold text-slate-800">
              {lang === 'bn' ? patient.lastEncounter.facilityBn : patient.lastEncounter.facility}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{lang === 'bn' ? 'ডাক্তার:' : 'Doctor:'}</span>
            <span className="text-slate-700">{patient.lastEncounter.doctor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{lang === 'bn' ? 'ধরন:' : 'Type:'}</span>
            <span className="text-emerald-700 font-medium">
              {lang === 'bn' ? patient.lastEncounter.typeBn : patient.lastEncounter.type}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

function ConservativeSymptomChecker({ lang, t, triggerNotification }) {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [hasEmergencySign, setHasEmergencySign] = useState(false);
  const [duration, setDuration] = useState("under_48h");
  const [result, setResult] = useState(null);

  const symptomOptions = [
    { id: 'fever', bn: 'জ্বর (Fever)', en: 'Fever', emergency: false },
    { id: 'cough', bn: 'কাশি বা সর্দি (Cough/Cold)', en: 'Cough or Cold', emergency: false },
    { id: 'chest_pain', bn: 'বুকে তীব্র ব্যথা বা চাপ (Chest pain / Pressure)', en: 'Severe Chest Pain', emergency: true },
    { id: 'breathlessness', bn: 'তীব্র শ্বাসকষ্ট (Severe shortness of breath)', en: 'Severe Shortness of breath', emergency: true },
    { id: 'vomiting', bn: 'বারবার বমি বা পাতলা পায়খানা (Vomiting/Diarrhea)', en: 'Vomiting or Diarrhea', emergency: false },
    { id: 'unconscious', bn: 'অচেতন বা বিভ্রান্তিকর আচরণ (Confusion / Slurred speech)', en: 'Confusion or Slurred speech', emergency: true }
  ];

  const handleToggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym.id)) {
      setSelectedSymptoms(selectedSymptoms.filter(x => x !== sym.id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym.id]);
    }
  };

  const evaluateTriage = () => {
    // Check if any selected symptom is an emergency flag
    const isEmergency = selectedSymptoms.some(id => {
      const s = symptomOptions.find(o => o.id === id);
      return s && s.emergency;
    }) || hasEmergencySign;

    if (isEmergency) {
      setResult('emergency');
      triggerNotification(
        lang === 'bn' 
          ? "জরুরি সতর্কতা: রোগীকে অবিলম্বে জরুরি বিভাগে নিন।" 
          : "RED FLAG TRIAGE: Immediate emergency care recommended."
      );
    } else {
      setResult('mild');
    }
    setStep(3);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      
      {/* Header & Non-Diagnostic Disclaimer */}
      <div>
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">{t.triageTitle}</h3>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5 mt-2 text-[11px] leading-relaxed flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{t.triageNotice}</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block">
            {lang === 'bn' ? '১. রোগীর কী কী লক্ষণ দেখা যাচ্ছে? (একাধিক নির্বাচন করতে পারেন):' : '1. Which symptoms are present? (Select all that apply):'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {symptomOptions.map(opt => {
              const isChecked = selectedSymptoms.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => handleToggleSymptom(opt)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition ${
                    isChecked 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500' 
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{lang === 'bn' ? opt.bn : opt.en}</span>
                  {opt.emergency && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-mono">
                      Red Flag
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={selectedSymptoms.length === 0}
            className={`w-full py-2.5 rounded-xl font-bold text-xs mt-2 transition ${
              selectedSymptoms.length > 0 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {lang === 'bn' ? 'পরবর্তী ধাপে যান' : 'Continue to Next Step'}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {lang === 'bn' ? '২. লক্ষণগুলো কত দিন ধরে চলছে?' : '2. How long have the symptoms been present?'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'under_24h', bn: '২৪ ঘণ্টার কম', en: '< 24 Hours' },
                { id: 'under_48h', bn: '১ - ২ দিন', en: '1 - 2 Days' },
                { id: 'more_3d', bn: '৩ দিনের বেশি', en: '3+ Days' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setDuration(item.id)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition ${
                    duration === item.id 
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' 
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {lang === 'bn' ? item.bn : item.en}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-800 block mb-2">
              {lang === 'bn' ? '৩. নিচের কোনো বিপদচিহ্ন কি লক্ষ্য করেছেন?' : '3. Any danger signs observed?'}
            </span>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasEmergencySign}
                  onChange={(e) => setHasEmergencySign(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-slate-700">
                  {lang === 'bn' 
                    ? 'পানি বা খাবার একেবারেই গিলতে না পারা অথবা তীব্র শ্বাসকষ্ট' 
                    : 'Inability to drink/swallow fluids, or severe respiratory distress'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold"
            >
              {lang === 'bn' ? 'পেছনে যান' : 'Back'}
            </button>
            <button
              onClick={evaluateTriage}
              className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow"
            >
              {lang === 'bn' ? 'ফলাফল ও পরামর্শ দেখুন' : 'Evaluate & View Triage'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <div className="space-y-4 pt-1">
          {result === 'emergency' ? (
            <div className="bg-red-50 border-2 border-red-500 text-red-950 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-red-700">
                <ShieldAlert className="w-6 h-6 animate-bounce" />
                <h4 className="font-extrabold text-sm sm:text-base">
                  {lang === 'bn' ? 'জরুরি চিকিৎসা প্রয়োজন (RED FLAG)' : 'Urgent Emergency Care Required'}
                </h4>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {t.emergencyWarning}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href="tel:16263"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-xs text-center flex items-center justify-center space-x-1 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? '১৬২৬৩ স্বাস্থ্য বাতায়নে কল করুন' : 'Call 16263 Shasthya Batayon'}</span>
                </a>
                <a
                  href="tel:999"
                  className="bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs text-center flex items-center justify-center space-x-1"
                >
                  <span>{lang === 'bn' ? 'জরুরি অ্যাম্বুলেন্স: ৯৯৯' : 'Emergency: 999'}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle className="w-6 h-6" />
                <h4 className="font-bold text-sm sm:text-base">
                  {lang === 'bn' ? 'প্রাথমিক যত্ন ও পর্যবেক্ষণ' : 'Standard Primary Care & Home Observation'}
                </h4>
              </div>
              <p className="text-xs leading-relaxed">
                {t.mildAdvice}
              </p>
              <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200 text-[11px] text-slate-700">
                <strong>{lang === 'bn' ? 'পরামর্শ:' : 'Action:'}</strong> {lang === 'bn' ? 'প্রচুর তরল খাবার গ্রহণ করুন, বিশ্রাম নিন এবং ওষুধের রিমাইন্ডার মেনে চলুন।' : 'Keep hydrated with ORS/fluids, rest adequately, and maintain your regular medications.'}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setStep(1);
              setSelectedSymptoms([]);
              setHasEmergencySign(false);
              setResult(null);
            }}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            {lang === 'bn' ? 'পুনরায় লক্ষণ পরীক্ষা করুন' : 'Restart Symptom Check'}
          </button>
        </div>
      )}

    </div>
  );
}

function VitalsTrackerTab({ lang, t, patient, onOpenVitalsLog }) {
  const history = patient.vitalsHistory;
  
  // Calculate SVG bounds for BP
  const maxBP = 180;
  const minBP = 60;
  const chartHeight = 120;
  const chartWidth = 280;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">{t.vitalsTracker}</h3>
          <p className="text-[11px] text-slate-500">
            {lang === 'bn' ? 'ডায়াবেটিস ও উচ্চ রক্তচাপের দীর্ঘমেয়াদী ট্রেন্ড' : 'Longitudinal trend for chronic disease management'}
          </p>
        </div>
        <button
          onClick={onOpenVitalsLog}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'পরিমাপ লিখুন' : 'Log Vital'}</span>
        </button>
      </div>

      {/* SVG Trend Chart for Blood Pressure */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs font-bold text-slate-700">{t.bpLabel} (Systolic / Diastolic)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Target: &lt;130/80</span>
        </div>

        {/* SVG Curve */}
        <div className="w-full flex justify-center py-2">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full max-w-sm h-32 overflow-visible">
            {/* Target Normal Zone Guide */}
            <rect x="0" y="30" width={chartWidth} height="40" fill="#10B981" fillOpacity="0.08" />
            
            {/* Grid Lines */}
            <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
            
            {/* Draw Systolic Points & Line */}
            {history.map((pt, i) => {
              const x = (i / (history.length - 1 || 1)) * (chartWidth - 40) + 20;
              const ySys = chartHeight - ((pt.bpSys - minBP) / (maxBP - minBP)) * chartHeight;
              const yDia = chartHeight - ((pt.bpDia - minBP) / (maxBP - minBP)) * chartHeight;

              return (
                <g key={i}>
                  {/* Systolic dot */}
                  <circle cx={x} cy={ySys} r="4" fill="#EF4444" />
                  <text x={x} y={ySys - 8} fontSize="9" textAnchor="middle" fill="#EF4444" fontWeight="bold">
                    {pt.bpSys}
                  </text>

                  {/* Diastolic dot */}
                  <circle cx={x} cy={yDia} r="3.5" fill="#3B82F6" />
                  <text x={x} y={yDia + 12} fontSize="9" textAnchor="middle" fill="#3B82F6">
                    {pt.bpDia}
                  </text>

                  {/* Date label */}
                  <text x={x} y={chartHeight + 14} fontSize="8" textAnchor="middle" fill="#64748B">
                    {pt.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex justify-center space-x-6 text-[10px] text-slate-500 pt-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Systolic (উচ্চ)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Diastolic (নিম্ন)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-emerald-400/30 rounded" />
            <span>স্বাভাবিক রেঞ্জ</span>
          </span>
        </div>
      </div>

      {/* Blood Glucose Trend Strip */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-slate-700">{t.glucoseLabel} (Random / Fasting mmol/L)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Normal: 4.4 - 7.8</span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {history.map((pt, i) => (
            <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 text-center">
              <span className="text-[9px] text-slate-400 block">{pt.date}</span>
              <span className="text-sm font-extrabold text-amber-600 font-mono block">
                {pt.glucose}
              </span>
              <span className="text-[8px] text-slate-500">mmol/L</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function DocumentVaultTab({ lang, t, patient, triggerNotification }) {
  const [documents, setDocuments] = useState([
    { id: "doc-1", titleEn: "Paper Prescription (Dhaka Med OPD)", titleBn: "হাতে লেখা প্রেসক্রিপশন (ঢামেক)", date: "2026-08-14", facility: "Dhaka Medical", type: "prescription", verified: true },
    { id: "doc-2", titleEn: "HbA1c Lab Report (7.1%)", titleBn: "এইচবিএ১সি রক্তের পরীক্ষা রিপোর্ট", date: "2026-09-02", facility: "Popular Diagnostic", type: "lab", verified: true }
  ]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateScan = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newDoc = {
        id: `doc-${Date.now()}`,
        titleEn: "Scanned CBC Blood Report",
        titleBn: "স্ক্যানকৃত সিবিসি রক্তের রিপোর্ট",
        date: "2026-09-23",
        facility: "Upazila Health Lab",
        type: "lab",
        verified: false
      };
      setDocuments([newDoc, ...documents]);
      triggerNotification(
        lang === 'bn' 
          ? "কাগজের রিপোর্ট সফলভাবে স্ক্যান করে ডিজিটাল ভল্টে সংরক্ষিত হয়েছে!" 
          : "Paper record photographed & secured in national document vault!"
      );
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">{t.documentVault}</h3>
          <p className="text-[11px] text-slate-500">
            {lang === 'bn' ? 'পুরাতন কাগজের প্রেসক্রিপশন ও ল্যাব টেস্ট রিপোর্ট নিরাপদে সংরক্ষণ করুন' : 'Photograph and digitize historical paper health documents'}
          </p>
        </div>
        <button
          onClick={handleSimulateScan}
          disabled={isUploading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow"
        >
          {isUploading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{lang === 'bn' ? 'ছবি তুলুন / স্ক্যান' : 'Snap & Upload'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {documents.map(doc => (
          <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">
                    {lang === 'bn' ? doc.titleBn : doc.titleEn}
                  </h4>
                  <span className="text-[10px] text-slate-500">{doc.facility} • {doc.date}</span>
                </div>
              </div>
              {doc.verified ? (
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                  <Check className="w-2.5 h-2.5" />
                  <span>DGHS Sync</span>
                </span>
              ) : (
                <span className="text-[9px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                  Pending OCR
                </span>
              )}
            </div>

            {/* Mock Image Thumbnail Preview */}
            <div className="h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs font-mono border border-slate-300">
              [ Scanned Image Preview: {doc.id}.jpg ]
            </div>

            <div className="flex justify-between items-center pt-1 text-[11px]">
              <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">
                {lang === 'bn' ? 'পূর্ণাঙ্গ রিপোর্ট দেখুন' : 'View Full Document'}
              </span>
              <Download className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicationRemindersTab({ lang, t, patient, triggerNotification }) {
  const [smsFallbackActive, setSmsFallbackActive] = useState(true);

  const handleTestSmsReminder = (medName) => {
    triggerNotification(
      lang === 'bn'
        ? `[এসএমএস পাঠানো হয়েছে]: সময় হয়েছে! আপনার ওষুধ "${medName}" গ্রহণের সময়। সুস্থ থাকুন - স্বাস্থ্যবন্ধু।`
        : `[SMS Dispatched to ${patient.phone}]: Time for dose "${medName}". Take with water - ShasthyoBondhu.`
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm sm:text-base">{t.medReminders}</h3>
          <p className="text-[11px] text-slate-500">
            {lang === 'bn' ? 'ইন্টারনেট বন্ধ থাকলেও মোবাইলে স্বাভাবিক এসএমএসের মাধ্যমে অ্যালার্ম আসবে' : 'Push notifications with cellular SMS fallback for patchy 4G'}
          </p>
        </div>
      </div>

      {/* SMS Fallback Switcher Card */}
      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Send className="w-5 h-5 text-emerald-700" />
          <div>
            <span className="font-bold text-xs text-emerald-950 block">
              {lang === 'bn' ? 'সেলুলার এসএমএস ব্যাকআপ চালু' : 'Cellular SMS Fallback Active'}
            </span>
            <span className="text-[10px] text-emerald-800">
              {lang === 'bn' ? `মোবাইল নম্বর: ${patient.phone}` : `Recipient SIM: ${patient.phone}`}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            const next = !smsFallbackActive;
            setSmsFallbackActive(next);
            triggerNotification(
              next 
                ? (lang === 'bn' ? "এসএমএস সার্ভিস চালু করা হয়েছে" : "SMS Fallback Gateway Enabled")
                : (lang === 'bn' ? "এসএমএস সার্ভিস বন্ধ করা হয়েছে" : "SMS Fallback Gateway Disabled")
            );
          }}
          className={`w-11 h-6 rounded-full transition p-0.5 ${smsFallbackActive ? 'bg-emerald-600' : 'bg-slate-300'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-white transition transform ${smsFallbackActive ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Medicine Dose Checklist */}
      <div className="space-y-2.5">
        {patient.medications.map(med => (
          <div key={med.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-xs text-slate-800 block">{med.name}</span>
              <div className="flex items-center space-x-2 text-[11px] text-slate-600">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>{lang === 'bn' ? med.scheduleBn : med.scheduleEn}</span>
              </div>
              <span className="text-[10px] text-slate-400 block font-mono">
                {lang === 'bn' ? 'প্রেসক্রাইবার:' : 'By:'} {med.prescriber}
              </span>
            </div>

            <div className="flex flex-col items-end space-y-1.5">
              <button
                onClick={() => handleTestSmsReminder(med.name)}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg text-[10px] flex items-center space-x-1"
                title="Send test reminder"
              >
                <Bell className="w-3 h-3" />
                <span>{lang === 'bn' ? 'পরীক্ষামূলক এসএমএস' : 'Simulate SMS'}</span>
              </button>
              <span className="text-[9px] text-slate-500 font-mono">
                {med.daysRemaining} {lang === 'bn' ? 'দিনের ওষুধ বাকি' : 'days stock'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoctorConsoleView({ lang, t, currentPatient, patients, rxList, setRxList, triggerNotification }) {
  const [complaint, setComplaint] = useState("Patient reports intermittent dizziness in morning for last 4 days. Blood pressure elevated at home.");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("I10 - Essential (primary) Hypertension");
  const [medName, setMedName] = useState("Tab. Bisoprolol 2.5mg");
  const [medInstruction, setMedInstruction] = useState("1+0+0 Morning (সকালে ১টি)");
  const [medDays, setMedDays] = useState(30);
  const [doctorMeds, setDoctorMeds] = useState([
    { name: "Tab. Metformin 500mg", instructions: "1+0+1 After meal", quantity: 60 },
    { name: "Tab. Amlodipine 5mg", instructions: "0+0+1 Night", quantity: 30 }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddMed = () => {
    if (!medName) return;
    setDoctorMeds([...doctorMeds, { name: medName, instructions: medInstruction, quantity: Number(medDays) }]);
    setMedName("");
  };

  const handleIssuePrescription = () => {
    const newRx = {
      id: `RX-BD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: currentPatient.id,
      patientName: currentPatient.nameEn,
      patientAge: currentPatient.age,
      doctorName: "Prof. Dr. Tanvir Hossain",
      bmdcReg: "BMDC-A-48291",
      date: "2026-09-23",
      diagnosis: selectedDiagnosis,
      medicines: doctorMeds.map(m => ({ ...m, dispensed: false })),
      advice: "Avoid extra raw salt, adhere strictly to regular morning dose. Check fasting glucose next Monday.",
      dispensedStatus: "Not Dispensed",
      qrPayload: `SHASTHYO-BONDHU:RX-${Date.now()}:VALID`
    };

    setRxList([newRx, ...rxList]);
    triggerNotification(
      lang === 'bn' 
        ? `ই-প্রেসক্রিপশন সফলভাবে প্রস্তুত ও ডিজিএইচএস কিউআর কোডসহ সংরক্ষিত হয়েছে! (${newRx.id})`
        : `Electronic Prescription issued with DGDA/DGHS verifiable QR! (${newRx.id})`
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      
      {/* Doctor Header & Licensing Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <h2 className="text-lg font-bold text-slate-900">{t.doctorTitle}</h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            <strong>{t.drName}</strong> • {t.drDesignation}
          </p>
        </div>
        
        {/* NID / Phone Search Simulation */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            placeholder={t.searchPatient}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Patient Encounter Chart Banner */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-teal-900 font-mono">
              Patient ID: {currentPatient.id}
            </span>
            <span className="bg-teal-200 text-teal-800 text-[10px] px-2 py-0.5 rounded font-semibold">
              EHR Active
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            {lang === 'bn' ? currentPatient.nameBn : currentPatient.nameEn} ({currentPatient.age}y, {currentPatient.gender})
          </h3>
          <p className="text-xs text-slate-600">
            {currentPatient.address} • NID: {currentPatient.nid || currentPatient.brn} • Phone: {currentPatient.phone}
          </p>
        </div>

        {/* Known Allergies Callout */}
        <div className="bg-red-50 border border-red-200 p-2.5 rounded-lg text-xs">
          <span className="font-bold text-red-800 block text-[11px]">
            ⚠️ {lang === 'bn' ? 'অ্যালার্জি সতর্কতা:' : 'Clinical Allergy Alert:'}
          </span>
          <span className="text-red-700">
            {currentPatient.allergies.length > 0
              ? currentPatient.allergies.map(a => `${a.substanceEn} (${a.reactionEn})`).join(', ')
              : (lang === 'bn' ? 'কোনো অ্যালার্জি জানা নেই' : 'No known drug allergies (NKDA)')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Structured Clinical Notes */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.chiefComplaint}
            </label>
            <textarea
              rows={3}
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.addDiagnosis}
            </label>
            <select
              value={selectedDiagnosis}
              onChange={(e) => setSelectedDiagnosis(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none bg-white font-medium"
            >
              <option value="I10 - Essential (primary) Hypertension">I10 - Essential (primary) Hypertension</option>
              <option value="E11.9 - Type 2 Diabetes Mellitus without complications">E11.9 - Type 2 Diabetes Mellitus without complications</option>
              <option value="J45 - Bronchial Asthma / Reactive Airway">J45 - Bronchial Asthma / Reactive Airway</option>
              <option value="K29.7 - Gastritis, unspecified">K29.7 - Gastritis, unspecified</option>
            </select>
          </div>

          {/* Quick Review of Vitals */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">{t.vitalsReview}</span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white p-2 rounded border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block">BP</span>
                <span className="font-bold text-slate-800">130/82</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block">RBS Glucose</span>
                <span className="font-bold text-slate-800">7.1 mmol/L</span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 block">Pulse</span>
                <span className="font-bold text-slate-800">72 bpm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Electronic Prescription Generator */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{t.rxBuilder}</h3>
            <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded font-mono">
              BMDC Digital Sign Ready
            </span>
          </div>

          {/* Add Medication Mini Form */}
          <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Medicine (e.g. Tab. Bisoprolol 2.5mg)"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Dosage instruction (1+0+0)"
                value={medInstruction}
                onChange={(e) => setMedInstruction(e.target.value)}
                className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none"
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Days (e.g. 30)"
                value={medDays}
                onChange={(e) => setMedDays(e.target.value)}
                className="w-24 text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none"
              />
              <button
                onClick={handleAddMed}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-1.5 rounded-lg flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addMedicine}</span>
              </button>
            </div>
          </div>

          {/* Current Rx Lines */}
          <div className="space-y-2">
            {doctorMeds.map((m, idx) => (
              <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">{m.name}</span>
                  <span className="text-[10px] text-slate-500">{m.instructions} • Qty: {m.quantity}</span>
                </div>
                <button
                  onClick={() => setDoctorMeds(doctorMeds.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Issue Button */}
          <button
            onClick={handleIssuePrescription}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.issueRx}</span>
          </button>
        </div>

      </div>

    </div>
  );
}

function ChwConsoleView({ lang, t, patients, setPatients, queue, setQueue, isOnline, triggerNotification }) {
  const [newPtName, setNewPtName] = useState("");
  const [newPtNid, setNewPtNid] = useState("");
  const [newPtPhone, setNewPtPhone] = useState("");
  const [newPtAge, setNewPtAge] = useState("");
  const [newPtGender, setNewPtGender] = useState("Female");

  // Vitals entry fields
  const [vitalName, setVitalName] = useState("");
  const [vitalBp, setVitalBp] = useState("");
  const [vitalGlucose, setVitalGlucose] = useState("");

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    if (!newPtName || !newPtPhone) return;

    const newKey = `p_${Date.now()}`;
    const newRecord = {
      id: `BD-CHW-${Math.floor(100000 + Math.random() * 900000)}-2026`,
      nid: newPtNid || "200192849102",
      brn: null,
      nameEn: newPtName,
      nameBn: newPtName,
      age: Number(newPtAge) || 30,
      gender: newPtGender,
      genderBn: newPtGender === 'Female' ? 'মহিলা' : 'পুরুষ',
      phone: newPtPhone,
      relation: "New Enrollee",
      relationBn: "নতুন নিবন্ধিত সদস্য",
      bloodGroup: "O+",
      address: "Keraniganj Ward 4, Dhaka",
      conditions: [],
      allergies: [],
      medications: [],
      vitalsHistory: [
        { date: "Today", bpSys: 125, bpDia: 80, glucose: 6.2, pulse: 75 }
      ],
      lastEncounter: {
        date: "23 September 2026",
        facility: "Keraniganj CHW Field Check",
        facilityBn: "কেরানীগঞ্জ মাঠপর্যায়ে নিবন্ধন",
        doctor: "Shasthya Kormi Rashida Begum",
        type: "Community Intake",
        typeBn: "কমিউনিটি স্বাস্থ্য নিবন্ধন"
      },
      epi: []
    };

    setPatients(prev => ({ ...prev, [newKey]: newRecord }));
    setNewPtName("");
    setNewPtNid("");
    setNewPtPhone("");
    setNewPtAge("");

    triggerNotification(
      lang === 'bn' 
        ? `স্বাস্থ্য কর্মী দ্বারা নতুন রোগী সফলভাবে নিবন্ধিত হয়েছে! (আইডি: ${newRecord.id})`
        : `New patient onboarded via CHW assisted protocol! (ID: ${newRecord.id})`
    );
  };

  const handleQueueVital = (e) => {
    e.preventDefault();
    if (!vitalName || !vitalBp) return;

    const newQueueItem = {
      id: `q-${Date.now()}`,
      patientName: vitalName,
      age: 45,
      bp: vitalBp,
      glucose: vitalGlucose || "6.5",
      timestamp: "Just now"
    };

    setQueue([newQueueItem, ...queue]);
    setVitalName("");
    setVitalBp("");
    setVitalGlucose("");

    triggerNotification(
      lang === 'bn'
        ? `পরিমাপ অফলাইন কিউতে সংরক্ষিত হয়েছে (${newQueueItem.bp} mmHg)`
        : `Vital cached in local offline sync queue (${newQueueItem.bp} mmHg)`
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      
      {/* CHW Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">{t.chwTitle}</h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            <strong>{t.chwName}</strong> • {t.assignedArea}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs text-amber-900 flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-amber-600" />
          <span>{queue.length} {t.syncQueueText}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Assisted Registration Form */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-amber-700" />
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{t.registerPatient}</h3>
          </div>
          <p className="text-[11px] text-slate-500">
            {lang === 'bn' ? 'যেসব রোগী নিজে স্মার্টফোন চালাতে পারেন না তাদের জন্য সহজ নিবন্ধন' : 'Assisted onboarding for rural citizens without smartphone literacy'}
          </p>

          <form onSubmit={handleRegisterPatient} className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-slate-700 block mb-1">
                {lang === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kulsum Bibi"
                value={newPtName}
                onChange={(e) => setNewPtName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  {lang === 'bn' ? 'বয়স (Age)' : 'Age'}
                </label>
                <input
                  type="number"
                  placeholder="42"
                  value={newPtAge}
                  onChange={(e) => setNewPtAge(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  {lang === 'bn' ? 'লিঙ্গ' : 'Gender'}
                </label>
                <select
                  value={newPtGender}
                  onChange={(e) => setNewPtGender(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                >
                  <option value="Female">Female (মহিলা)</option>
                  <option value="Male">Male (পুরুষ)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (OTP)' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="018XXXXXXXX"
                  value={newPtPhone}
                  onChange={(e) => setNewPtPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-700 block mb-1">
                  {lang === 'bn' ? 'জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন' : 'NID / BRN No.'}
                </label>
                <input
                  type="text"
                  placeholder="198XXXXXXXXXXX"
                  value={newPtNid}
                  onChange={(e) => setNewPtNid(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm"
            >
              {lang === 'bn' ? 'রোগী নিবন্ধন সম্পন্ন করুন' : 'Complete Assisted Registration'}
            </button>
          </form>
        </div>

        {/* Offline Queue & Quick Household Vital Intake */}
        <div className="space-y-4">
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{t.logVitals}</h3>
            <p className="text-[11px] text-slate-500 mb-3">{t.offlineNotice}</p>

            <form onSubmit={handleQueueVital} className="space-y-2.5">
              <input
                type="text"
                placeholder="Patient Name or NID..."
                value={vitalName}
                onChange={(e) => setVitalName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="BP (e.g. 138/86)"
                  value={vitalBp}
                  onChange={(e) => setVitalBp(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Glucose (mmol/L)"
                  value={vitalGlucose}
                  onChange={(e) => setVitalGlucose(e.target.value)}
                  className="text-xs px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg text-xs"
              >
                {lang === 'bn' ? 'পরিমাপ কিউতে যোগ করুন' : 'Add to Local Offline Queue'}
              </button>
            </form>
          </div>

          {/* Pending Field Queue Display */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {lang === 'bn' ? 'অফলাইন ডেটা কিউ (স্থানীয়ভাবে সংরক্ষিত)' : 'Offline Local Storage Buffer'}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                {queue.length} Pending
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {queue.map(item => (
                <div key={item.id} className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.patientName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">BP: {item.bp} • Glucose: {item.glucose} mmol/L</span>
                  </div>
                  <span className="text-[9px] text-amber-800 font-semibold bg-amber-200/80 px-1.5 py-0.5 rounded">
                    Queued
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function PharmacyConsoleView({ lang, t, rxList, setRxList, triggerNotification }) {
  const [searchRxId, setSearchRxId] = useState("RX-BD-2026-9021");
  const [foundRx, setFoundRx] = useState(rxList[0]);

  const handleSearchRx = () => {
    const rx = rxList.find(r => r.id.toLowerCase() === searchRxId.trim().toLowerCase());
    setFoundRx(rx || null);
  };

  const handleDispenseMedicine = (medIndex) => {
    if (!foundRx) return;
    const updated = { ...foundRx };
    updated.medicines[medIndex].dispensed = true;
    
    // Check if all dispensed
    const allDone = updated.medicines.every(m => m.dispensed);
    updated.dispensedStatus = allDone ? "Dispensed" : "Partially Dispensed";

    setFoundRx(updated);
    setRxList(rxList.map(r => r.id === updated.id ? updated : r));

    triggerNotification(
      lang === 'bn'
        ? `ওষুধ বিতরণ লিপিবদ্ধ করা হয়েছে: ${updated.medicines[medIndex].name}`
        : `Dispense log updated for ${updated.medicines[medIndex].name}`
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      
      {/* Pharmacy Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">{t.pharmaTitle}</h2>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            <strong>{t.pharmaName}</strong>
          </p>
        </div>

        {/* Prescription Search Bar */}
        <div className="flex space-x-2 max-w-md w-full">
          <input
            type="text"
            placeholder={t.scanOrEnter}
            value={searchRxId}
            onChange={(e) => setSearchRxId(e.target.value)}
            className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-xl outline-none font-mono focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchRx}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Prescription Dispense Card */}
      {foundRx ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono text-blue-900">{foundRx.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  foundRx.dispensedStatus === 'Dispensed' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {foundRx.dispensedStatus}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{foundRx.patientName} ({foundRx.patientAge}y)</h3>
              <p className="text-xs text-slate-500">
                Prescribed by: {foundRx.doctorName} ({foundRx.bmdcReg}) • Date: {foundRx.date}
              </p>
            </div>

            <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-700" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
            <strong className="text-slate-700 block mb-1">Diagnosis / Indication:</strong>
            <span className="text-slate-600">{foundRx.diagnosis}</span>
          </div>

          {/* Medication Lines to Dispense */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              {lang === 'bn' ? 'ওষুধের তালিকা ও সরবরাহ স্থিতি:' : 'Prescribed Medicines & Dispensing Status:'}
            </span>
            {foundRx.medicines.map((m, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800 block">{m.name}</span>
                  <span className="text-[11px] text-slate-500">{m.instructions} • Total Qty: {m.quantity}</span>
                </div>
                {m.dispensed ? (
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'সরবরাহকৃত' : 'Dispensed'}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleDispenseMedicine(idx)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-sm"
                  >
                    <span>{lang === 'bn' ? 'ওষুধ প্রদান করুন' : 'Dispense'}</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
            <strong>Doctor Advice:</strong> {foundRx.advice}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400 text-xs">
          No active e-prescription found for ID: {searchRxId}
        </div>
      )}

    </div>
  );
}

function FhirInspectorView({ lang, t, patient, rxList }) {
  const [selectedResource, setSelectedResource] = useState('Patient');

  // Dynamically build FHIR R4 standard models
  const fhirPatient = useMemo(() => ({
    resourceType: "Patient",
    id: patient.id,
    identifier: [
      { system: "https://dghs.gov.bd/nid", value: patient.nid || "N/A" },
      { system: "https://dghs.gov.bd/patient-uuid", value: patient.id }
    ],
    name: [
      { use: "official", family: patient.nameEn.split(' ').slice(-1)[0], given: patient.nameEn.split(' ') }
    ],
    telecom: [
      { system: "phone", value: patient.phone, use: "mobile" }
    ],
    gender: patient.gender.toLowerCase(),
    birthDate: `${2026 - patient.age}-01-01`,
    address: [
      { text: patient.address, country: "Bangladesh" }
    ]
  }), [patient]);

  const fhirObservation = useMemo(() => {
    const latest = patient.vitalsHistory[patient.vitalsHistory.length - 1];
    return {
      resourceType: "Observation",
      id: `obs-bp-${Date.now()}`,
      status: "final",
      category: [{
        coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" }]
      }],
      code: {
        coding: [{ system: "http://loinc.org", code: "85354-9", display: "Blood pressure panel" }]
      },
      subject: { reference: `Patient/${patient.id}` },
      effectiveDateTime: "2026-09-23T08:30:00+06:00",
      component: [
        {
          code: { coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }] },
          valueQuantity: { value: latest?.bpSys || 120, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" }
        },
        {
          code: { coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }] },
          valueQuantity: { value: latest?.bpDia || 80, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" }
        }
      ]
    };
  }, [patient]);

  const fhirMedicationRequest = useMemo(() => ({
    resourceType: "MedicationRequest",
    id: "medreq-9021",
    status: "active",
    intent: "order",
    medicationCodeableConcept: {
      coding: [{ system: "https://dgda.gov.bd/inn", code: "MET-500", display: "Metformin Hydrochloride 500mg" }]
    },
    subject: { reference: `Patient/${patient.id}` },
    requester: { display: "Prof. Dr. Tanvir Hossain, BMDC: A-48291" },
    dosageInstruction: [{ text: "1+0+1 After meal for 30 days" }]
  }), [patient]);

  const fhirCondition = useMemo(() => ({
    resourceType: "Condition",
    id: "cond-101",
    clinicalStatus: {
      coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }]
    },
    verificationStatus: {
      coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-ver-status", code: "confirmed" }]
    },
    category: [{
      coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-category", code: "problem-list-item" }]
    }],
    code: {
      coding: [{ system: "http://id.who.int/icd11/mms", code: "BA00", display: "Essential Hypertension" }]
    },
    subject: { reference: `Patient/${patient.id}` }
  }), [patient]);

  const currentJson = selectedResource === 'Patient' 
    ? fhirPatient 
    : selectedResource === 'Observation' 
    ? fhirObservation 
    : selectedResource === 'MedicationRequest' 
    ? fhirMedicationRequest 
    : fhirCondition;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">HL7 FHIR R4 Semantic Data Layer</h2>
          </div>
          <p className="text-xs text-slate-500">
            Standardized health interoperability format for DGHS national exchange and cross-hospital sharing.
          </p>
        </div>

        {/* Resource Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {['Patient', 'Observation', 'MedicationRequest', 'Condition'].map(res => (
            <button
              key={res}
              onClick={() => setSelectedResource(res)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition ${
                selectedResource === res 
                  ? 'bg-slate-900 text-emerald-400 shadow-sm' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {res}
            </button>
          ))}
        </div>
      </div>

      {/* JSON Viewer with Copy Action */}
      <div className="relative">
        <pre className="bg-slate-950 text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[500px] border border-slate-800 shadow-inner">
          {JSON.stringify(currentJson, null, 2)}
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(JSON.stringify(currentJson, null, 2))}
          className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-[11px] font-sans flex items-center space-x-1"
        >
          <span>Copy JSON</span>
        </button>
      </div>
    </div>
  );
}

function AuditLogView({ lang, t, patient, logs, setLogs, triggerNotification }) {
  const [breakGlassReason, setBreakGlassReason] = useState("");
  const [showBreakGlassModal, setShowBreakGlassModal] = useState(false);

  const handleSimulateBreakGlass = () => {
    if (!breakGlassReason) return;
    const newLog = {
      id: `aud-${Date.now()}`,
      timestamp: "2026-09-23 00:04",
      actor: "Dr. Nazmul Huda (Upazila Health ER)",
      role: "Emergency Physician",
      purpose: breakGlassReason,
      type: "Break-Glass Emergency Access",
      breakGlass: true
    };
    setLogs([newLog, ...logs]);
    setShowBreakGlassModal(false);
    setBreakGlassReason("");
    triggerNotification(
      lang === 'bn' 
        ? "জরুরি ব্রেক-গ্লাস অ্যাক্সেস রেকর্ড করা হয়েছে! রোগীকে তাৎক্ষণিক এসএমএস সতর্কবার্তা পাঠানো হয়েছে।" 
        : "Break-glass emergency override logged! Immediate audit notification sent to patient."
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'রোগীর সম্মতি ও অডিট ট্রেইল (স্বচ্ছতা রেকর্ড)' : 'Patient Consent & Audit Trail Transparency'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'bn' 
              ? 'আপনার স্বাস্থ্য তথ্য কখন কে দেখেছেন তার স্বচ্ছ ও অপরিবর্তনযোগ্য লগ' 
              : 'Tamper-evident audit of every doctor, hospital, or pharmacy that accessed this record'}
          </p>
        </div>

        <button
          onClick={() => setShowBreakGlassModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center space-x-1.5 shadow"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'জরুরি ব্রেক-গ্লাস সিমুলেশন' : 'Simulate Break-Glass Access'}</span>
        </button>
      </div>

      {/* Break-glass modal */}
      {showBreakGlassModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-red-300 space-y-3">
            <div className="flex items-center space-x-2 text-red-700">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-sm">Emergency Break-Glass Override</h3>
            </div>
            <p className="text-xs text-slate-600">
              In life-threatening situations where the patient is unconscious or cannot provide an OTP, authorized doctors may override consent. Every action is audited and reported to the patient.
            </p>
            <textarea
              rows={2}
              placeholder="Clinical emergency justification (e.g. Unconscious road trauma)..."
              value={breakGlassReason}
              onChange={(e) => setBreakGlassReason(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none"
            />
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setShowBreakGlassModal(false)}
                className="px-3 py-1.5 border rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateBreakGlass}
                className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs shadow"
              >
                Confirm Break-Glass Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Date & Time</th>
              <th className="py-2.5 px-3">Practitioner / Facility</th>
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Clinical Purpose</th>
              <th className="py-2.5 px-3 text-right">Access Protocol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map(log => (
              <tr key={log.id} className={log.breakGlass ? 'bg-red-50/70' : 'hover:bg-slate-50'}>
                <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3 px-3 font-bold text-slate-800">{log.actor}</td>
                <td className="py-3 px-3 text-slate-600">{log.role}</td>
                <td className="py-3 px-3 text-slate-700">{log.purpose}</td>
                <td className="py-3 px-3 text-right">
                  {log.breakGlass ? (
                    <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full text-[10px] inline-flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span>Break-Glass</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full text-[10px]">
                      Patient Consent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function LogVitalsModal({ lang, t, patient, onClose, onSave }) {
  const [bpSys, setBpSys] = useState("128");
  const [bpDia, setBpDia] = useState("84");
  const [glucose, setGlucose] = useState("6.8");
  const [pulse, setPulse] = useState("74");

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-sm">{t.logNewVitals}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-600 block mb-1 font-medium">{t.bpLabel} (Systolic / Diastolic mmHg)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="120"
                value={bpSys}
                onChange={(e) => setBpSys(e.target.value)}
                className="p-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
              <input
                type="number"
                placeholder="80"
                value={bpDia}
                onChange={(e) => setBpDia(e.target.value)}
                className="p-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-600 block mb-1 font-medium">{t.glucoseLabel} (mmol/L)</label>
              <input
                type="number"
                step="0.1"
                placeholder="6.5"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-slate-600 block mb-1 font-medium">{t.heartRate} (bpm)</label>
              <input
                type="number"
                placeholder="72"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onSave({ bpSys, bpDia, glucose, pulse })}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs shadow transition"
        >
          {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Measurements'}
        </button>
      </div>
    </div>
  );
}
