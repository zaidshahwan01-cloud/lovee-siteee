document.addEventListener("DOMContentLoaded", () => {
    // جلب العناصر الأساسية من الواجهة
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const bgMusic = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const albumRot = document.getElementById('album-rot');
    const globalPlayer = document.getElementById('global-player');

    // 1. التحقق من كلمة السر والتشغيل الفوري التلقائي للموسيقى
    unlockBtn.addEventListener('click', () => {
        const passwordValue = passwordInput.value.trim().toLowerCase();
        
        if (passwordValue === 'love') {
            // الانتقال للشاشة التالية مباشرة
            nextScreen('screen-intro');
            
            // إظهار مشغل الموسيقى الفخم
            globalPlayer.style.display = 'flex';

            // تشغيل الأغنية فوراً (تجاوز قيود المتصفح لأنها ناتجة عن ضغطة زر المستخدم)
            bgMusic.play()
                .then(() => {
                    playPauseBtn.innerText = "⏸";
                    albumRot.classList.add('rotating');
                })
                .catch(error => {
                    console.log("تم تأجيل تشغيل الصوت التلقائي أو أن الملف يحتاج لتحديث مسار: ", error);
                    // في حال فشل التشغيل التلقائي لأي سبب، نضمن أن شكل الزر يتيح للمستخدم الضغط يدوياً
                    playPauseBtn.innerText = "▶";
                });
        } else {
            alert('كلمة السر خاطئة! جربي كتابة love بدقة ❤️');
        }
    });

    // إتاحة الضغط على زر Enter لفتح القفل لتجربة مستخدم مريحة
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });

    // 2. التحكم بـ تشغيل وإيقاف الموسيقى يدوياً من المشغل السفلي
    playPauseBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            playPauseBtn.innerText = "⏸";
            albumRot.classList.add('rotating');
        } else {
            bgMusic.pause();
            playPauseBtn.innerText = "▶";
            albumRot.classList.remove('rotating');
        }
    });

    // 3. عداد الوقت المستمر والدقيق جداً (لا يتوقف أبداً)
    // تاريخ البداية المعتمد: 3 أكتوبر 2025
    const startDate = new Date("2025-10-03T00:00:00").getTime();

    function updateLiveCounter() {
        const now = new Date().getTime();
        const difference = now - startDate;

        // حسابات الوقت (الأيام، الساعات، الدقائق، الثواني)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // حقن القيم داخل الـ HTML المخصص لها مع إضافة صفر حشو للأرقام الفردية
        document.getElementById('count-days').innerText = String(days).padStart(2, '0');
        document.getElementById('count-hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('count-minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('count-seconds').innerText = String(seconds).padStart(2, '0');
    }

    // تحديث العداد فوراً كل ثانية وبدون أي انقطاع
    setInterval(updateLiveCounter, 1000);
    updateLiveCounter(); // تشغيل فوري أول مرة لمنع ظهور الأصفار

    // 4. نظام توليد القلوب المتطايرة بالخلفية بشكل عشوائي واحترافي
    const heartsContainer = document.getElementById('hearts-container');
    const heartEmojis = ['❤️', '💖', '💕', '💗', '🌸'];

    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // إحداثيات وأحجام عشوائية لتبدو طبيعية جداً ومريحة
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
        heart.style.setProperty('--d', (Math.random() * 4 + 4) + 's');
        heart.style.setProperty('--s', (Math.random() * 1.2 + 0.6) + 'rem');

        heartsContainer.appendChild(heart);

        // إزالة العنصر من الذاكرة فور انتهاء الأنميشن منعا لثقل المتصفح
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    // توليد قلب جديد كل 400 ملي ثانية بشكل متزن
    setInterval(createHeartParticle, 400);
});

// دالة التنقل العالمي بين الشاشات بشكل مرن
function nextScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // للتأكد من تمرير محتوى الذكريات لأعلى شاشة التمرير تلقائياً عند الدخول إليها
        if(screenId === 'screen-timeline') {
            const scrollable = targetScreen.querySelector('.timeline-scrollable');
            if(scrollable) scrollable.scrollTop = 0;
        }
    }
}