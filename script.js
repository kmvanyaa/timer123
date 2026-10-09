// --- Счётчик посещений ---
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
document.getElementById('visit-counter').textContent = "Вы зашли сюда " + visits + " раз(а)";


// --- Цитаты с эффектом печатной машинки ---
const quotes = [
    "Всё получится! Главное — не сдаваться.",
    "Каждый день — это новый шанс.",
    "Ты способна на большее, чем думаешь.",
    "Код — это творчество. Твори!",
    "Маленькие шаги ведут к большим целям."
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const quoteElement = document.getElementById('quote');
let charIndex = 0;
quoteElement.textContent = '';

function typeQuote() {
    if (charIndex < randomQuote.length) {
        quoteElement.textContent += randomQuote.charAt(charIndex);
        charIndex++;
        setTimeout(typeQuote, 50); // Скорость печати (50 мс)
    }
}
typeQuote(); // Запускаем печать


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
    
    // Обновляем текущую дату с днём недели
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


// --- Снегопад ---
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'fixed';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.top = '-20px';
    snowflake.style.fontSize = Math.random() * 15 + 10 + 'px';
    snowflake.style.color = '#ffffff';
    snowflake.style.opacity = Math.random() * 0.5 + 0.3;
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '9999';
    snowflake.style.animation = `fall ${Math.random() * 5 + 5}s linear forwards`;
    document.body.appendChild(snowflake);
    
    // Удаляем снежинку после падения
    setTimeout(() => snowflake.remove(), 10000);
}

// Создаём снежинки каждые 300 миллисекунд
setInterval(createSnowflake, 300);