// Public question bank for the L2 Network Engineer screening test.
// IMPORTANT: correct answers are NEVER shipped to the browser. They live in
// supabase/functions/submit-screening/index.ts and scoring happens server-side.

export type Difficulty = "easy" | "moderate" | "hard";

export interface ScreeningQuestion {
  id: number;
  question: string;
  options: string[];
  difficulty: Difficulty;
}

export const L2_SCREENING_QUESTIONS: ScreeningQuestion[] = [
  // ---------------- EASY (1-40) ----------------
  { id: 1, difficulty: "easy", question: "What is the primary function of a Router?", options: ["Connect computers in same LAN", "Connect different networks together", "Store files", "Increase Internet speed"] },
  { id: 2, difficulty: "easy", question: "Which device works at Layer 3 of OSI Model?", options: ["Hub", "Switch", "Router", "Access Point"] },
  { id: 3, difficulty: "easy", question: "Which command is used to check whether a device is reachable?", options: ["ipconfig", "ping", "dir", "copy"] },
  { id: 4, difficulty: "easy", question: "Which Windows command is used to trace the network path?", options: ["ping", "arp", "tracert", "route"] },
  { id: 5, difficulty: "easy", question: "DHCP is used for:", options: ["DNS resolution", "Internet browsing", "Automatic IP address assignment", "File sharing"] },
  { id: 6, difficulty: "easy", question: "DNS is used for:", options: ["Assigning IP address", "Converting domain name to IP address", "Configuring routers", "Monitoring network"] },
  { id: 7, difficulty: "easy", question: "Which of the following is a private IP address?", options: ["8.8.8.8", "1.1.1.1", "192.168.1.10", "142.250.183.78"] },
  { id: 8, difficulty: "easy", question: "Which cable is generally used to connect Router to Switch?", options: ["Fiber only", "Ethernet cable", "USB cable", "HDMI cable"] },
  { id: 9, difficulty: "easy", question: "Which routing protocol is commonly used inside an organization?", options: ["BGP", "OSPF", "FTP", "HTTP"] },
  { id: 10, difficulty: "easy", question: "Which routing protocol is mainly used between Internet Service Providers?", options: ["OSPF", "RIP", "BGP", "STP"] },
  { id: 11, difficulty: "easy", question: "What is a VLAN?", options: ["Physical network", "Logical separation of network", "Internet service", "Firewall"] },
  { id: 12, difficulty: "easy", question: "Which software is commonly used to access a router using SSH?", options: ["Chrome", "Excel", "PuTTY", "VLC"] },
  { id: 13, difficulty: "easy", question: "Which command shows IP configuration in Windows?", options: ["ping", "tracert", "ipconfig", "net use"] },
  { id: 14, difficulty: "easy", question: "Which port does HTTPS use by default?", options: ["21", "80", "443", "8080"] },
  { id: 15, difficulty: "easy", question: "Which port does HTTP use by default?", options: ["21", "80", "443", "25"] },
  { id: 16, difficulty: "easy", question: "Which port does SSH use by default?", options: ["21", "22", "23", "25"] },
  { id: 17, difficulty: "easy", question: "Which port does Telnet use by default?", options: ["21", "22", "23", "25"] },
  { id: 18, difficulty: "easy", question: "Which port does FTP (control) use by default?", options: ["21", "22", "23", "25"] },
  { id: 19, difficulty: "easy", question: "Which port does DNS use by default?", options: ["25", "53", "80", "110"] },
  { id: 20, difficulty: "easy", question: "Which ports does DHCP use?", options: ["20/21", "53/54", "67/68", "80/443"] },
  { id: 21, difficulty: "easy", question: "MAC addresses operate at which OSI layer?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"] },
  { id: 22, difficulty: "easy", question: "IP addresses operate at which OSI layer?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"] },
  { id: 23, difficulty: "easy", question: "Which transport protocol is connection-oriented?", options: ["UDP", "TCP", "ICMP", "ARP"] },
  { id: 24, difficulty: "easy", question: "Which transport protocol is connectionless?", options: ["TCP", "UDP", "SSH", "HTTP"] },
  { id: 25, difficulty: "easy", question: "What is the broadcast address of 192.168.1.0/24?", options: ["192.168.1.0", "192.168.1.1", "192.168.1.254", "192.168.1.255"] },
  { id: 26, difficulty: "easy", question: "What is the primary role of a default gateway?", options: ["Assign IP addresses", "Forward traffic to other networks", "Resolve hostnames", "Detect viruses"] },
  { id: 27, difficulty: "easy", question: "What is the subnet mask for a /24 network?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"] },
  { id: 28, difficulty: "easy", question: "Which is the IPv4 loopback address?", options: ["0.0.0.0", "127.0.0.1", "169.254.0.1", "255.255.255.255"] },
  { id: 29, difficulty: "easy", question: "APIPA addresses fall in which range?", options: ["10.0.0.0/8", "172.16.0.0/12", "169.254.0.0/16", "192.168.0.0/16"] },
  { id: 30, difficulty: "easy", question: "Which range identifies Class A public IPs (first octet)?", options: ["1-126", "128-191", "192-223", "224-239"] },
  { id: 31, difficulty: "easy", question: "Which range identifies Class C IPs (first octet)?", options: ["1-126", "128-191", "192-223", "224-239"] },
  { id: 32, difficulty: "easy", question: "The 'ping' command uses which protocol?", options: ["TCP", "UDP", "ICMP", "ARP"] },
  { id: 33, difficulty: "easy", question: "ARP resolves what?", options: ["Domain to IP", "IP to MAC", "MAC to IP", "Port to IP"] },
  { id: 34, difficulty: "easy", question: "A Switch operates primarily at which OSI layer?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"] },
  { id: 35, difficulty: "easy", question: "A Hub operates at which OSI layer?", options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"] },
  { id: 36, difficulty: "easy", question: "How many usable hosts are in a /24 network?", options: ["128", "254", "255", "256"] },
  { id: 37, difficulty: "easy", question: "How many bits is an IPv6 address?", options: ["32", "48", "64", "128"] },
  { id: 38, difficulty: "easy", question: "How many bits is an IPv4 address?", options: ["16", "32", "64", "128"] },
  { id: 39, difficulty: "easy", question: "NAT is primarily used to:", options: ["Encrypt traffic", "Translate private and public IPs", "Route between VLANs", "Assign MAC addresses"] },
  { id: 40, difficulty: "easy", question: "A VPN primarily provides:", options: ["Faster internet", "A secure encrypted tunnel over a public network", "Automatic IP assignment", "DNS resolution"] },

  // ---------------- MODERATE (41-80) ----------------
  { id: 41, difficulty: "moderate", question: "OSPF uses which metric for path selection?", options: ["Hop count", "Bandwidth-based cost", "Delay only", "Load"] },
  { id: 42, difficulty: "moderate", question: "EIGRP is best described as:", options: ["Open standard link-state", "Cisco advanced distance-vector / hybrid", "Path-vector between ASes", "Layer-2 protocol"] },
  { id: 43, difficulty: "moderate", question: "Spanning Tree Protocol (STP) is designed to:", options: ["Provide routing", "Prevent Layer-2 switching loops", "Encrypt frames", "Assign VLANs"] },
  { id: 44, difficulty: "moderate", question: "In STP, the Root Bridge is selected based on:", options: ["Highest MAC", "Lowest Bridge ID", "Highest port number", "Fastest port"] },
  { id: 45, difficulty: "moderate", question: "Classic STP is defined by which IEEE standard?", options: ["802.1D", "802.1Q", "802.1X", "802.11"] },
  { id: 46, difficulty: "moderate", question: "Rapid Spanning Tree Protocol (RSTP) is defined by:", options: ["802.1D", "802.1w", "802.1s", "802.1Q"] },
  { id: 47, difficulty: "moderate", question: "An access port typically carries:", options: ["Multiple tagged VLANs", "A single untagged VLAN", "Only management traffic", "No VLAN"] },
  { id: 48, difficulty: "moderate", question: "The industry-standard trunk encapsulation is:", options: ["ISL", "802.1Q", "802.3ad", "HDLC"] },
  { id: 49, difficulty: "moderate", question: "The default native VLAN on Cisco switches is:", options: ["0", "1", "10", "1002"] },
  { id: 50, difficulty: "moderate", question: "Inter-VLAN routing requires:", options: ["A Layer-2 switch only", "A hub", "A Layer-3 device (router or L3 switch)", "A firewall only"] },
  { id: 51, difficulty: "moderate", question: "HSRP is a redundancy protocol that is:", options: ["An IETF open standard", "Cisco proprietary", "Layer-2 only", "Encryption protocol"] },
  { id: 52, difficulty: "moderate", question: "VRRP is standardized by:", options: ["Cisco proprietary", "IETF (RFC)", "IEEE 802.1", "ITU-T"] },
  { id: 53, difficulty: "moderate", question: "The wildcard mask equivalent of /24 is:", options: ["255.255.255.0", "0.0.0.255", "0.0.255.255", "255.255.0.0"] },
  { id: 54, difficulty: "moderate", question: "OSPF Area 0 is also known as:", options: ["Stub area", "Backbone area", "NSSA", "Transit AS"] },
  { id: 55, difficulty: "moderate", question: "BGP uses AS_PATH mainly to:", options: ["Compress updates", "Prevent routing loops", "Assign IPs", "Elect a DR"] },
  { id: 56, difficulty: "moderate", question: "The TCP connection setup uses:", options: ["2-way handshake", "3-way handshake (SYN, SYN-ACK, ACK)", "4-way handshake", "No handshake"] },
  { id: 57, difficulty: "moderate", question: "Which TCP flag is used to gracefully close a connection?", options: ["SYN", "RST", "FIN", "PSH"] },
  { id: 58, difficulty: "moderate", question: "The TCP window field is used for:", options: ["Encryption", "Flow control", "Routing", "Fragmentation"] },
  { id: 59, difficulty: "moderate", question: "The default Ethernet MTU is:", options: ["576", "1000", "1500", "9000"] },
  { id: 60, difficulty: "moderate", question: "A jumbo frame is typically up to:", options: ["1500 bytes", "3000 bytes", "9000 bytes", "64000 bytes"] },
  { id: 61, difficulty: "moderate", question: "The extended VLAN range is:", options: ["1-1005", "1006-4094", "0-4095", "1-4096"] },
  { id: 62, difficulty: "moderate", question: "A standard ACL filters on:", options: ["Source IP only", "Source and destination IP", "Ports and protocols", "MAC addresses"] },
  { id: 63, difficulty: "moderate", question: "An extended ACL can filter on:", options: ["Source IP only", "Destination IP only", "Source/destination IP, ports, and protocol", "MAC only"] },
  { id: 64, difficulty: "moderate", question: "NAT overload (many private IPs sharing one public IP) is also called:", options: ["Static NAT", "Dynamic NAT", "PAT", "DNAT"] },
  { id: 65, difficulty: "moderate", question: "The Cisco IOS command to save running config to startup is:", options: ["save config", "copy running-config startup-config", "write erase", "reload"] },
  { id: 66, difficulty: "moderate", question: "The Cisco privileged EXEC mode prompt ends with:", options: [">", "#", "$", "!"] },
  { id: 67, difficulty: "moderate", question: "To enter Cisco global configuration mode, you use:", options: ["enable", "configure terminal", "show running-config", "reload"] },
  { id: 68, difficulty: "moderate", question: "Which Cisco command shows CPU utilization?", options: ["show version", "show processes cpu", "show interfaces", "show ip route"] },
  { id: 69, difficulty: "moderate", question: "Which command gives a quick summary of interface status and IPs?", options: ["show run", "show ip interface brief", "show clock", "show flash"] },
  { id: 70, difficulty: "moderate", question: "Routing protocols avoid infinite loops largely with:", options: ["ARP", "TTL and loop-prevention mechanisms", "DNS", "STP"] },
  { id: 71, difficulty: "moderate", question: "The default TTL for a Windows ping is typically:", options: ["32", "64", "128", "255"] },
  { id: 72, difficulty: "moderate", question: "Which DNS record type maps a domain to a mail server?", options: ["A", "AAAA", "MX", "CNAME"] },
  { id: 73, difficulty: "moderate", question: "Which DNS record type maps a hostname to an IPv4 address?", options: ["A", "AAAA", "MX", "PTR"] },
  { id: 74, difficulty: "moderate", question: "Which DNS record type maps a hostname to an IPv6 address?", options: ["A", "AAAA", "MX", "TXT"] },
  { id: 75, difficulty: "moderate", question: "Which DNS record type is an alias?", options: ["A", "MX", "CNAME", "PTR"] },
  { id: 76, difficulty: "moderate", question: "SNMP typically uses which UDP port?", options: ["25", "161", "389", "443"] },
  { id: 77, difficulty: "moderate", question: "Syslog uses which default UDP port?", options: ["25", "123", "514", "1812"] },
  { id: 78, difficulty: "moderate", question: "NTP uses which UDP port?", options: ["53", "123", "161", "389"] },
  { id: 79, difficulty: "moderate", question: "RADIUS authentication uses which UDP port (modern)?", options: ["49", "1645", "1812", "3389"] },
  { id: 80, difficulty: "moderate", question: "TACACS+ uses which TCP port?", options: ["49", "88", "443", "3389"] },

  // ---------------- HARD (81-100) ----------------
  { id: 81, difficulty: "hard", question: "OSPF LSA Type 1 is a:", options: ["Router LSA", "Network LSA", "Summary LSA", "External LSA"] },
  { id: 82, difficulty: "hard", question: "OSPF LSA Type 5 is a:", options: ["Router LSA", "Network LSA", "Summary LSA", "AS-External LSA"] },
  { id: 83, difficulty: "hard", question: "iBGP peering is between routers that are:", options: ["In the same AS", "In different ASes", "On the same subnet only", "Layer-2 adjacent"] },
  { id: 84, difficulty: "hard", question: "Cisco's default Administrative Distance for eBGP is:", options: ["20", "90", "110", "200"] },
  { id: 85, difficulty: "hard", question: "Cisco's default Administrative Distance for OSPF is:", options: ["20", "90", "110", "120"] },
  { id: 86, difficulty: "hard", question: "Cisco's default Administrative Distance for internal EIGRP is:", options: ["1", "5", "90", "110"] },
  { id: 87, difficulty: "hard", question: "The default Administrative Distance of a static route is:", options: ["0", "1", "5", "20"] },
  { id: 88, difficulty: "hard", question: "The Administrative Distance of a directly connected route is:", options: ["0", "1", "5", "90"] },
  { id: 89, difficulty: "hard", question: "Split horizon prevents:", options: ["Broadcast storms", "A router from advertising a route back out the interface it was learned on", "MAC flapping", "DHCP starvation"] },
  { id: 90, difficulty: "hard", question: "MPLS is often described as operating at:", options: ["Layer 1", "Layer 2", "Layer 2.5", "Layer 3"] },
  { id: 91, difficulty: "hard", question: "LDP is a signaling protocol used with:", options: ["OSPF", "BGP", "MPLS", "STP"] },
  { id: 92, difficulty: "hard", question: "VXLAN encapsulates traffic in UDP using which default port?", options: ["4500", "4789", "8472", "6081"] },
  { id: 93, difficulty: "hard", question: "GRE uses which IP protocol number?", options: ["6", "17", "47", "50"] },
  { id: 94, difficulty: "hard", question: "IPsec ESP uses which IP protocol number?", options: ["47", "50", "51", "89"] },
  { id: 95, difficulty: "hard", question: "IKE (for IPsec) uses which UDP port?", options: ["500", "1701", "1723", "4500"] },
  { id: 96, difficulty: "hard", question: "The DSCP field in the IP header is how many bits?", options: ["3", "4", "6", "8"] },
  { id: 97, difficulty: "hard", question: "By default, the EIGRP composite metric primarily uses:", options: ["Bandwidth and delay", "Hop count only", "MTU and load", "Reliability and jitter"] },
  { id: 98, difficulty: "hard", question: "In Cisco BGP best-path selection, the FIRST attribute considered is:", options: ["AS_PATH length", "Local Preference", "Weight (Cisco proprietary)", "MED"] },
  { id: 99, difficulty: "hard", question: "OSPF elects a DR/BDR on:", options: ["Point-to-point links", "Broadcast / multi-access networks", "Loopback interfaces", "NBMA hub-and-spoke only"] },
  { id: 100, difficulty: "hard", question: "The main purpose of route summarization is to:", options: ["Speed up ping", "Reduce routing-table size and update overhead", "Encrypt routes", "Prevent broadcasts"] },
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

// Pick a balanced, randomized subset of questions for each candidate so that
// no two attempts see the same paper.
// Default mix: 10 easy + 10 moderate + 5 hard = 25 questions.
export function pickBalancedQuestions(
  easyCount = 10,
  moderateCount = 10,
  hardCount = 5,
): ScreeningQuestion[] {
  const byDiff = (d: Difficulty) =>
    shuffle(L2_SCREENING_QUESTIONS.filter((q) => q.difficulty === d));

  const selected = [
    ...byDiff("easy").slice(0, easyCount),
    ...byDiff("moderate").slice(0, moderateCount),
    ...byDiff("hard").slice(0, hardCount),
  ];
  return shuffle(selected);
}
