/**
 * Login Page Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    Auth.redirectIfAuthenticated();

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

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
    document.getElementById('password').addEventListener('input', function() {
        errorMessage.classList.add('d-none');
    });
});
