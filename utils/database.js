import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('spicy.db')

export const dropTables = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `DROP TABLE IF EXISTS categories`,
        [],
        (_, result) => {
          console.log('Dropped categories table::', result)
          resolve(result)
        },
        (_, error) => {
          console.log('error when dropping:', error)
          reject(error)
        }
      )
      transaction.executeSql(
        `DROP TABLE IF EXISTS tags`,
        [],
        (_, result) => {
          console.log('Dropped tags table:', result)
          resolve(result)
        },
        (_, error) => {
          console.log('error when dropping:', error)
          reject(error)
        }
      )
      transaction.executeSql(
        `DROP TABLE IF EXISTS spicy_items`,
        [],
        (_, result) => {
          console.log('Dropped spicy_items table:', result)
          resolve(result)
        },
        (_, error) => {
          console.log('error when dropping:', error)
          reject(error)
        }
      )
    })
  })

  return promise
}

export const initializeTables = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          category_id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          UNIQUE(name)
        )`,
        [],
        (_, result) => {
          console.log('categories table created')
          console.log('categories table:', result)

          resolve(result)},
        (_, error) => {reject(error)}
      )
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS tags (
          tag_id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
        )`,
        [],
        (_, result) => {
          console.log('tags table created')
          console.log('tags table:', result)
          resolve(result)},
        (_, error) => {reject(error)}
      )
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS spicy_items (
          item_id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          category_id INTEGER,
          description TEXT,
          spicy_rate REAL NOT NULL,
          delicious_rate REAL NOT NULL,
          image_uri TEXT,
          location_lat REAL,
          location_lng REAL,
          tags BLOB,
          created_at TEXT,
          FOREIGN KEY (category_id) REFERENCES categories(category_id)
        )`,
        [],
        (_, result) => {
          console.log('spicy_items table created')
          console.log('spicy_items table:', result)
          resolve(result)},
        (_, error) => {reject(error)}
      ),
      transaction.executeSql(
        `INSERT OR IGNORE INTO categories (name) VALUES ('Shop'), ('Product'), ('Recipe')`,
        [],
        (_, result) => {
          console.log('categories table inserted:', result)
          resolve(result)},
        (_, error) => {reject(error)}
      )
    })
  })
  return promise
}

export const addSpicyItem = (spicyItem) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO spicy_items (name, category_id, description, spicy_rate, delicious_rate, image_uri, location_lat, location_lng, created_at)
          VALUES (?,?,?,?,?,?,?,?,?)
        `,
        [spicyItem.title, spicyItem.category, spicyItem.description, spicyItem.spicyRate, spicyItem.deliciousRate, spicyItem.imageUri, spicyItem.location?.lat, spicyItem.location?.lng, spicyItem.createdAt],
        (_, result) => {
          console.log('spicy_items record inserted:', result)
          resolve(result)},
        (_, error) => {
          reject(error)
        }
      )
    })
  })

  return promise
}

export const getAllCategories = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM categories`,
        [],
        (_, result) => {

          const res = result.rows._array.map((item) => {
            return {
              value: item.category_id,
              label: item.name
            }
          })
          resolve(res)
        },
        (_, error) => {
          console.log(error)
          reject(error)
        },
      )
    })
  })

  return promise
}

export const getAllSpicyItems = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT *, spicy_items.name AS spicy_item_name, categories.name AS category_name
          FROM spicy_items
          LEFT JOIN categories ON spicy_items.category_id = categories.category_id
          ORDER BY created_at DESC`,
        [],
        (_, result) => {
          console.log('select all items:', result.rows._array)
          resolve(result.rows._array)
        },
        (_,error) => {
          reject(error)
        }
      )
    })
  })

  return promise
}