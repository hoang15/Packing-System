migrate((db) => {
  const collection = new Collection({
    "id": "0g2k9379ibn314f",
    "created": "2023-04-10 07:09:15.171Z",
    "updated": "2023-04-10 07:09:15.171Z",
    "name": "paking_reserve",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mfvtaho9",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "l1sbbxej",
        "name": "parking_Area_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "cgu0uc5825sno2w",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "zv3exxro",
        "name": "row",
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
        "id": "jblsfqop",
        "name": "column",
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
        "id": "e7miyhqj",
        "name": "start_time",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "hyguckkh",
        "name": "end_time",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("0g2k9379ibn314f");

  return dao.deleteCollection(collection);
})
