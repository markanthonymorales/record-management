/**
 * Global Search Module
 * Handles searching across tasks and records from any page
 */

document.addEventListener('DOMContentLoaded', function() {
    const globalSearchForm = document.getElementById('globalSearchForm');
    const globalSearchInput = document.getElementById('globalSearchInput');

    if (globalSearchForm) {
        globalSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = globalSearchInput.value.trim();

            if (query.length < 2) {
                alert('Please enter at least 2 characters to search');
                return;
            }

            // Perform global search
            const results = performGlobalSearch(query);

            // Display results
            displaySearchResults(results, query);
        });
    }
});

function performGlobalSearch(query) {
    const searchTerm = query.toLowerCase();
    const tasks = Storage.getTasks();
    const records = Storage.getRecords();

    const results = {
        tasks: [],
        records: [],
        total: 0
    };

    // Search tasks
    tasks.forEach(task => {
        if (matchesTask(task, searchTerm)) {
            results.tasks.push(task);
        }
    });

    // Search records
    records.forEach(record => {
        if (matchesRecord(record, searchTerm)) {
            results.records.push(record);
        }
    });

    results.total = results.tasks.length + results.records.length;

    return results;
}

function matchesTask(task, searchTerm) {
    return (
        (task.title && task.title.toLowerCase().includes(searchTerm)) ||
        (task.description && task.description.toLowerCase().includes(searchTerm)) ||
        (task.status && task.status.toLowerCase().includes(searchTerm)) ||
        (task.assignedTo && task.assignedTo.toLowerCase().includes(searchTerm))
    );
}

function matchesRecord(record, searchTerm) {
    return (
        (record.name && record.name.toLowerCase().includes(searchTerm)) ||
        (record.type && record.type.toLowerCase().includes(searchTerm)) ||
        (record.details && record.details.toLowerCase().includes(searchTerm)) ||
        (record.date && record.date.includes(searchTerm))
    );
}

function displaySearchResults(results, query) {
    // Create modal if it doesn't exist
    let searchModal = document.getElementById('searchResultsModal');

    if (!searchModal) {
        const modalHTML = `
            <div class="modal fade" id="searchResultsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Search Results</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="searchResultsContent">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        searchModal = document.getElementById('searchResultsModal');
    }

    const contentDiv = document.getElementById('searchResultsContent');

    if (results.total === 0) {
        contentDiv.innerHTML = `
            <div class="alert alert-info">
                No results found for "<strong>${escapeHtml(query)}</strong>"
            </div>
        `;
    } else {
        let html = `<p>Found ${results.total} result(s) for "<strong>${escapeHtml(query)}</strong>":</p>`;

        // Tasks results
        if (results.tasks.length > 0) {
            html += '<h6 class="mt-3">Tasks (${results.tasks.length})</h6>';
            html += '<div class="list-group mb-3">';
            results.tasks.forEach(task => {
                html += `
                    <a href="tasks.html" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${escapeHtml(task.title || 'Untitled Task')}</h6>
                            <span class="badge bg-${getTaskBadgeColor(task.status)}">${escapeHtml(task.status)}</span>
                        </div>
                        <p class="mb-1 small">${escapeHtml(task.description || 'No description')}</p>
                        <small class="text-muted">Assigned to: ${escapeHtml(task.assignedTo || 'Unassigned')}</small>
                    </a>
                `;
            });
            html += '</div>';
        }

        // Records results
        if (results.records.length > 0) {
            html += '<h6 class="mt-3">Records (${results.records.length})</h6>';
            html += '<div class="list-group">';
            results.records.forEach(record => {
                html += `
                    <a href="records.html" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">${escapeHtml(record.name || 'Untitled Record')}</h6>
                            <span class="badge bg-info">${escapeHtml(record.type || 'Other')}</span>
                        </div>
                        <p class="mb-1 small">${escapeHtml(record.details || 'No details')}</p>
                        <small class="text-muted">Date: ${escapeHtml(record.date || 'N/A')}</small>
                    </a>
                `;
            });
            html += '</div>';
        }

        contentDiv.innerHTML = html;
    }

    // Show modal
    const modalInstance = new bootstrap.Modal(searchModal);
    modalInstance.show();
}

function getTaskBadgeColor(status) {
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
