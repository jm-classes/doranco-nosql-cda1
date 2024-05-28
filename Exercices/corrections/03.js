// Exercices aggregate

// 1. Calculez le nombre total de restaurants dans la collection.
db.restaurants.aggregate([
  { $group: { _id: null, total: { $sum: 1 } } },
  { $project: { _id: 0, totalRestaurants: '$total' } },
]);

// 2. Trouvez le nombre de restaurants dans chaque quartier (borough).
db.restaurants.aggregate([{ $group: { _id: '$borough', nbRestaurants: { $sum: 1 } } }]);

// 3. Calculez le nombre moyen de grades par restaurant.
db.restaurants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      nbGrades: { $size: '$grades' },
    },
  },

  {
    $group: {
      _id: null,
      moyenneNotes: { $avg: '$nbGrades' },
    },
  },
]);

// 4. Trouvez le nombre de restaurants ayant obtenu une note "A" dans chaque quartier.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $match: { 'grades.grade': 'A' } },
  { $group: { _id: '$borough', total: { $sum: 1 } } },
]);

// 5. Calculez le score moyen de chaque restaurant.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $group: { _id: '$_id', averageScore: { $avg: '$grades.score' } } },
]);

// 6. Trouvez les cinq restaurants ayant le plus grand nombre de grades.
db.restaurants.aggregate([
  { $project: { numberOfGrades: { $size: '$grades' } } },
  { $sort: { numberOfGrades: -1 } },
  { $limit: 5 },
]);

// 7. Calculez le nombre de restaurants par type de cuisine (cuisine).
db.restaurants.aggregate([{ $group: { _id: '$cuisine', total: { $sum: 1 } } }]);

// 8. Trouvez le restaurant le mieux noté dans chaque quartier.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $sort: { 'grades.score': -1 } },
  { $group: { _id: '$borough', bestRestaurant: { $first: '$name' } } },
]);

// 9. Calculez le score moyen de chaque type de cuisine (cuisine).
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $group: { _id: '$cuisine', averageScore: { $avg: '$grades.score' } } },
]);

// 10. Trouvez le quartier avec le plus grand nombre total de grades "A".
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $match: { 'grades.grade': 'A' } },
  { $group: { _id: '$borough', total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// 11. Calculez le nombre moyen de grades "A" par restaurant dans chaque quartier.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $match: { 'grades.grade': 'A' } },
  { $group: { _id: '$borough', average: { $avg: 1 } } },
]);

// 12. Trouvez les restaurants ayant un score moyen supérieur à 8.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $group: { _id: '$_id', averageScore: { $avg: '$grades.score' } } },
  { $match: { averageScore: { $gt: 8 } } },
]);

// 13. Calculez le nombre moyen de grades pour chaque type de cuisine (cuisine).
db.restaurants.aggregate([
  { $project: { numberOfGrades: { $size: '$grades' }, cuisine: 1 } },
  { $group: { _id: '$cuisine', averageGrades: { $avg: '$numberOfGrades' } } },
]);

// 14. Trouvez le nombre de restaurants ayant plus de 3 grades "B" dans chaque quartier.
db.restaurants.aggregate([
  { $unwind: '$grades' },
  { $match: { 'grades.grade': 'B' } },
  { $group: { _id: '$borough', total: { $sum: 1 } } },
  { $match: { total: { $gt: 3 } } },
]);

// 15. Calculez le score moyen de chaque quartier pour chaque type de cuisine (cuisine).
db.restaurants.aggregate([
  { $unwind: '$grades' },
  {
    $group: {
      _id: { borough: '$borough', cuisine: '$cuisine' },
      averageScore: { $avg: '$grades.score' },
    },
  },
  {
    $group: {
      _id: '$_id.borough',
      cuisineScores: {
        $push: {
          cuisine: '$_id.cuisine',
          averageScore: { $round: ['$averageScore', 2] }, // Arrondir le score moyen à deux décimales
        },
      },
    },
  },
]);
