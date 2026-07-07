// Public question bank for the L2 Network Engineer screening test.
// IMPORTANT: correct answers are NEVER shipped to the browser. They live in
// supabase/functions/submit-screening/index.ts and scoring happens server-side.

export interface ScreeningQuestion {
  id: number;
  question: string;
  options: string[];
}

export const L2_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  { id: 1, question: "What is the primary function of a Router?", options: ["Connect computers in same LAN", "Connect different networks together", "Store files", "Increase Internet speed"] },
  { id: 2, question: "Which device works at Layer 3 of OSI Model?", options: ["Hub", "Switch", "Router", "Access Point"] },
  { id: 3, question: "Which command is used to check whether a device is reachable?", options: ["ipconfig", "ping", "dir", "copy"] },
  { id: 4, question: "Which command is used to trace the network path?", options: ["ping", "arp", "tracert", "route"] },
  { id: 5, question: "DHCP is used for:", options: ["DNS resolution", "Internet browsing", "Automatic IP address assignment", "File sharing"] },
  { id: 6, question: "DNS is used for:", options: ["Assigning IP address", "Converting domain name to IP address", "Configuring routers", "Monitoring network"] },
  { id: 7, question: "Which of the following is a private IP address?", options: ["8.8.8.8", "1.1.1.1", "192.168.1.10", "142.250.183.78"] },
  { id: 8, question: "Which cable is generally used to connect Router to Switch?", options: ["Fiber only", "Ethernet cable", "USB cable", "HDMI cable"] },
  { id: 9, question: "Which routing protocol is commonly used inside an organization?", options: ["BGP", "OSPF", "FTP", "HTTP"] },
  { id: 10, question: "Which routing protocol is mainly used between Internet Service Providers?", options: ["OSPF", "RIP", "BGP", "STP"] },
  { id: 11, question: "What is a VLAN?", options: ["Physical network", "Logical separation of network", "Internet service", "Firewall"] },
  { id: 12, question: "Which software is commonly used to access a router using SSH?", options: ["Chrome", "Excel", "PuTTY", "VLC"] },
  { id: 13, question: "Which command shows IP configuration in Windows?", options: ["ping", "tracert", "ipconfig", "net use"] },
  { id: 14, question: "Before replacing an old working router, what should be done first?", options: ["Remove all cables", "Switch off router", "Coordinate with Airtel NOC, obtain approved downtime and verify migration plan", "Replace router immediately"] },
  { id: 15, question: "During this project, who performs router configuration?", options: ["Customer", "Field Engineer", "Airtel NOC", "Warehouse Team"] },
  { id: 16, question: "After installing the new router, what should be verified?", options: ["Link Status", "Customer Connectivity", "Routing", "All of the above"] },
  { id: 17, question: "If the new router does not work after migration, what should be done?", options: ["Leave the site", "Replace LAN cable only", "Inform NOC and execute approved rollback plan", "Switch off the router"] },
  { id: 18, question: "What should be done with old router after replacement?", options: ["Leave at customer site", "Throw it away", "Return to Airtel Warehouse as per process", "Keep it for future use"] },
  { id: 19, question: "What does a rollback plan mean?", options: ["Plan to restore old setup if migration fails", "Plan to take lunch break", "Plan to reset password", "Plan to change salary"] },
  { id: 20, question: "What is the most important document after successful installation? Installation Report / IR sign-off", options: ["Installation Report / IR sign-off", "Resume", "Offer letter", "Attendance sheet"] },
];

// Fisher-Yates shuffle
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
