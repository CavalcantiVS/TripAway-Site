document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginFormElement');
    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    if (showRegisterFormLink) {
        showRegisterFormLink.addEventListener('click', function () {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
        });
    }

    if (showLoginFormLink) {
        showLoginFormLink.addEventListener('click', function () {
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Login efetuado com sucesso!');
            var modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
        });
    }
});
