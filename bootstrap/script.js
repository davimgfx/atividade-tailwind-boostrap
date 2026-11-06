(function () {
    'use strict';

    const formularios = document.querySelectorAll('.needs-validation');

    Array.from(formularios).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // Formulário válido: previne o reload apenas para demonstração.
                event.preventDefault();
                alert('Formulário enviado com sucesso!');
                form.reset();
                form.classList.remove('was-validated');
                return;
            }

            form.classList.add('was-validated');
        }, false);
    });
})();
