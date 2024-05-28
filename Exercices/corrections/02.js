// ========================================
// EXERCICES : Modification
// ========================================

// 1. Augmentez de 50% la quantité de chaque document qui a un status 'C' ou 'D'.

db.inventory.updateMany({
  status: { $in: ['C', 'D'] }
}, {
  $mul: { qty: 1.5 }
});

// 2. Augmentez ensuite de 150% les documents ayant un status 'A' ou 'B' et au moins un tag blank.
db.inventory.updateMany({
  status: { $in: ['A', 'B'] },
  tags: 'blank'
}, {
  $mul: { qty: 2.5 }
});

// 3. Ajoutez un tag "purple" à tous les documents ayants un prix supérieur à 5.
db.inventory.updateMany({
  price: { $gt: 5 }
}, {
  $push: { tags: 'purple' }
});

// 4. Ajoutez un tag "red" à tous les documents de type "journal", mais uniquement si le tag "red" n'existe pas déjà !
db.inventory.updateMany({
  type: 'journal'
}, {
  $addToSet: { tags: 'red' }
});

// ========================================
// EXERCICES : Suppression
// ========================================

// 1. Supprimez tous les documents ayant un status 'D' et un prix inférieur strict à 5.
db.inventory.deleteMany({
  status: 'D',
  price: { $lt: 5 }
});

/* db.inventory.find({
  $and: [
    {status: 'D'},
    {price: { $lt: 5 }}
  ]
}) */

// 2. Supprimez tous les documents ayant un status 'A' et un prix supérieur strict à 1.5.
db.inventory.deleteMany({
  status: 'A',
  price: { $gt: 1.5 }
});