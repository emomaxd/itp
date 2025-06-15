    // Smooth scroll function
    function scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
      });
    }

    // Show examples function (legacy - keeping for compatibility)
    function showExamples(category) {
      // Smooth scroll to examples
      document.getElementById('examples-container').scrollIntoView({
        behavior: 'smooth'
      });
    }

    // Toggle expand functionality
    function toggleExpand(category) {
      const expandedContent = document.getElementById(category + '-expanded');
      
      // Close all other expanded contents
      const allExpanded = document.querySelectorAll('.expanded-content');
      allExpanded.forEach(content => {
        if (content.id !== category + '-expanded') {
          content.classList.remove('active');
        }
      });

      // Toggle current expanded content
      expandedContent.classList.toggle('active');
    }

    // Option button selection
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('option-btn')) {
        // Remove selected class from siblings
        const siblings = e.target.parentElement.querySelectorAll('.option-btn');
        siblings.forEach(btn => btn.classList.remove('selected'));
        
        // Add selected class to clicked button
        e.target.classList.add('selected');
      }
    });

    // Quote request functionality
    let currentQuoteCategory = '';
    
    function requestQuote(category) {
      currentQuoteCategory = category;
      document.getElementById('quote-modal').classList.remove('hidden');
    }

    function closeQuoteModal() {
      document.getElementById('quote-modal').classList.add('hidden');
    }

    // Handle quote form submission
    document.getElementById('quote-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get selected options
      const selectedOptions = [];
      document.querySelectorAll(`#${currentQuoteCategory}-expanded .option-btn.selected`).forEach(btn => {
        selectedOptions.push(btn.textContent);
      });
      
      // Get form data
      const formData = new FormData(e.target);
      const name = e.target.querySelector('input[placeholder="Adınız Soyadınız"]').value;
      const phone = e.target.querySelector('input[placeholder="Telefon Numaranız"]').value;
      const address = e.target.querySelector('input[placeholder="Adresiniz"]').value;
      const notes = e.target.querySelector('textarea').value;
      
      // Create WhatsApp message
      const message = `Merhaba! ${currentQuoteCategory.toUpperCase()} için fiyat teklifi istiyorum.

👤 Ad Soyad: ${name}
📞 Telefon: ${phone}
📍 Adres: ${address}
🏷️ Seçilen Özellikler: ${selectedOptions.join(', ')}
💬 Notlar: ${notes}

Ücretsiz keşif için uygun zamanınızı öğrenebilir miyim?`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/905XXXXXXXX?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      // Close modal
      closeQuoteModal();
      
      // Reset form
      e.target.reset();
      
      // Reset selected options
      document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    });

    // Close modal when clicking outside
    document.getElementById('quote-modal').addEventListener('click', function(e) {
      if (e.target === this) {
        closeQuoteModal();
      }
    });

    // Prevent event bubbling for card clicks
    document.querySelectorAll('.expanded-content').forEach(content => {
      content.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
