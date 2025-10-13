// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav a');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Logo animation on hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'logoBounce 0.6s ease';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }

    // Initialize features if they exist
    initializeFeatures();
});

// Function to open editor (placeholder)
function openEditor() {
    const editorSection = document.getElementById('editor');
    if (editorSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const editorPosition = editorSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: editorPosition,
            behavior: 'smooth'
        });
        
        // Load your editor functionality here
        loadImageEditor();
    }
}

// Function to load image editor
function loadImageEditor() {
    const appContainer = document.getElementById('app-container');
    
    if (appContainer && !appContainer.querySelector('.editor-loaded')) {
        // Add your existing editor HTML here
        appContainer.innerHTML = `
            <div class="editor-loaded" style="text-align: center; padding: 40px;">
                <h3 style="color: #e74c3c; margin-bottom: 20px;">🎨 Image Editor Loading...</h3>
                <p style="color: #666; margin-bottom: 30px;">Advanced image editing tools coming soon!</p>
                <div style="background: #f0f0f0; padding: 30px; border-radius: 10px; border: 2px dashed #e74c3c;">
                    <p style="color: #888;">Your image editor will appear here</p>
                    <button onclick="alert('Editor functionality will be implemented here!')" 
                            style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px; cursor: pointer;">
                        Test Button
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize features section
function initializeFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    
    if (featuresGrid) {
        featuresGrid.innerHTML = `
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3>Advanced Editing</h3>
                <p>Professional image editing tools with filters, effects, and adjustments</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Fast Processing</h3>
                <p>Lightning-fast image processing and real-time preview</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h3>Mobile Friendly</h3>
                <p>Works perfectly on all devices - desktop, tablet, and mobile</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💾</div>
                <h3>Easy Export</h3>
                <p>Download your creations in high quality with one click</p>
            </div>
        `;
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    console.log('🚀 PIN PRO Website Loaded Successfully!');
});