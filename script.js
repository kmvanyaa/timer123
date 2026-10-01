// --- Цитаты ---
const quotes = [
    "Всё получится! Главное — не сдаваться.",
    "Каждый день — это новый шанс.",
    "Ты способна на большее, чем думаешь.",
    "Код — это творчество. Твори!",
    "Маленькие шаги ведут к большим целям."
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quote').textContent = randomQuote;

// --- Переключатель темы ---
document.getElementById('theme-btn').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
});

// --- Логика таймера ---
function updateTimer() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Обновляем цифры таймера (с добавлением нулей)
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // НОВОЕ: Обновляем текущее время и дату
    document.getElementById('current-time').textContent = "Сейчас: " + now.toLocaleTimeString('ru-RU');
    document.getElementById('current-date').textContent = "Сегодня: " + now.toLocaleDateString('ru-RU');
}

// Запускаем таймер каждую секунду
setInterval(updateTimer, 1000);
updateTimer();