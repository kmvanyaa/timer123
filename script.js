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

    // НОВАЯ СТРОЧКА: Динамическое название вкладки
    document.title = days + " дн. до Нового года ⏳";

    // Анимация смены секунд
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
// --- Волшебный шлейф за курсором ---
document.addEventListener('mousemove', function(e) {
    // Чтобы не перегружать браузер, создаем точку с вероятностью 20%
    if (Math.random() > 0.2) return; 

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    
    // Позиция точки там, где сейчас курсор
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    // Случайный цвет из нашей палитры
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Добавляем на страницу
    document.body.appendChild(trail);
    
    // Удаляем точку через 0.8 секунды (когда она исчезнет)
    setTimeout(() => trail.remove(), 800);
});
// --- Пасхалка: Кликабельный заголовок ---
const mainTitle = document.querySelector('h1');
const funnyTitles = [
    "До Нового года осталось:",
    "До оливье осталось:",
    "До мандаринов осталось:",
    "До салютов осталось:",
    "До подарков осталось:"
];
let titleIndex = 0;

if (mainTitle) {
    mainTitle.style.cursor = 'pointer'; // Чтобы было видно, что на него можно нажать
    
    mainTitle.addEventListener('click', function() {
        titleIndex = (titleIndex + 1) % funnyTitles.length;
        mainTitle.textContent = funnyTitles[titleIndex];
    });
}
// --- Ускорение пульсации цифр ближе к Новому году ---
setInterval(() => {
    const daysLeft = parseInt(document.getElementById('days').textContent);
    const spans = document.querySelectorAll('.block span');
    
    if (daysLeft <= 0) {
        // Ура, Новый год! Самая быстрая пульсация
        spans.forEach(span => span.style.animationDuration = '0.3s');
    } else if (daysLeft < 10) {
        // Меньше 10 дней — пульсирует быстро
        spans.forEach(span => span.style.animationDuration = '0.6s');
    } else if (daysLeft < 30) {
        // Меньше месяца — пульсирует заметно чаще
        spans.forEach(span => span.style.animationDuration = '0.8s');
    } else {
        // Обычная скорость (как было)
        spans.forEach(span => span.style.animationDuration = '1s');
    }
}, 1000);
// --- Волшебная гирлянда (желания при клике) ---
const wishes = [
    "Счастья в новом году! 🎄",
    "Пусть всё получится! ✨",
    "Море подарков! 🎁",
    "Удачи и вдохновения! 🚀",
    "Любви и тепла! ❤️",
    "Волшебства! 🪄",
    "Успехов в учебе! 📚"
];

const garland = document.querySelector('.garland');

if (garland) {
    garland.addEventListener('click', function(event) {
        // Создаем пузырек с пожеланием
        const bubble = document.createElement('div');
        bubble.className = 'wish-bubble';
        
        // Выбираем случайное пожелание
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        bubble.textContent = randomWish;
        
        // Позиционируем туда, где кликнули
        bubble.style.left = event.clientX + 'px';
        bubble.style.top = event.clientY + 'px';
        
        document.body.appendChild(bubble);
        
        // Удаляем через 2 секунды (когда анимация закончится)
        setTimeout(() => bubble.remove(), 2000);
    });
}
// --- Падающие мандарины и подарки ---
function createFallingItem() {
    const item = document.createElement('div');
    // Случайно выбираем: мандарин или подарок
    const emojis = ['🍊', '🎁', '🍬', '🧸'];
    item.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    item.style.position = 'fixed';
    item.style.left = Math.random() * 100 + 'vw';
    item.style.top = '-50px';
    item.style.fontSize = Math.random() * 20 + 20 + 'px'; // Размер от 20 до 40px
    item.style.opacity = Math.random() * 0.6 + 0.4;
    item.style.pointerEvents = 'none';
    item.style.zIndex = '9998';
    
    // Скорость падения и вращение
    const duration = Math.random() * 4 + 4; // от 4 до 8 секунд
    const rotate = Math.random() * 360; 
    item.style.animation = `fallItem ${duration}s linear forwards, spinItem ${duration}s linear forwards`;
    
    document.body.appendChild(item);
    
    // Удаляем через время падения
    setTimeout(() => item.remove(), duration * 1000);
}

