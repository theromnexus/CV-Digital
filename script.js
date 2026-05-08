// Resaltar los enlaces del menú al hacer scroll (ScrollSpy) y efecto en el header.
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Transición del Header en Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = 'none';
    }

    // ScrollSpy: Resaltar elemento activo del nav en función de la altura
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
