const app = require('./src/configs/app');
const { connectDB } = require('./src/configs/database');
require('dotenv').config();

const PORT = process.env.PORT;

// Connect to the database and start the server

app.listen(PORT,async function(){
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
})