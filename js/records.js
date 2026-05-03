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
            openRecordModal();
        });
    }

    // Setup save record button
    const saveRecordBtn = document.getElementById('saveRecordBtn');
    if (saveRecordBtn) {
        saveRecordBtn.addEventListener('click', saveRecord);
    }

    // Setup search and filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(loadRecords, 300));
    }

    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', loadRecords);
    }

    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            document.getElementById('searchInput').value = '';
            document.getElementById('typeFilter').value = '';
            loadRecords();
        });
    }
});

let recordModal = null;

function getRecordModal() {
    if (!recordModal) {
        recordModal = new bootstrap.Modal(document.getElementById('recordModal'));
    }
    return recordModal;
}

function openRecordModal(recordId = null) {
    const modal = getRecordModal();
    const form = document.getElementById('recordForm');
    const title = document.getElementById('recordModalTitle');

    // Reset form
    form.reset();
    document.getElementById('recordId').value = '';
    document.getElementById('recordDate').value = new Date().toISOString().split('T')[0]; // Set default to today

    if (recordId) {
        // Edit mode
        title.textContent = 'Edit Record';
        const records = Storage.getRecords();
        const record = records.find(r => r.id == recordId);
        if (record) {
            document.getElementById('recordId').value = record.id;
            document.getElementById('recordName').value = record.name || '';
            document.getElementById('recordType').value = record.type || 'Document';
            document.getElementById('recordDetails').value = record.details || '';
            document.getElementById('recordDate').value = record.date || '';
        }
    } else {
        // Create mode
        title.textContent = 'Add New Record';
    }

    modal.show();
}

function saveRecord() {
    const recordId = document.getElementById('recordId').value;
    const name = document.getElementById('recordName').value.trim();
    const type = document.getElementById('recordType').value;
    const details = document.getElementById('recordDetails').value.trim();
    const date = document.getElementById('recordDate').value;

    // Validate required fields
    if (!name) {
        alert('Please enter a record name');
        return;
    }

    if (recordId) {
        // Update existing record
        const updates = {
            name,
            type,
            details,
            date
        };
        Storage.updateRecord(parseInt(recordId), updates);
    } else {
        // Create new record
        const newRecord = {
            name,
            type,
            details,
            date,
            createdBy: Auth.getCurrentUser().username
        };
        Storage.addRecord(newRecord);
    }

    // Close modal and reload records
    getRecordModal().hide();
    loadRecords();

    // Refresh dashboard if open (updates record counts)
    if (window.opener && !window.opener.closed) {
        window.opener.loadDashboardData && window.opener.loadDashboardData();
    }
}

function deleteRecord(recordId) {
    if (confirm('Are you sure you want to delete this record?')) {
        Storage.deleteRecord(recordId);
        loadRecords();
    }
}

function viewRecord(recordId) {
    // Simple view - could be expanded to show in a modal
    const records = Storage.getRecords();
    const record = records.find(r => r.id == recordId);
    if (record) {
        alert(`Record Details:\n\nName: ${record.name}\nType: ${record.type}\nDetails: ${record.details}\nDate: ${record.date}\nCreated By: ${record.createdBy}`);
    }
}

function loadRecords() {
    const records = Storage.getRecords();
    const tbody = document.getElementById('recordsTableBody');
    const currentUser = Auth.getCurrentUser();

    // Apply filters
    let filteredRecords = records;

    // Search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredRecords = filteredRecords.filter(record =>
            (record.name && record.name.toLowerCase().includes(searchTerm)) ||
            (record.type && record.type.toLowerCase().includes(searchTerm)) ||
            (record.details && record.details.toLowerCase().includes(searchTerm))
        );
    }

    // Type filter
    const typeFilter = document.getElementById('typeFilter').value;
    if (typeFilter) {
        filteredRecords = filteredRecords.filter(record => record.type === typeFilter);
    }

    // Sort by created date (newest first)
    filteredRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    tbody.innerHTML = '';

    filteredRecords.forEach(record => {
        const row = document.createElement('tr');

        // Check if user can edit this record
        const canEdit = Auth.isAdmin() || record.createdBy === currentUser.username;

        row.innerHTML = `
            <td>${escapeHtml(record.name || '')}</td>
            <td><span class="badge bg-info">${escapeHtml(record.type || 'Other')}</span></td>
            <td>${escapeHtml(record.details || '')}</td>
            <td>${escapeHtml(record.date || '')}</td>
            <td>${escapeHtml(record.createdBy || '')}</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="viewRecord(${record.id})">View</button>
                ${canEdit ? `<button class="btn btn-sm btn-primary ms-1" onclick="openRecordModal(${record.id})">Edit</button>` : ''}
                ${Auth.isAdmin() ? `<button class="btn btn-sm btn-danger ms-1" onclick="deleteRecord(${record.id})">Delete</button>` : ''}
            </td>
        `;

        tbody.appendChild(row);
    });

    if (filteredRecords.length === 0) {
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
