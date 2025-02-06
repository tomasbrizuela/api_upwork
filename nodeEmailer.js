import nodemailer from "nodemailer";
import { callGemini, getPropText } from "./gemini.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: "tomasagustinbrizuela@gmail.com",
        pass: "lekv egyu pawn xbxj",
    },
});

export async function sendEmail(job) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Upwork Updates" <tomasagustinbrizuela@gmail.com>', // sender address
        to: "tomasagustinbrizuela@gmail.com", // list of receivers
        subject: "New Appsheet Job", // Subject line
        html: await generateEmailHTML(job), // html body
    });

}

async function generateEmailHTML(job) {
    let { title, uid, description } = job;
    let html = `
        <div style="text-align: left;">
            <div>
                <h1>Nueva búsqueda de Appsheet</h1>
            </div>
            <div style="display: flex; gap: 8px;">
                <p><strong>Título: </strong></p>
                <p>${title}</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <p><strong>Url: </strong></p>
                <p>${"https://www.upwork.com/jobs/~02" + uid}</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <p><strong>Descripción: </strong></p>
                <p>${description}</p>
            </div>
            <div style="display: flex; gap: 8px;">
                <p><strong>Propuesta: </strong></p>
                <p>${await getPropText(description)}</p>
            </div>
        </div>
    `

    return html
}