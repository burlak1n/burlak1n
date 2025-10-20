// Projects data - will be populated from localization files
let projectsData = {};

// Static project metadata (dates, times, categories, images, links)
let projectMetadata = {
    modal1: {
        id: "modal1",
        date: new Date(2025, 7, 28),
        developmentTime: 400,
        category: "fullstack",
        tech: ["Rust", "Vue.js 3", "React 18", "MongoDB", "Redis", "RabbitMQ", "TypeScript"],
        images: ["media/anketa/anketa.png", "media/anketa/broadcast.png"],
        links: [{ text: "🔗 Ссылка на сайт", url: "#" }]
    },
    modal2: {
        id: "modal2",
        date: new Date(2025, 3, 15),
        developmentTime: 840,
        category: "fullstack",
        tech: ["FastAPI", "Vue.js 3", "PostgreSQL", "Redis", "Docker"],
        images: [
            "media/hserun/hserun.png",
            "media/hserun/hserun1.png"
        ],
        links: [{ text: "🔗 Ссылка на сайт", url: "https://hserun.ru/?utm_source=portfolio&utm_medium=website&utm_campaign=burlakin_portfolio" }]
    },
    modal3: {
        id: "modal3",
        date: new Date(2025, 8, 12),
        developmentTime: 2,
        category: "fullstack",
        tech: ["FastAPI", "Vue.js 3", "PostgreSQL", "Redis", "Docker"],
        images: ["media/dezmedline/dezmedline.png", "media/dezmedline/dezmedline0.png"],
        links: [{ text: "🔗 Ссылка на сайт", url: "https://dezmedline.ru/?utm_source=portfolio&utm_medium=website&utm_campaign=burlakin_portfolio" }]
    },
    modal4: {
        id: "modal4",
        date: new Date(2025, 8, 15),
        developmentTime: 3,
        category: "machinelearning",
        tech: ["Python", "OpenCV", "NumPy", "PIL", "Streamlit"],
        images: ["media/faceblur/faceblur_demo.mp4", "media/faceblur/demo.mp4"],
        links: [{ text: "🔗 Ссылка на сайт", url: "#" }]
    },
    modal5: {
        id: "modal5",
        date: new Date(2025, 2, 12),
        developmentTime: 3,
        category: "backend",
        tech: ["Python 3.12", "aiogram", "SQLite", "Requests", "BeautifulSoup"],
        images: ["media/LV25soul/soulmating.png"],
        links: [{ text: "🔗 Ссылка на сайт", url: "#" }]
    },
    modal6: {
        id: "modal6",
        date: new Date(2025, 2, 29),
        developmentTime: 5,
        category: "backend",
        tech: ["Python 3.12", "aiogram", "spaCy", "SQLite", "BeautifulSoup", "Requests"],
        images: [
            "media/rzhya/rzhya.png",
            "media/rzhya/rzhya1.png"
        ],
        links: [{ text: "🔗 Ссылка на сайт", url: "#" }]
    },
    modal7: {
        id: "modal7",
        date: new Date(2025, 7, 7),
        developmentTime: 8,
        category: "fullstack",
        tech: ["FastAPI", "React 19", "TypeScript", "Material-UI", "Redux Toolkit", "SQLite"],
        images: ["media/RIM/RIM.png"],
        links: []
    },
    modal8: {
        id: "modal8",
        date: new Date(2025, 7, 14),
        developmentTime: 120,
        category: "fullstack",
        tech: ["FastAPI", "Vue.js 3", "PostgreSQL", "Redis", "Docker"],
        images: ["media/technoquest/technoquest.png"],
        links: [{ text: "🔗 Ссылка на сайт", url: "https://technoquestcroc.ru/" }]
    },
    modal9: {
        id: "modal9",
        date: new Date(2025, 2, 25),
        developmentTime: 10,
        category: "machinelearning",
        tech: ["Python 3.8", "aiogram", "SQLAlchemy", "Alembic", "GigaChat", "OpenAI GPT-4 Vision", "Kandinsky", "SpeechRecognition", "gTTS"],
        images: ["media/chiefai/chiefai.png"],
        links: []
    },
    modal10: {
        id: "modal10",
        date: new Date(2025, 8, 4),
        developmentTime: 40,
        category: "frontend",
        tech: ["Svelte 5", "SvelteKit", "TypeScript", "Tailwind CSS 4", "Vite", "Google Apps Script", "Google Sheets"],
        images: [
            "media/inaccel/inaccel.png",
            "media/inaccel/inaccel1.png"
        ],
        links: [{ text: "🔗 Ссылка на сайт", url: "https://inaccel.ingroupsts.ru/" }]
    },
    modal11: {
        id: "modal11",
        date: new Date(2025, 3, 21),
        developmentTime: 48,
        category: "backend",
        tech: ["Python 3.12", "aiogram", "Google Sheets API", "VK API", "TicketsCloud API", "Yandex Music API", "pandas", "numpy"],
        images: ["media/artists/artists.png"],
        links: []
    }
};

