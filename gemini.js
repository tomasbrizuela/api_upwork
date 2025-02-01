import dotenv from 'dotenv'
dotenv.config();

export async function getJsonFromGemini(busquedas) {
    let key = process.env.GEMINI_API_KEY
    const job = {
        'uuid': "",
        'title': "",
        'description': "",
        'created': ""
    }
    const prompt = `Pasa esto a json: ${busquedas}`
    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key
    let data = {
        "contents":
            [{
                "parts": [{ "text": prompt }]
            }]
    }
    let options = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data)
    }
    try {
        let response = await fetch(url, options);
        let json = await response.json();
        return json.candidates[0].content.parts[0].text
    } catch (error) {
        console.log("Error: " + error)
    }
}