// Запускаем падение каждые 800 миллисекунд (чтобы не перегружать экран)
setInterval(createFallingItem, 800);
// --- Печенье с предсказанием ---
// Создаем кнопку через JavaScript, чтобы не трогать HTML
const fortuneBtn = document.createElement('button');
fortuneBtn.textContent = '🥠 Предсказание';
fortuneBtn.style.position = 'fixed';
fortuneBtn.style.bottom = '30px';
fortuneBtn.style.left = '30px';
fortuneBtn.style.padding = '10px 20px';
fortuneBtn.style.background = 'rgba(255, 204, 0, 0.2)';
fortuneBtn.style.color = '#ffcc00';
fortuneBtn.style.border = '2px solid #ffcc00';
fortuneBtn.style.borderRadius = '50px';
fortuneBtn.style.cursor = 'pointer';
fortuneBtn.style.zIndex = '10000';
fortuneBtn.style.boxShadow = '0 0 15px rgba(255, 204, 0, 0.4)';
fortuneBtn.style.fontWeight = 'bold';
fortuneBtn.style.transition = 'all 0.3s ease';
document.body.appendChild(fortuneBtn);

// Эффект при наведении
fortuneBtn.addEventListener('mouseover', () => {
    fortuneBtn.style.background = '#ffcc00';
    fortuneBtn.style.color = '#2d1b4e';
});
fortuneBtn.addEventListener('mouseout', () => {
    fortuneBtn.style.background = 'rgba(255, 204, 0, 0.2)';
    fortuneBtn.style.color = '#ffcc00';
});

// Список предсказаний
const fortunes = [
    "Ждет удача в учебе! 🎓",
    "Твой код скомпилируется с первого раза! 💻",
    "Найдешь что-то очень ценное под подушкой! 💰",
    "В новом году тебя ждет незабываемое путешествие! ✈️",
    "Сбудутся все самые заветные мечты! ✨",
    "Получишь много крутых подарков! 🎁",
    "Заведешь много новых друзей! 🤝",
    "Тебя ждет вкусный сюрприз! 🍰"
];

// Логика при клике
fortuneBtn.addEventListener('click', function(event) {
    // Берем случайное предсказание
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    // Создаем окошко с предсказанием
    const popup = document.createElement('div');
    popup.textContent = randomFortune;
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%) scale(0.5)';
    popup.style.background = '#2d1b4e';
    popup.style.color = '#fff';
    popup.style.padding = '20px 40px';
    popup.style.borderRadius = '20px';
    popup.style.border = '2px solid #ffcc00';
    popup.style.boxShadow = '0 0 30px rgba(255, 204, 0, 0.6)';
    popup.style.zIndex = '10001';
    popup.style.fontSize = '20px';
    popup.style.fontWeight = 'bold';
    popup.style.textAlign = 'center';
    popup.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    popup.style.pointerEvents = 'none'; // Чтобы не мешало кликать
    
    document.body.appendChild(popup);
    
    // Анимация появления
    requestAnimationFrame(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Удаляем окошко через 3 секунды
    setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => popup.remove(), 300);
    }, 3000);
});
// --- Эффект хакера (глитч) на заголовке ---
const mainTitle = document.querySelector('h1');
const originalText = mainTitle.innerText;
const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
let glitchInterval = null;

mainTitle.addEventListener('mouseover', () => {
    let iteration = 0;
    clearInterval(glitchInterval);
    
    glitchInterval = setInterval(() => {
        mainTitle.innerText = originalText
            .split('')
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if(iteration >= originalText.length){ 
            clearInterval(glitchInterval);
        }
        iteration += 1 / 3;
    }, 30);
});
// --- Секретное слово (Пасхалка) ---
let secretWord = "";

document.addEventListener('keydown', function(e) {
    // Добавляем нажатую клавишу к нашей строке и делаем её строчной
    secretWord += e.key.toLowerCase();
    
    // Если строка стала слишком длинной, обрезаем её (оставляем последние 10 букв)
    if (secretWord.length > 10) {
        secretWord = secretWord.slice(-10);
    }

    // Проверяем, есть ли в набранном тексте секретные слова
    if (secretWord.includes("снег") || secretWord.includes("аня") || secretWord.includes("newyear")) {
        secretWord = ""; // Сбрасываем слово
        triggerMegaFirework(); // Запускаем мега-салют
    }
});

