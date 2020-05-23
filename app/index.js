const sulla = require("sulla");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
// const exportQR = (qrCode, fileName) => {
//   qrCode = qrCode.replace("data:image/png;base64,", "");
//   const imageBuffer = Buffer.from(qrCode, "base64");
//   // Creates 'marketing-qr.png' file
//   fs.writeFileSync(fileName, imageBuffer);
// };

// sulla
//   .create(
//     "test4",
//     (qrCode, asciiQr) => {
//       console.log(asciiQr, "gang");
//       exportQR(qrCode, "marketing-qr.png");
//     },
//     { debug: true }
//   )
//   .then((client) => start(client));

// try {
//   fs.unlinkSync(
//     "sessions/session/Default/Service Worker/Database/MANIFEST-000001"
//   );
// } catch (err) {
//   console.log(err);
// }
let client;

sulla
  .create("./sessions/session", (qrCode, asciiQr) => {
    console.log(asciiQr);
  })
  .then(async (clientGotten) => {
    client = clientGotten;
    await client.sendText("31643685618@c.us", "👋 Hello from sulla!");
  });

// function start(client) {
//   client.onMessage((message) => {
//     if (message.body === "Hi") {
//       client.sendText(message.from, "👋 Hello from sulla!");
//     }
//   });
// }

let totalBeer = 0;

app.get("/", async (req, res) => {
  console.log("sending text message");
  totalBeer += 1;
  await client.sendText(
    "31643685618@c.us",
    `Je hebt een biertje gepakt. Je totale bierconsumptie staat nu op:  ${totalBeer}`
  );
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
