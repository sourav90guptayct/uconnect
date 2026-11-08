import dishAntenna from "@/assets/dish-antenna-connectlh.png.asset.json";

// Source: public/datasheets/29CLH4959-datasheet.pdf.
export const connectlh29 = {
  model: "29CLH4959",
  path: "/products/29clh4959",
  name: "29CLH4959 — 29dBi 2×2 MIMO Dish Antenna",
  image: dishAntenna.url,
  description: "ConnectLH™ 29 dBi dual-polarisation dish antenna for 4.9–5.9 GHz point-to-point wireless networks, with linear vertical and horizontal polarisation and two N-type female connectors.",
  datasheet: "/datasheets/29CLH4959-datasheet.pdf",
  title: "ConnectLH™ 29CLH4959 | 29 dBi MIMO Dish Antenna | uConnect",
  metaDescription: "Explore the ConnectLH™ 29CLH4959 29 dBi 2×2 MIMO dish antenna for 4.9–5.9 GHz. View specifications, download the datasheet and enquire with uConnect sales.",
  specs: [
    "Gain: 29 ±1 dBi | Beamwidth: 6° ±0.5",
    "VSWR ≤ 1.5:1 | Port Isolation > 30 dB",
    "Front-to-Back > 30 dB | Cross Pol > 30 dB",
    "IP65 rated | Wind survival 200 km/h",
    "Weight: 5 ±0.5 kg | Pole mount 90–120 mm",
    "Connector: 2× N(F) | Aluminum reflector, powder coated",
  ],
  electrical: [
    ["Frequency", "4900–5900 MHz"], ["Gain", "29 ±1 dBi"],
    ["VSWR (maximum)", "1.5:1"], ["H-plane beamwidth", "6° ±0.5°"],
    ["E-plane beamwidth", "6° ±0.5°"], ["Polarisation", "Linear vertical & horizontal"],
    ["Port-to-port isolation", "> 30 dB"], ["Maximum power input", "50 W"],
    ["Impedance", "50 Ω"], ["Front-to-back ratio", "> 30 dB"],
    ["Cross-polarisation", "> 30 dB"], ["Connectors", "2 × N-type female"],
  ],
  mechanical: [
    ["Dish diameter", "650 ±10 mm (2 ft)"], ["Reflector", "Aluminium alloy, powder coated"],
    ["Gross weight", "5 ±0.5 kg"], ["Mounting bracket", "Galvanised steel"],
    ["Mounting hardware", "Stainless steel"], ["Mounting", "Pole, 90–120 mm diameter"],
    ["Adjustment", "H-plane ±180° / V-plane ±15°"],
  ],
  environmental: [
    ["Temperature range", "−35°C to +65°C"], ["Wind survival", "200 km/h"],
    ["Humidity", "95%, non-condensing"], ["Ingress protection", "IP65"],
  ],
};

export const connectlh29Enquiry = `mailto:reachus@youconnecttech.com?subject=${encodeURIComponent("Sales enquiry — ConnectLH 29CLH4959 antenna")}&body=${encodeURIComponent("Hello uConnect sales team,\n\nPlease share pricing, availability and delivery details for the ConnectLH 29CLH4959 29 dBi 2×2 MIMO dish antenna.\n\nQuantity: \nCountry / Region: \nProject requirements: \nRequired delivery date: \n\nThank you.")}`;