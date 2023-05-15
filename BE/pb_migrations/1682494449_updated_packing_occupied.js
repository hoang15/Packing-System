migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pzzvxx265hpg796")

  collection.name = "parking_occupied"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pzzvxx265hpg796")

  collection.name = "packing_occupied"

  return dao.saveCollection(collection)
})
