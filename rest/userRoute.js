const express = require("express");
const userFacade = require("../facades/userFacade")
const route = express.Router();

route.get("/all", async (req, res) => {
    const users = await userFacade.getAllUsers();
    res.json(users)
})

route.get("/:userName", async (req, res) => {
    const user = await userFacade.findByUserName(req.params.userName)
    res.json(user);
})

route.post("/", async (req, res) => {
    let user = req.body;
    user = await userFacade.addUser(user);
    res.json(user);
})

route.post("/job", async (req, res) => {
    let job = req.body.job;
    const user = await userFacade.addJobToUser(req.body.id, job);
    res.json(user)
})

route.post("/login", async (req, res) => {
    try {
        const { username, password, lat, lon, radius } = req.body;
		console.log(username, password, lat, lon, radius);
        let login = await userFacade.login(username, password, lon, lat, radius);
        res.json(login)
    } catch (e) {
        res.status(403).json(e)
    }
});


module.exports = route;