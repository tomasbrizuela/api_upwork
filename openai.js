import dotenv from 'dotenv'
dotenv.config();


export default async function callOpenAI(text) {

    let jobPost = {
        'title': "",
        'posted_date': "",
        'price': "",
        'isToday': "",
    }

    const KEY = process.env.OPENAI_API_KEY
    let url = "https://api.openai.com/v1/chat/completions";
    let info = {
        "model": "gpt-4o",
        "store": true,
        "messages": [
            // {
            //     "role": "system",
            //     "content": "Te voy a pasar los resultados de una página web que muestra busquedas de trabajo relacionadas a appsheet. Necesito que analices la data y me respondas en un renglón, cuando (inlcuyendo fecha y hora) o hace cuanto (inclueyndo minutos y horas)se publico la última búsqueda, y que título tiene (y si tiene precio tmb)."
            // },
            {
                "role": "system",
                "content": `Te voy a pasar los resultados de una página web que muestra busquedas de trabajo relacionadas a appsheet. Necesito que completes este objeto (${jobPost}) con la información disponbile SOLO de la última búsqueda publicada y solo completando las propiedades que tiene ${jobPost} y me lo devuelvas en formato para consumirlo por un map.`
            },
            {
                "role": "user",
                "content": "¿Me podrías dar la data de las búsquedas?"
            },
            { "role": "system", "content": `Si, esta es la información: ${text}. No quiero otra cosa que no sea un [{...}]. Nada de texto por fuera de eso.` }
        ]
    }
    let options = {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + KEY,
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(info)
    }
    try {
        let response = await fetch(url, options);
        let json = await response.json()
        let data = await json?.choices[0]?.message?.content
        return data;
    } catch (error) {
        console.log("Error: " + error)
    }
}