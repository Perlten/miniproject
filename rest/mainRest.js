const server = require("./restUtils").server
const app = require("./restUtils").app
const userRoute = require("./userRoute")
const blogRoute = require("./blogRoute")
const helmet = require("helmet")

app.use(helmet())
app.use(require("express").json())

async function start(port=3001) {
    app.use("/api/user", userRoute)
    app.use("/api/blog", blogRoute)
    server.listen(port, () => console.log("Listen on port", port));
}

async function stop(){
    console.log("Rest close")
    await server.close();
}

module.exports = {start, stop}