import { gotScraping } from "got-scraping";
import * as cheerio from 'cheerio'
import callOpenAI from "./openai.js";

let urlPage = "https://www.upwork.com/nx/search/jobs/?nbs=1&q=appsheet"
export async function tryManyTimesToGetData(url, retries = 0) {
    console.log("Starting try: " + retries)
    try {

        const response = await gotScraping({
            url: urlPage
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
        console.log(jsonData)
        jsonData = jsonData.replace(/```json|```/g, '').trim()

        // console.log("Respuesta: " + jsonData)
        let dataParsed = JSON.parse(jsonData);
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

