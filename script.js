// Performans odaklı JavaScript
let currentActiveExample = null;

// Case Study verileri
const caseStudies = {
  'tul-modern': {
    title: 'Modern Şeffaf Tül Perdeler',
    image: 'bg-gradient-to-br from-white to-gray-200',
    description: 'Bu projede müşterimizin salonunda doğal ışığı maksimum seviyede geçiren modern şeffaf tül perdeler kullandık. Minimalist tasarım anlayışıyla mekanın ferahlığını artırdık.',
    testimonial: 'Harika bir çalışma oldu! Salonumuz çok daha aydınlık ve ferah görünüyor. İlayda Hanım\'ın önerileri mükemmeldi.',
    customer: '- Ayşe K., Adapazarı',
    details: 'Proje Süresi: 2 gün<br>Malzeme: Premium şeffaf tül<br>Mekan: 35m² salon<br>Özel Özellik: Motorlu sistem'
  },
  'tul-desenli': {
    title: 'Desenli Tül Perdeler',
    image: 'bg-gradient-to-br from-cream-100 to-cream-300',
    description: 'Klasik tarzı seven müşterimiz için özel desenli tül perdeler tasarladık. Zarafet ve fonksiyonelliği bir araya getiren bu çalışma, odaya büyüleyici bir atmosfer kattı.',
    testimonial: 'Desenler çok zarif ve kaliteli. Misafirlerimiz sürekli perdelerimizi övüyor. Teşekkürler!',
    customer: '- Mehmet B., Sakarya',
    details: 'Proje Süresi: 3 gün<br>Malzeme: Jakarlı desenli tül<br>Mekan: Oturma odası + Yemek odası<br>Özel Özellik: Özel desen tasarımı'
  },
  'stor-zebra': {
    title: 'Zebra Stor Perdeler',
    image: 'bg-gradient-to-br from-gray-300 to-gray-500',
    description: 'Ofis ortamında ışık kontrolü sağlamak için zebra stor perdeler tercih ettik. Pratik kullanım ve modern görünüm bir arada.',
    testimonial: 'Çalışma ortamımız çok daha konforlu oldu. Işık kontrolü mükemmel!',
    customer: '- Fatma Y., Adapazarı',
    details: 'Proje Süresi: 1 gün<br>Malzeme: Zebra stor kumaş<br>Mekan: Ofis - 6 pencere<br>Özel Özellik: Uzaktan kumanda'
  },
  'stor-ahsap': {
    title: 'Ahşap Stor Perdeler',
    image: 'bg-gradient-to-br from-brown-200 to-brown-400',
    description: 'Doğal ahşap dokusunu seven müşterimiz için özel ahşap stor perdeler hazırladık. Sıcak ve doğal bir atmosfer yarattık.',
    testimonial: 'Ahşabın sıcaklığı evimize çok yakıştı. Çok memnunuz.',
    customer: '- Ali R., Sakarya',
    details: 'Proje Süresi: 2 gün<br>Malzeme: Bambu ahşap<br>Mekan: Yatak odası<br>Özel Özellik: Doğal malzeme'
  },
  'zebra-klasik': {
    title: 'Klasik Zebra Perdeler',
    image: 'bg-gradient-to-br from-red-400 to-red-600',
    description: 'Geleneksel evde modern dokunuş için klasik zebra perdeler kullandık. Zamansız zarafet ve işlevsellik.',
    testimonial: 'Hem klasik hem modern... Tam aradığımız gibiydi!',
    customer: '- Zeynep A., Adapazarı',
    details: 'Proje Süresi: 2 gün<br>Malzeme: Premium zebra kumaş<br>Mekan: Salon + Balkon<br>Özel Özellik: Krem renk tonları'
  },
  'zebra-modern': {
    title: 'Modern Zebra Perdeler',
    image: 'bg-gradient-to-br from-navy-400 to-navy-600',
    description: 'Çağdaş tasarım anlayışıyla modern zebra perdeler. Minimalist çizgiler ve maksimum fonksiyonellik.',
    testimonial: 'Evimizin modern havası tamamlandı. Çok şık görünüyor.',
    customer: '- Can M., Sakarya',
    details: 'Proje Süresi: 1 gün<br>Malzeme: Modern zebra kumaş<br>Mekan: Oturma odası<br>Özel Özellik: Lacivert tonlar'
  },
  'jaluzi-ahsap': {
    title: 'Ahşap Jaluzi Perdeler',
    image: 'bg-gradient-to-br from-gold-300 to-gold-500',
    description: 'Doğal ahşap jaluzi perdeler ile sıcak ve şık bir ortam yaratıldı. Klasik zarafet modern konforda.',
    testimonial: 'Ahşap jaluzi harika oldu! Evimize çok uydu.',
    customer: '- Elif K., Adapazarı',
    details: 'Proje Süresi: 3 gün<br>Malzeme: Masif ahşap<br>Mekan: Çalışma odası<br>Özel Özellik: Özel boyama'
  },
  'jaluzi-alüminyum': {
    title: 'Alüminyum Jaluzi Perdeler',
    image: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    description: 'Dayanıklı alüminyum jaluzi perdeler ile pratik ve uzun ömürlü çözüm. Nemli mekanlara ideal.',
    testimonial: 'Banyoda kullanıyoruz, hiç problem yok. Çok pratik!',
    customer: '- Hasan B., Sakarya',
    details: 'Proje Süresi: 1 gün<br>Malzeme: Alüminyum<br>Mekan: Banyo + Mutfak<br>Özel Özellik: Su geçirmez'
  },
  'rustik-bambu': {
    title: 'Bambu Rustik Perdeler',
    image: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
    description: 'Ekolojik bambu rustik perdeler ile doğal ve sürdürülebilir dekorasyon. Çevre dostu seçim.',
    testimonial: 'Doğal bambu perdeler harika! Çok özgün bir görünüm.',
    customer: '- Gül T., Adapazarı',
    details: 'Proje Süresi: 2 gün<br>Malzeme: Doğal bambu<br>Mekan: Veranda<br>Özel Özellik: Ekolojik malzeme'
  },
  'rustik-hasir': {
    title: 'Hasır Rustik Perdeler',
    image: 'bg-gradient-to-br from-orange-300 to-orange-500',
    description: 'Geleneksel hasır rustik perdeler ile nostaljik ve sıcak bir atmosfer. El işçiliği ile özel tasarım.',
    testimonial: 'Nostaljik havası çok güzel! Babamın evini hatırlattı.',
    customer: '- Osman D., Sakarya',
    details: 'Proje Süresi: 4 gün<br>Malzeme: El örgüsü hasır<br>Mekan: Kış bahçesi<br>Özel Özellik: El işçiliği'
  }
};

