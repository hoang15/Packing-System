migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // remove
  collection.schema.removeField("okoy1neg")

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
        "Tòa A",
        "Tòa",
        "Tòa CB"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("soxmvadp")

  return dao.saveCollection(collection)
})
