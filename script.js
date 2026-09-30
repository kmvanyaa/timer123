const quotes = [
    "Всё получится! Главное — не сдаваться.",
    "Каждый день — это новый шанс.",
    "Ты способна на большее, чем думаешь.",
    "Код — это творчество. Твори!",
    "Маленькие шаги ведут к большим целям."
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').textContent = randomQuote;
document.getElementById('theme-btn').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});
function updateTimer() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();