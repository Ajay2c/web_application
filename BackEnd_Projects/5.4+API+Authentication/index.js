import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";
// TODO: Replace the values below with your own before running this file.
const yourUsername = "ajayc";
const yourPassword = "Platform.1";
const yourAPIKey = "81612608-3a1e-4a56-a7f7-3b6336430c68";
const yourBearerToken = "5061c55d-e548-4d24-9f7f-0a8ebc25051c";
app.get("/", (req, res) => {
    res.render("index.ejs", {
        content: "API Response."
    });
});
app.get("/noAuth", async (req, res) => {
    //TODO 2: Use axios to hit up the /random endpoint
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    try {
        const response = await axios.get(API_URL + 'random');
        const st_response = JSON.stringify(response.data)
        // console.log(st_response);
        res.render('index.ejs', {
            content: st_response
        });
    } catch (error) {
        console.error("Response is not generated", error.message);
    }
});
app.get("/basicAuth", async (req, res) => {
    //TODO 3: Write your code here to hit up the /all endpoint
    //Specify that you only want the secrets from page 2
    //HINT: This is how you can use axios to do basic auth:
    // https://stackoverflow.com/a/74632908
    /*
     axios.get(URL, {
        auth: {
          username: "abc",
          password: "123",
        },
      });
    */
    try {
        const response = await axios.get(API_URL + 'all?page=1', {
            auth: {
                username: yourUsername,
                password: yourPassword,
            }
        });
        const st_response = JSON.stringify(response.data);
        res.render('index.ejs', {
            content: st_response
        });
    } catch (error) {
        console.error("Response is not generated", error.message);
    }
});
app.get("/apiKey", async (req, res) => {
    //TODO 4: Write your code here to hit up the /filter endpoint
    //Filter for all secrets with an embarassment score of 5 or greater
    //HINT: You need to provide a query parameter of apiKey in the request.
    try {
        const response = await axios.get(API_URL + 'filter', {
            params: {
                score: 5,
                apiKey: yourAPIKey,
            }
        });
        const st_response = JSON.stringify(response.data);
        res.render('index.ejs', {
            content: st_response
        });
    } catch (error) {
        console.error("Response is not generated", error.message);
    }
});
const config = {
    headers: {
        Authorization: `Bearer ${yourBearerToken}`
    },
};
app.get("/bearerToken", async (req, res) => {
    //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
    //and get the secret with id of 42
    //HINT: This is how you can use axios to do bearer token auth:
    // https://stackoverflow.com/a/52645402
    /*
    axios.get(URL, {
      headers: { 
        Authorization: `Bearer <YOUR TOKEN HERE>` 
      },
    });
    */
    try {
        const response = await axios.get(API_URL + 'secrets/2', config);
        const st_response = JSON.stringify(response.data);
        res.render('index.ejs', {
            content: st_response
        });
    } catch (error) {
        console.error("Response is not generated", error.message);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});