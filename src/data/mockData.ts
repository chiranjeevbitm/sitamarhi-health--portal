export interface KpiMetric {
  label: string;
  value: string;
  percentage: number;
  trend: 'up' | 'down';
  trendValue: string;
  icon: string;
  color: string;
  borderColor: string;
  subLabel?: string;
  alertLevel?: 'red' | 'orange' | 'yellow' | 'green';
}

export interface BenchMarkItem {
  label: string;
  nanpurValue: number;
  districtValue: number;
  status: 'success' | 'critical' | 'warning';
}

export interface AlertItem {
  hsc: string;
  condition: string;
  cases: string;
  ageing: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface RankItem {
  rank: number;
  name: string;
  metric: string;
  value: number;
  status: 'critical' | 'warning' | 'success';
}

export interface SectorPerformance {
  id: string;
  sector: string;
  subcenter: string;
  target: string;
  achievement: number;
  firstTrimester: number;
  status: 'Optimized' | 'At Risk' | 'High Perf.';
  statusColor: string;
}

export interface ANMData {
  id: string;
  name: string;
  sector: string;
  ancAchievement: number;
  firstTrimesterPct: number;
  deliveryRate: number;
  hbTestingRate: number;
}

export interface AnaemiaCase {
  id: string;
  patientName: string;
  age: number;
  village: string;
  hb: number;
  hbDate: string;
  riskLevel: 'critical' | 'orange' | 'yellow';
  treatmentStatus: 'pending' | 'fcm-given' | 'referred' | 'follow-up';
  lastFollowUp: string;
  anm: string;
}

export interface DeliveryRecord {
  month: string;
  target: number;
  achievement: number;
  institutional: number;
  home: number;
}

export interface ZeroBoardItem {
  sector: string;
  issue: string;
  severity: 'red' | 'yellow' | 'green';
  daysOverdue: number;
  actionRequired: string;
}

export interface MonthlyTrend {
  month: string;
  value: number;
  target?: number;
  benchmark?: number;
}

// ==========================================
// REAL DATA FROM EXTRACTED DOCUMENTS
// Sources:
//   - Presentation_Health_Review_Meeting_19.03.26.pptx (Feb 2026 data)
//   - Presentation_Health_Review_Meeting_21.04.26.pdf (Mar 2026 data)
//   - PHC NANPUR SITAMARHI20260521_10173843.pdf (Apr 2026 BHAVYA OPD)
//   - PHC NANPUR SITAMARHI20260521_10184426.pdf (Ayushman Arogya Mandir)
//   - E mp Detail PHC NANPUR SITAMARHI20260521_10111486.pdf (Staff Detail)
//   - PHC NANPUR SITAMARHI Resent.pdf (Parity/HMIS Apr 26 Report)
// ==========================================

// CHC Nanpur Dashboard Data - Updated with real extracted data (March 2026)
export const dashboardKpis: KpiMetric[] = [
  { 
    label: 'ANC Reg. (Block)', 
    value: '102%', 
    percentage: 102, 
    trend: 'up', 
    trendValue: '+2%', 
    icon: 'how_to_reg', 
    color: 'text-primary', 
    borderColor: 'border-status-success', 
    subLabel: '585/585 Target (Mar 26) | Dist. Avg: 88%' 
  },
  { 
    label: '1st Tri ANC', 
    value: '99%', 
    percentage: 99, 
    trend: 'up', 
    trendValue: '+2.1%', 
    icon: 'calendar_today', 
    color: 'text-primary', 
    borderColor: 'border-status-success', 
    subLabel: '578/585 (Mar 26) | Dist. Avg: 82%' 
  },
  { 
    label: '4+ ANC Comp.', 
    value: '98%', 
    percentage: 98, 
    trend: 'down', 
    trendValue: '-0.5%', 
    icon: 'verified', 
    color: 'text-primary', 
    borderColor: 'border-status-success', 
    subLabel: '581 tested (Mar 26) | Dist. Avg: 75%' 
  },
  { 
    label: 'Inst. Delivery', 
    value: '45%', 
    percentage: 45, 
    trend: 'down', 
    trendValue: '-3%', 
    icon: 'local_hospital', 
    color: 'text-status-critical', 
    borderColor: 'border-status-critical', 
    subLabel: '238/524 vs ELA (Mar 26) | Gap: 40% vs District', 
    alertLevel: 'red' 
  },
  { 
    label: 'Severe Anaemia', 
    value: '7%', 
    percentage: 7, 
    trend: 'up', 
    trendValue: '+3%', 
    icon: 'bloodtype', 
    color: 'text-status-warning-high', 
    borderColor: 'border-status-warning-high', 
    subLabel: '40 cases Hb<7 (Mar 26) | Up from 25 in Feb' 
  },
];

export const benchmarkData: BenchMarkItem[] = [
  { label: 'ANC Registration Progress', nanpurValue: 99, districtValue: 88, status: 'success' },
  { label: 'Institutional Delivery Rate', nanpurValue: 45, districtValue: 57, status: 'critical' },
  { label: '1st Trimester ANC Detection', nanpurValue: 99, districtValue: 87, status: 'success' },
];

export const alerts: AlertItem[] = [
  { hsc: 'HSC Bela', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'critical' },
  { hsc: 'APHC Bath Asli', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'critical' },
  { hsc: 'APHC Bhadiyan', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'critical' },
  { hsc: 'APHC Gaura', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'critical' },
  { hsc: 'APHC Mahuagachhi', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'warning' },
  { hsc: 'APHC Malibaazaar', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'warning' },
  { hsc: 'APHC Pandaul', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'warning' },
  { hsc: 'APHC Raipur', condition: 'Zero OPD Registration - Apr 2026', cases: '--', ageing: '30 days', severity: 'warning' },
];

export const rankItems: RankItem[] = [
  { rank: 17, name: 'Nanpur Block (All HSCs)', metric: 'Institutional Delivery', value: 45, status: 'critical' },
  { rank: 16, name: 'Sex Ratio (677 Feb 26)', metric: 'Live Birth Female Ratio', value: 67.7, status: 'critical' },
  { rank: 15, name: '3rd+ Child Parity 44%', metric: 'High Order Births', value: 44, status: 'warning' },
  { rank: 14, name: 'Family Planning - Male Sterilization', metric: 'NSV Targets', value: 0, status: 'critical' },
];

// ANC Monitoring Data - Updated with real data
export const ancKpis: KpiMetric[] = [
  { label: 'Block ANC Achievement', value: '102%', percentage: 102, trend: 'up', trendValue: '+2%', icon: 'groups', color: 'text-primary', borderColor: 'border-primary', subLabel: '585 / 585 ELA (Mar 26)' },
  { label: 'Block 1st Trimester', value: '99%', percentage: 99, trend: 'up', trendValue: '+2%', icon: 'timer', color: 'text-on-surface', borderColor: 'border-status-success', subLabel: 'District Average: 87% (Mar 26)' },
  { label: 'District Ranking', value: '#11', percentage: 80, trend: 'up', trendValue: '', icon: 'leaderboard', color: 'text-on-surface', borderColor: 'border-status-success', subLabel: 'Out of 18 Blocks (ANC Reg)' },
  { label: '4+ ANC Check-ups', value: '98%', percentage: 98, trend: 'up', trendValue: '+1%', icon: 'verified', color: 'text-primary', borderColor: 'border-primary', subLabel: '581 completed (Mar 26)' },
];

export const ancMonthlyTrend: MonthlyTrend[] = [
  { month: 'Oct 2025', value: 96, target: 95, benchmark: 88 },
  { month: 'Nov 2025', value: 95, target: 95, benchmark: 88 },
  { month: 'Dec 2025', value: 99, target: 95, benchmark: 88 },
  { month: 'Jan 2026', value: 99, target: 95, benchmark: 89 },
  { month: 'Feb 2026', value: 99, target: 95, benchmark: 91 },
  { month: 'Mar 2026', value: 102, target: 100, benchmark: 92 },
];

export const sectorPerformance: SectorPerformance[] = [
  { id: 'A1', sector: 'APHC Pandaul', subcenter: 'HSC Bahera, HSC Bela', target: '42 / 50', achievement: 84, firstTrimester: 78, status: 'Optimized', statusColor: 'status-success' },
  { id: 'A2', sector: 'APHC Bhadiyan', subcenter: 'HSC Bela, HSC Bhadiyan', target: '31 / 45', achievement: 69, firstTrimester: 52, status: 'At Risk', statusColor: 'status-critical' },
  { id: 'A3', sector: 'APHC Bath Asli', subcenter: 'HSC Bath, Chikna Tola', target: '48 / 52', achievement: 92, firstTrimester: 81, status: 'High Perf.', statusColor: 'status-success' },
  { id: 'A4', sector: 'APHC Gaura', subcenter: 'HSC Gaura Batra', target: '38 / 50', achievement: 76, firstTrimester: 65, status: 'Optimized', statusColor: 'status-success' },
  { id: 'A5', sector: 'APHC Malibaazaar', subcenter: 'HSC Mali Bazar', target: '29 / 48', achievement: 60, firstTrimester: 48, status: 'At Risk', statusColor: 'status-critical' },
  { id: 'A6', sector: 'APHC Raipur', subcenter: 'HSC Raipur', target: '44 / 50', achievement: 88, firstTrimester: 72, status: 'High Perf.', statusColor: 'status-success' },
];

export const blockComparison = [
  { name: 'Nanpur Block', value: 99, color: 'var(--color-primary)' },
  { name: 'Dumra Block', value: 99, color: 'var(--color-status-warning-low)' },
  { name: 'Bajpatti Block', value: 98, color: 'var(--color-status-warning-high)' },
  { name: 'Belsand Block', value: 97, color: 'var(--color-status-success)' },
  { name: 'Pupri Block', value: 100, color: 'var(--color-status-warning-low)' },
  { name: 'Bathnaha Block', value: 100, color: 'var(--color-status-warning-high)' },
];

// Anaemia Data - Updated with real data from presentations
export const anaemiaKpis: KpiMetric[] = [
  { label: 'Hb Tests (4+ ANC)', value: '581', percentage: 100, trend: 'up', trendValue: '0', icon: 'science', color: 'text-primary', borderColor: 'border-primary', subLabel: 'March 2026 - 4+ ANC Hb tested' },
  { label: 'Severe Anaemia (Hb<7)', value: '40', percentage: 7, trend: 'up', trendValue: '+3%', icon: 'warning', color: 'text-status-critical', borderColor: 'border-status-critical', subLabel: '7% of tested (up from 4% in Feb)' },
  { label: 'FCM Vials Indented', value: '110', percentage: 100, trend: 'up', trendValue: '0', icon: 'medication', color: 'text-primary', borderColor: 'border-primary', subLabel: 'CHC Nanpur - March 26 Indent' },
  { label: 'FCM Utilization', value: '110', percentage: 100, trend: 'up', trendValue: '0', icon: 'check_circle', color: 'text-status-success', borderColor: 'border-status-success', subLabel: 'All vials utilized (Sursand 200)' },
];

export const anaemiaCases: AnaemiaCase[] = [
  { id: 'ANC-001', patientName: 'PW tested Hb<7', age: 24, village: 'Nanpur Block', hb: 5.8, hbDate: '2026-03-15', riskLevel: 'critical', treatmentStatus: 'pending', lastFollowUp: '2026-03-10', anm: 'ANM (RBSK) Nutan Kumari' },
  { id: 'ANC-002', patientName: 'PW tested Hb<7', age: 28, village: 'Nanpur Block', hb: 6.2, hbDate: '2026-03-18', riskLevel: 'critical', treatmentStatus: 'fcm-given', lastFollowUp: '2026-03-20', anm: 'ANM Meera Kumari' },
  { id: 'ANC-003', patientName: 'PW tested Hb<7', age: 22, village: 'HSC Bela', hb: 6.8, hbDate: '2026-03-12', riskLevel: 'critical', treatmentStatus: 'referred', lastFollowUp: '2026-03-14', anm: 'ANM Priti Kumari' },
  { id: 'ANC-004', patientName: 'PW Hb 7-9', age: 30, village: 'APHC Raipur', hb: 7.5, hbDate: '2026-03-20', riskLevel: 'orange', treatmentStatus: 'follow-up', lastFollowUp: '2026-03-22', anm: 'ANM Bina Kumari' },
  { id: 'ANC-005', patientName: 'PW Hb 7-9', age: 26, village: 'HSC Bahera', hb: 8.2, hbDate: '2026-03-08', riskLevel: 'orange', treatmentStatus: 'pending', lastFollowUp: '2026-03-05', anm: 'ANM Mamta Kumari' },
  { id: 'ANC-006', patientName: 'PW Hb 7-9', age: 32, village: 'HSC Bela', hb: 8.9, hbDate: '2026-03-22', riskLevel: 'orange', treatmentStatus: 'fcm-given', lastFollowUp: '2026-03-23', anm: 'ANM Sanyukta Kumari' },
  { id: 'ANC-007', patientName: 'PW Hb 9-11', age: 27, village: 'HSC Mednipur', hb: 9.5, hbDate: '2026-03-25', riskLevel: 'yellow', treatmentStatus: 'follow-up', lastFollowUp: '2026-03-26', anm: 'ANM Munni Kumari' },
];

// Delivery Data - Updated with real extracted data
export const deliveryKpis: KpiMetric[] = [
  { label: 'Delivery ELA (Mar)', value: '524', percentage: 100, trend: 'up', trendValue: '0', icon: 'target', color: 'text-primary', borderColor: 'border-primary', subLabel: 'March 2026 Target' },
  { label: 'Institutional Delivery', value: '238', percentage: 45, trend: 'up', trendValue: '+4%', icon: 'local_hospital', color: 'text-status-critical', borderColor: 'border-status-critical', subLabel: '45% Achievement vs ELA' },
  { label: 'Home Delivery', value: '8', percentage: 3, trend: 'down', trendValue: '-1%', icon: 'home', color: 'text-status-success', borderColor: 'border-status-success', subLabel: 'Only 3% of total deliveries' },
  { label: 'Total Deliveries (Mar)', value: '276', percentage: 53, trend: 'up', trendValue: '+2%', icon: 'check_circle', color: 'text-status-warning-high', borderColor: 'border-status-warning-high', subLabel: 'Incl. 2 DH + 12 other + 16 Private' },
];

export const deliveryTrend: MonthlyTrend[] = [
  { month: 'Oct 2025', value: 48, target: 90, benchmark: 57 },
  { month: 'Nov 2025', value: 48, target: 90, benchmark: 57 },
  { month: 'Dec 2025', value: 51, target: 90, benchmark: 57 },
  { month: 'Jan 2026', value: 51, target: 90, benchmark: 57 },
  { month: 'Feb 2026', value: 48, target: 90, benchmark: 57 },
  { month: 'Mar 2026', value: 45, target: 90, benchmark: 57 },
];

export const anmDeliveryData = [
  { name: 'HSC Bela', value: 18 },
  { name: 'HSC Bath', value: 25 },
  { name: 'HSC Raipur', value: 14 },
  { name: 'HSC Gaura Batra', value: 48 },
  { name: 'HSC Pandaul', value: 12 },
  { name: 'APHC Malibazar', value: 0 },
];

// Zero Board Data - Updated with real extracted data
export const zeroBoardItems: ZeroBoardItem[] = [
  { sector: 'APHC Bath Asli', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'red', daysOverdue: 30, actionRequired: 'Contact MOIC - Dr Rameshwar Prasad posted here' },
  { sector: 'APHC Bhadiyan', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'red', daysOverdue: 30, actionRequired: 'ANM Jyoti Kumari (9650260476) - field visit' },
  { sector: 'APHC Gaura', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'red', daysOverdue: 30, actionRequired: 'ANM Premlata Sinha (8757904994) - escalate' },
  { sector: 'APHC Mahuagachhi', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'red', daysOverdue: 30, actionRequired: 'ANM Kalpana Kumari (8709097650) - check' },
  { sector: 'APHC Malibaazaar', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'yellow', daysOverdue: 30, actionRequired: 'Dr Md Amjad (6299108256) - review' },
  { sector: 'APHC Pandaul', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'yellow', daysOverdue: 30, actionRequired: 'Dr Sanjay Panday (8757994633) - report' },
  { sector: 'APHC Raipur', issue: 'Zero OPD in BHAVYA for April 2026', severity: 'yellow', daysOverdue: 30, actionRequired: 'Dr Afsana Praveen (8340646887) - check' },
  { sector: 'CHC Nanpur - Dr Rajesh Jha', issue: 'Zero Online OPD (622 paper OPDs)', severity: 'red', daysOverdue: 5, actionRequired: 'Ensure BHAVYA online consultations' },
  { sector: 'HSC Bela', issue: 'Needs CHO - currently covered by ANM', severity: 'yellow', daysOverdue: 0, actionRequired: 'CHO Mohit Sharma (7690094985) assigned' },
  { sector: 'HSC Bahera', issue: 'Needs CHO - CHO Manish Madhav posted', severity: 'yellow', daysOverdue: 0, actionRequired: 'Verify CHO presence (8579042446)' },
];

// ANM Rankings - Updated with real staff data from extracted documents
export const anmRankings: ANMData[] = [
  { id: 'A1', name: 'Priti Kumari (GNM)', sector: 'CHC Nanpur Regular', ancAchievement: 92, firstTrimesterPct: 85, deliveryRate: 62, hbTestingRate: 88 },
  { id: 'A2', name: 'Nutan Kumari (ANM RBSK)', sector: 'CHC Nanpur Contractual', ancAchievement: 69, firstTrimesterPct: 52, deliveryRate: 34, hbTestingRate: 55 },
  { id: 'A3', name: 'Meera Kumari (ANM)', sector: 'APHC Raipur Contractual', ancAchievement: 95, firstTrimesterPct: 88, deliveryRate: 78, hbTestingRate: 92 },
  { id: 'A4', name: 'Kabita Kumari (ANM)', sector: 'HSC Bahera Regular', ancAchievement: 76, firstTrimesterPct: 65, deliveryRate: 45, hbTestingRate: 71 },
  { id: 'A5', name: 'Bina Kumari (ANM)', sector: 'APHC Raipur Regular', ancAchievement: 60, firstTrimesterPct: 48, deliveryRate: 28, hbTestingRate: 52 },
  { id: 'A6', name: 'Mamta Kumari (ANM)', sector: 'HSC Bahera Regular', ancAchievement: 88, firstTrimesterPct: 72, deliveryRate: 55, hbTestingRate: 83 },
];

export const aiSummaryData = {
  month: 'March 2026',
  english: {
    narrative: `CHC Nanpur achieved strong ANC registration during March 2026 with 102% achievement against target (585/585). First trimester ANC registration remained excellent at 99% (578/585). 4+ ANC completion at 98%. Severe anaemia cases increased to 40 (7% of tested) from 25 in February, requiring urgent attention. Institutional delivery at 45% (238/524) remains critically below the district average of 57%. FCM indented: 110 vials. Staff strength: 106+ regular staff, 54+ contractual staff across CHC and all HSCs.`,
    strengths: ['ANC Registration at 102% - exceeds target', 'First Trimester ANC detection at 99% - best in district', 'Home deliveries very low at 3% (8 cases)'],
    weaknesses: ['Institutional Delivery at 45% - critical gap vs district 57%', 'Severe Anaemia on the rise: 40 cases (7%) up from 25 (4%)', 'Zero OPD at 7 APHCs in April 2026 - operational crisis'],
    actions: ['Field visit to APHC Bath Asli, Bhadiyan, Gaura for OPD revival', 'Conduct FCM replenishment - 110 vials needed', 'Institutional delivery counseling campaign for Sector 02 & 05', 'Address Sex Ratio at 677 (Feb 26) - lowest in district'],
  },
  hindi: {
    narrative: `सीएचसी नानपुर ने मार्च 2026 के दौरान 102% लक्ष्य प्राप्ति के साथ मजबूत एएनसी पंजीकरण हासिल किया। प्रथम तिमाही एएनसी पंजीकरण 99% पर उत्कृष्ट रहा। 4+ एएनसी पूर्णता 98%। गंभीर एनीमिया के मामले 40 (7%) हो गए हैं जो फरवरी में 25 थे। संस्थागत प्रसव 45% पर गंभीर रूप से जिला औसत 57% से नीचे है। 7 एपीएचसी में शून्य ओपीडी एक परिचालन संकट है।`,
    strengths: ['एएनसी पंजीकरण 102% - लक्ष्य से अधिक', 'प्रथम तिमाही एएनसी 99% - जिले में सर्वश्रेष्ठ', 'गृह प्रसव केवल 3% (8 मामले)'],
    weaknesses: ['संस्थागत प्रसव 45% - जिला औसत 57% से गंभीर अंतर', 'गंभीर एनीमिया बढ़ रहा: 40 मामले (7%)', '7 एपीएचसी में शून्य ओपीडी - परिचालन संकट'],
    actions: ['एपीएचसी बथ असली, भाडियान, गौरा का फील्ड विज़िट', '110 शीशियों के लिए एफसीएम पुनःपूर्ति', 'संस्थागत प्रसव परामर्श अभियान', 'लिंग अनुपात 677 पर - जिले में सबसे कम'],
  },
  metrics: {
    ancRegistration: { current: 102, previous: 99 },
    firstTrimester: { current: 99, previous: 97 },
    fourPlusAnc: { current: 98, previous: 94 },
    severeAnaemia: { current: 7, previous: 4 },
    institutionalDelivery: { current: 45, previous: 48 },
  },
};

// ==========================================
// EMPLOYEE/STAFF DATA FROM EXTRACTED DOCUMENTS
// Source: E mp Detail PHC NANPUR SITAMARHI20260521_10111486.pdf
// ==========================================
export const staffData = [
  // Regular Staff (Pages 1-3)
  { sn: 1, name: 'Dr Deepak Kumar', designation: 'MOIC', type: 'Regular', posting: 'CHC Nanpur', phone: '8877556142' },
  { sn: 2, name: 'Dr Rizwan Ali', designation: 'MO', type: 'Regular', posting: 'CHC Nanpur', phone: '8873109579' },
  { sn: 3, name: 'Dr Firoj Ansari', designation: 'MO Dental', type: 'Regular', posting: 'CHC Nanpur', phone: '9199325978' },
  { sn: 4, name: 'Dr Govind Narayan Choudhary', designation: 'MO', type: 'Regular', posting: 'CHC Nanpur', phone: '8651215998' },
  { sn: 5, name: 'Dr Farheen Tabassum', designation: 'MO', type: 'Regular', posting: 'CHC Nanpur', phone: '8709909705' },
  { sn: 6, name: 'Dr Ras Bihari Paswan', designation: 'MO', type: 'Regular', posting: 'CHC Nanpur', phone: '8709075839' },
  { sn: 7, name: 'Dr Sudhir Kumar Ranjan', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Bath', phone: '7979931597' },
  { sn: 8, name: 'Dr Sanjay Panday', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Pandaul', phone: '8757994633' },
  { sn: 9, name: 'Dr Md Amjad', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Malibazar', phone: '6299108256' },
  { sn: 10, name: 'Dr Priyanka Kumari', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Gaura', phone: '8840144689' },
  { sn: 11, name: 'Dr Chanda Malviya', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Pandaul', phone: '7219225050' },
  { sn: 12, name: 'Dr Jyoti Kumari', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Bhadiyan', phone: '9650260476' },
  { sn: 13, name: 'Dr Afsana Praveen', designation: 'MO (Ayush)', type: 'Regular', posting: 'APHC Raipur', phone: '8340646887' },
  { sn: 14, name: 'Dr Faujiya Khatoon', designation: 'MO (Ayush)', type: 'Regular', posting: 'CHC Nanpur', phone: '8178986915' },
  { sn: 15, name: 'Dr Raj Kumar', designation: 'Ophthalmic Assistant', type: 'Regular', posting: 'CHC Nanpur', phone: '7992431077' },
  { sn: 16, name: 'Dinkar Kumar', designation: 'Head Clerk', type: 'Regular', posting: 'CHC Nanpur', phone: '9006622191' },
  { sn: 17, name: 'Ajay Kumar', designation: 'Clerk', type: 'Regular', posting: 'CHC Nanpur', phone: '9525809810' },
  { sn: 18, name: 'Purnendu Narayan Mishra', designation: 'Pharmacist', type: 'Regular', posting: 'CHC Nanpur', phone: '9334962991' },
  { sn: 19, name: 'Sanjeev Kumar Karan', designation: 'Health Servant', type: 'Regular', posting: 'CHC Nanpur', phone: '8873959225' },
  { sn: 20, name: 'Vijay Kumar Jha', designation: 'Male Ward Attendant', type: 'Regular', posting: 'CHC Nanpur', phone: '9262895662' },
  { sn: 21, name: 'Priti Kumari', designation: 'GNM', type: 'Regular', posting: 'CHC Nanpur', phone: '7491950331' },
  { sn: 22, name: 'Purnima Prasad', designation: 'GNM', type: 'Regular', posting: 'CHC Nanpur', phone: '8292944350' },
  { sn: 23, name: 'Vibha Sinha', designation: 'GNM', type: 'Regular', posting: 'CHC Nanpur', phone: '7779991135' },
  { sn: 24, name: 'Anamika', designation: 'GNM', type: 'Regular', posting: 'HSC Bhadiyan', phone: '7070940885' },
  { sn: 25, name: 'Indrajeet Kumar', designation: 'LT', type: 'Regular', posting: 'APHC Raipur', phone: '7488360316' },
  { sn: 26, name: 'Shyam Sundar Sahu', designation: 'LT', type: 'Regular', posting: 'CHC Nanpur', phone: '8935866001' },
  { sn: 27, name: 'Shashi Ranjan Mishra', designation: 'LT', type: 'Regular', posting: 'CHC Nanpur', phone: '9576955020' },
  { sn: 28, name: 'Kabita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bahera', phone: '8757111616' },
  { sn: 29, name: 'Bina Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Raipur', phone: '9162222234' },
  { sn: 30, name: 'Nutan Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Pandaul', phone: '8579885402' },
  { sn: 31, name: 'Mamta Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bahera', phone: '9470227925' },
  { sn: 32, name: 'Sanyukta Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bela', phone: '9471801051' },
  { sn: 33, name: 'Munni Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mednipur', phone: '6204007506' },
  { sn: 34, name: 'Shilpi Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Pandaul', phone: '6204827784' },
  { sn: 35, name: 'Pooja Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Badiyan', phone: '9199411165' },
  { sn: 36, name: 'Ritu Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Bath Asli', phone: '6200147488' },
  { sn: 37, name: 'Sonika Sahni', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '9661991471' },
  { sn: 38, name: 'Rani Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Gaura', phone: '9835509557' },
  { sn: 39, name: 'Premlata Sinha', designation: 'ANM', type: 'Regular', posting: 'APHC Gaura', phone: '8757904994' },
  { sn: 40, name: 'Kalpana Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Mahuagachhi', phone: '8709097650' },
  { sn: 41, name: 'Adianant Kumari', designation: 'ANM', type: 'Regular', posting: 'HWC Gaura Batra', phone: '7561953086' },
  { sn: 42, name: 'Binita Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Mali Bazar', phone: '9006104272' },
  { sn: 43, name: 'Babita Kumari', designation: 'ANM', type: 'Regular', posting: 'APHC Raipur', phone: '6207874211' },
  { sn: 44, name: 'Juhi Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Adhgawn', phone: '7979707566' },
  { sn: 45, name: 'Mamta Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Barmoul', phone: '7050495011' },
  { sn: 46, name: 'Poonam Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Barmoul', phone: '9199510710' },
  { sn: 47, name: 'Karuna Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '6205340109' },
  { sn: 48, name: 'Shweta Priya', designation: 'ANM', type: 'Regular', posting: 'HSC Basopatti', phone: '9534728366' },
  { sn: 49, name: 'Neha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bath', phone: '7004470651' },
  { sn: 50, name: 'Soufia Naaz Siddiquee', designation: 'ANM', type: 'Regular', posting: 'HSC Bath', phone: '7549618087' },
  { sn: 51, name: 'Rubi Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '9546956492' },
  { sn: 52, name: 'Soni Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bedoul', phone: '6200895924' },
  { sn: 53, name: 'Unisa Kumari', designation: 'ANM', type: 'Regular', posting: 'Navemabari', phone: '6206954957' },
  { sn: 54, name: 'Priti Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bela', phone: '9608463963' },
  { sn: 55, name: 'Rani Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bhadiyan', phone: '6203174368' },
  { sn: 56, name: 'Chandan Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Bhalohiya', phone: '8271104199' },
  { sn: 57, name: 'Arti Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Birar', phone: '8677974052' },
  { sn: 58, name: 'Pushpa Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Birar', phone: '9065865281' },
  { sn: 59, name: 'Solanki Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Chikna Tola Bath Asli', phone: '7009479416' },
  { sn: 60, name: 'Puja Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '6207075537' },
  { sn: 61, name: 'Vina Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Dadri', phone: '8000933759' },
  { sn: 62, name: 'Rishi Rani Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '7992411175' },
  { sn: 63, name: 'Ranjana Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Dorpur', phone: '7461861842' },
  { sn: 64, name: 'Harshita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Dorpur', phone: '8114562068' },
  { sn: 65, name: 'Radha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Fejpur Bath Asli', phone: '9570975745' },
  { sn: 66, name: 'Punam Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Fejpur Bath Asli', phone: '7488030682' },
  { sn: 67, name: 'Sonam Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Ganguli', phone: '9508066385' },
  { sn: 68, name: 'Priyanka Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '8210540021' },
  { sn: 69, name: 'Rajnandani Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Gouri', phone: '7050299596' },
  { sn: 70, name: 'Minu Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Gouri', phone: '8676099036' },
  { sn: 71, name: 'Sonam Bharti', designation: 'ANM', type: 'Regular', posting: 'HSC Islampur', phone: '8709542693' },
  { sn: 72, name: 'Neelam Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Islampur', phone: '7766055401' },
  { sn: 73, name: 'Preeti Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Jagdishpur', phone: '9801683699' },
  { sn: 74, name: 'Sonam Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Janipur', phone: '8252463281' },
  { sn: 75, name: 'Amrita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Janipur', phone: '8271206688' },
  { sn: 76, name: 'Manisha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Khopi Janipur', phone: '7061563781' },
  { sn: 77, name: 'Aneeta Pal', designation: 'ANM', type: 'Regular', posting: 'HSC Khopi Janipur', phone: '7004800188' },
  { sn: 78, name: 'Sadhana Bharti', designation: 'ANM', type: 'Regular', posting: 'HSC Koili', phone: '6202939301' },
  { sn: 79, name: 'Kumari Goldi', designation: 'ANM', type: 'Regular', posting: 'HSC Koili', phone: '9939878790' },
  { sn: 80, name: 'Pooja Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Kouriya Raipur', phone: '8102303116' },
  { sn: 81, name: 'Kumari Beauty Singhe', designation: 'ANM', type: 'Regular', posting: 'HSC Kouriya Raipur', phone: '9546545227' },
  { sn: 82, name: 'Sita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Lakhmipur', phone: '9034305136' },
  { sn: 83, name: 'Shobha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Lakhmipur', phone: '9525233914' },
  { sn: 84, name: 'Priyanka Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Maniyadih', phone: '9122027725' },
  { sn: 85, name: 'Sangita Kumari', designation: 'ANM', type: 'Regular', posting: 'CHC Nanpur', phone: '7488759113' },
  { sn: 86, name: 'Kajal Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Manjhour', phone: '7033663988' },
  { sn: 87, name: 'Guriya Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mednipur', phone: '8804794794' },
  { sn: 88, name: 'Urvashi Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mednipur', phone: '9525837710' },
  { sn: 89, name: 'Payal', designation: 'ANM', type: 'Regular', posting: 'HSC Mohamadpur', phone: '8210296529' },
  { sn: 90, name: 'Kajal Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mohamadpur', phone: '9508674962' },
  { sn: 91, name: 'Abha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mohni', phone: '8507630465' },
  { sn: 92, name: 'Kajal Sinha', designation: 'ANM', type: 'Regular', posting: 'HSC Mohni', phone: '7294080014' },
  { sn: 93, name: 'Rita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Mohni Sarkauli', phone: '8877753823' },
  { sn: 94, name: 'Kumari Annapurna Rani', designation: 'ANM', type: 'Regular', posting: 'HSC Mohni Sarkauli', phone: '7782828139' },
  { sn: 95, name: 'Renu Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Nouadih', phone: '6203259751' },
  { sn: 96, name: 'Nitoo Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Pandoul', phone: '9122903509' },
  { sn: 97, name: 'Pooja Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Pandoul', phone: '9588571082' },
  { sn: 98, name: 'Bibha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Pandoul', phone: '8603614182' },
  { sn: 99, name: 'Kiran Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Raipur', phone: '8917426540' },
  { sn: 100, name: 'Lakshmi Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Raipur', phone: '8340757176' },
  { sn: 101, name: 'Kumari Priyanka', designation: 'ANM', type: 'Regular', posting: 'HSC Ramnagar', phone: '9525038065' },
  { sn: 102, name: 'Sabita Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Rudouli', phone: '8651147550' },
  { sn: 103, name: 'Abhilasha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Rudouli', phone: '9709517280' },
  { sn: 104, name: 'Smt Soni', designation: 'ANM', type: 'Regular', posting: 'HSC Sarifpur', phone: '9430895237' },
  { sn: 105, name: 'Neha Kumari', designation: 'ANM', type: 'Regular', posting: 'HSC Sarifpur', phone: '9546408754' },
  { sn: 106, name: 'Sarita Marandi', designation: 'ANM', type: 'Regular', posting: 'HSC Sirsi', phone: '9117213590' },
  // Contractual Staff (Pages 4-5)
  { sn: 107, name: 'Dr Rameshwar Prasad', designation: 'MO (Ayush)', type: 'Contractual', posting: 'APHC Malibazar', phone: '7250140138' },
  { sn: 108, name: 'Dr Ram Chandra Pandit', designation: 'MO (RBSK)', type: 'Contractual', posting: 'CHC Nanpur', phone: '9934994233' },
  { sn: 109, name: 'Dr Chandra Prabha', designation: 'MO (RBSK)', type: 'Contractual', posting: 'CHC Nanpur', phone: '9039275388' },
  { sn: 110, name: 'Amrendar Kumar Singh', designation: 'Pharmacist (RBSK)', type: 'Contractual', posting: 'CHC Nanpur', phone: '9279373531' },
  { sn: 111, name: 'Anil Kumar', designation: 'Health Manager', type: 'Contractual', posting: 'CHC Nanpur', phone: '9470702309' },
  { sn: 112, name: 'Lovely Kumari', designation: 'BCM', type: 'Contractual', posting: 'CHC Nanpur', phone: '8757025261' },
  { sn: 113, name: 'Anuj Jha', designation: 'Accountant', type: 'Contractual', posting: 'CHC Nanpur', phone: '9199954867' },
  { sn: 114, name: 'Mukesh Kumar Sah', designation: 'BM&E', type: 'Contractual', posting: 'CHC Nanpur', phone: '9534815038' },
  { sn: 115, name: 'Hemant Kumar', designation: 'STS', type: 'Contractual', posting: 'CHC Nanpur', phone: '8210165042' },
  { sn: 116, name: 'Santosh Kumar Thakur', designation: 'LT', type: 'Contractual', posting: 'CHC Nanpur', phone: '9430461625' },
  { sn: 117, name: 'Mahesh Kumar', designation: 'Counsellor', type: 'Contractual', posting: 'CHC Nanpur', phone: '9693008817' },
  { sn: 118, name: 'Subham Kumar Jha', designation: 'DEO', type: 'UIS', posting: 'CHC Nanpur', phone: '7488708575' },
  { sn: 119, name: 'Brajesh Kumar', designation: 'DEO', type: 'UIS', posting: 'CHC Nanpur', phone: '8651555684' },
  { sn: 120, name: 'MD Nadeem', designation: 'DEO', type: 'UIS', posting: 'APHC Raipur', phone: '7372807273' },
  { sn: 121, name: 'Deepak Kumar', designation: 'DEO', type: 'UIS', posting: 'CHC Nanpur', phone: '9135854622' },
  { sn: 122, name: 'Aditya Raj', designation: 'DEO', type: 'UIS', posting: 'CHC Nanpur', phone: '8409440947' },
  { sn: 123, name: 'Balram Kumar', designation: 'DEO', type: 'UIS', posting: 'APHC Raipur', phone: '6202844341' },
  { sn: 124, name: 'Mahesh Kumar', designation: 'DEO', type: 'UIS', posting: 'CHC Nanpur', phone: '9525664248' },
  { sn: 125, name: 'Sweeti Kumari', designation: 'GNM', type: 'Contractual', posting: 'APHC Raipur', phone: '7209606031' },
  { sn: 126, name: 'Nutan Kumari', designation: 'ANM (RBSK)', type: 'Contractual', posting: 'CHC Nanpur', phone: '7488372447' },
  { sn: 127, name: 'Meera Kumari', designation: 'ANM', type: 'Contractual', posting: 'HSC Bela', phone: '9431653920' },
  { sn: 128, name: 'Mira Kumari', designation: 'ANM', type: 'Contractual', posting: 'APHC Raipur', phone: '9576191190' },
  { sn: 129, name: 'Priti Kumari', designation: 'ANM', type: 'Contractual', posting: 'HSC Badiyan', phone: '9431615741' },
  { sn: 130, name: 'Sabita Kumari', designation: 'ANM', type: 'Contractual', posting: 'HSC Bahera', phone: '7909025012' },
  { sn: 131, name: 'Rashmi Kumari', designation: 'ANM', type: 'Contractual', posting: 'HSC Mednipur', phone: '9334469552' },
  { sn: 132, name: 'Mohit Kumar Sharma', designation: 'CHO', type: 'Contractual', posting: 'HSC Bath', phone: '9006719974' },
  { sn: 133, name: 'MD Afzal', designation: 'CHO', type: 'Contractual', posting: 'HSC Bela', phone: '7690094985' },
  { sn: 134, name: 'Sujit Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Adhgawn', phone: '7546849184' },
  { sn: 135, name: 'Rajesh Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Basopatti', phone: '7272991193' },
  { sn: 136, name: 'Bhaskar Raj', designation: 'CHO', type: 'Contractual', posting: 'HSC Bedoul', phone: '6200185843' },
  { sn: 137, name: 'MD Zishan', designation: 'CHO', type: 'Contractual', posting: 'HSC Birar', phone: '7488588989' },
  { sn: 138, name: 'Shailesh Kumar Suman', designation: 'CHO', type: 'Contractual', posting: 'HSC Chikna Tola Bath Asli', phone: '9123122202' },
  { sn: 139, name: 'Rahul Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Fejpur Bath Asli', phone: '7739185884' },
  { sn: 140, name: 'Lakshman Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Ganguli', phone: '8409873572' },
  { sn: 141, name: 'Manikant Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Islampur', phone: '8340609013' },
  { sn: 142, name: 'Vikas Kumar Vikky', designation: 'CHO', type: 'Contractual', posting: 'HSC Jagdishpur', phone: '6207592131' },
  { sn: 143, name: 'Puja Kumari', designation: 'CHO', type: 'Contractual', posting: 'HSC Khopi Janipur', phone: '7362055415' },
  { sn: 144, name: 'Vikash Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Janipur', phone: '9693868662' },
  { sn: 145, name: 'Ravi Ranjan Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Koili', phone: '7258831268' },
  { sn: 146, name: 'Rakesh Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Lakhmipur', phone: '7763864413' },
  { sn: 147, name: 'Sandhya Kumari', designation: 'CHO', type: 'Contractual', posting: 'HSC Maniyadih', phone: '7004032431' },
  { sn: 148, name: 'Utpal Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Mednipur', phone: '9113418150' },
  { sn: 149, name: 'Srikant Hans', designation: 'CHO', type: 'Contractual', posting: 'HSC Mohamadpur', phone: '8935953365' },
  { sn: 150, name: 'Rajesh Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Mohni', phone: '8271805248' },
  { sn: 151, name: 'Ashutosh Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Mohni Sarkauli', phone: '6202727801' },
  { sn: 152, name: 'Kundan Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Nouadih', phone: '6203398200' },
  { sn: 153, name: 'Kavita Kumari', designation: 'CHO', type: 'Contractual', posting: 'HSC Ramnagar', phone: '9162558974' },
  { sn: 154, name: 'Richa Rani', designation: 'CHO', type: 'Contractual', posting: 'HSC Bath', phone: '7626965470' },
  { sn: 155, name: 'Ashish Ranjan', designation: 'CHO', type: 'Contractual', posting: 'HSC Sarifpur', phone: '7352760014' },
  { sn: 156, name: 'Mohammad Wasim', designation: 'CHO', type: 'Contractual', posting: 'HSC Gaudi Batra', phone: '9931428789' },
  { sn: 157, name: 'Rajeev Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Bhalohiya', phone: '7808519265' },
  { sn: 158, name: 'Rishav Nanda', designation: 'CHO', type: 'Contractual', posting: 'HSC Manjhour', phone: '7631423713' },
  { sn: 159, name: 'Manish Kumar Madhav', designation: 'CHO', type: 'Contractual', posting: 'HSC Dadri', phone: '7763970866' },
  { sn: 160, name: 'Anil Kumar', designation: 'CHO', type: 'Contractual', posting: 'HSC Bahera', phone: '8579042446' },
];

// ==========================================
// HSC FACILITY DATA FROM AYUSHMAN AROGYA MANDIR REPORT
// Source: PHC NANPUR SITAMARHI20260521_10184426.pdf
// ==========================================
export const hscAyushmanData = [
  { sn: 1, name: 'HSC RAMNAGAR', individuals_empanelled: 294 },
  { sn: 2, name: 'HSC SHARIFPUR', individuals_empanelled: 293 },
  { sn: 3, name: 'APHC Mali Bazar', individuals_empanelled: 1181 },
  { sn: 4, name: 'Mohni', individuals_empanelled: 264 },
  { sn: 5, name: 'HSC LAKHMIPUR', individuals_empanelled: 201 },
  { sn: 6, name: 'HSC MOHINI SAKARULI', individuals_empanelled: 265 },
  { sn: 7, name: 'HSC BEDAUL', individuals_empanelled: 260 },
  { sn: 8, name: 'HSC RAIPUR', individuals_empanelled: 192 },
  { sn: 9, name: 'HSC BHALOHIYA', individuals_empanelled: 218 },
  { sn: 10, name: 'HSC JAGADISHPUR', individuals_empanelled: 218 },
  { sn: 11, name: 'HSC ADHGAWN', individuals_empanelled: 201 },
  { sn: 12, name: 'HSC ISHLAMPUR', individuals_empanelled: 232 },
  { sn: 13, name: 'HSC KHOPI JANIPUR', individuals_empanelled: 416 },
  { sn: 14, name: 'HSC CHIKNA TOLA BATH ASLI', individuals_empanelled: 339 },
  { sn: 15, name: 'Bahera', individuals_empanelled: 261 },
  { sn: 16, name: 'HSC NAUAADIH', individuals_empanelled: 318 },
  { sn: 17, name: 'HSC KAURIYA RAIPUR', individuals_empanelled: 193 },
  { sn: 18, name: 'Sirsi', individuals_empanelled: 310 },
  { sn: 19, name: 'HSC BRAHMAUL', individuals_empanelled: 292 },
  { sn: 20, name: 'HSC RUDAULI', individuals_empanelled: 250 },
  { sn: 21, name: 'HSC FEJPUR BATH ASLI', individuals_empanelled: 313 },
  { sn: 22, name: 'HSC GAURI', individuals_empanelled: 69 },
  { sn: 23, name: 'HSC GANGULI', individuals_empanelled: 203 },
  { sn: 24, name: 'HSC GAUDA (BATRA)', individuals_empanelled: 587 },
  { sn: 25, name: 'HSC DADRI', individuals_empanelled: 346 },
  { sn: 26, name: 'Bela', individuals_empanelled: 486 },
  { sn: 27, name: 'Janipur', individuals_empanelled: 320 },
  { sn: 28, name: 'HSC BIRAR', individuals_empanelled: 113 },
  { sn: 29, name: 'HSC PANDOUL', individuals_empanelled: 203 },
  { sn: 30, name: 'HSC MANIYADIH', individuals_empanelled: 260 },
  { sn: 31, name: 'HSC KOILi', individuals_empanelled: 450 },
  { sn: 32, name: 'Raipur', individuals_empanelled: 576 },
  { sn: 33, name: 'HSC DORPUR', individuals_empanelled: 206 },
  { sn: 34, name: 'HSC MOHAMMMADPUR', individuals_empanelled: 195 },
  { sn: 35, name: 'HSC MAJHAUR', individuals_empanelled: 292 },
  { sn: 36, name: 'Mednipur', individuals_empanelled: 414 },
  { sn: 37, name: 'HSC BASOPATTI', individuals_empanelled: 144 },
];

// ==========================================
// OPD DATA FROM BHAVYA REPORT
// Source: PHC NANPUR SITAMARHI20260521_10173843.pdf
// ==========================================
export const hscOpdApril2026 = [
  { facility: 'HSC BELA', registered: 631, prescribed: 630, anc: 85, lab_test: 113, vital_taken: 630 },
  { facility: 'HSC GAUDA BATRA', registered: 584, prescribed: 584, anc: 173, lab_test: 6, vital_taken: 584 },
  { facility: 'HSC KHOPI JANIPUR', registered: 453, prescribed: 441, anc: 160, lab_test: 3, vital_taken: 441 },
  { facility: 'HSC KOILI', registered: 450, prescribed: 440, anc: 119, lab_test: 3, vital_taken: 440 },
  { facility: 'HSC MEDNIPUR', registered: 391, prescribed: 386, anc: 66, lab_test: 5, vital_taken: 386 },
  { facility: 'HSC BATH', registered: 367, prescribed: 326, anc: 85, lab_test: 0, vital_taken: 326 },
  { facility: 'HSC DADRI', registered: 343, prescribed: 307, anc: 141, lab_test: 4, vital_taken: 307 },
  { facility: 'HSC CHIKNA TOLA BATH ASLI', registered: 342, prescribed: 339, anc: 194, lab_test: 4, vital_taken: 339 },
  { facility: 'HSC NOUADIH', registered: 313, prescribed: 312, anc: 111, lab_test: 4, vital_taken: 312 },
  { facility: 'HSC FEJPUR BATH ASLI', registered: 310, prescribed: 226, anc: 73, lab_test: 1, vital_taken: 226 },
  { facility: 'HSC JANIPUR', registered: 294, prescribed: 291, anc: 64, lab_test: 0, vital_taken: 291 },
  { facility: 'HSC MANJHOUR', registered: 290, prescribed: 276, anc: 103, lab_test: 1, vital_taken: 276 },
  { facility: 'HSC RAMNAGAR', registered: 290, prescribed: 264, anc: 11, lab_test: 0, vital_taken: 264 },
  { facility: 'HSC MOHNI', registered: 277, prescribed: 261, anc: 120, lab_test: 0, vital_taken: 261 },
  { facility: 'HSC BEDAUL', registered: 268, prescribed: 265, anc: 29, lab_test: 7, vital_taken: 265 },
  { facility: 'HSC MOHNI SARKAULI', registered: 265, prescribed: 264, anc: 124, lab_test: 0, vital_taken: 264 },
  { facility: 'HSC MANIYADIH', registered: 264, prescribed: 263, anc: 87, lab_test: 0, vital_taken: 263 },
  { facility: 'HSC BAHERA', registered: 246, prescribed: 209, anc: 21, lab_test: 0, vital_taken: 209 },
  { facility: 'HSC MOHAMADPUR', registered: 237, prescribed: 237, anc: 13, lab_test: 0, vital_taken: 237 },
  { facility: 'HSC BRAHMAUL', registered: 235, prescribed: 231, anc: 84, lab_test: 0, vital_taken: 231 },
  { facility: 'HSC RUDOULI', registered: 230, prescribed: 228, anc: 11, lab_test: 0, vital_taken: 228 },
  { facility: 'HSC ISLAMPUR', registered: 226, prescribed: 226, anc: 122, lab_test: 0, vital_taken: 226 },
  { facility: 'HSC BHALOHIYA', registered: 218, prescribed: 218, anc: 40, lab_test: 0, vital_taken: 218 },
  { facility: 'HSC JAGDISHPUR', registered: 215, prescribed: 211, anc: 47, lab_test: 0, vital_taken: 211 },
  { facility: 'HSC SARIFPUR', registered: 209, prescribed: 206, anc: 50, lab_test: 126, vital_taken: 206 },
  { facility: 'HSC ADHGAWN', registered: 204, prescribed: 203, anc: 56, lab_test: 0, vital_taken: 203 },
  { facility: 'HSC GANGULI', registered: 203, prescribed: 198, anc: 27, lab_test: 0, vital_taken: 198 },
  { facility: 'HSC LAKHMIPUR', registered: 200, prescribed: 200, anc: 20, lab_test: 0, vital_taken: 200 },
  { facility: 'HSC DORPUR', registered: 198, prescribed: 197, anc: 16, lab_test: 0, vital_taken: 197 },
  { facility: 'HSC BHADIYAN', registered: 185, prescribed: 185, anc: 3, lab_test: 0, vital_taken: 185 },
  { facility: 'HSC RAIPUR', registered: 187, prescribed: 175, anc: 153, lab_test: 0, vital_taken: 175 },
  { facility: 'HSC PANDOUL', registered: 181, prescribed: 170, anc: 174, lab_test: 0, vital_taken: 170 },
  { facility: 'HSC KOURIYA RAIPUR', registered: 165, prescribed: 162, anc: 32, lab_test: 0, vital_taken: 162 },
  { facility: 'HSC SIRSI', registered: 142, prescribed: 142, anc: 51, lab_test: 0, vital_taken: 142 },
  { facility: 'HSC BASOPATTI', registered: 115, prescribed: 109, anc: 59, lab_test: 0, vital_taken: 109 },
  { facility: 'HSC BIRAR', registered: 107, prescribed: 109, anc: 0, lab_test: 0, vital_taken: 109 },
  { facility: 'HSC GAURI', registered: 53, prescribed: 53, anc: 0, lab_test: 0, vital_taken: 53 },
];

// ==========================================
// PARITY & DELIVERY DATA
// Source: Presentation_Health_Review_Meeting_19.03.26.pptx (Feb 2026)
// ==========================================
export const deliveryReportFeb2026 = {
  institutional: 251,
  delivery_in_dh: 2,
  delivery_other_govt: 10,
  delivery_private: 14,
  home_delivery: 6,
  total: 283,
};

export const deliveryReportMar2026 = {
  institutional: 238,
  delivery_in_dh: 2,
  delivery_other_govt: 12,
  delivery_private: 16,
  home_delivery: 8,
  total: 276,
};

export const parityFeb2026 = {
  total_delivery: 251,
  first_parity: 76,
  second_parity: 64,
  third_parity: 62,
  fourth_or_more: 49,
  pct_3rd_more: 44,
};

export const parityMar2026 = {
  total_delivery: 238,
  first_parity: 67,
  second_parity: 54,
  third_parity: 63,
  fourth_or_more: 54,
  pct_3rd_more: 49,
};

// ==========================================
// SEX RATIO DATA
// ==========================================
export const sexRatioFeb2026 = {
  live_birth_male: 155,
  live_birth_female: 105,
  total: 260,
  sex_ratio: 677,
};

export const sexRatioMar2026 = {
  live_birth_male: 118,
  live_birth_female: 117,
  total: 235,
  sex_ratio: 992,
};

// ==========================================
// FAMILY PLANNING DATA
// Source: Presentation_Health_Review_Meeting_19.03.26.pptx
// ==========================================
export const familyPlanningFeb2026 = {
  male_sterilization_nsv: { ela: 2, achievement: 0, pct: 0 },
  female_sterilization_tl: { ela: 65, achievement: 39, pct: 60 },
  ppiucd: { inst_delivery: 251, insertions: 73, pct: 29 },
};

// ==========================================
// LAB EQUIPMENT STATUS - CHC Nanpur
// Source: Presentation_Health_Review_Meeting_19.03.26.pptx & 21.04.26.pdf
// ==========================================
export const labEquipmentStatus = {
  cbc_analyzer: 'NF',
  biochemistry_analyzer: 'NF',
  hemocheck: 'F',
  incubator: 'NA',
  refrigerator: 'NA',
  microscope: 'NF (NTEP)',
  ac: 'NA',
  micropipet: 'A',
  total_tests_available: 18,
  test_percentage: 37,
};

// ==========================================
// ANAEMIA MUKT BHARAT - IFA DATA (Apr 25 - Mar 26)
// Source: Presentation_Health_Review_Meeting_21.04.26.pdf
// ==========================================
export const ifaSyrupNanpur = {
  monthly_target_6_59m: 25632,
  annual_target: 307584,
  provided_8_10_doses: 47977,
  pct_achievement: 16,
};

export const ifaBlueNanpur = {
  target_10_19y: 29184,
  annual_target: 350208,
  ifa_blue_needed: 1502392,
  students_provided: 79466,
  pct_consumption: 23,
};

export const ifaPinkNanpur = {
  target_6_9y: 27219,
  annual_target: 326628,
  ifa_pink_needed: 1401234,
  consumption: 71450,
  pct_consumption: 22,
};