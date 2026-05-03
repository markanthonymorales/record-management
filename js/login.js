/**
 * Login Page Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    Auth.redirectIfAuthenticated();

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.textContent = type === 'password' ? '👁' : '🙈';
            }
        });
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value;

        // Basic validation
        if (!username || !password) {
            errorMessage.textContent = 'Please enter both username and password.';
            errorMessage.classList.remove('d-none');
            return;
        }

        // Attempt login
        const user = Auth.login(username, password);

        if (user) {
            // Redirect to dashboard on success
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid username or password.';
            errorMessage.classList.remove('d-none');
        }
    });

    // Clear error on input
    document.getElementById('username').addEventListener('input', function() {
        errorMessage.classList.add('d-none');
    });
    passwordInput.addEventListener('input', function() {
        errorMessage.classList.add('d-none');
    });
});
