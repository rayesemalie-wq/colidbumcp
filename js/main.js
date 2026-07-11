/**
 * ColidbuMCP 网站主要脚本
 * Main JavaScript for ColidbuMCP Website
 * 包含导航、交互动画、滚动效果等功能
 */

// ========================================
// DOM 元素获取
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // ========================================
    // 汉堡菜单切换
    // Hamburger Menu Toggle
    // ========================================
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // 切换导航菜单显示状态
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });
    }

    // 点击导航链接时关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.style.display = 'none';
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // ========================================
    // 滚动事件处理
    // Scroll Events Handler
    // ========================================

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 隐藏/显示导航栏
        if (scrollTop > lastScrollTop && scrollTop > 80) {
            // 向下滚动，隐藏导航栏
            if (navbar) navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            if (navbar) navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // 更新导航链接活跃状态
        updateActiveNavLink();
    });

    // ========================================
    // 更新导航栏活跃链接
    // Update Active Navigation Link
    // ========================================

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section, main');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current === '') {
                document.querySelector('a[href="index.html"]')?.classList.add('active');
            }
        });
    }

    // ========================================
    // 平滑滚动效果
    // Smooth Scroll Animation
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // 页面元素进入视口时的动画
    // Intersection Observer for Animations
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // 只观察一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 为可观察的元素添加观察
    document.querySelectorAll('.feature-card, .service-card, .faq-item, .package').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // 数字计数动画
    // Number Counter Animation
    // ========================================

    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element) {
        const target = element.getAttribute('data-target') || extractNumber(element.textContent);
        const increment = target / 60;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                // 保留原始格式（如 500+）
                const text = element.textContent;
                const suffix = text.replace(/\d+/g, '');
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    function extractNumber(text) {
        const numbers = text.match(/\d+/g);
        return numbers ? parseInt(numbers[0]) : 0;
    }

    // ========================================
    // 响应式菜单手势
    // Responsive Menu Gesture
    // ========================================

    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // 向左滑动，关闭菜单
            navMenu.style.display = 'none';
        } else if (touchEndX > touchStartX + 50) {
            // 向右滑动，打开菜单
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'flex';
            }
        }
    }

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    // ========================================
    // 页面加载完成动画
    // Page Load Animation
    // ========================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // 启用滚动性能优化
        enableScrollPerformance();
    });

    // ========================================
    // 滚动性能优化
    // Scroll Performance Optimization
    // ========================================

    function enableScrollPerformance() {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // 滚动处理逻辑
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // 鼠标跟踪效果（可选）
    // Mouse Tracking Effect (Optional)
    // ========================================

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        document.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const floatingElements = document.querySelectorAll('.floating-element');
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                floatingElements.forEach((el, index) => {
                    const factor = (index + 1) * 10;
                    el.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
                });
            }
        });
    }

    // ========================================
    // 初始化
    // Initialize
    // ========================================

    updateActiveNavLink();
    console.log('ColidbuMCP 网站已加载完成 / Website loaded successfully');
});

// ========================================
// 实用工具函数
// Utility Functions
// ========================================

/**
 * 防抖函数
 * Debounce Function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 节流函数
 * Throttle Function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 检查元素是否在视口中
 * Check if Element is in Viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 添加波纹效果到按钮
 * Add Ripple Effect to Buttons
 */
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 添加CSS样式到页面
const rippleStyles = `
    <style>
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes rippleAnimation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', rippleStyles);

// 初始化波纹效果
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRippleEffect);
} else {
    addRippleEffect();
}
