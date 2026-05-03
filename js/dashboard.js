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

    // Records by type
    updateRecordsByType(records);

    // Recent activity
    updateRecentActivity(tasks, records);
}

function updateRecordsByType(records) {
    // Count records by type
    const typeCounts = {
        'Document': 0,
        'Image': 0,
        'Report': 0,
        'Other': 0
    };

    records.forEach(record => {
        const type = record.type || 'Other';
        if (typeCounts.hasOwnProperty(type)) {
            typeCounts[type]++;
        } else {
            typeCounts['Other']++;
        }
    });

    // Update the UI
    document.getElementById('documentCount').textContent = typeCounts['Document'];
    document.getElementById('imageCount').textContent = typeCounts['Image'];
    document.getElementById('reportCount').textContent = typeCounts['Report'];
    document.getElementById('otherCount').textContent = typeCounts['Other'];
}

function updateRecentActivity(tasks, records) {
    // Get recent tasks (last 5)
    const recentTasks = tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    // Get recent records (last 5)
    const recentRecords = records
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    // Update recent tasks list
    const recentTasksList = document.getElementById('recentTasksList');
    if (recentTasks.length > 0) {
        recentTasksList.innerHTML = recentTasks.map(task => `
            <a href="tasks.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${task.title || 'Untitled Task'}</h6>
                    <small class="text-muted">${formatDate(task.createdAt)}</small>
                </div>
                <p class="mb-1 small">Status: <span class="badge bg-${getStatusBadgeColor(task.status)}">${task.status || 'Pending'}</span></p>
            </a>
        `).join('');
    } else {
        recentTasksList.innerHTML = '<p class="text-muted">No recent tasks</p>';
    }

    // Update recent records list
    const recentRecordsList = document.getElementById('recentRecordsList');
    if (recentRecords.length > 0) {
        recentRecordsList.innerHTML = recentRecords.map(record => `
            <a href="records.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${record.name || 'Untitled Record'}</h6>
                    <small class="text-muted">${formatDate(record.createdAt)}</small>
                </div>
                <p class="mb-1 small">Type: ${record.type || 'Other'}</p>
            </a>
        `).join('');
    } else {
        recentRecordsList.innerHTML = '<p class="text-muted">No recent records</p>';
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function getStatusBadgeColor(status) {
    switch(status) {
        case 'Pending': return 'warning';
        case 'In Progress': return 'primary';
        case 'Completed': return 'success';
        default: return 'secondary';
    }
}
