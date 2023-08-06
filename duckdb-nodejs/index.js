const duckdb = require('duckdb')
const assert = require('node:assert/strict')

const SQL_STATEMENT = 'SELECT * FROM lineitem LIMIT 10000'

const db = new duckdb.Database('tpch.db', accessMode = duckdb.OPEN_READONLY)
const db_conn = db.connect()

console.time("db.all")
db.all(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db.all")
})

console.time("db_conn.all")
db_conn.all(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db_conn.all")
})

db_conn_stream()

async function db_conn_stream() {
    console.time("db_conn.stream")
    for await (const row of db_conn.stream(SQL_STATEMENT)) {
        // do something with row
        assert.notDeepEqual(row, undefined)
    }
    console.timeEnd("db_conn.stream")
}

db.close()
