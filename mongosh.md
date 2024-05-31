```shell
use sport_store;
```

```shell
db.createCollection("articles");
```

```shell
db.createCollection("rayons");
```

```shell
db.runCommand({
  collMod: "articles",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["marque", "prix", "nom", "reference", "fournisseur", "rayon_id"],
      properties: {
        marque: { bsonType: "string" },
        prix: { bsonType: "decimal" },
        nom: { bsonType: "string" },
        reference: { bsonType: "string" },
        categorie: { enum: ["enfant", "junior", "senior"] },
        tailles: {
          bsonType: "array",
          items: { bsonType: "int" }
        },
        fournisseur: {
          bsonType: "object",
          required: ["nom", "adresse"],
          properties: {
            nom: { bsonType: "string" },
            adresse: { bsonType: "string" }
          }
        },
        rayon_id: { bsonType: "objectId" }
      }
    }
  }
});
```

```shell
db.runCommand({
  collMod: "rayons",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["description", "employe_responsable"],
      properties: {
        description: { bsonType: "string" },
        employe_responsable: { bsonType: "string" }
      }
    }
  }
});
```