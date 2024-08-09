// const { GoogleGenerativeAI } = require("@google/generative-ai");


// const gemini = async (destination , date1 , date2 ,budget ,persons) => {
//   // Access your API key as an environment variable (see "Set up your API key" above)
//   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt =`hai gemini , tolong buatkan saya rencana liburan ke ${destination} mulai dari tanggal ${date1} dan selesai pada tanggal ${date2} dengan budget sebesar Rp ${budget} untuk ${persons} orang peserta , dimana budget tersebut sudah termasuk tiket pesawat pulang pergi, dan tolong sertakan perkiraan biaya yang dihabiskan unutk setiap destinasi wisata dan totalkan itu di penghujung setiap harinya`;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   return text
// };

// module.exports = gemini;
