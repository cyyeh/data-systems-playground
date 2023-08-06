const duckdb = require('duckdb')
const assert = require('node:assert/strict')

const SQL_STATEMENT = 'SELECT * FROM lineitem LIMIT 100000'

const db = new duckdb.Database('tpch.db', accessMode = duckdb.OPEN_READONLY)
db.run('INSTALL arrow;')
db.run('LOAD arrow;')
const db_conn = db.connect()

console.time("db.all")
db.all(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db.all")
})

console.time("db.arrowIPCAll")
db.arrowIPCAll(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db.arrowIPCAll")
})

console.time("db_conn.all")
db_conn.all(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db_conn.all")
})

console.time("db_conn.arrowIPCAll")
db_conn.arrowIPCAll(SQL_STATEMENT, function(err, res) {
    if (err) {
        throw err
    }

    assert.notDeepEqual(res, undefined)
    console.timeEnd("db_conn.arrowIPCAll")
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

/**
 * db.all: 82.015ms
 * db_conn.all: 155.695ms
 * db_conn.stream: 229.691ms
 */