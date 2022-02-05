const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8000
require('dotenv').config()

const memberRouter = require('./routers/memberRouter');
const movieRouter = require('./routers/movieRouter')
const userRouter = require('./routers/userRouter')
const subscriptionRouter = require('./routers/subscriptionRouter')

require('./configs/database')
app.use(cors())
app.use(express.json());

app.use('/api/subscriptions',subscriptionRouter)
app.use('/api/movies',movieRouter)
app.use('/api/members',memberRouter)
app.use('/api/users',userRouter)

app.listen(8000, () => {
    console.log(`listening on ${PORT}`)
})