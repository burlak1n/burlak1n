// Internationalization system
class I18n {
    constructor() {
        this.currentLang = 'ru';
        this.currentMode = 'simple'; // simple or tech
        this.translations = { ru, en };
    }

    // Get translation by key path (e.g., 'nav.about')
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
        }
        
        return this.resolveModeValue(value);
    }
    
    // Resolve mode-specific values (simple/tech)
    resolveModeValue(value) {
        // If value is an object with simple/tech keys
        if (value && typeof value === 'object' && !Array.isArray(value) && (value.simple || value.tech)) {
            return value[this.currentMode] || value.simple || value.tech;
        }
        
        return value;
    }

    // Set language and update UI
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateUI();
            localStorage.setItem('language', lang);
            
            // Update projects when language changes
            if (typeof updateProjectsOnLanguageChange === 'function') {
                updateProjectsOnLanguageChange();
            }
            
            // Update about text when language changes
            if (typeof generateAboutText === 'function') {
                generateAboutText();
            }
            
            // Update skills when language changes
            if (typeof generateSkills === 'function') {
                generateSkills();
            }
        }
    }

    // Set mode (simple/tech) and update UI
    setMode(mode) {
        if (mode === 'simple' || mode === 'tech') {
            this.currentMode = mode;
            
            // Update body data-mode attribute for color scheme
            document.body.setAttribute('data-mode', mode);
            
            // Add transition class
            document.body.classList.add('mode-transitioning');
            
            setTimeout(() => {
                this.updateUI();
                localStorage.setItem('mode', mode);
                
                // Update projects when mode changes
                if (typeof updateProjectsOnLanguageChange === 'function') {
                    updateProjectsOnLanguageChange();
                }
                
                // Update about text when mode changes
                if (typeof generateAboutText === 'function') {
                    generateAboutText();
                }
                
                // Update skills when mode changes
                if (typeof generateSkills === 'function') {
                    generateSkills();
                }
                
                // Remove transition class
                setTimeout(() => {
                    document.body.classList.remove('mode-transitioning');
                }, 50);
            }, 150);
        }
    }

    // Update all elements with data-i18n attributes
    updateUI() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            let translation = this.t(key);
            
            if (Array.isArray(translation)) {
                // Handle arrays (like description paragraphs)
                element.innerHTML = translation.map(item => `<p>${item}</p>`).join('');
            } else if (typeof translation === 'string') {
                element.textContent = translation;
            } else {
                console.warn(`Invalid translation type for key: ${key}`, translation);
            }
        });

        // Update language switcher buttons
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });

        // Update mode switcher buttons
        const modeBtns = document.querySelectorAll('.mode-btn');
        modeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === this.currentMode) {
                btn.classList.add('active');
            }
        });
        
        // Update toggle switch
        const toggleInput = document.getElementById('modeToggle');
        if (toggleInput) {
            toggleInput.checked = this.currentMode === 'tech';
        }
        
        // Update mode labels
        if (typeof updateModeLabels === 'function') {
            updateModeLabels(this.currentMode);
        }

        // Update document language
        document.documentElement.lang = this.currentLang;
    }

    // Initialize i18n system
    init() {
        // Load saved language or default to Russian
        const savedLang = localStorage.getItem('language') || 'ru';
        const savedMode = localStorage.getItem('mode') || 'simple';
        
        this.currentMode = savedMode;
        
        // Set initial color scheme
        document.body.setAttribute('data-mode', savedMode);
        
        this.setLanguage(savedLang);

        // Add event listeners for language switcher
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });

        // Add event listeners for mode switcher
        const modeBtns = document.querySelectorAll('.mode-btn');
        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setMode(btn.dataset.mode);
            });
        });
    }
}

// Create global i18n instance
window.i18n = new I18n();
