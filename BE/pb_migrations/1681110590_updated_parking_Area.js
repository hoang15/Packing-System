migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  collection.name = "packing_Area"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cgu0uc5825sno2w")

  collection.name = "parking_Area"

  return dao.saveCollection(collection)
})
