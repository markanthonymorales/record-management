/**
 * Dashboard Page Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    // Protect this page
    if (!Auth.requireAuth()) {
        return;
    }

    // Initialize auth UI (user name, role, logout)
    Auth.initAuthUI();

    // Load and display task/record summaries
    loadDashboardData();
});

function loadDashboardData() {
    const tasks = Storage.getTasks();
    const records = Storage.getRecords();

    // Task counts
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;

    // Update task cards
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('completedTasks').textContent = completedTasks;

    // Record count
    document.getElementById('totalRecords').textContent = records.length;

    // TODO: Add recent activity section in future update
}
