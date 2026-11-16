// --- Счётчик посещений ---
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
const visitCounter = document.getElementById('visit-counter');
if (visitCounter) visitCounter.textContent = "Вы зашли сюда " + visits + " раз(а)";

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
if (quoteElement) {
    quoteElement.textContent = '';
    function typeQuote() {
        if (charIndex < randomQuote.length) {
            quoteElement.textContent += randomQuote.charAt(charIndex);
            charIndex++;
            setTimeout(typeQuote, 50);
        }
    }
    typeQuote();
}

// --- Переключатель темы ---
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.textContent = 'Темная тема 🌙';
    } else {
        themeBtn.textContent = 'Светлая тема ☀️';
    }
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = 'Темная тема 🌙';
        } else {
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = 'Светлая тема ☀️';
        }
    });
}

// --- ГЛАВНЫЙ ТАЙМЕР ---
function updateTimer() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');

    document.title = days + " дн. до Нового года ⏳";

    if (sEl) {
        sEl.classList.remove('tick');
        void sEl.offsetWidth;
        sEl.classList.add('tick');
    }

    const cTime = document.getElementById('current-time');
    const cDate = document.getElementById('current-date');
    if (cTime) cTime.textContent = "Сейчас: " + new Date().toLocaleTimeString('ru-RU');
    if (cDate) cDate.textContent = "Сегодня: " + now.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateTimer, 1000);
updateTimer(); // Запускаем сразу!

// --- Всякие фоны и падающие штуки ---
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
    setTimeout(() => snowflake.remove(), 10000);
}
setInterval(createSnowflake, 300);

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
    setTimeout(() => star.remove(), 15000);
}
setInterval(createStar, 500);

function createFallingItem() {
    const item = document.createElement('div');
    const emojis = ['🍊', '🎁', '🍬', '🧸'];
    item.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.position = 'fixed';
    item.style.left = Math.random() * 100 + 'vw';
    item.style.top = '-50px';
    item.style.fontSize = Math.random() * 20 + 20 + 'px';
    item.style.opacity = Math.random() * 0.6 + 0.4;
    item.style.pointerEvents = 'none';
    item.style.zIndex = '9998';
    const duration = Math.random() * 4 + 4;
    item.style.animation = `fallItem ${duration}s linear forwards, spinItem ${duration}s linear forwards`;
    document.body.appendChild(item);
    setTimeout(() => item.remove(), duration * 1000);
}
setInterval(createFallingItem, 800);

function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    star.style.top = Math.random() * 50 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 1 + 0.5;
    star.style.animation = `shoot ${duration}s linear forwards`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), duration * 1000);
}
setInterval(createShootingStar, 4000);

// --- Умный фон ---
function updateBackground() {
    const hour = new Date().getHours();
    document.body.classList.remove('morning', 'day', 'evening', 'night');
    if (hour >= 5 && hour < 12) document.body.classList.add('morning');
    else if (hour >= 12 && hour < 18) document.body.classList.add('day');
    else if (hour >= 18 && hour < 23) document.body.classList.add('evening');
    else document.body.classList.add('night');
}
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
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        spark.style.transition = 'all 0.8s ease-out';
        spark.style.transform = 'translate(0, 0)';
        document.body.appendChild(spark);
        requestAnimationFrame(() => {
            spark.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            spark.style.opacity = '0';
        });
        setTimeout(() => spark.remove(), 900);
    }
});

// --- Кнопка "Наверх" ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// --- Прогресс-бар года ---
function updateYearProgress() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    const totalYearTime = endOfYear - startOfYear;
    const passedTime = now - startOfYear;
    const percent = (passedTime / totalYearTime) * 100;
    const progressBar = document.getElementById('year-progress');
    const progressText = document.getElementById('year-progress-text');
    if (progressBar) progressBar.style.width = percent + '%';
    if (progressText) progressText.textContent = "Год пройден на " + percent.toFixed(1) + "%";
}
updateYearProgress();
setInterval(updateYearProgress, 60000);

// --- 3D-эффект наклона ---
const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
    block.addEventListener('mousemove', (e) => {
        const rect = block.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;  
        block.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    block.addEventListener('mouseleave', () => { block.style.transform = ''; });
});

