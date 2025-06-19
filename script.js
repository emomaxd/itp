// script.js - Contains all JavaScript logic

// ====================================================================
// Configuration Data
// ====================================================================
const SITE_CONFIG = {
    phoneNumber: "0535 065 23 14",     // Phone number displayed in the footer
    rawPhoneNumber: "905350652314",    // WhatsApp link with country code, no spaces
    email: "info@ilaydatulperdeevi.com",
    address: "Kaynarca, Sakarya",
    footerExplanation: "Ücretsiz keşif ve ölçüm hizmeti"
};

// ====================================================================
// Utility Functions
// ====================================================================
/**
 * Smoothly scrolls the page to the section with the given ID.
 * @param {string} sectionId - The ID of the section to scroll to.
 */
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// ====================================================================
// Navigation Functions
// ====================================================================
/**
 * Scrolls to the examples section.
 * @param {string} category - Category to be displayed, used for analytics or logging.
 */
function showExamples(category) {
    document.getElementById('examples-container').scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * Toggles the expanded content for a given category.
 * Closes other expanded sections.
 * @param {string} category - The category of the expanded content to toggle.
 */
function toggleExpand(category) {
    const expandedContent = document.getElementById(category + '-expanded');

    // Close other expanded content sections
    const allExpanded = document.querySelectorAll('.expanded-content');
    allExpanded.forEach(content => {
        if (content.id !== category + '-expanded') {
            content.classList.remove('active');
        }
    });

    // Toggle the current content
    if (expandedContent) {
        expandedContent.classList.toggle('active');
    }
}

// ====================================================================
// Option Selection Logic
// ====================================================================
/**
 * Initializes option selection buttons. Allows one option to be selected per group.
 */
function initializeOptionSelection() {
    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent parent element's behavior (e.g., expansion)

            const parentSelectionGroup = button.closest('[data-selection-group]');
            
            if (parentSelectionGroup) {
                const buttonsInGroup = parentSelectionGroup.querySelectorAll('.option-btn');
                buttonsInGroup.forEach(btn => {
                    btn.classList.remove('selected');
                });
            }
            button.classList.add('selected');

            const selectedOption = button.dataset.option;
            const groupName = parentSelectionGroup ? parentSelectionGroup.dataset.selectionGroup : 'unknown-group';
            console.log(`Selected: ${groupName} - ${selectedOption}`);
        });
    });
}

// ====================================================================
// Quote Modal Logic
// ====================================================================
let currentQuoteCategory = '';

/**
 * Opens the quote modal for a given category.
 * @param {string} category - The category of the quote request.
 */
function requestQuote(category) {
    currentQuoteCategory = category;
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Closes the quote modal.
 */
function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Sets up the quote form and handles its submission.
 */
function setupQuoteForm() {
    const quoteForm = document.getElementById('quote-form');
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Quote requested");

        const selectedOptions = [];
        if (currentQuoteCategory) {
            document.querySelectorAll(`#${currentQuoteCategory}-expanded .option-btn.selected`).forEach(btn => {
                selectedOptions.push(btn.textContent);
            });
        }

        const formData = new FormData(e.target);
        const name = e.target.querySelector('input[placeholder="Adınız Soyadınız"]').value;
        const phone = e.target.querySelector('input[placeholder="Telefon Numaranız"]').value;
        const address = e.target.querySelector('input[placeholder="Adresiniz"]').value;
        const notes = e.target.querySelector('textarea').value;

        const message = `Hello! I am requesting a price quote for ${currentQuoteCategory.toUpperCase()}.\n\n` +
                       `👤 Name: ${name}\n` +
                       `📞 Phone: ${phone}\n` +
                       `📍 Address: ${address}\n` +
                       `🏷️ Selected Options: ${selectedOptions.join(', ') || 'Not specified'}\n` +
                       `💬 Notes: ${notes || 'None'}\n\n` +
                       `Could you let me know a suitable time for a free discovery visit?`;

        // WhatsApp number pulled from SITE_CONFIG
        const whatsappUrl = `https://wa.me/${SITE_CONFIG.rawPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        closeQuoteModal();
        e.target.reset();
        document.querySelectorAll('.option-btn.selected').forEach(btn => btn.classList.remove('selected'));
    });

    const quoteModal = document.getElementById('quote-modal');
    if (quoteModal) {
        quoteModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeQuoteModal();
            }
        });
    }

    document.querySelectorAll('.expanded-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

// ====================================================================
// Main Initialization Logic
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Expose functions globally
    window.scrollToSection = scrollToSection;
    window.showExamples = showExamples;
    window.toggleExpand = toggleExpand;
    window.requestQuote = requestQuote;
    window.closeQuoteModal = closeQuoteModal;

    // Set footer data using SITE_CONFIG
    const footerPhoneLink = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    const footerExplanation = document.getElementById('footer-explanation');
    const footerAddress = document.getElementById('footer-address');
    if (footerPhoneLink) {
        footerPhoneLink.href = `tel:+${SITE_CONFIG.rawPhoneNumber}`;
        footerPhoneLink.textContent = `📞 ${SITE_CONFIG.phoneNumber}`;
    }
    
    if (footerEmail) {
        footerEmail.href = `mailto:${SITE_CONFIG.email}`;
        footerEmail.textContent = `✉️ ${SITE_CONFIG.email}`;
    }

    if (footerExplanation) {
        footerExplanation.textContent = `${SITE_CONFIG.footerExplanation}`;
    }

    if (footerAddress) {
        footerAddress.textContent = `${SITE_CONFIG.address}`;
    }

    // Initialize other logic
    initializeOptionSelection(); // Initialize option selection behavior
    setupQuoteForm();            // Initialize quote form behavior
});
