migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "soxmvadp",
    "name": "name",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Hầm A",
        "Hầm B",
        "Hầm C"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "soxmvadp",
    "name": "name",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Tòa A",
        "Tòa",
        "Tòa CB"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
