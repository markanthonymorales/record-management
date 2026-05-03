/**
 * Records Page Handler
 */

document.addEventListener('DOMContentLoaded', function() {
    // Protect this page
    if (!Auth.requireAuth()) {
        return;
    }

    // Initialize auth UI
    Auth.initAuthUI();

    // Load and display records
    loadRecords();

    // Setup add record button
    const addRecordBtn = document.getElementById('addRecordBtn');
    if (addRecordBtn) {
        addRecordBtn.addEventListener('click', function() {
            alert('Record creation functionality will be implemented in Phase 05');
        });
    }
});

function loadRecords() {
    const records = Storage.getRecords();
    const tbody = document.getElementById('recordsTableBody');
    const currentUser = Auth.getCurrentUser();

    tbody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        
        // Check if staff can edit this record (created by them)
        const canEdit = Auth.isAdmin() || record.createdBy === currentUser.username;

        row.innerHTML = `
            <td>${escapeHtml(record.name || '')}</td>
            <td>${escapeHtml(record.type || '')}</td>
            <td>${escapeHtml(record.details || '')}</td>
            <td>${escapeHtml(record.date || '')}</td>
            <td>${escapeHtml(record.createdBy || '')}</td>
            <td>
                ${canEdit ? '<button class="btn btn-sm btn-primary">Edit</button>' : ''}
                ${Auth.isAdmin() ? '<button class="btn btn-sm btn-danger ms-1">Delete</button>' : ''}
            </td>
        `;

        tbody.appendChild(row);
    });

    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="text-center text-muted">No records found. Add a record to get started.</td>';
        tbody.appendChild(row);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
