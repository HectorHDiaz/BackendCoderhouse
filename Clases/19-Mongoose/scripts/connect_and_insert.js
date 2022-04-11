// CREATE
// READ
// UPDATE
// DELETE
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './MOCK_DATA.json'), 'utf-8');
const parsedData = JSON.parse(data);

const db = connect('mongodb://localhost/demopb19');

db.users.insertMany(parsedData);