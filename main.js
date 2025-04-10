import { gotScraping } from "got-scraping";
import * as cheerio from 'cheerio'
import callOpenAI from "./openai.js";

export async function tryManyTimesToGetData(url, retries = 0) {
    console.log("Starting try: " + retries)
    try {

        const response = await gotScraping({
            'url': "https://www.upwork.com/nx/search/jobs/?nbs=1&q=appsheet"

        })

        console.log(response.statusCode)

        if (response.statusCode != 200) {
            console.log("El status code fue de :" + response.statusCode)
            throw new Error("Status code not 200")
        }

        const $ = cheerio.load(response.body)
        const script = $("script").filter((i, el) => $(el).html().includes("jobsSearch")).html();
        const jsonMatch = script.split(",jobs:")[1].split(",paging:")[0]
        let jsonData = await callOpenAI(JSON.stringify(jsonMatch));
        console.log("Json data is: ")
        console.log(jsonData)
        try {
            jsonData = jsonData.replace(/```json|```/g, '').trim()
        } catch (error) {
            return error;
        }
        let dataParsed = JSON.parse(jsonData);
        console.log(dataParsed)
        return dataParsed;

    } catch (error) {
        console.log(error)
        if (retries < 10) {
            console.log("Retrying...")
            return tryManyTimesToGetData(url, retries + 1)
        }
        console.log("Error :" + error)
    }
}

(async () => {
    await tryManyTimesToGetData()
})();