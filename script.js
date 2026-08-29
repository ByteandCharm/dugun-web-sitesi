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

    // 2. Müzik Oynatıcı (YouTube: Mahmut Orhan - Feel feat. Sena Sener)
    const musicBtn = document.getElementById('music-btn');
    let ytPlayer = null;
    let ytReady = false;
    let isPlaying = false;

    // YouTube IFrame API yüklendiğinde çağrılır
    window.onYouTubeIframeAPIReady = function () {
        ytPlayer = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: 'rQ7tMWOCQlM',
            playerVars: {
                start: 40,          // 0:40 saniyeden başla
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                rel: 0,
                modestbranding: 1,
                playsinline: 1
            },
            events: {
                onReady: function (e) {
                    ytReady = true;
                    e.target.setVolume(30); // %30 ses
                }
            }
        });
    };

    // API script'ini yükle (eğer sayfa tarafından eklenmemişse)
    if (typeof YT === 'undefined' || !YT.Player) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(tag, first);
    }

    function toggleMusic() {
        if (!ytReady || !ytPlayer || !ytPlayer.getPlayerState) return;
        const state = ytPlayer.getPlayerState();
        if (state === 1) { // çalıyor
            ytPlayer.pauseVideo();
            isPlaying = false;
            musicBtn.style.backgroundColor = 'rgba(61, 49, 41, 0.8)';
        } else {
            if (state === 5 || state === 0) {
                ytPlayer.seekTo(40, true); // 0:40'a git
            }
            ytPlayer.setVolume(30);
            ytPlayer.playVideo();
            isPlaying = true;
            musicBtn.style.backgroundColor = 'rgba(201, 177, 165, 0.9)';
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
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
