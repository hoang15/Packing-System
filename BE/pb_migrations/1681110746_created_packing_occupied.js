migrate((db) => {
  const collection = new Collection({
    "id": "pzzvxx265hpg796",
    "created": "2023-04-10 07:12:26.395Z",
    "updated": "2023-04-10 07:12:26.395Z",
    "name": "packing_occupied",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0ihcz6m4",
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
        "id": "fdj8xoha",
        "name": "packing_Area_id",
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
        "id": "ha9gira6",
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
        "id": "a6qw3dtq",
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
        "id": "ce7tll5u",
        "name": "checking_Time",
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
        "id": "j6pqrpr9",
        "name": "checkout_Time",
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
        "id": "to03qktb",
        "name": "license_plates",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("pzzvxx265hpg796");

  return dao.deleteCollection(collection);
})