// Функция для мега-салюта по всему экрану
function triggerMegaFirework() {
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88', '#ff3333', '#ffffff'];
    
    // Запускаем 10 волн салюта с задержкой
    for (let wave = 0; wave < 10; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                const spark = document.createElement('div');
                spark.style.position = 'fixed';
                // Салют появляется в случайных местах экрана
                spark.style.left = Math.random() * 100 + 'vw';
                spark.style.top = Math.random() * 100 + 'vh';
                spark.style.width = '8px';
                spark.style.height = '8px';
                spark.style.borderRadius = '50%';
                spark.style.background = colors[Math.floor(Math.random() * colors.length)];
                spark.style.pointerEvents = 'none';
                spark.style.zIndex = '99999';
                spark.style.boxShadow = '0 0 15px currentColor';
                
                // Разлёт
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                spark.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                spark.style.transform = 'translate(0, 0)';
                
                document.body.appendChild(spark);
                
                requestAnimationFrame(() => {
                    spark.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                    spark.style.opacity = '0';
                });
                
                setTimeout(() => spark.remove(), 1600);
            }
        }, wave * 200); // Каждая волна с задержкой в 200мс
    }
}
// --- Магический фонтан при клике ---
document.addEventListener('click', function(event) {
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88', '#ff3333'];
    
    // Создаем 20 частиц для фонтана
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = event.clientX + 'px';
        particle.style.top = event.clientY + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '99999';
        particle.style.boxShadow = '0 0 10px currentColor';
        
        document.body.appendChild(particle);
        
        // Физика: случайная скорость вверх и в стороны
        const angle = Math.random() * Math.PI - Math.PI; // От -180 до 0 градусов (вверх)
        const velocity = Math.random() * 15 + 10; // Сила броска
        let posX = event.clientX;
        let posY = event.clientY;
        let velX = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1);
        let velY = Math.sin(angle) * velocity;
        
        // Анимация полета с гравитацией
        const animateParticle = () => {
            posX += velX;
            posY += velY;
            velY += 0.5; // Гравитация тянет вниз
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, 1 - (posY - event.clientY) / 300); // Плавно исчезает
            
            // Если частица еще видна и не упала ниже экрана — продолжаем анимацию
            if (posY < window.innerHeight && particle.style.opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove(); // Удаляем, когда упала
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
});
// --- Летающий снеговик (как логотип DVD) ---
const snowman = document.createElement('div');
snowman.innerHTML = '☃️';
snowman.style.position = 'fixed';
snowman.style.fontSize = '40px';
snowman.style.pointerEvents = 'none'; // Чтобы он не мешал кликать по сайту
snowman.style.zIndex = '9997';
snowman.style.transition = 'transform 0.3s ease'; // Плавное вращение
document.body.appendChild(snowman);

// Начальная позиция и скорость
let snowX = Math.random() * (window.innerWidth - 50);
let snowY = Math.random() * (window.innerHeight - 50);
let velX = 2.5; // Скорость по горизонтали
let velY = 2.5; // Скорость по вертикали

function animateSnowman() {
    snowX += velX;
    snowY += velY;

    // Проверка на столкновение с краями экрана
    if (snowX + 40 > window.innerWidth || snowX < 0) {
        velX = -velX;
        snowman.style.transform = `rotate(${Math.random() * 360}deg)`; // Крутим при ударе
    }
    if (snowY + 40 > window.innerHeight || snowY < 0) {
        velY = -velY;
        snowman.style.transform = `rotate(${Math.random() * 360}deg)`; // Крутим при ударе
    }

    snowman.style.left = snowX + 'px';
    snowman.style.top = snowY + 'px';

    requestAnimationFrame(animateSnowman); // Бесконечная анимация
}

// Запускаем снеговика
animateSnowman();
// --- 3D-параллакс с годом на фоне ---
const bgYear = document.createElement('div');
bgYear.id = 'parallax-year';
bgYear.textContent = new Date().getFullYear() + 1; // Автоматически ставит следующий год (2027)
document.body.appendChild(bgYear);

// Движение фона за мышкой
document.addEventListener('mousemove', (e) => {
    // Вычисляем смещение (максимум 30 пикселей в стороны)
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    
    // Сдвигаем фон в противоположную от мышки сторону
    bgYear.style.transform = `translate(calc(-50% + ${-x}px), calc(-50% + ${-y}px))`;
});
// --- Голосовой таймер (Text-to-Speech) ---
const speechBtn = document.createElement('button');
speechBtn.id = 'speech-btn';
speechBtn.innerHTML = '🗣️';
speechBtn.title = 'Озвучить время';
document.body.appendChild(speechBtn);

speechBtn.addEventListener('click', function() {
    // Берем текущие значения из блоков
    const days = document.getElementById('days').textContent;
    const hours = document.getElementById('hours').textContent;
    const minutes = document.getElementById('minutes').textContent;
    const seconds = document.getElementById('seconds').textContent;
    
    // Формируем текст
    const text = `Внимание! До Нового года осталось ${days} дней, ${hours} часов, ${minutes} минут и ${seconds} секунд.`;
    
    // Создаем объект речи
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; // Устанавливаем русский язык
    utterance.rate = 0.9; // Скорость речи (чуть медленнее для пафоса)
    
    // Отменяем предыдущую речь, если она еще идет, и говорим новую
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
});
