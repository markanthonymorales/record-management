/**
 * Authentication Utility Module
 * Handles user login, logout, and role-based access
 */

const Auth = (function() {
    /**
     * Login with username and password
     * Returns user object if successful, null if failed
     */
    function login(username, password) {
        const users = Storage.getUsers();
        const user = users.find(u => 
            u.username === username && u.password === password
        );
        
        if (user) {
            // Store current user (exclude password)
            const { password: _, ...userWithoutPassword } = user;
            Storage.setCurrentUser(userWithoutPassword);
            return userWithoutPassword;
        }
        
        return null;
    }

    /**
     * Logout current user
     */
    function logout() {
        Storage.clearCurrentUser();
    }

    /**
     * Check if user is logged in
     */
    function isLoggedIn() {
        return Storage.getCurrentUser() !== null;
    }

    /**
     * Get current logged in user
     */
    function getCurrentUser() {
        return Storage.getCurrentUser();
    }

    /**
     * Get current user's role
     */
    function getRole() {
        const user = getCurrentUser();
        return user ? user.role : null;
    }

    /**
     * Check if current user is Administrator
     */
    function isAdmin() {
        return getRole() === 'Administrator';
    }

    /**
     * Check if current user is Staff
     */
    function isStaff() {
        return getRole() === 'Staff';
    }

    /**
     * Protect a page - redirect to login if not authenticated
     */
    function requireAuth() {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Protect a page - redirect to dashboard if already authenticated
     * (Use on login page)
     */
    function redirectIfAuthenticated() {
        if (isLoggedIn()) {
            window.location.href = 'dashboard.html';
            return true;
        }
        return false;
    }

    /**
     * Initialize auth UI elements (user name, role, logout button)
     * Call this on pages with navbar
     */
    function initAuthUI() {
        const user = getCurrentUser();
        if (!user) {
            // Not logged in, redirect will happen via requireAuth
            return;
        }

        // Update user name in navbar
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = user.name;
        }

        // Update user role in dropdown
        const userRoleEl = document.getElementById('userRole');
        if (userRoleEl) {
            userRoleEl.textContent = user.role;
        }

        // Update welcome message if exists
        const welcomeUserEl = document.getElementById('welcomeUser');
        if (welcomeUserEl) {
            welcomeUserEl.textContent = user.name;
        }

        // Setup logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
                window.location.href = 'login.html';
            });
        }

        // Role-based menu visibility
        updateMenuByRole();
    }

    /**
     * Update navigation menu based on user role
     */
    function updateMenuByRole() {
        const isAdminUser = isAdmin();
        
        // Example: Hide certain menu items for Staff
        // This can be extended based on requirements
        const adminOnlyElements = document.querySelectorAll('.admin-only');
        adminOnlyElements.forEach(el => {
            el.style.display = isAdminUser ? 'block' : 'none';
        });
    }

    // Public API
    return {
        login,
        logout,
        isLoggedIn,
        getCurrentUser,
        getRole,
        isAdmin,
        isStaff,
        requireAuth,
        redirectIfAuthenticated,
        initAuthUI,
        updateMenuByRole
    };
})();
