migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0g2k9379ibn314f")

  collection.name = "packing_reserve"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l1sbbxej",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0g2k9379ibn314f")

  collection.name = "paking_reserve"

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