// Scroll fonksiyonu
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Örnekleri gösterme fonksiyonu
function showExamples(category) {
  // Mevcut aktif örneği gizle
  if (currentActiveExample) {
    currentActiveExample.classList.remove('active');
  }
  
  // Yeni kategori örneklerini göster
  const newExamples = document.getElementById(category + '-examples');
  if (newExamples) {
    newExamples.classList.add('active');
    currentActiveExample = newExamples;
    
    // Smooth scroll to examples
    setTimeout(() => {
      newExamples.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  }
}

// Case Study açma fonksiyonu
function openCaseStudy(caseId) {
  const caseData = caseStudies[caseId];
  if (!caseData) return;

  // Modal içeriğini doldur
  document.getElementById('modalTitle').textContent = caseData.title;
  document.getElementById('modalImage').className = `h-64 rounded-lg mb-4 ${caseData.image} flex items-center justify-center`;
  document.getElementById('modalImage').innerHTML = `<span class="text-lg font-bold">${caseData.title}</span>`;
  document.getElementById('modalDescription').innerHTML = `<p class="text-lg leading-relaxed">${caseData.description}</p>`;
  document.getElementById('modalTestimonial').innerHTML = `"${caseData.testimonial}"`;
  document.getElementById('modalCustomer').textContent = caseData.customer;
  document.getElementById('modalDetails').innerHTML = caseData.details;

  // Galeri oluştur (demo amaçlı)
  const gallery = document.getElementById('modalGallery');
  gallery.innerHTML = '';
  for (let i = 1; i <= 3; i++) {
    const thumb = document.createElement('div');
    thumb.className = `h-20 ${caseData.image} rounded cursor-pointer hover:scale-110 transition-all flex items-center justify-center`;
    thumb.innerHTML = `<span class="text-xs font-bold">${i}</span>`;
    thumb.onclick = () => {
      document.getElementById('modalImage').className = `h-64 rounded-lg mb-4 ${caseData.image} flex items-center justify-center`;
    };
    gallery.appendChild(thumb);
  }

  // Modal'ı göster
  document.getElementById('caseStudyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Case Study kapatma fonksiyonu
function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
  // Modal dışına tıklama ile kapatma
  document.getElementById('caseStudyModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCaseStudy();
    }
  });

  // ESC tuşu ile kapatma
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCaseStudy();
    }
  });

  // Touch/hover optimizasyonları
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    }, { passive: true });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = 'translateY(0) scale(1)';
      }, 150);
    }, { passive: true });
  });

  // Example cards hover efekti
  const exampleCards = document.querySelectorAll('.example-card');
  exampleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Sayfa scroll efektleri
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.pageYOffset;

  sections.forEach(section => {
    const offsetTop = section.offsetTop - 100;
    const height = section.offsetHeight;

    if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
      // Aktif section efektleri buraya eklenebilir
    }
  });
});
