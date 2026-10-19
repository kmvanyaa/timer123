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

// Проверяем, сохранял ли браузер тему раньше, и ставим правильный текст
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.textContent = 'Темная тема 🌙';
} else {
    themeBtn.textContent = 'Светлая тема ☀️';
}

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    
    // Сохраняем выбор в память браузера и меняем текст
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = 'Темная тема 🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = 'Светлая тема ☀️';
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

    // НОВЫЙ БЛОК: Анимация смены секунд
    const secondsEl = document.getElementById('seconds');
    secondsEl.classList.remove('tick');
    void secondsEl.offsetWidth; // трюк для перезапуска анимации
    secondsEl.classList.add('tick');

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


// --- Мерцающие звёзды ---
function createStar() {
    const star = document.createElement('div');
    star.innerHTML = '•';
    star.style.position = 'fixed';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.fontSize = Math.random() * 10 + 5 + 'px';
    star.style.color = '#ffffff';
    star.style.opacity = Math.random() * 0.5 + 0.2;
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1';
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
    document.body.appendChild(star);
    
    // Удаляем звезду через некоторое время, чтобы не засорять страницу
    setTimeout(() => star.remove(), 15000);
}

// Создаём звёзды каждые 500 миллисекунд
setInterval(createStar, 500);


// --- Умный фон в зависимости от времени суток ---
function updateBackground() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // Убираем все классы времени суток
    body.classList.remove('morning', 'day', 'evening', 'night');
    
    if (hour >= 5 && hour < 12) {
        body.classList.add('morning');
    } else if (hour >= 12 && hour < 18) {
        body.classList.add('day');
    } else if (hour >= 18 && hour < 23) {
        body.classList.add('evening');
    } else {
        body.classList.add('night');
    }
}

// Запускаем сразу и обновляем каждую минуту
updateBackground();
setInterval(updateBackground, 60000);


// --- Салют при клике ---
document.addEventListener('click', function(event) {
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88', '#ff3333'];
    
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = event.clientX + 'px';
        spark.style.top = event.clientY + 'px';
        spark.style.width = '6px';
        spark.style.height = '6px';
        spark.style.borderRadius = '50%';
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '99999';
        spark.style.boxShadow = '0 0 10px currentColor';
        
        // Случайное направление разлёта
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        spark.style.transition = 'all 0.8s ease-out';
        spark.style.transform = 'translate(0, 0)';
        
        document.body.appendChild(spark);
        
        // Запускаем анимацию разлёта
        requestAnimationFrame(() => {
            spark.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            spark.style.opacity = '0';
        });
        
        // Удаляем частицу после анимации
        setTimeout(() => spark.remove(), 900);
    }
});


// --- Кнопка "Наверх" ---
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Показываем кнопку, если прокрутили вниз на 300 пикселей
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Плавная прокрутка наверх при клике
scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// --- Прогресс-бар года ---
function updateYearProgress() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    
    const totalYearTime = endOfYear - startOfYear;
    const passedTime = now - startOfYear;
    
    // Считаем проценты
    const percent = (passedTime / totalYearTime) * 100;
    
    // Обновляем ширину полоски и текст
    document.getElementById('year-progress').style.width = percent + '%';
    document.getElementById('year-progress-text').textContent = "Год пройден на " + percent.toFixed(1) + "%";
}

// Запускаем сразу и обновляем каждую минуту
updateYearProgress();
setInterval(updateYearProgress, 60000);