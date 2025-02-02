import { tryManyTimesToGetData } from "./main.js";

import { sendEmail } from "./nodeEmailer.js";
import fs from 'fs';

function checkIfNew(uid) {
    let lastId = fs.readFileSync('uid.txt', 'utf-8');
    if (uid == lastId) {
        console.log("Son iguales, no pasa nada")
        return false;
    } else {
        fs.writeFileSync('uid.txt', uid)
        console.log("Son diferentes, actualizando data y enviando email")
        return true
    }
}

export default async function getIdLastJob() {
    let job = await tryManyTimesToGetData("", 0)
    console.log(job[0])
    let isNew = checkIfNew(job[0].uid);
    isNew && sendEmail(job[0])

}
