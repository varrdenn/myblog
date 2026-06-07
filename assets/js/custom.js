// ========== 阅读进度条 ==========
document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.id = 'reading-progress';
    document.body.appendChild(bar);

    var winHeight, docHeight, maxScroll;

    function recalc() {
        winHeight = window.innerHeight;
        docHeight = document.documentElement.scrollHeight;
        maxScroll = docHeight - winHeight;
    }

    function updateProgress() {
        if (maxScroll <= 0) recalc();
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        var pct = maxScroll > 0 ? Math.min((scrolled / maxScroll) * 100, 100) : 0;
        bar.style.width = pct + '%';
    }

    recalc();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', function () { recalc(); updateProgress(); });
});

// ========== 标签页切换标题 ==========
document.addEventListener('DOMContentLoaded', function () {
    var originTitle = document.title || document.querySelector('title')?.textContent || '';
    var restoreTimer;

    document.addEventListener('visibilitychange', function () {
        clearTimeout(restoreTimer);
        if (document.hidden) {
            document.title = '\u667a\u6167\u6811\u4e0a\u667a\u6167\u679c \uD83C\uDF33';
        } else {
            document.title = '\u667a\u6167\u6811\u4e0b\u4f60\u548c\u6211 \uD83C\uDF1F';
            restoreTimer = setTimeout(function () {
                document.title = originTitle;
            }, 2000);
        }
    });
});

// ========== Candy 点击特效 ==========
;(function () {
    var colors = ['#2d96bd', '#55bde2', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'];
    var emojis = ['\uD83C\uDF6C', '\uD83C\uDF6D', '\u2728', '\uD83D\uDCAB', '\u2B50', '\uD83C\uDF1F'];
    var MAX = 20;

    // 注入 keyframes 一次
    var style = document.createElement('style');
    style.textContent = '@keyframes candyFall{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,80px) scale(0.3)}}';
    document.head.appendChild(style);

    document.addEventListener('click', function (e) {
        var candies = document.getElementsByClassName('candy-click');
        while (candies.length >= MAX) { candies[0].remove(); }

        var span = document.createElement('span');
        span.className = 'candy-click';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.cssText = [
            'position:fixed;z-index:9999;pointer-events:none',
            'left:' + e.clientX + 'px',
            'top:' + e.clientY + 'px',
            'font-size:' + (14 + Math.random() * 16) + 'px',
            'color:' + colors[Math.floor(Math.random() * colors.length)],
            'transform:translate(-50%,-50%)',
            'animation:candyFall 1s ease-out forwards'
        ].join(';');
        document.body.appendChild(span);

        setTimeout(function () { span.remove(); }, 1000);
    });
})();
// ========== 站点运行时间 ==========
document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('run-time');
    if (!el) return;

    var startTime = new Date('01/23/2025 10:09:56');

    function pad(n) { return n < 10 ? '0' + n : n; }

    function runtime() {
        var now = new Date();
        var diff = now - startTime;
        var days = Math.floor(diff / (24 * 3600 * 1000));
        var hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
        var minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
        var seconds = Math.floor((diff % (60 * 1000)) / 1000);
        el.innerHTML = '\u672c\u7ad9\u5df2\u8fd0\u884c <i class="far fa-clock fa-fw"></i> '
            + pad(days) + ' \u5929 '
            + pad(hours) + ' \u65f6 '
            + pad(minutes) + ' \u5206 '
            + pad(seconds) + ' \u79d2';
    }

    runtime();
    setInterval(runtime, 1000);
});