// Function to load projects data from localization
function loadProjectsData() {
    if (!window.i18n) return;
    
    const currentLang = window.i18n.currentLang;
    const translations = window.i18n.translations[currentLang];
    
    if (!translations || !translations.projects) return;
    
    // Merge localization data with metadata
    projectsData = {};
    Object.keys(projectMetadata).forEach(key => {
        const metadata = projectMetadata[key];
        const localized = translations.projects[key];
        
        if (localized) {
            projectsData[key] = {
                ...metadata,
                ...localized,
                links: metadata.links.map(link => ({
                    ...link,
                    text: translations.portfolio.modal.websiteLink
                }))
            };
        }
    });
}

// Categories mapping
const categories = {
    'all': 'all',
    'backend': 'backend',
    'frontend': 'frontend', 
    'fullstack': 'fullstack',
    'ml': 'ml'
};

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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .highlight');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .project-card');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Filter projects function
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide project cards
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Extract year from date
function extractYear(date) {
    return date.getFullYear();
}

// Format date to Russian format
function formatDate(date) {
    if (!window.i18n) return date.toLocaleDateString();
    
    const months = window.i18n.t('months');
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Format development time
function formatDevelopmentTime(hours) {
    if (!window.i18n) return `${hours}h`;
    
    const units = window.i18n.t('timeUnits');
    
    if (hours < 1) {
        const minutes = Math.round(hours * 60);
        return `${minutes} ${units.min}`;
    } else if (hours < 24) {
        return `${hours} ${units.h}`;
    } else if (hours < 168) { // less than a week
        const days = Math.round(hours / 8); // 8 hours per working day
        return `${days} ${units.d}`;
    } else if (hours < 672) { // less than a month (4 weeks)
        const weeks = hours / 168; // 168 hours per week (7 days * 24 hours)
        if (weeks % 1 === 0) {
            return `${Math.round(weeks)} ${units.wk}`;
        } else if (weeks % 0.5 === 0) {
            return `${weeks} ${units.wk}`;
        } else {
            return `${Math.round(weeks)} ${units.wk}`;
        }
    } else {
        const months = hours / 672; // 672 hours per month (4 weeks * 168 hours)
        if (months % 1 === 0) {
            return `${Math.round(months)} ${units.mo}`;
        } else if (months % 0.5 === 0) {
            return `${months} ${units.mo}`;
        } else {
            return `${Math.round(months)} ${units.mo}`;
        }
    }
}

// Function to generate project card HTML
function generateProjectCard(project) {
    const isTechnicalView = window.i18n && window.i18n.currentMode === 'tech';
    
    // Get first media file for preview
    const previewMedia = project.images && project.images.length > 0 ? project.images[0] : null;
    const isVideo = previewMedia && (previewMedia.endsWith('.mp4') || previewMedia.endsWith('.avi') || previewMedia.endsWith('.mov') || previewMedia.endsWith('.mkv'));
    
    return `
        <div class="project-card" data-category="${project.category}" onclick="openModalWithContent('${project.id}')">
            <div class="project-preview">
                ${previewMedia ? (
                    isVideo ? 
                        `<video class="preview-media" muted loop playsinline autoplay><source src="${previewMedia}" type="video/mp4"></video>` :
                        `<img class="preview-media" src="${previewMedia}" alt="${project.title} preview" onerror="this.style.display='none'">`
                ) : `
                    <div class="preview-placeholder">
                        <div class="placeholder-icon">📱</div>
                        <div class="placeholder-text">${project.title}</div>
                    </div>
                `}
            </div>
            <div class="project-header">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    <span class="project-date" id="date-${project.id}">${formatDate(project.date)}</span>
                    <span class="project-time">${formatDevelopmentTime(project.developmentTime)}</span>
                </div>
            </div>
            <p class="project-description">${isTechnicalView ? project.technicalDetails : project.description}</p>
            <div class="project-features">
                ${isTechnicalView ? 
                    project.tech.map(tech => `<span class="tech">${tech}</span>`).join('') :
                    project.productTags.map(tag => `<span class="feature">${tag}</span>`).join('')
                }
            </div>
        </div>
    `;
}

// Function to render all projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    // Get projects sorted by date (newest first)
    const sortedProjects = Object.values(projectsData).sort((a, b) => b.date - a.date);
    
    // Generate HTML for all projects
    const projectsHTML = sortedProjects.map(project => generateProjectCard(project)).join('');
    
    // Insert into DOM
    projectsGrid.innerHTML = projectsHTML;
    
    // Start video playback after a short delay
    setTimeout(() => {
        const videos = document.querySelectorAll('.preview-media');
        videos.forEach(video => {
            if (video.tagName === 'VIDEO') {
                // Hide play button when video starts playing
                video.addEventListener('play', () => {
                    const playBtn = video.parentElement.querySelector('.video-play-btn');
                    if (playBtn) playBtn.style.display = 'none';
                });
                
                // Show play button when video is paused
                video.addEventListener('pause', () => {
                    const playBtn = video.parentElement.querySelector('.video-play-btn');
                    if (playBtn) playBtn.style.display = 'flex';
                });
                
                video.play().catch(e => {
                    // Show play button if autoplay fails
                    const playBtn = video.parentElement.querySelector('.video-play-btn');
                    if (playBtn) playBtn.style.display = 'flex';
                });
            }
        });
    }, 100);
}

