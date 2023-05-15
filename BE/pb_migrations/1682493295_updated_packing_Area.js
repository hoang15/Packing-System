migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // remove
  collection.schema.removeField("soxmvadp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swm8i99q",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // add
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

  // remove
  collection.schema.removeField("swm8i99q")

  return dao.saveCollection(collection)
})
