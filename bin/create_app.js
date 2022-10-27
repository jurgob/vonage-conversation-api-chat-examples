const axios = require('axios');
const fs = require('fs');


async function main(){
    const api_key = process.argv[2]
    const api_secret = process.argv[2]
    const app_name = `testing_app_${Date.now()}`

    if(!api_key || !api_secret){
        console.log('api_key and api_secret mandatory')
        console.log('npm run cli_create_app APIKEY APISECRET')
        console.log(`if you don't have them, create an account here: https://dashboard.nexmo.com/`)
        process.exit(1)
    }

    console.log("api key / api secret: ", api_key)

    console.log("creating app")

    const applicationData = {
        "name": "myapp"
    }

    fs.writeFileSync('./config/application.json', JSON.stringify(applicationData, null, '   '))

    console.log("app info stored on config/application.json")

    //const appString = fs.readFileSync('./config/application.json')
    // console.log(JSON.parse(appString))

}

main()