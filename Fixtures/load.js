const userCRUD = require("../CRUD/user")

async function fixtureLoad(){
    console.log("Fixture load -> creat : Admin user | pseudo : admin, password : admin")
    await userCRUD.create("admin", "admin@admin.com", "admin", "ROLE_ADMIN")
    console.log("Fixture loaded ! you can now connect as admin")
}

fixtureLoad()