// Function to sort projects by date (newest first)
function sortProjectsByDate() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const projectCards = Array.from(projectsGrid.children);
    projectCards.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return dateB - dateA;
    });

    projectCards.forEach(card => projectsGrid.appendChild(card));
}

// Function to generate modal HTML
function generateModalHTML(project) {
    return `
        <div id="${project.id}" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('${project.id}')">&times;</span>
                <h2>${project.title}</h2>
                <div class="modal-images">
                    <!-- Images and videos will be dynamically inserted here -->
                </div>
                <div class="modal-description">
                    <!-- Description will be dynamically updated -->
                </div>
                <div class="modal-links">
                    <!-- Links will be dynamically updated -->
                </div>
            </div>
        </div>
    `;
}

// Function to render all modals
function renderModals() {
    // Remove existing modals first
    const existingModals = document.querySelectorAll('.modal');
    existingModals.forEach(modal => modal.remove());
    
    const body = document.body;
    const modalsHTML = Object.values(projectsData).map(project => generateModalHTML(project)).join('');
    
    // Insert before the closing body tag
    body.insertAdjacentHTML('beforeend', modalsHTML);
}


// Function to update projects when language changes
function updateProjectsOnLanguageChange() {
    // Reload projects data with new language
    loadProjectsData();
    
    // Re-render projects
    renderProjects();
    
    // Re-render modals
    renderModals();
}

