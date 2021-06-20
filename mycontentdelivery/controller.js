const redis = require('redis')

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

redisClient.on("connect", () => {
    console.log("Connected to redis server!")
})

const { Pool } = require('pg')

const pgClient = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT
})

pgClient.query('CREATE TABLE IF NOT EXISTS martial_arts (ID SERIAL PRIMARY KEY, name VARCHAR(30))')
    .catch((err) => {
        console.log(err)
    })

pgClient.on('error', () => {
    console.log('Postgres not connected')
})

const getMartialArts = (req, res) => {
    pgClient.query('SELECT * FROM martial_arts ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getMartialArtById = (req, res) => {
    const id = parseInt(req.params.id)

    redisClient.get(id, (error, results) => {
        if (results) {
            let result = [{'id': id, 'name': results}]
            res.status(200).json(result)
            console.log(`Retrieved from cache`)
        } else {
            pgClient.query('SELECT * FROM martial_arts WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            })
        }
    })
}

const createMartialArt = (req, res) => {
    const { name } = req.body

    const dbQuery = new Promise((resolve, reject) => {
        pgClient.query('INSERT INTO martial_arts (name) VALUES ($1) RETURNING id', [name], (error, results) => {
            if (error) {
                throw error
            }
            id = results.rows[0].id
            res.status(201).send(`Martial Art added with ID: ${id}`)
            resolve(id)
        })
    })
    dbQuery.then(value =>
        redisClient.set(value, name, (error, results) => {
            if (error) {
                res.status(500).json({ error: error })
                console.log(error)
            }
        })
    )
}

const updateMartialArtById = (req, res) => {
    const { id } = parseInt(req.params.id)
    const { name } = req.body

    const dbQuery = new Promise((resolve, reject) => {
        pgClient.query('UPDATE martial_arts SET (name) VALUES ($2) WHERE (id) = ($1) ', [id, name], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Updated Martial Art with ID: ${id}`)
            resolve(id)
        })
    })
    dbQuery.then(value =>
        redisClient.set(value, name, (error, results) => {
            if (error) {
                res.status(500).json({ error: error })
                console.log(error)
            }
        })
    )
}

const deleteMartialArtById = (req, res) => {
    const { id } = parseInt(req.params.id)

    const dbQuery = new Promise((resolve, reject) => {
        pgClient.query('DELETE FROM martial_arts WHERE (id) = ($1) ', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(202).send(`Deleted Martial Art with ID: ${id}`)
            resolve(id)
        })
    })
    dbQuery.then(value =>
        redisClient.del(value, (error, results) => {
            if (error) {
                res.status(500).json({ error: error })
                console.log(error)
            }
        })
    )
}

module.exports = {
    createMartialArt,
    deleteMartialArtById,
    getMartialArts,
    getMartialArtById,
    updateMartialArtById,
}