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


// --- Переключатель темы с запоминанием (localStorage) ---
const themeBtn = document.getElementById('theme-btn');

// Проверяем, сохранял ли браузер тему раньше
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    
    // Сохраняем выбор в память браузера
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
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

    // Обновляем текущее время
    document.getElementById('current-time').textContent = "Сейчас: " + new Date().toLocaleTimeString('ru-RU');
    
    // Обновляем текущую дату с днём недели (ИДЕЯ 2)
    document.getElementById('current-date').textContent = "Сегодня: " + now.toLocaleDateString('ru-RU', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Запускаем таймер каждую секунду
setInterval(updateTimer, 1000);
updateTimer();