// Function to generate about text from localization
function generateAboutText() {
    const translations = window.i18n.translations[window.i18n.currentLang];
    if (!translations || !translations.about || !translations.about.description) return;
    
    const aboutTextElement = document.querySelector('.about-text[data-i18n="about.description"]');
    if (!aboutTextElement) return;
    
    let description = translations.about.description;
    
    // Handle mode-specific translations (simple/tech)
    if (description && typeof description === 'object' && !Array.isArray(description) && (description.simple || description.tech)) {
        const mode = window.i18n.currentMode || 'simple';
        description = description[mode] || description.simple || description.tech;
    }
    
    if (Array.isArray(description)) {
        aboutTextElement.innerHTML = description.map(text => `<p>${text}</p>`).join('');
    } else if (typeof description === 'string') {
        aboutTextElement.innerHTML = `<p>${description}</p>`;
    }
}

// Function to generate skills from localization
function generateSkills() {
    const translations = window.i18n.translations[window.i18n.currentLang];
    if (!translations || !translations.skills || !translations.skills.categories) return;
    
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;
    
    const mode = window.i18n.currentMode || 'simple';
    let categories = translations.skills.categories[mode] || translations.skills.categories.tech;
    
    if (!Array.isArray(categories)) {
        categories = translations.skills.categories.tech;
    }
    
    const skillsHTML = categories.map(category => `
        <div class="skill-category">
            <h3>${category.title}</h3>
            <div class="skill-tags">
                ${category.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    skillsGrid.innerHTML = skillsHTML;
}

// Function to update project count in hero stats
function updateProjectCount() {
    if (!projectMetadata) {
        return;
    }
    
    const projectCount = Object.keys(projectMetadata).length;
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Find the project count element (second stat)
    if (statNumbers.length >= 2) {
        const projectCountElement = statNumbers[1]; // Second stat is project count
        // Round up to the nearest 5
        const roundedCount = Math.ceil(projectCount / 5) * 5;
        projectCountElement.textContent = `${roundedCount}+`;
    }
}

// Update modal content dynamically
function updateModalContent(modalId) {
    const project = projectsData[modalId];
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Update modal content
    modal.querySelector('h2').textContent = project.title;
    
    // Clear existing media content
    const modalImages = modal.querySelector('.modal-images');
    modalImages.innerHTML = '';
    
    // Create only the media elements we need
    project.images.forEach((mediaSrc, index) => {
        const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.avi') || mediaSrc.endsWith('.mov') || mediaSrc.endsWith('.mkv');
        
        if (isVideo) {
            // Create video element
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.muted = true; // Required for autoplay in most browsers
            video.loop = true;
            video.src = mediaSrc;
            video.alt = project.title + ' - Video ' + (index + 1);
            modalImages.appendChild(video);
        } else {
            // Create image element
            const img = document.createElement('img');
            img.src = mediaSrc;
            img.alt = project.title + ' - Image ' + (index + 1);
            modalImages.appendChild(img);
        }
    });
    
    // Update description - always show full information in modals
    const description = modal.querySelector('.modal-description');
    description.innerHTML = `
        <h3>${window.i18n ? window.i18n.t('portfolio.modal.description') : 'Описание проекта'}</h3>
        <p><strong>${window.i18n ? window.i18n.t('portfolio.meta.created') : 'Дата создания'}:</strong> ${formatDate(project.date)}</p>
        <p><strong>${window.i18n ? window.i18n.t('portfolio.meta.developmentTime') : 'Время разработки'}:</strong> ${formatDevelopmentTime(project.developmentTime)}</p>
        <p>${project.detailedDescription}</p>
        
        <h3>${window.i18n ? window.i18n.t('portfolio.modal.keyFeatures') : 'Ключевые особенности'}</h3>
        <ul>
            ${project.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>${window.i18n ? window.i18n.t('portfolio.modal.technicalDetails') : 'Технические детали'}</h3>
        <p>${project.technicalDetails}</p>
        
        <h3>${window.i18n ? window.i18n.t('portfolio.modal.techStack') : 'Технологический стек'}</h3>
        <div class="tech-tags">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;
    
    // Update links
    const linksContainer = modal.querySelector('.modal-links');
    linksContainer.innerHTML = project.links.map(link => 
        `<a href="${link.url}" class="modal-link">${link.text}</a>`
    ).join('');
}

// Update modal content when opening
function openModalWithContent(modalId) {
    updateModalContent(modalId);
    openModal(modalId);
}

// Handle scroll to show/hide mode switcher
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const modeSwitcherHero = document.querySelector('.mode-switcher-hero');
    const modeSwitcherNav = document.querySelector('.mode-switcher-nav');
    
    if (!heroSection || !modeSwitcherHero || !modeSwitcherNav) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const scrollPosition = window.scrollY + 100; // navbar height offset
    
    if (scrollPosition > heroBottom) {
        modeSwitcherHero.classList.add('hidden');
        modeSwitcherNav.style.display = 'flex';
        setTimeout(() => modeSwitcherNav.classList.add('visible'), 10);
    } else {
        modeSwitcherHero.classList.remove('hidden');
        modeSwitcherNav.classList.remove('visible');
        setTimeout(() => {
            if (!modeSwitcherNav.classList.contains('visible')) {
                modeSwitcherNav.style.display = 'none';
            }
        }, 300);
    }
});

