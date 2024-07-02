const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) console.error(err.message)
});
let sql;

db.serialize(() => {
    /**
     * BUDGETING
     */

    // Create Purchase Category table
    sql = `CREATE TABLE purchase_category (
        category_id INTEGER PRIMARY KEY, 
        category VARCHAR(255) NOT NULL
    )`;
    db.run(sql)

    // Create Purchase Table
    sql = `CREATE TABLE purchase (
        id INTEGER PRIMARY KEY, 
        date DATE, 
        title VARCHAR(255) NOT NULL, 
        amount INT NOT NULL, 
        category INT NOT NULL, 
        include_in_calculation BOOL DEFAULT true,
        FOREIGN KEY (category) REFERENCES purchase_category(category_id)
    )`;
    db.run(sql)

    /**
     * LISTS
     */
    // List type
    sql = `CREATE TABLE list_type (
        list_type_id INT PRIMARY KEY,
        list_type  VARCHAR(255) NOT NULL
    )`
    db.run(sql)


    // List
    sql = `CREATE TABLE list (
        id INT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        list_type INT NOT NULL,
        FOREIGN KEY (list_type) REFERENCES list_type(list_type_id)
    )`
    db.run(sql)

    // list item
    sql = `CREATE TABLE list_item (
        id INT PRIMARY KEY,
        text TEXT NOT NULL,
        checked BOOL DEFAULT false,
        list_id INT NOT NULL,
        FOREIGN KEY (list_id) REFERENCES list(id)
    )`
    db.run(sql)

    /**
     * Calenar
     */
    // Calendar Event
    sql = `CREATE TABLE calendar_event (
        calendar_event_id INT PRIMARY KEY,
        date DATE,
        title VARCHAR(255) NOT NULL,
        description TEXT
    )`
    db.run(sql)
})
db.close();