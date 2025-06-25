// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
            
            // Update aria-expanded
            const isExpanded = navLinks.classList.contains('mobile-active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !navLinks.contains(event.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('mobile-active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe benefits
    document.querySelectorAll('.benefit').forEach(benefit => {
        benefit.style.opacity = '0';
        benefit.style.transform = 'translateX(-30px)';
        benefit.style.transition = 'all 0.6s ease';
        observer.observe(benefit);
    });
    
    // Number counter animation
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const target = parseInt(number.textContent);
            const hasPlusSign = number.textContent.includes('+');
            const originalText = number.textContent;
            let current = 0;
            
            // Create a temporary container to measure width
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.fontFamily = getComputedStyle(number).fontFamily;
            tempSpan.style.fontSize = getComputedStyle(number).fontSize;
            tempSpan.style.fontWeight = getComputedStyle(number).fontWeight;
            tempSpan.textContent = originalText;
            document.body.appendChild(tempSpan);
            
            // Set fixed width to prevent layout shifts
            const finalWidth = tempSpan.offsetWidth;
            number.style.minWidth = finalWidth + 'px';
            number.style.display = 'inline-block';
            document.body.removeChild(tempSpan);
            
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            const stepTime = duration / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current) + (hasPlusSign ? '+' : '') + (originalText.includes('h') ? 'h' : '');
            }, stepTime);
        });
    }
    
    // Trigger number animation when stats are visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Only animate on larger screens to prevent mobile performance issues
                if (window.innerWidth > 768) {
                    animateNumbers();
                } else {
                    // On mobile, just show the final numbers without animation
                    document.querySelectorAll('.stat-number').forEach(number => {
                        number.style.minWidth = 'auto';
                        number.style.display = 'block';
                    });
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// WhatsApp form submission
function sendWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    const serviceLabels = {
        'pneus-novos': 'Pneus Novos',
        'pneus-usados': 'Pneus Usados',
        'rodas': 'Rodas Agrícolas',
        'recapagem': 'Recapagem',
        'filipagem': 'Filipagem',
        'emergencia': 'Emergência'
    };
    
    const whatsappMessage = `Olá! Meu nome é ${name}.%0A` +
                           `Telefone: ${phone}%0A` +
                           `Serviço: ${serviceLabels[service]}%0A` +
                           `Mensagem: ${message}`;
    
    const whatsappURL = `https://wa.me/5555997142370?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
}

// Add loading states to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#E0E0E0';
        }
    });
    
    field.addEventListener('focus', function() {
        this.style.borderColor = '#FFD700';
    });
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add click tracking for analytics (can be expanded later)
function trackClick(element, action) {
    console.log(`User clicked: ${action}`);
    // Add Google Analytics or other tracking here
}

// Track CTA clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.textContent.trim();
        trackClick(this, action);
    });
});