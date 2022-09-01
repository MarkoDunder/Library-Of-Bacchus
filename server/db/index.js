const {Pool} = require('pg');

const pool= new Pool({
    user:"postgres",
    password:"kiselikupus",
    database:"Library-Of-Bacchus",
    host:"localhost",
    port:5432
});

module.exports={
    query:(text, params)=> pool.query(text, params),
};