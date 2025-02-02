import dotenv from 'dotenv'
dotenv.config();

export async function getJsonFromGemini(busquedas) {
    let key = process.env.GEMINI_API_KEY
    const job = {
        'uid': "",
        'title': "",
        'description': "",
        'created': ""
    }
    const text = `Pasa esto a json: ${busquedas}`

    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key
    let data = {
        "contents":
            [{
                "parts": [{ "text": `Te voy a pasar los resultados de una página web que muestra busquedas de trabajo relacionadas a appsheet. Necesito que completes este objeto (${job}) con la información disponbile SOLO de la última búsqueda publicada y solo completando las propiedades que tiene ${job} y me lo devuelvas en formato para consumirlo por un map. Esta es la información: ${text}. No quiero otra cosa que no sea un [{...}]. Nada de texto por fuera de eso. El uid de la búsqueda tiene que estar SIEMPRE, si o si.` }]
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

