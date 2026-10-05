// Collections + products. Image keys (e = exterior, i = interior, d = detail) point into data/images.js.
// price / material / dims stay null until the brand supplies real values; the UI marks them "to be added".
// Setting `price` on any product switches on the store's price filter + price sorting automatically.

export const CATS = ['Tote Bags', 'Travel Bags', 'Storage Bags', 'Laptop Sleeves', 'Sling Bags', 'Dhobi Bags', 'Denim', 'Multipurpose'];

// focal points (object-position) for photos where the default centre crop cuts the bag
export const FOCAL = { 0: '50% 30%', 22: '42% 50%', 17: '50% 55%' };

// [text, emphasised?]
export const ROOMS = [
  { name: 'Tote Bags', acc: 'blush', img: 22, deco: 'd1', line: [['Everyday, ', 0], ['elevated.', 1]] },
  { name: 'Travel Bags', acc: 'powder', img: 30, deco: 'd2', line: [['Take a little ', 0], ['beautifully', 1], [' everywhere.', 0]] },
  { name: 'Storage Bags', acc: 'butter', img: 18, deco: 'd3', line: [['A place for ', 0], ['every little thing.', 1]] },
  { name: 'Laptop Sleeves', acc: 'lavender', img: 6, deco: 'd4', line: [['Soft armour for ', 0], ['bright ideas.', 1]] },
  { name: 'Sling Bags', acc: 'peach', img: 12, deco: 'd5', line: [['Go where ', 0], ['the day takes you.', 1]] },
  { name: 'Dhobi Bags', acc: 'sage', img: 3, deco: 'd6', line: [['The beauty of ', 0], ['the everyday.', 1]] },
  { name: 'Denim', acc: 'denim', img: 0, deco: 'd7', line: [['Blue, with a ', 0], ['different point of view.', 1]] },
  { name: 'Multipurpose', acc: 'peach', img: 10, deco: 'd8', line: [['One little thing. ', 0], ['Many possibilities.', 1]] },
];

// name, category, exterior, interior, detail, mask, colour, pattern  (colour/pattern read from the photos)
const ROWS = [
  ['Colorful Patchwork Tote Bag', 'Tote Bags', 22, 25, null, 'orgA', 'red', 'Patchwork'],
  ['Red Gingham Ruffled Crossbody', 'Sling Bags', 17, 15, null, 'arch', 'red', 'Gingham'],
  ['Orange Gingham Quilted Pouch', 'Multipurpose', 9, 8, null, 'arch', 'orange', 'Gingham'],
  ['Floral Quilted Storage Bag', 'Storage Bags', 18, null, null, 'torn', 'pink', 'Floral'],
  ['Pastel Blue Gingham Dhobi Bag', 'Dhobi Bags', 4, 2, 3, 'orgB', 'blue', 'Gingham'],
  ['Navy Denim Chain Baguette Bag', 'Denim', 0, 1, null, 'pill', 'blue', 'Denim'],
  ['Bohemian Paisley Sling Bag', 'Sling Bags', 12, 14, null, 'orgA', 'multi', 'Paisley'],
  ['Gingham Heart Handbag', 'Tote Bags', 28, null, null, 'arch', 'red', 'Gingham'],
  ['Pink Gingham Pouch Stack', 'Multipurpose', 10, 11, null, 'arch', 'pink', 'Gingham'],
  ['Floral Lavender Travel Tote', 'Travel Bags', 30, 232, null, 'torn', 'lavender', 'Floral'],
  ['Pink Gingham Everyday Tote', 'Tote Bags', 26, 227, null, 'oval', 'pink', 'Gingham'],
  ['Quilted Gingham Laptop Sleeve', 'Laptop Sleeves', 6, 5, null, 'pill', 'red', 'Gingham'],
  ['Pink Gingham Storage Bag', 'Storage Bags', 21, null, null, 'arch', 'pink', 'Gingham'],
  ['Ornate Paisley Tapestry Handbag', 'Sling Bags', 16, null, null, 'arch', 'multi', 'Paisley'],
  ['Floral Duffel Bag', 'Travel Bags', 129, 229, null, 'arch', 'blue', 'Floral'],
  ['Leaf-Patterned Duffel Bag', 'Travel Bags', 131, 231, null, 'arch', 'green', 'Leaf print'],
  ['Patterned Duffel Bag', 'Travel Bags', 133, 233, null, 'arch', 'multi', 'Printed'],
  ['Pink Gingham Duffel Bag', 'Travel Bags', 134, 234, null, 'arch', 'pink', 'Gingham'],
];

export const ALL = ROWS.map((r, k) => ({
  id: `p${k}`,
  name: r[0],
  category: r[1],
  e: r[2],
  i: r[3],
  d: r[4],
  mask: r[5],
  col: r[6],
  pat: r[7],
  price: null,
  material: null,
  dims: null,
}));

export const FEATURED = ALL.slice(0, 12);
