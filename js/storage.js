/**
 * Storage Utility Module
 * Handles localStorage operations for the Record Management System
 */

const Storage = (function() {
    // Storage keys
    const KEYS = {
        TASKS: 'rms_tasks',
        RECORDS: 'rms_records',
        USERS: 'rms_users',
        CURRENT_USER: 'rms_current_user'
    };

    /**
     * Initialize default data if not exists
     */
    function init() {
        // Initialize tasks array if not exists
        if (!localStorage.getItem(KEYS.TASKS)) {
            localStorage.setItem(KEYS.TASKS, JSON.stringify([]));
        }

        // Initialize records array if not exists
        if (!localStorage.getItem(KEYS.RECORDS)) {
            localStorage.setItem(KEYS.RECORDS, JSON.stringify([]));
        }

        // Initialize demo users if not exists
        if (!localStorage.getItem(KEYS.USERS)) {
            const demoUsers = [
                {
                    username: 'admin',
                    password: 'admin123',
                    role: 'Administrator',
                    name: 'Admin User'
                },
                {
                    username: 'staff',
                    password: 'staff123',
                    role: 'Staff',
                    name: 'Staff User'
                }
            ];
            localStorage.setItem(KEYS.USERS, JSON.stringify(demoUsers));
        }

        // Add sample data if no tasks or records exist (for testing)
        addSampleDataIfEmpty();
    }

    /**
     * Add sample data for testing if storage is empty
     */
    function addSampleDataIfEmpty() {
        const tasks = getTasks();
        const records = getRecords();

        // Only add sample data if both are empty
        if (tasks.length === 0 && records.length === 0) {
            const sampleTasks = [
                {
                    id: 1001,
                    title: 'Review quarterly reports',
                    description: 'Review and approve Q1 2026 reports',
                    status: 'Pending',
                    assignedTo: 'staff',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                },
                {
                    id: 1002,
                    title: 'Update employee records',
                    description: 'Update contact information for new staff',
                    status: 'In Progress',
                    assignedTo: 'staff',
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                },
                {
                    id: 1003,
                    title: 'Prepare meeting agenda',
                    description: 'Prepare agenda for monthly team meeting',
                    status: 'Completed',
                    assignedTo: 'admin',
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                }
            ];

            const sampleRecords = [
                {
                    id: 2001,
                    name: 'Q1 Financial Report',
                    type: 'Report',
                    details: 'Financial summary for Q1 2026',
                    date: '2026-03-31',
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                },
                {
                    id: 2002,
                    name: 'Office Layout Diagram',
                    type: 'Image',
                    details: 'Updated office layout with new workstations',
                    date: '2026-04-15',
                    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'staff'
                },
                {
                    id: 2003,
                    name: 'Employee Handbook',
                    type: 'Document',
                    details: 'Updated employee handbook with new policies',
                    date: '2026-04-20',
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                },
                {
                    id: 2004,
                    name: 'Project Timeline',
                    type: 'Document',
                    details: 'Timeline for Record Management System project',
                    date: '2026-05-01',
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    createdBy: 'admin'
                }
            ];

            saveTasks(sampleTasks);
            saveRecords(sampleRecords);
        }
    }

    /**
     * Get all tasks
     */
    function getTasks() {
        return JSON.parse(localStorage.getItem(KEYS.TASKS)) || [];
    }

    /**
     * Save tasks array
     */
    function saveTasks(tasks) {
        localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
    }

    /**
     * Add a new task
     */
    function addTask(task) {
        const tasks = getTasks();
        task.id = Date.now(); // Simple ID generation
        task.createdAt = new Date().toISOString();
        task.status = task.status || 'Pending';
        tasks.push(task);
        saveTasks(tasks);
        return task;
    }

    /**
     * Update a task by ID
     */
    function updateTask(id, updates) {
        const tasks = getTasks();
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            saveTasks(tasks);
            return tasks[index];
        }
        return null;
    }

    /**
     * Delete a task by ID
     */
    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(t => t.id !== id);
        saveTasks(tasks);
    }

    /**
     * Get all records
     */
    function getRecords() {
        return JSON.parse(localStorage.getItem(KEYS.RECORDS)) || [];
    }

    /**
     * Save records array
     */
    function saveRecords(records) {
        localStorage.setItem(KEYS.RECORDS, JSON.stringify(records));
    }

    /**
     * Add a new record
     */
    function addRecord(record) {
        const records = getRecords();
        record.id = Date.now(); // Simple ID generation
        record.createdAt = new Date().toISOString();
        records.push(record);
        saveRecords(records);
        return record;
    }

    /**
     * Update a record by ID
     */
    function updateRecord(id, updates) {
        const records = getRecords();
        const index = records.findIndex(r => r.id === id);
        if (index !== -1) {
            records[index] = { ...records[index], ...updates };
            saveRecords(records);
            return records[index];
        }
        return null;
    }

    /**
     * Delete a record by ID
     */
    function deleteRecord(id) {
        let records = getRecords();
        records = records.filter(r => r.id !== id);
        saveRecords(records);
    }

    /**
     * Get all users
     */
    function getUsers() {
        return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
    }

    /**
     * Get current logged in user
     */
    function getCurrentUser() {
        return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
    }

    /**
     * Set current user (login)
     */
    function setCurrentUser(user) {
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    }

    /**
     * Clear current user (logout)
     */
    function clearCurrentUser() {
        localStorage.removeItem(KEYS.CURRENT_USER);
    }

    /**
     * Clear all data (for testing/reset)
     */
    function clearAll() {
        localStorage.removeItem(KEYS.TASKS);
        localStorage.removeItem(KEYS.RECORDS);
        localStorage.removeItem(KEYS.USERS);
        localStorage.removeItem(KEYS.CURRENT_USER);
        init(); // Re-initialize with defaults
    }

    /**
     * Reset all data and add fresh sample data
     */
    function resetWithSampleData() {
        localStorage.removeItem(KEYS.TASKS);
        localStorage.removeItem(KEYS.RECORDS);
        // Keep users and current user
        const tasks = [
            {
                id: 1001,
                title: 'Review quarterly reports',
                description: 'Review and approve Q1 2026 reports',
                status: 'Pending',
                assignedTo: 'staff',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            },
            {
                id: 1002,
                title: 'Update employee records',
                description: 'Update contact information for new staff',
                status: 'In Progress',
                assignedTo: 'staff',
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            },
            {
                id: 1003,
                title: 'Prepare meeting agenda',
                description: 'Prepare agenda for monthly team meeting',
                status: 'Completed',
                assignedTo: 'admin',
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            }
        ];

        const records = [
            {
                id: 2001,
                name: 'Q1 Financial Report',
                type: 'Report',
                details: 'Financial summary for Q1 2026',
                date: '2026-03-31',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            },
            {
                id: 2002,
                name: 'Office Layout Diagram',
                type: 'Image',
                details: 'Updated office layout with new workstations',
                date: '2026-04-15',
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'staff'
            },
            {
                id: 2003,
                name: 'Employee Handbook',
                type: 'Document',
                details: 'Updated employee handbook with new policies',
                date: '2026-04-20',
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            },
            {
                id: 2004,
                name: 'Project Timeline',
                type: 'Document',
                details: 'Timeline for Record Management System project',
                date: '2026-05-01',
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                createdBy: 'admin'
            }
        ];

        saveTasks(tasks);
        saveRecords(records);
    }

    // Initialize on load
    init();

    // Public API
    return {
        getTasks,
        saveTasks,
        addTask,
        updateTask,
        deleteTask,
        getRecords,
        saveRecords,
        addRecord,
        updateRecord,
        deleteRecord,
        getUsers,
        getCurrentUser,
        setCurrentUser,
        clearCurrentUser,
        clearAll,
        resetWithSampleData
    };
})();
