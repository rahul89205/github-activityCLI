#!/usr/bin/env node
//Parsing command line arguments

import https from "https";
const axios = require("axios").defaults;

const args = process.argv.slice(2);

if (args.length == 0) {
  console.error("Usage: gb-activityCLI <activity>");
  process.exit(1);
}

const username = args[0];

//Fetch data from the API
const url = `https://api.github.com/users/${username}/events`;

const options = {
  headers: {
    "User-Agent": "gb-activityCLI",
    Accept: "application/vnd.github.v3+json",
  },
};

https.get(url, options, async (res) => {
  try {
    const response = await axios.get(url, options);
    res.render("gb-activityCLI.js", { events: response.data });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).send("Failed to fetch data from the API");
  }
});
