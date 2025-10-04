const express = require('express');
const app = express();
const port = 3000;

// Set waktu countdown (5 menit = 5 * 60 * 1000 ms)
const countdownTime = 5 * 60 * 1000;
let startTime = Date.now();

// Middleware untuk melacak waktu
app.get('/', (req, res) => {
    let elapsedTime = Date.now() - startTime;
    if (elapsedTime < countdownTime) {
        let remainingTime = countdownTime - elapsedTime;
        let minutes = Math.floor(remainingTime / (1000 * 60));
        let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        res.json({ status: "valid", remainingTime: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` });
    } else {
        res.json({ status: "expired" });
    }
});

// Endpoint untuk reset countdown
app.get('/reset', (req, res) => {
    startTime = Date.now();
    res.json({ message: 'Countdown reset', status: 'valid' });
});

// Start server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
