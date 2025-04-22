document.addEventListener('DOMContentLoaded', function() {
    // Animación de scroll para el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Creación y funcionalidad del menú hamburguesa para móviles (Movido aquí arriba)
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    document.querySelector('header').appendChild(hamburger);

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('open');
        hamburger.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
    });

    // Manejo de navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Ocultar todas las secciones de contenido
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Mostrar la sección correspondiente
            const targetSection = this.getAttribute('data-section');
            const targetSectionId = targetSection + '-content';

            // Asegurarse de que el elemento existe antes de intentar acceder a él
            const targetElement = document.getElementById(targetSectionId);
            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Scroll hacia el elemento dentro de la sección si es necesario
            const targetElementId = this.getAttribute('href');
            if (targetElementId !== '#main-content' && targetElementId !== '#about-us-content') {
                setTimeout(() => {
                    const element = document.querySelector(targetElementId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Cerrar el menú móvil si está abierto
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.innerHTML = '☰';
            }
        });
    });

    // Botón para volver al contenido principal desde Sobre Nosotros
    const backToMainBtn = document.getElementById('backToMain');
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', function() {
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('main-content').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Aplicar la clase fade-in a los elementos que queremos animar
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Funcionalidad del botón Demo
    const demoButton = document.getElementById('demoButton');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});