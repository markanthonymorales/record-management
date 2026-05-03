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
            openTaskModal();
        });
    }

    // Setup save task button
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    if (saveTaskBtn) {
        saveTaskBtn.addEventListener('click', saveTask);
    }

    // Setup search and filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(loadTasks, 300));
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', loadTasks);
    }

    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            document.getElementById('searchInput').value = '';
            document.getElementById('statusFilter').value = '';
            loadTasks();
        });
    }
});

let taskModal = null;

function getTaskModal() {
    if (!taskModal) {
        taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
    }
    return taskModal;
}

function openTaskModal(taskId = null) {
    const modal = getTaskModal();
    const form = document.getElementById('taskForm');
    const title = document.getElementById('taskModalTitle');

    // Reset form
    form.reset();
    document.getElementById('taskId').value = '';

    if (taskId) {
        // Edit mode
        title.textContent = 'Edit Task';
        const tasks = Storage.getTasks();
        const task = tasks.find(t => t.id == taskId);
        if (task) {
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title || '';
            document.getElementById('taskDescription').value = task.description || '';
            document.getElementById('taskStatus').value = task.status || 'Pending';
            document.getElementById('taskAssignedTo').value = task.assignedTo || 'staff';
        }
    } else {
        // Create mode
        title.textContent = 'Add New Task';
    }

    modal.show();
}

function saveTask() {
    const taskId = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const status = document.getElementById('taskStatus').value;
    const assignedTo = document.getElementById('taskAssignedTo').value;

    // Validate required fields
    if (!title) {
        alert('Please enter a task title');
        return;
    }

    if (taskId) {
        // Update existing task
        const updates = {
            title,
            description,
            status,
            assignedTo
        };
        Storage.updateTask(parseInt(taskId), updates);
    } else {
        // Create new task
        const newTask = {
            title,
            description,
            status,
            assignedTo,
            createdBy: Auth.getCurrentUser().username
        };
        Storage.addTask(newTask);
    }

    // Close modal and reload tasks
    getTaskModal().hide();
    loadTasks();

    // Refresh dashboard if on same page (updates counts)
    if (window.opener && !window.opener.closed) {
        window.opener.loadDashboardData && window.opener.loadDashboardData();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        Storage.deleteTask(taskId);
        loadTasks();
    }
}

function loadTasks() {
    const tasks = Storage.getTasks();
    const tbody = document.getElementById('tasksTableBody');
    const currentUser = Auth.getCurrentUser();

    // Apply filters
    let filteredTasks = tasks;

    // Search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task =>
            (task.title && task.title.toLowerCase().includes(searchTerm)) ||
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
    }

    // Status filter
    const statusFilter = document.getElementById('statusFilter').value;
    if (statusFilter) {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }

    // Sort by created date (newest first)
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    tbody.innerHTML = '';

    filteredTasks.forEach(task => {
        const row = document.createElement('tr');

        // Check if staff can edit this task
        const canEdit = Auth.isAdmin() || task.assignedTo === currentUser.username;

        row.innerHTML = `
            <td>${escapeHtml(task.title || '')}</td>
            <td>${escapeHtml(task.description || '')}</td>
            <td>
                <span class="badge bg-${getStatusBadgeColor(task.status)}">${escapeHtml(task.status)}</span>
                ${canEdit ? `<button class="btn btn-sm btn-outline-success ms-2" onclick="updateTaskStatus(${task.id})">Change</button>` : ''}
            </td>
            <td>${escapeHtml(task.assignedTo || 'Unassigned')}</td>
            <td>
                ${canEdit ? `<button class="btn btn-sm btn-primary" onclick="openTaskModal(${task.id})">Edit</button>` : ''}
                ${Auth.isAdmin() ? `<button class="btn btn-sm btn-danger ms-1" onclick="deleteTask(${task.id})">Delete</button>` : ''}
            </td>
        `;

        tbody.appendChild(row);
    });

    if (filteredTasks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="text-center text-muted">No tasks found. Add a task to get started.</td>';
        tbody.appendChild(row);
    }
}

function updateTaskStatus(taskId) {
    const tasks = Storage.getTasks();
    const task = tasks.find(t => t.id == taskId);
    if (!task) return;

    // Linear status flow: Pending -> In Progress -> Completed (no going back)
    const statusFlow = ['Pending', 'In Progress', 'Completed'];
    const currentIndex = statusFlow.indexOf(task.status);

    // If already completed, don't change
    if (currentIndex >= statusFlow.length - 1) {
        alert('Task is already completed!');
        return;
    }

    const newStatus = statusFlow[currentIndex + 1];

    if (confirm(`Change task status from "${task.status}" to "${newStatus}"?`)) {
        Storage.updateTask(taskId, { status: newStatus });
        loadTasks();
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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
