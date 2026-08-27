document.addEventListener('DOMContentLoaded', () => {
    // 1. Kaydırma İşlemi
    const scrollBtn = document.getElementById('scroll-btn');
    const dateSection = document.getElementById('section-date');
    const scrollContainer = document.getElementById('scroll-container');

    if (scrollBtn && dateSection) {
        scrollBtn.addEventListener('click', () => {
            scrollContainer.scrollTo({
                top: dateSection.offsetTop,
                behavior: 'smooth'
            });
        });
    }

    // 2. Müzik Oynatıcı (Basit Örnek)
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;
    
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                musicBtn.style.backgroundColor = 'rgba(201, 177, 165, 0.9)'; 
                // Buraya gerçek müzik başlatma kodu eklenebilir
            } else {
                musicBtn.style.backgroundColor = 'rgba(61, 49, 41, 0.8)';
                // Buraya müzik durdurma kodu eklenebilir
            }
        });
    }

    // 3. Geri Sayım Mantığı
    // Hedef Tarih: 13 Eylül 2026, Pazar, Saat 19:00
    const targetDate = new Date('September 13, 2026 19:00:00').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Zaman geçtiyse hepsini sıfırla
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        // Zaman hesaplamaları
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Değerleri HTML'e yazdır (0 ekleyerek 2 basamaklı formatla)
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Her saniye güncelle
    if (daysEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
