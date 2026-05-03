# User Guide - Record Management System

## Overview
The Record Management System is a web-based application designed to help agencies manage daily administrative tasks and records. It features a clean, intuitive interface suitable for non-technical users.

## Getting Started

### Accessing the System
1. Open the system in a web browser (Chrome, Edge, or Firefox recommended)
2. Navigate to `login.html` (or `index.html` which redirects to login)
3. The system runs locally - no internet connection required after initial load

### Demo Credentials
The system comes with two demo user accounts:

| Role | Username | Password | Access Level |
|------|-----------|----------|--------------|
| Administrator | `admin` | `admin123` | Full access to all features |
| Staff | `staff` | `staff123` | Limited access (can only edit own tasks/records) |

## Features Guide

### 1. Dashboard
**Location:** Click "Dashboard" in the navigation bar

The dashboard provides an overview of your tasks and records:

- **Task Summary Cards:** View total tasks, pending tasks, and completed tasks
- **Records Summary:** See total records and breakdown by type (Documents, Images, Reports, Other)
- **Recent Activity:** Quick access to the 5 most recent tasks and records

*Note: Click on any item in the Recent Activity section to go to the full list page.*

---

### 2. Task Management
**Location:** Click "Tasks" in the navigation bar

#### Creating a New Task
1. Click the blue **"Add New Task"** button
2. Fill in the required fields:
   - **Title** (required)
   - **Description** (optional)
   - **Status** (Pending, In Progress, Completed)
   - **Assign To** (admin or staff)
3. Click **"Save Task"**

#### Editing a Task
- **Administrator:** Can edit ANY task
- **Staff:** Can only edit tasks assigned to them
1. Click the blue **"Edit"** button next to the task
2. Update the information in the modal form
3. Click **"Save Task"**

#### Changing Task Status
Quick status updates without opening the full edit form:
1. Click the green **"Change"** button next to the status badge
2. Confirm the status change in the dialog
3. Status cycles: Pending → In Progress → Completed

#### Deleting a Task
- **Administrator Only:** Can delete any task
- **Staff:** Cannot delete tasks
1. Click the red **"Delete"** button
2. Confirm the deletion

#### Searching and Filtering Tasks
- **Search:** Type in the search box to find tasks by title or description (auto-searches as you type)
- **Filter by Status:** Use the dropdown to show only Pending, In Progress, or Completed tasks
- **Clear Filters:** Click the "Clear Filters" button to reset search and filters

---

### 3. Records Management
**Location:** Click "Records" in the navigation bar

#### Creating a New Record
1. Click the blue **"Add New Record"** button
2. Fill in the fields:
   - **Name** (required)
   - **Type** (Document, Image, Report, Other)
   - **Details** (optional description)
   - **Date** (defaults to today)
3. Click **"Save Record"**

#### Viewing a Record
1. Click the gray **"View"** button to see record details in a popup

#### Editing a Record
- **Administrator:** Can edit ANY record
- **Staff:** Can only edit records they created
1. Click the blue **"Edit"** button next to the record
2. Update the information in the modal form
3. Click **"Save Record"**

#### Deleting a Record
- **Administrator Only:** Can delete any record
- **Staff:** Cannot delete records
1. Click the red **"Delete"** button
2. Confirm the deletion

#### Searching and Filtering Records
- **Search:** Type in the search box to find records by name, type, or details
- **Filter by Type:** Use the dropdown to show only specific record types
- **Clear Filters:** Click the "Clear Filters" button to reset

---

### 4. Global Search
**Location:** Search bar in the top navigation (available on all pages)

Search across BOTH tasks and records at once:
1. Click in the search box in the top navigation
2. Type at least 2 characters
3. Press Enter or click the **"Search"** button
4. A modal will appear showing all matching tasks and records
5. Click on any result to go to the Tasks or Records page

---

## User Roles & Permissions

### Administrator
- ✅ Create, edit, and delete ANY task
- ✅ Create, edit, and delete ANY record
- ✅ Assign tasks to any user
- ✅ View all system activity
- ✅ Access all pages and features

### Staff
- ✅ Create new tasks (assigned to themselves by default)
- ✅ Edit tasks assigned to them
- ✅ Create new records
- ✅ Edit records they created
- ❌ Delete tasks or records
- ❌ Edit tasks assigned to others
- ❌ Edit records created by others

---

## Tips for Non-Technical Users

### Navigating the System
- Use the **navigation bar** at the top to move between pages
- Your **username and role** are displayed in the top-right dropdown
- Click the **dropdown arrow** next to your name to see your role or logout

### Working with Forms
- Fields marked with `*` are required
- Use the **tab key** to move between fields quickly
- Click **Cancel** or the X button to close a form without saving
- Dates are selected using a calendar picker

### Understanding Status Colors
- **Gray (Secondary):** Pending - Task hasn't started yet
- **Yellow (Warning):** In Progress - Task is being worked on
- **Green (Success):** Completed - Task is finished
- **Blue (Info):** Record type badges

### Troubleshooting
- **Page not loading?** Make sure JavaScript is enabled in your browser
- **Can't edit a task/record?** Check if you have permission (see Roles above)
- **Data disappeared?** The system uses browser storage - clearing browser data will reset the system
- **Forgot password?** Contact your system administrator (demo passwords are listed above)

---

## Technical Notes

### Data Storage
- All data is stored in your browser's **localStorage**
- Data persists until you clear browser data or use the reset function
- No data is sent to servers - everything stays on your computer

### Resetting the System
To clear all data and start fresh:
1. Open the browser console (F12)
2. Type: `Storage.resetWithSampleData()`
3. Refresh the page

To completely clear all data (including users):
1. Open the browser console (F12)
2. Type: `Storage.clearAll()`
3. Refresh the page

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Firefox
- ⚠️ Safari (limited testing)
- ❌ Internet Explorer (not supported)

---

## Support
For additional help or to report issues, please contact the system developer or your IT department.

**System Version:** 1.0 (Prototype)
**Last Updated:** May 2026
