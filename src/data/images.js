// Responsive WebP map. Each key -> [base path, available widths]. Files live in /public.
const B = import.meta.env.BASE_URL;
export const IMG = {
 "0": [
  "images/denim-bags/navy-denim-chain-baguette-bag",
  [
   480,
   800,
   1024
  ]
 ],
 "1": [
  "images/denim-bags/open-navy-denim-bag-interior",
  [
   480,
   800,
   1200
  ]
 ],
 "2": [
  "images/dhobi-bags/open-blue-gingham-baggy-bloom-organizer",
  [
   480,
   800,
   1200
  ]
 ],
 "3": [
  "images/dhobi-bags/overhead-blue-gingham-duffel-bag",
  [
   480,
   800,
   1200
  ]
 ],
 "4": [
  "images/dhobi-bags/pastel-blue-gingham-dhobi-bag",
  [
   480,
   800,
   1200
  ]
 ],
 "5": [
  "images/laptop-bags/open-red-gingham-laptop-sleeve",
  [
   480,
   800,
   1200
  ]
 ],
 "6": [
  "images/laptop-bags/quilted-gingham-laptop-sleeve",
  [
   480,
   800,
   1200
  ]
 ],
 "7": [
  "images/laptop-bags/red-gingham-quilted-laptop-sleeve-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "8": [
  "images/multipurpose-bag/open-orange-gingham-cosmetic-pouch",
  [
   480,
   800,
   1200
  ]
 ],
 "9": [
  "images/multipurpose-bag/orange-gingham-quilted-pouch",
  [
   480,
   800,
   1200
  ]
 ],
 "10": [
  "images/multipurpose-bag/pink-gingham-pouch-stack",
  [
   480,
   800,
   1200
  ]
 ],
 "11": [
  "images/multipurpose-bag/pink-gingham-quilted-organizer-pouch",
  [
   480,
   800,
   1200
  ]
 ],
 "12": [
  "images/sling-bags/bohemian-paisley-sling-bag-in-sunlight",
  [
   480,
   800,
   1200
  ]
 ],
 "13": [
  "images/sling-bags/boho-sling-bag-editorial-showcase",
  [
   480,
   800,
   1200
  ]
 ],
 "14": [
  "images/sling-bags/open-paisley-sling-bag-interior",
  [
   480,
   800,
   1200
  ]
 ],
 "15": [
  "images/sling-bags/open-red-gingham-bag-interior",
  [
   480,
   800,
   1200
  ]
 ],
 "16": [
  "images/sling-bags/ornate-paisley-tapestry-handbag",
  [
   480,
   800,
   1024
  ]
 ],
 "17": [
  "images/sling-bags/red-gingham-ruffled-crossbody-bag",
  [
   480,
   800,
   1024
  ]
 ],
 "18": [
  "images/storage-bags/floral-quilted-storage-bag-in-cozy-bedroom",
  [
   480,
   800,
   1200
  ]
 ],
 "19": [
  "images/storage-bags/floral-storage-bag-lifestyle-showcase",
  [
   480,
   800,
   1200
  ]
 ],
 "20": [
  "images/storage-bags/leaf-print-storage-bag-showcase",
  [
   480,
   800,
   1200
  ]
 ],
 "21": [
  "images/storage-bags/pink-gingham-storage-bag-in-a-cozy-bedroom",
  [
   480,
   800,
   1200
  ]
 ],
 "22": [
  "images/tote-bags/colorful-patchwork-tote-bag-in-warm-studio-light",
  [
   480,
   800,
   1200
  ]
 ],
 "23": [
  "images/tote-bags/gingham-heart-handbag-catalog-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "24": [
  "images/tote-bags/patchwork-quilted-tote-bag-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "25": [
  "images/tote-bags/patchwork-tote-with-organized-interior",
  [
   480,
   800,
   1200
  ]
 ],
 "26": [
  "images/tote-bags/pink-gingham-everyday-tote-vignette",
  [
   480,
   800,
   1200
  ]
 ],
 "27": [
  "images/tote-bags/pink-gingham-tote-organization-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "28": [
  "images/tote-bags/romantic-gingham-heart-handbag-still-life",
  [
   480,
   800,
   1200
  ]
 ],
 "29": [
  "images/travel-bags/floral-duffel-bag-feature-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "30": [
  "images/travel-bags/floral-lavender-travel-tote",
  [
   480,
   800,
   1200
  ]
 ],
 "31": [
  "images/travel-bags/leaf-patterned-duffel-bag-details",
  [
   480,
   800,
   1200
  ]
 ],
 "32": [
  "images/travel-bags/pastel-floral-duffel-bag-details",
  [
   480,
   800,
   1200
  ]
 ],
 "33": [
  "images/travel-bags/patterned-duffel-bag-feature-collage",
  [
   480,
   800,
   1200
  ]
 ],
 "34": [
  "images/travel-bags/pink-gingham-duffel-bag-catalog",
  [
   480,
   800,
   1200
  ]
 ],
 "129": [
  "images/travel-bags/floral-duffel-bag-feature-collage-exterior",
  [
   480,
   763
  ]
 ],
 "229": [
  "images/travel-bags/floral-duffel-bag-feature-collage-interior",
  [
   480,
   537
  ]
 ],
 "131": [
  "images/travel-bags/leaf-patterned-duffel-bag-details-exterior",
  [
   480,
   763
  ]
 ],
 "231": [
  "images/travel-bags/leaf-patterned-duffel-bag-details-interior",
  [
   480,
   537
  ]
 ],
 "133": [
  "images/travel-bags/patterned-duffel-bag-feature-collage-exterior",
  [
   480,
   763
  ]
 ],
 "233": [
  "images/travel-bags/patterned-duffel-bag-feature-collage-interior",
  [
   480,
   537
  ]
 ],
 "134": [
  "images/travel-bags/pink-gingham-duffel-bag-catalog-exterior",
  [
   480,
   763
  ]
 ],
 "234": [
  "images/travel-bags/pink-gingham-duffel-bag-catalog-interior",
  [
   480,
   537
  ]
 ],
 "227": [
  "images/tote-bags/pink-gingham-tote-organization-collage-interior",
  [
   480,
   770
  ]
 ],
 "232": [
  "images/travel-bags/pastel-floral-duffel-bag-details-interior",
  [
   480,
   770
  ]
 ]
};
export const has = (k) => k != null && !!IMG[k];
export const src = (k, pref = 800) => {
  if (!has(k)) return null;
  const [b, ws] = IMG[k];
  return `${B}${b}-${ws.find((w) => w >= pref) || ws[ws.length - 1]}.webp`;
};
export const srcSet = (k) => (has(k) ? IMG[k][1].map((w) => `${B}${IMG[k][0]}-${w}.webp ${w}w`).join(', ') : undefined);
export const LOGO = `${B}brand/logo.webp`;
export const CREATOR = `${B}brand/creator.webp`;