// --- Список новогодних желаний ---
const wishInput = document.getElementById('wish-input');
const addWishBtn = document.getElementById('add-wish-btn');
const wishList = document.getElementById('wish-list');

if (wishInput && addWishBtn && wishList) {
    let savedWishes = JSON.parse(localStorage.getItem('ny_wishes')) || [];
    window.renderWishes = function() {
        wishList.innerHTML = '';
        savedWishes.forEach((wish, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${wish}</span><button onclick="deleteWish(${index})">✖</button>`;
            wishList.appendChild(li);
        });
    };
    window.addWish = function() {
        const text = wishInput.value.trim();
        if (text) {
            savedWishes.push(text);
            localStorage.setItem('ny_wishes', JSON.stringify(savedWishes));
            wishInput.value = '';
            window.renderWishes();
        }
    };
    window.deleteWish = function(index) {
        savedWishes.splice(index, 1);
        localStorage.setItem('ny_wishes', JSON.stringify(savedWishes));
        window.renderWishes();
    };
    addWishBtn.addEventListener('click', window.addWish);
    wishInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.addWish(); });
    window.renderWishes();
}

// --- Шлейф за курсором ---
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.2) return; 
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
});

// --- Пасхалки: Кликабельный заголовок и Глитч ---
const h1Title = document.querySelector('h1');
if (h1Title) {
    const funnyTitles = ["До Нового года осталось:", "До оливье осталось:", "До мандаринов осталось:", "До салютов осталось:", "До подарков осталось:"];
    let titleIndex = 0;
    h1Title.style.cursor = 'pointer';
    
    // Клик
    h1Title.addEventListener('click', function() {
        titleIndex = (titleIndex + 1) % funnyTitles.length;
        h1Title.textContent = funnyTitles[titleIndex];
    });

    // Глитч
    const originalText = h1Title.innerText;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    let glitchInterval = null;
    h1Title.addEventListener('mouseover', () => {
        let iteration = 0;
        clearInterval(glitchInterval);
        glitchInterval = setInterval(() => {
            h1Title.innerText = originalText.split('').map((letter, index) => {
                if(index < iteration) return originalText[index];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }).join('');
            if(iteration >= originalText.length) clearInterval(glitchInterval);
            iteration += 1 / 3;
        }, 30);
    });
}

// --- Ускорение пульсации цифр ---
setInterval(() => {
    const dEl = document.getElementById('days');
    if (!dEl) return;
    const daysLeft = parseInt(dEl.textContent);
    const spans = document.querySelectorAll('.block span');
    if (daysLeft <= 0) spans.forEach(span => span.style.animationDuration = '0.3s');
    else if (daysLeft < 10) spans.forEach(span => span.style.animationDuration = '0.6s');
    else if (daysLeft < 30) spans.forEach(span => span.style.animationDuration = '0.8s');
    else spans.forEach(span => span.style.animationDuration = '1s');
}, 1000);

// --- Гирлянда с пожеланиями ---
const garlandWishes = ["Счастья в новом году! 🎄", "Пусть всё получится! ✨", "Море подарков! 🎁", "Удачи и вдохновения! 🚀", "Любви и тепла! ❤️"];
const garland = document.querySelector('.garland');
if (garland) {
    garland.addEventListener('click', function(event) {
        const bubble = document.createElement('div');
        bubble.className = 'wish-bubble';
        bubble.textContent = garlandWishes[Math.floor(Math.random() * garlandWishes.length)];
        bubble.style.left = event.clientX + 'px';
        bubble.style.top = event.clientY + 'px';
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 2000);
    });
}

// --- Печенье с предсказанием ---
const fortuneBtn = document.createElement('button');
fortuneBtn.textContent = '🥠 Предсказание';
fortuneBtn.style.position = 'fixed'; fortuneBtn.style.bottom = '30px'; fortuneBtn.style.left = '30px';
fortuneBtn.style.padding = '10px 20px'; fortuneBtn.style.background = 'rgba(255, 204, 0, 0.2)';
fortuneBtn.style.color = '#ffcc00'; fortuneBtn.style.border = '2px solid #ffcc00';
fortuneBtn.style.borderRadius = '50px'; fortuneBtn.style.cursor = 'pointer';
fortuneBtn.style.zIndex = '10000'; fortuneBtn.style.boxShadow = '0 0 15px rgba(255, 204, 0, 0.4)';
fortuneBtn.style.fontWeight = 'bold'; fortuneBtn.style.transition = 'all 0.3s ease';
document.body.appendChild(fortuneBtn);
fortuneBtn.addEventListener('mouseover', () => { fortuneBtn.style.background = '#ffcc00'; fortuneBtn.style.color = '#2d1b4e'; });
fortuneBtn.addEventListener('mouseout', () => { fortuneBtn.style.background = 'rgba(255, 204, 0, 0.2)'; fortuneBtn.style.color = '#ffcc00'; });
const fortunes = ["Ждет удача в учебе! 🎓", "Твой код скомпилируется с первого раза! 💻", "Найдешь что-то ценное под подушкой! 💰", "Тебя ждет незабываемое путешествие! ✈️", "Сбудутся все мечты! ✨"];
fortuneBtn.addEventListener('click', function(event) {
    const popup = document.createElement('div');
    popup.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
    popup.style.position = 'fixed'; popup.style.left = '50%'; popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%) scale(0.5)';
    popup.style.background = '#2d1b4e'; popup.style.color = '#fff';
    popup.style.padding = '20px 40px'; popup.style.borderRadius = '20px';
    popup.style.border = '2px solid #ffcc00'; popup.style.boxShadow = '0 0 30px rgba(255, 204, 0, 0.6)';
    popup.style.zIndex = '10001'; popup.style.fontSize = '20px'; popup.style.fontWeight = 'bold';
    popup.style.textAlign = 'center'; popup.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    popup.style.pointerEvents = 'none';
    document.body.appendChild(popup);
    requestAnimationFrame(() => { popup.style.transform = 'translate(-50%, -50%) scale(1)'; });
    setTimeout(() => { popup.style.transform = 'translate(-50%, -50%) scale(0)'; setTimeout(() => popup.remove(), 300); }, 3000);
});

// --- Секретное слово (Мега-салют) ---
let secretWord = "";
document.addEventListener('keydown', function(e) {
    secretWord += e.key.toLowerCase();
    if (secretWord.length > 10) secretWord = secretWord.slice(-10);
    if (secretWord.includes("снег") || secretWord.includes("аня") || secretWord.includes("newyear")) {
        secretWord = "";
        const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88', '#ff3333', '#ffffff'];
        for (let wave = 0; wave < 10; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 30; i++) {
                    const spark = document.createElement('div');
                    spark.style.position = 'fixed'; spark.style.left = Math.random() * 100 + 'vw';
                    spark.style.top = Math.random() * 100 + 'vh'; spark.style.width = '8px'; spark.style.height = '8px';
                    spark.style.borderRadius = '50%'; spark.style.background = colors[Math.floor(Math.random() * colors.length)];
                    spark.style.pointerEvents = 'none'; spark.style.zIndex = '99999'; spark.style.boxShadow = '0 0 15px currentColor';
                    const angle = Math.random() * Math.PI * 2; const distance = Math.random() * 200 + 100;
                    const x = Math.cos(angle) * distance; const y = Math.sin(angle) * distance;
                    spark.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    spark.style.transform = 'translate(0, 0)';
                    document.body.appendChild(spark);
                    requestAnimationFrame(() => { spark.style.transform = `translate(${x}px, ${y}px) scale(0)`; spark.style.opacity = '0'; });
                    setTimeout(() => spark.remove(), 1600);
                }
            }, wave * 200);
        }
    }
});

// --- Магический фонтан ---
document.addEventListener('click', function(event) {
    const colors = ['#ff00ff', '#00ffff', '#ffcc00', '#00ff88', '#ff3333'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed'; particle.style.left = event.clientX + 'px'; particle.style.top = event.clientY + 'px';
        particle.style.width = '6px'; particle.style.height = '6px'; particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none'; particle.style.zIndex = '99999'; particle.style.boxShadow = '0 0 10px currentColor';
        document.body.appendChild(particle);
        const angle = Math.random() * Math.PI - Math.PI; const velocity = Math.random() * 15 + 10;
        let posX = event.clientX; let posY = event.clientY;
        let velX = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1); let velY = Math.sin(angle) * velocity;
        const animateParticle = () => {
            posX += velX; posY += velY; velY += 0.5; 
            particle.style.left = posX + 'px'; particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, 1 - (posY - event.clientY) / 300);
            if (posY < window.innerHeight && particle.style.opacity > 0) requestAnimationFrame(animateParticle);
            else particle.remove();
        };
        requestAnimationFrame(animateParticle);
    }
});

// --- Летающий снеговик ---
const snowman = document.createElement('div');
snowman.innerHTML = '☃️'; snowman.style.position = 'fixed'; snowman.style.fontSize = '40px';
snowman.style.pointerEvents = 'none'; snowman.style.zIndex = '9997'; snowman.style.transition = 'transform 0.3s ease';
document.body.appendChild(snowman);
let snowX = Math.random() * (window.innerWidth - 50); let snowY = Math.random() * (window.innerHeight - 50);
let velX = 2.5; let velY = 2.5;
function animateSnowman() {
    snowX += velX; snowY += velY;
    if (snowX + 40 > window.innerWidth || snowX < 0) { velX = -velX; snowman.style.transform = `rotate(${Math.random() * 360}deg)`; }
    if (snowY + 40 > window.innerHeight || snowY < 0) { velY = -velY; snowman.style.transform = `rotate(${Math.random() * 360}deg)`; }
    snowman.style.left = snowX + 'px'; snowman.style.top = snowY + 'px';
    requestAnimationFrame(animateSnowman);
}
animateSnowman();

// --- 3D-параллакс с годом ---
const bgYear = document.createElement('div');
bgYear.id = 'parallax-year'; bgYear.textContent = new Date().getFullYear() + 1;
document.body.appendChild(bgYear);
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; const y = (e.clientY / window.innerHeight - 0.5) * 30;
    bgYear.style.transform = `translate(calc(-50% + ${-x}px), calc(-50% + ${-y}px))`;
});

// --- Голосовой таймер ---
const speechBtn = document.createElement('button');
speechBtn.id = 'speech-btn'; speechBtn.innerHTML = '🗣️'; speechBtn.title = 'Озвучить время';
document.body.appendChild(speechBtn);
speechBtn.addEventListener('click', function() {
    const days = document.getElementById('days').textContent; const hours = document.getElementById('hours').textContent;
    const minutes = document.getElementById('minutes').textContent; const seconds = document.getElementById('seconds').textContent;
    const text = `Внимание! До Нового года осталось ${days} дней, ${hours} часов, ${minutes} минут и ${seconds} секунд.`;
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'ru-RU'; utterance.rate = 0.9;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance);
});

// --- Коробка с подарком ---
const giftBox = document.createElement('div');
giftBox.className = 'gift-box'; giftBox.innerHTML = '🎁'; document.body.appendChild(giftBox);
const compliments = ["Ты классный программист! 💻", "Твой сайт просто огонь! 🔥", "Ты умница и красавица! ✨", "Продолжай в том же духе! 🚀"];
giftBox.addEventListener('click', () => {
    giftBox.classList.add('shake'); giftBox.innerHTML = '🎉';
    const popup = document.createElement('div'); popup.className = 'compliment-popup';
    popup.textContent = compliments[Math.floor(Math.random() * compliments.length)];
    document.body.appendChild(popup);
    setTimeout(() => { giftBox.classList.remove('shake'); giftBox.innerHTML = '🎁'; popup.remove(); }, 3000);
});

// --- Летающий Дед Мороз ---
function launchSanta() {
    const santa = document.createElement('div'); santa.className = 'santa-sleigh'; santa.innerHTML = '🎅🏼🛷✨';
    document.body.appendChild(santa); setTimeout(() => santa.remove(), 12000);
}
setTimeout(launchSanta, 3000); setInterval(launchSanta, 45000);

// --- Небесные фонарики ---
function createLantern() {
    const lantern = document.createElement('div'); lantern.className = 'sky-lantern'; lantern.innerHTML = '🏮'; 
    lantern.style.left = Math.random() * 100 + 'vw'; lantern.style.fontSize = Math.random() * 30 + 20 + 'px';
    const duration = Math.random() * 7 + 8; lantern.style.animation = `floatUp ${duration}s linear forwards`;
    document.body.appendChild(lantern); setTimeout(() => lantern.remove(), duration * 1000);
}
setInterval(createLantern, 5000);