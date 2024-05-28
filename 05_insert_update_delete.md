# Insertion, Modification et Suppression

Tout comme dans n'importe quelle base de données, il est aussi possible avec le langage de requête de MongoDB de faire des opérations d'**insertion**, de **modification** et de **suppression**.

# Insertion

Pour insérer un document dans une collection, on utilise la méthode `insertOne` ou `insertMany`.

La méthode `insertOne` permet d'insérer un seul document dans une collection :

```js
db.collection.insertOne(/* { document unique } */);
```

Si il y a plusieurs documents à insérer, on utilise `insertMany` à la place, qui prend un _tableau de documents_ :

```js
db.collection.insertMany([
  /* { document 1 } */,
  /* { document 2 } */,
  /* { document 3 } */, 
]);
```

> ℹ️ Documentation MongoDB :
> - [📖 db.collection.insertOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#syntax)
> - [📖 db.collection.insertMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#syntax)

### Mise en pratique :

Afin de s'exercer, nous allons travailler avec une autre base de données nommée `shop` et une collection `inventory`.

Dans le shell MongoSH, tapez les commandes suivantes :

```
test> use shop

shop> db.createCollection("inventory")
```
Insérez ensuite les documents suivants dans la collection `inventory` (vous pouvez les copier/coller) :

```js
[
  {
    sale: true,
    price: 0.99,
    society: 'Alex',
    type: 'postcard',
    qty: 19,
    size: { h: 11, w: 29, uom: 'cm' },
    status: 'A',
    tags: ['blank', 'blank', 'blank'],
    year: 2019,
  },
  {
    sale: false,
    price: 1.99,
    society: 'Alan',
    type: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A',
    tags: ['blank', 'red', 'blank', 'blank'],
    year: 2019,
  },
  {
    sale: true,
    price: 1.5,
    society: 'Albert',
    type: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A',
    tags: ['gray'],
    year: 2019,
  },
  {
    sale: true,
    price: 7.99,
    society: 'Alice',
    type: 'lux paper',
    qty: 100,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'D',
    year: 2020,
  },
  {
    sale: true,
    price: 2.99,
    society: 'Sophie',
    type: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D',
    tags: ['gel', 'blue'],
    year: 2017,
  },
  {
    sale: false,
    price: 0.99,
    society: 'Phil',
    type: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A',
    tags: ['gray'],
    year: 2018,
  },
  {
    sale: true,
    price: 4.99,
    society: 'Nel',
    type: 'journal',
    qty: 19,
    size: { h: 10, w: 21, uom: 'cm' },
    status: 'B',
    tags: ['blank', 'blank', 'blank', 'red'],
    year: 2019,
    level: 100,
  },
  {
    sale: true,
    price: 4.99,
    society: 'Alex',
    type: 'journal',
    qty: 15,
    size: { h: 17, w: 20, uom: 'cm' },
    status: 'C',
    tags: ['blank'],
    year: 2019,
  },
  {
    sale: false,
    price: 5.99,
    society: 'Tony',
    type: 'journal',
    qty: 100,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'B',
    tags: ['blank', 'blank', 'blank', 'red'],
    year: 2020,
  },
];
```

# Modification

Tout comme l'insertion, il existe 2 méthodes pour modifier un document dans une collection : `updateOne` et `updateMany`.

La méthode `updateOne` permet de modifier un seul document selon un critère de recherche. Elle a été conçue pour éviter de modifier plusieurs documents par erreur en exprimant explicitement le document à modifier.

Sa syntaxe est la suivante :

```js
db.collection.updateOne(
  { /* critère de recherche */ },
  { /* modification */ }
);
```

Pour modifier plusieurs documents, on utilise `updateMany` qui dispose de la même syntaxe, mais s'applique à tous les documents qui vérifient les critères de recherche.

> [!WARNING]
> Il faut donc être très prudent lors de l'utilisation de `updateMany` pour éviter de modifier des documents par erreur.

```js
db.collection.updateMany(
  { /* critère de recherche */ },
  { /* modification */ }
);
```

> ℹ️ Documentation MongoDB :
> - [📖 db.collection.updateOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#syntax)
> - [📖 db.collection.updateMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/#syntax)

Le second paramètre de `updateOne` ou `updateMany` est un objet de modification, ne pouvant contenir que des **[opérateurs de modification](https://www.mongodb.com/docs/manual/reference/operator/update/#fields)**.

En voici quelques-uns :

- `$set` : Permet de modifier ou d'ajouter une propriété à un document.
- `$unset` : Permet de supprimer une propriété d'un document.
- `$inc` : Permet d'incrémenter une valeur numérique.
- `$mul` : Permet de multiplier une valeur numérique.
- `$push` : Permet d'ajouter une valeur à un champ de type array.
- `$addToSet` : Permet d'ajouter une valeur à un champ de type array si elle n'existe pas.
- `$currentDate` : Permet de mettre à jour une date avec la date actuelle.

Dans l'exemple suivant on modifie le document dont l'identifiant est `5ef43c659c3a4c119caf7ef5` en lui ajoutant un champ `status` avec la valeur `SUPER` et en mettant à jour la date de dernière modification :

```js
db.inventory.updateOne(
  { _id: ObjectId("5ef43c659c3a4c119caf7ef5") },
  {
    $set: { status: "SUPER" },
    $currentDate: { lastModified: true }
  }
);
```

On obtient le résultat suivant :

```js
// AVANT la modification :
{
  "_id" : ObjectId("5ef43c659c3a4c119caf7ef5"),
  "status" : "A"
}

// APRÈS la modification :
{
  "_id" : ObjectId("5ef43c659c3a4c119caf7ef5"),
  "status" : "SUPER",
  "lastModified" : ISODate("2024-05-26T14:00:00.000Z")
}
```

> [!NOTE]
> Si il y a plusieurs documents qui correspondent au critère de recherche, `updateOne` prendra seulement le **premier document** dans l'ordre naturel ou l'ordre des mises jours.

## Upsert

Dans le cas où aucun document ne correspond au critère de recherche, `updateOne` ne fera aucune modification par défaut.

On peut changer ce comportement en ajoutant un troisième paramètre de configuration `{ upsert: true }`. Cela permet de créer un nouveau document si aucun document ne correspond au critère de recherche.

```js
db.inventory.updateOne(
  { name: "Daniel" },
  {
    $set: { status: "SUPER" },
    $currentDate: { lastModified: true }
  },
  { upsert: true } // <-- Crée un nouveau document si aucun document ne correspond
);
```

## Modification de champs de type 'Array'

Les opérateurs de modification `$push` et `$addToSet` sont particulièrement utiles pour modifier des champs de type `array`.

Ils fonctionnent de la même façon, à une différence près :
- `$addToSet` n'ajoute une valeur que si elle n'existe pas déjà dans le tableau.
- `$push` ajoute la valeur quoiqu'il arrive.

Soit le document suivant :

```js
{
  _id: ObjectId("5ef43c659c3a4c119caf7ef5"),
  society: "Phil",
  tags: ["gray", "blue"]
}
```

On souhaite ajouter le tag `"orange"` à ce document précis. On peut alors utiliser `$addToSet` ou `$push` :

```js
db.inventory.updateOne(
  { _id: ObjectId("5ef43c659c3a4c119caf7ef5") },
  { $addToSet: { tags: "orange" } }
);
```

Le document sera modifié comme suit :

```js
{
  _id: ObjectId("5ef43c659c3a4c119caf7ef5"),
  society: "Phil",
  tags: ["gray", "blue", "orange"]
}
```

## Modifier des champs numériques

D'autres opérateurs très pratiques existent pour modifier des champs numériques. Parmis eux, il y a notamment :

- `$mul` : Permet de multiplier une valeur numérique.
- `$inc` : Permet d'ajouter ou de soustraire une valeur à un champ numérique.

Soit le document suivant :

```js
{
  _id: ObjectId("5ef43c659c3a4c119caf7ef5"),
  qty: 10
}
```

Si on souhaite augmenter la quantité de 2, on peut utiliser l'opérateur `$inc` en agissant sur le champs numérique `qty` :

```js
db.inventory.updateOne(
  { _id: ObjectId("5ef43c659c3a4c119caf7ef5") },
  { $inc: { qty: 2 } }
);

// Nouvelle valeur du document :
{
  _id: ObjectId("5ef43c659c3a4c119caf7ef5"),
  qty: 12
}
```

De la même façon, l'opérateur `$mul` permet de multiplier une valeur numérique :

```js
db.inventory.updateOne(
  { _id: ObjectId("5ef43c659c3a4c119caf7ef5") },
  { $mul: { qty: 3 } }
);

// Nouvelle valeur du document :
{
  _id: ObjectId("5ef43c659c3a4c119caf7ef5"),
  qty: 36
}
```

### Exercices :

#### 02 - Augmentation et ajout de tags

Utilisez la méthode `updateMany` qui mettra l'ensemble des documents à jour pour faire les opérations suivantes :

1. Augmentez de **50%** la quantité de chaque document qui a un status `'C'` ou `'D'`.

2. Augmentez ensuite de **150%** les documents ayant un status `'A'` ou `'B'` et au moins un tag `blank`.

3. Ajoutez un tag `"purple"` à tous les documents ayants un prix supérieur à `5`.

4. Ajoutez un tag `"red"` à tous les documents de type `"journal"`, mais uniquement si le tag `"red"` n'existe pas déjà !

# Suppression

Les opérations de suppressions fonctionnent de la même façon qu'un `find`, sauf que le résultat est supprimé au lieu d'être affiché.

Il existe toujours 2 méthodes pour supprimer des documents : `deleteOne` et `deleteMany`.
Lorsqu'on utilise `deleteOne`, seul le premier document correspondant au critère de recherche sera supprimé. Il est conseillé de l'utiliser pour des suppressions unitaires pour éviter les erreurs.

Si l'on souhaite supprimer précisément le document dont l'identifiant est `5ef43c659c3a4c119caf7ef5`, on peut utiliser la méthode `deleteOne` :

```js
db.inventory.deleteOne({
  _id: ObjectId("5ef43c659c3a4c119caf7ef5")
});
```

Dans le cas où l'on voudrait supprimer tous les documents dont le champs `note` serait inférieur à 50, on utiliserait `deleteMany` de la sorte :

```js
db.inventory.deleteMany({
  note: { $lt: 50 }
});
```

> [!NOTE]
> Il est conseillé de d'abord tester sa requête avec un `.find` pour vérifier les résultats avant de passer à la suppression.

> [!CAUTION]
> Attention à ne pas oublier le critère de recherche dans `deleteMany` pour éviter de supprimer tous les documents de la collection par erreur.
>
> En effet, si vous exécutez `deleteMany` sans critère, cela supprimera **tous les documents** de la collection :
> ```js
> db.inventory.deleteMany({})
> ```

### Exercices :

#### 03 - Suppression de documents

Utilisez la méthode `deleteMany` pour supprimer les documents suivants :

1. Supprimez tous les documents ayant un status `'D'` et un prix inférieur strict à `5`.

2. Supprimez tous les documents ayant un status `'A'` et un prix supérieur strict à `1.5`.