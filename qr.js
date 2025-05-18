const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Qadeer_Khan,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("baileys-elite");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function TOFAN_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Qadeer_Khan = Qadeer_Khan({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Qadeer_Khan.ev.on('creds.update', saveCreds)
			Qr_Code_By_Qadeer_Khan.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Qadeer_Khan.sendMessage(Qr_Code_By_Qadeer_Khan.user.id, { text: '' + b64data });
	
				   let Tofan_MD_TEXT = `
𝙎𝙀𝙎𝙎𝙄𝙊𝙉 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿*
 *𝙏𝙊𝙁𝘼𝙉 𝙈𝘿 𝙇𝙊𝙂𝙂𝙀𝘿* 
______________________________
╔════◇
『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/923079749139_
║❍ 𝐑𝐞𝐩𝐨: _https://github.com/Qadeer-bhai/TOFAN-MD_
║❍ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/GoXKLVJgTAAC3556FXkfFI_
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: _https://whatsapp.com/channel/0029Vaw6yRaBPzjZPtVtA80A_
______________________________
Don't Forget To Give Star⭐ To My Repo`
	 await Qr_Code_By_Qadeer_Khan.sendMessage(Qr_Code_By_Qadeer_Khan.user.id,{text:Tofan_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Qadeer_Khan.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Tofan_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Tofan_MD_QR_CODE()
});
module.exports = router
