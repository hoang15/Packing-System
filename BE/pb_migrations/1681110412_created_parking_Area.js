migrate((db) => {
  const collection = new Collection({
    "id": "cgu0uc5825sno2w",
    "created": "2023-04-10 07:06:52.470Z",
    "updated": "2023-04-10 07:06:52.470Z",
    "name": "parking_Area",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "okoy1neg",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zzdzz1tq",
        "name": "row_count",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "txyhawsi",
        "name": "column_count",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "fp0xyjcq",
        "name": "countdown",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w");

  return dao.deleteCollection(collection);
})
