migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0g2k9379ibn314f")

  collection.name = "parking_reserve"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0g2k9379ibn314f")

  collection.name = "packing_reserve"

  return dao.saveCollection(collection)
})