// Setup mode switcher toggle
function setupModeSwitcher() {
    const toggleInput = document.getElementById('modeToggle');
    const modeLabels = document.querySelectorAll('.mode-label');
    const navModeBtns = document.querySelectorAll('.mode-switcher-nav .mode-btn');
    
    if (!toggleInput) return;
    
    // Sync with current mode
    const currentMode = window.i18n && window.i18n.currentMode || 'simple';
    toggleInput.checked = currentMode === 'tech';
    updateModeLabels(currentMode);
    
    // Handle toggle change
    toggleInput.addEventListener('change', () => {
        const newMode = toggleInput.checked ? 'tech' : 'simple';
        if (window.i18n) {
            window.i18n.setMode(newMode);
        }
        updateModeLabels(newMode);
    });
    
    // Handle label clicks
    modeLabels.forEach((label, index) => {
        label.addEventListener('click', () => {
            const newMode = index === 0 ? 'simple' : 'tech';
            toggleInput.checked = newMode === 'tech';
            if (window.i18n) {
                window.i18n.setMode(newMode);
            }
            updateModeLabels(newMode);
        });
    });
    
    // Handle nav button clicks
    navModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newMode = btn.dataset.mode;
            toggleInput.checked = newMode === 'tech';
            if (window.i18n) {
                window.i18n.setMode(newMode);
            }
            updateModeLabels(newMode);
        });
    });
}

function updateModeLabels(mode) {
    const leftLabel = document.querySelector('.mode-label-left');
    const rightLabel = document.querySelector('.mode-label-right');
    
    if (leftLabel && rightLabel) {
        if (mode === 'simple') {
            leftLabel.classList.add('active');
            rightLabel.classList.remove('active');
        } else {
            leftLabel.classList.remove('active');
            rightLabel.classList.add('active');
        }
    }
}

// Initialize filter buttons and render projects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize internationalization
    if (window.i18n) {
        window.i18n.init();
        
        // Load projects data after i18n is initialized
        loadProjectsData();
        
        // Generate about text
        generateAboutText();
        
        // Generate skills
        generateSkills();
    }
    
    // Update project count after everything is loaded
    setTimeout(() => {
        updateProjectCount();
    }, 100);
    
    // Render all projects automatically
    renderProjects();
    
    // Render all modals automatically
    renderModals();
    
    // Setup mode switcher
    setupModeSwitcher();
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.dataset.category);
        });
    });
});
