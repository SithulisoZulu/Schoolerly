        // Initialize i18next
        i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            resources: {
                en: {
                    translation: {
                        heading: 'Hello, World!',
                        paragraph: 'This is a sample webpage.',
                    }
                },
                fr: {
                    translation: {
                        heading: 'Bonjour le ghghfghfghfghfghfghh!',
                        paragraph: 'Ceci est une page d\'exemple.',
                    }
                }
                // Add translations for other languages as needed
            },
            fallbackLng: 'en', // Set the default language
        }, function (err, t) {
            // Initialize i18next
            updateContent();
    
            // Update translations when the language is changed
            document.getElementById('language-select').addEventListener('change', function () {
                const selectedLanguage = this.value;
                i18next.changeLanguage(selectedLanguage, (err, t) => {
                    updateContent();
                });
            });
        });
    
    // Function to update content with translations
    function updateContent() {
        const translationIds = document.querySelectorAll('[data-i18n]');
        translationIds.forEach((element) => {
            const translationKey = element.getAttribute('data-i18n');
            element.textContent = i18next.t(translationKey);
        });
    }
    