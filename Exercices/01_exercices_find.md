# Exercices find

1. Trouver tous les restaurants à Brooklyn

2. Trouver tous les restaurants qui servent de la cuisine américaine :

3. Trouver tous les restaurants qui ont reçu une note "A" :

4. Trouver tous les restaurants qui ont obtenu un score supérieur à 10 :

5. Trouver tous les restaurants qui ont reçu une note "A" avec un score de 5 :

6. Trouver tous les restaurants qui ont une adresse dans la rue "Stillwell Avenue" :

7. Trouver tous les restaurants qui ont été inspectés en 2014 (nous verrons une requête avec l'agrégation pour obtenir uniquement les restaurants inspectés en 2014)

8. Trouver tous les restaurants qui ont obtenu une note "A" après 2010 :

9. Trouver tous les restaurants qui ont un code postal (zipcode) égal à "11224" :

10.  Trouver tous les restaurants dont le nom contient le mot "Riviera" :

## Deuxième liste

1. Trouvez tous les restaurants qui ont reçu une note "A" pour tous leurs grades.

2. Trouvez tous les restaurants qui ont reçu une note "A" pour au moins un de leurs grades et une note "B" pour au moins un autre grade.

3. Trouvez tous les restaurants qui n'ont jamais reçu une note "C" dans leurs grades.

4. Trouvez tous les restaurants qui ont reçu une note "A" pour leur dernier grade.

5. Trouvez tous les restaurants qui ont reçu une note "A" dans leur premier grade et une note "B" dans leur dernier grade.

6. Trouvez tous les restaurants qui ont reçu une note "A" pour leur premier grade et une note "B" pour leur deuxième grade, mais pas pour leur troisième grade.

7. Trouvez tous les restaurants qui ont reçu une note "A" pour tous leurs grades et dont la somme des scores des grades est supérieure à 30.

8. Trouvez tous les restaurants qui ont reçu une note "A" pour au moins un de leurs grades et dont la moyenne des scores des grades est supérieure à 8.

9. Trouvez tous les restaurants qui ont reçu une note "A" pour tous leurs grades et dont la différence entre le score de leur premier et dernier grade est supérieure à 5.

10. Trouvez tous les restaurants qui ont reçu une note "A" pour tous leurs grades et dont la moyenne des scores des grades est supérieure à la moyenne des scores de tous les restaurants.

## Exercices sur la partie approndissement

1. Trouvez tous les restaurants dont le nom commence par "Pizza" en utilisant une expression régulière. rmq : filtrage avec `$regex`

2. Trouvez tous les restaurants dans un rayon de 5 km d'un point géographique donné (latitude, longitude) en utilisant un index géospatial sur les coordonnées.

3. Trouvez tous les restaurants et incluez uniquement les champs `name`, `borough` et `address` dans les résultats.

4. Trouvez tous les restaurants avec un nom contenant "Sushi" et dont le score moyen est supérieur à 7, en utilisant un index textuel pour accélérer la recherche du nom et une opération d'agrégation `$group` suivie d'une opération de filtrage avec `find` pour le calcul du score moyen.
