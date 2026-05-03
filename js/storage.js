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
        clearAll
    };
})();
