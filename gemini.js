import dotenv from 'dotenv'
dotenv.config();

export async function callGemini(prompt) {
    let key = process.env.GEMINI_API_KEY

    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key
    let data = {
        "contents":
            [{
                "parts": [{ "text": `${prompt}` }]
            }],
        "generationConfig": {

            "temperature": 1.5
        }
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
        let answer = json.candidates[0].content.parts[0].text
        return answer
    } catch (error) {
        console.log("Error: " + error)
    }
}



let job = `
**About Us:** At R**** barbershop , we are committed to providing outstanding grooming services and a friendly environment for our clients. We are seeking a talented freelancer to help us enhance our operations by implementing automation solutions that will create a more tech-savvy experience. **Project Overview:** We are looking for an Automation Specialist who can help us streamline our processes, making it easier for clients to book appointments, make payments, and enjoy our services. Your expertise will be crucial in identifying areas for improvement and implementing effective solutions. **Key Responsibilities:** - Assess current operations and identify automation opportunities. - Implement online booking systems and digital payment solutions. - Create user-friendly interfaces to enhance client interactions. - Collaborate with our team to ensure seamless integration of new technologies. - Provide guidance and support during the implementation process. **Qualifications:** - Proven experience in automation, technology implementation, or a related field. - Familiarity with tools and software relevant to client booking and payments. - Strong problem-solving skills and attention to detail. - Excellent communication and collaboration abilities. If you are interested in this opportunity, please submit your proposal, including your relevant experience, approach to the project. We are eager to hear your ideas on how to make our barbershop more tech-savvy and client-friendly. Join us in transforming [Barbershop Name] into a modern and efficient space for our clients! R**** barbershop is an equal opportunity employer and welcomes freelancers from diverse backgrounds.`


export async function getPropText(jobDescription) {
    let propuestaTemplate = `Hi!

        I would love to be part of your inventory app development idea!

        I'm an expert appsheet and apps script developer.

        For the past 3 years I have been building applications and solutions using appsheet to boost companies and businesses internal workflows and productivity.

        Let's schedule a call to talk about the project more in detail and see how my appsheet skill set can help you best.

        I'm looking forward speaking with you

        Cheers,
        Tom`

    let prompt = `Teniendo en cuenta esta propuesta que uso yo como template para postularme a trabajos: ${propuestaTemplate} y la descripción de esta búsqueda de trabajo en upwork para desarrolladores de appsheet: ${jobDescription}, creá un texto nuevo adaptando el template a esa descripción para que yo pueda copiarlo y pegarlo en la propuesta. Que no suene a que leiste oraciones aisladas y hablás de eso especificamente para que se note que las leiste, que sea algo real.`
    let answer = await callGemini(prompt);
    let cleanAnser = answer.replace(/\n/g, ' ');
    return cleanAnser;
}
