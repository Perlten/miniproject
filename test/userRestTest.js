require('mocha')
const expect = require("chai").expect
const makeData = require("../makeData")
const dbDisconnect = require("../dbConnect").disconnect
const dbConnect = require("../dbConnect").connect
const restStart = require("./../rest/mainRest").start
const restStop = require("./../rest/mainRest").stop
const fetch = require("node-fetch")
const userModel = require("./../models/user")

describe("Test user rest endpoints", function () {
    before(async function () {
        await dbConnect();
        await restStart();
    })

    after(async function () {
        await restStop();
        await dbDisconnect();
    })

    beforeEach(async function () {
        await makeData();
    })

    describe("GET: user/all", function () {
        it("Should return return 3 users", async function () {
            const url = "http://localhost:3001/api/user/all";
            const response = await fetch(url);
            const data = await response.json();
            expect(data.length).to.be.equal(3)
        })
    })
    describe("GET: user/:username", function () {
        it("Should return user with username Perlt11", async function () {
            const url = "http://localhost:3001/api/user/Perlt11";
            const response = await fetch(url);
            const data = await response.json();
            expect(data.firstName).to.be.equal("Nikolai")
            expect(data.lastName).to.be.equal("Perlt")
        })
    })
    describe("POST: /", function () {
        it("Should post a new user", async function () {
            const url = "http://localhost:3001/api/user"
            const user = {
                firstName: "TEST",
                lastName: "TEST",
                userName: "TEST",
                password: "TEST",
                email: "TEST@gmail.com",
                job: [{
                    type: "TEST",
                    company: "TEST",
                    companyUrl: "TEST.net"
                }]
            }

            await fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const userList = await userModel.find({});
            expect(userList.length).to.be.equal(4)
        })
    })

    describe("POST: /job", async function () {
        it("Should create job on user", async function () {
            const url = "http://localhost:3001/api/user/job";
            const userId = await userModel.findOne({userName: "Perlt11"}).then(user => user._id);
            const body = {
                job: {
                    type: "TEST",
                    company: "TEST",
                    companyUrl: "TESt.net"
                },
                id: userId
            }
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const user = await userModel.findById(userId);
            expect(user.job.length).to.be.equal(2);
        })
    })
})