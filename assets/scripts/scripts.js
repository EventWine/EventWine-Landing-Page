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
            // Redirección a la página desplegada
            window.location.href = 'https://event-wine-front.vercel.app/home/sign-in';
            // Reemplaza la URL de arriba con la URL real de tu página desplegada
        });
    }

    // FUNCIONALIDADES PARA EL FOOTER MEJORADO

    // Funcionalidad para el formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Aquí iría el código para procesar la suscripción
                // Para esta demo, solo mostramos un mensaje
                alert('¡Gracias por suscribirte a nuestro boletín informativo!');
                emailInput.value = '';
            }
        });
    }

    // Mejora de experiencia en enlaces de redes sociales
    const socialLinks = document.querySelectorAll('.social-icons a');
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.setAttribute('rel', 'noopener noreferrer');

            // Añadir atributo title para mejorar accesibilidad
            const icon = link.querySelector('i');
            if (icon) {
                const socialNetwork = icon.className.includes('facebook') ? 'Facebook' :
                    icon.className.includes('instagram') ? 'Instagram' :
                        icon.className.includes('twitter') ? 'Twitter' :
                            icon.className.includes('linkedin') ? 'LinkedIn' : 'Redes sociales';
                link.setAttribute('title', `Síguenos en ${socialNetwork}`);
            }
        });
    }

    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && message) {
                // Aquí iría el código para procesar el formulario de contacto
                alert(`¡Gracias ${name} por tu mensaje! Te responderemos pronto.`);
                contactForm.reset();
            }
        });
    }

    // FUNCIONALIDAD DEL BANNER DE COOKIES

    // Manejo del banner de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    // Comprobar si el usuario ya ha tomado una decisión sobre las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (cookiesAccepted === null && cookieBanner) {
        // Si el usuario no ha tomado una decisión, mostrar el banner
        cookieBanner.style.display = 'block';

        if (acceptCookies) {
            acceptCookies.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.style.display = 'none';
                // Aquí se podrían activar las cookies que no son esenciales
            });
        }

        if (rejectCookies) {
            rejectCookies.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'false');
                cookieBanner.style.display = 'none';
                // Aquí se podrían desactivar las cookies que no son esenciales
            });
        }
    }

    // Funcionalidad para los enlaces de navegación en las páginas de políticas
    const policyNavLinks = document.querySelectorAll('nav a');
    if (policyNavLinks.length > 0) {
        policyNavLinks.forEach(link => {
            // Si estamos en una página de políticas y el enlace contiene un #
            if (window.location.pathname.includes('politica') ||
                window.location.pathname.includes('terminos')) {

                const href = link.getAttribute('href');
                if (href && href.includes('#') && !href.startsWith('#')) {
                    // Es un enlace a una sección de la página principal
                    link.addEventListener('click', function(e) {
                        // No prevenimos el evento por defecto, permitimos la navegación
                        // pero guardamos la sección objetivo en localStorage
                        const target = href.split('#')[1];
                        if (target) {
                            localStorage.setItem('scrollToSection', target);
                        }
                    });
                }
            }
        });
    }

    // Verificar si hay que hacer scroll a alguna sección (al volver de páginas de políticas)
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection && window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        // Estamos en la página principal y hay una sección a la que ir
        setTimeout(() => {
            const section = document.getElementById(scrollToSection);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            // Limpiar después de usar
            localStorage.removeItem('scrollToSection');
        }, 500); // Pequeño retraso para asegurar que la página esté cargada
    }
});