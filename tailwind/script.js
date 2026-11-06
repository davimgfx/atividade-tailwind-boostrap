// ============================================================
// Interatividade da versão Tailwind (JavaScript nativo)
// ------------------------------------------------------------
// O Tailwind fornece apenas classes CSS utilitárias; toda a
// lógica dos componentes interativos é implementada aqui.
// ============================================================
(function () {
    'use strict';

    // --------------------------------------------------------
    // 1) NAVBAR — menu hamburger colapsável
    // --------------------------------------------------------
    const btnMenu = document.getElementById('btnMenu');
    const menu = document.getElementById('menuPrincipal');

    if (btnMenu && menu) {
        btnMenu.addEventListener('click', function () {
            const aberto = menu.classList.toggle('hidden') === false;
            menu.classList.toggle('flex', aberto);
            btnMenu.setAttribute('aria-expanded', String(aberto));
        });

        // Fecha o menu ao clicar em um link (mobile)
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                btnMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --------------------------------------------------------
    // 2) CARROSSEL — slides, indicadores, prev/next e auto-play
    // --------------------------------------------------------
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
        const track = carousel.querySelector('[data-carousel-track]');
        const slides = Array.from(track.children);
        const dotsContainer = carousel.querySelector('[data-carousel-dots]');
        const btnPrev = carousel.querySelector('[data-carousel-prev]');
        const btnNext = carousel.querySelector('[data-carousel-next]');

        let indiceAtual = 0;
        const total = slides.length;

        // Cria os indicadores (dots) dinamicamente
        const dots = slides.map(function (_, i) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'h-2.5 w-2.5 rounded-full bg-white/50 transition';
            dot.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
            dot.addEventListener('click', function () {
                irPara(i);
                reiniciarAutoplay();
            });
            dotsContainer.appendChild(dot);
            return dot;
        });

        function atualizar() {
            track.style.transform = 'translateX(-' + (indiceAtual * 100) + '%)';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('bg-white', i === indiceAtual);
                dot.classList.toggle('bg-white/50', i !== indiceAtual);
            });
        }

        function irPara(i) {
            indiceAtual = (i + total) % total;
            atualizar();
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', function () {
                irPara(indiceAtual - 1);
                reiniciarAutoplay();
            });
        }
        if (btnNext) {
            btnNext.addEventListener('click', function () {
                irPara(indiceAtual + 1);
                reiniciarAutoplay();
            });
        }

        // Auto-play
        let timer = setInterval(function () {
            irPara(indiceAtual + 1);
        }, 5000);

        function reiniciarAutoplay() {
            clearInterval(timer);
            timer = setInterval(function () {
                irPara(indiceAtual + 1);
            }, 5000);
        }

        atualizar();
    });

    // --------------------------------------------------------
    // 3) MODAL — abrir, fechar, overlay e tecla Esc
    // --------------------------------------------------------
    function abrirModal(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    function fecharModal(modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    // Botões que abrem um modal
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const modal = document.getElementById(btn.getAttribute('data-modal-open'));
            if (modal) abrirModal(modal);
        });
    });

    // Fechar: botões internos e clique no overlay
    document.querySelectorAll('[data-modal]').forEach(function (modal) {
        modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                fecharModal(modal);
            });
        });

        const overlay = modal.querySelector('[data-modal-overlay]');
        if (overlay) {
            overlay.addEventListener('click', function () {
                fecharModal(modal);
            });
        }
    });

    // --------------------------------------------------------
    // 4) FORMULÁRIO — validação com feedback visual (utility-first)
    // --------------------------------------------------------
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            let valido = true;

            // Valida cada campo obrigatório usando a API nativa (HTML5)
            form.querySelectorAll('input, select, textarea').forEach(function (campo) {
                const grupo = campo.closest('div');
                const erro = grupo ? grupo.querySelector('[data-error]') : null;

                if (!campo.checkValidity()) {
                    valido = false;
                    campo.classList.add('border-red-500');
                    campo.classList.remove('border-gray-300');
                    if (erro) erro.classList.remove('hidden');
                } else {
                    campo.classList.remove('border-red-500');
                    campo.classList.add('border-gray-300');
                    if (erro) erro.classList.add('hidden');
                }
            });

            if (valido) {
                alert('Formulário enviado com sucesso!');
                form.reset();
            }
        });
    });
})();
