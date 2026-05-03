/**
 * Tasks Page Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    // Protect this page
    if (!Auth.requireAuth()) {
        return;
    }

    // Initialize auth UI
    Auth.initAuthUI();

    // Load and display tasks
    loadTasks();

    // Setup add task button
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            alert('Task creation functionality will be implemented in Phase 04');
        });
    }
});

function loadTasks() {
    const tasks = Storage.getTasks();
    const tbody = document.getElementById('tasksTableBody');
    const currentUser = Auth.getCurrentUser();

    tbody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        
        // Check if staff can edit this task
        const canEdit = Auth.isAdmin() || task.assignedTo === currentUser.username;

        row.innerHTML = `
            <td>${escapeHtml(task.title || '')}</td>
            <td>${escapeHtml(task.description || '')}</td>
            <td><span class="badge bg-${getStatusBadgeColor(task.status)}">${escapeHtml(task.status)}</span></td>
            <td>${escapeHtml(task.assignedTo || 'Unassigned')}</td>
            <td>
                ${canEdit ? '<button class="btn btn-sm btn-primary">Edit</button>' : ''}
                ${Auth.isAdmin() ? '<button class="btn btn-sm btn-danger ms-1">Delete</button>' : ''}
            </td>
        `;

        tbody.appendChild(row);
    });

    if (tasks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center text-muted">No tasks found. Add a task to get started.</td>';
        tbody.appendChild(row);
    }
}

function getStatusBadgeColor(status) {
    switch(status) {
        case 'Completed': return 'success';
        case 'In Progress': return 'warning';
        case 'Pending': return 'secondary';
        default: return 'secondary';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
