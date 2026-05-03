# Record Management System

A web-based Administrative Workflow and Records Management prototype built for the agency's internal use.

## Features

- **User Authentication** - Login system with Administrator and Staff roles
- **Dashboard** - Overview of tasks and records with recent activity
- **Task Management** - Create, edit, and track tasks with status workflow
- **Records Management** - Encode, update, and organize records by type
- **Global Search** - Search across tasks and records from any page
- **Role-Based Access** - Different permissions for Admin vs Staff users

## Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.0 (UI Framework)
- localStorage (Data Persistence)
- No build tools or backend required

## Getting Started

1. Clone or download this repository
2. Open `login.html` in a web browser (or use a local server like Laragon)
3. Login with demo credentials:
   - **Admin:** `admin` / `admin123`
   - **Staff:** `staff` / `staff123`

## Project Structure

```
record-management/
├── index.html          # Redirects to login
├── login.html         # Login page
├── dashboard.html     # Overview with summaries
├── tasks.html         # Task management
├── records.html       # Records management
├── css/
│   └── styles.css    # Custom styles
├── js/
│   ├── storage.js    # localStorage utilities
│   ├── auth.js       # Authentication module
│   ├── search.js     # Global search
│   ├── dashboard.js  # Dashboard logic
│   ├── tasks.js      # Task management
│   └── records.js   # Records management
├── docs/
│   └── BRD.md       # Business Requirements Document
└── USER_GUIDE.md     # User documentation
```

## Documentation

- **[Business Requirements Document](docs/BRD.md)** - Full project requirements
- **[User Guide](USER_GUIDE.md)** - How to use the system (with screenshots)
- **[Project Roadmap](.planning/ROADMAP.md)** - Development phases and progress

## Browser Support

- ✅ Chrome (Recommended)
- ✅ Microsoft Edge
- ✅ Firefox
- ⚠️ Safari (Limited testing)

## Notes

- This is a **frontend prototype** - no backend or database
- All data is stored in browser's localStorage
- Clearing browser data will reset the system
- Demo data is automatically added on first load

## License

This project is for educational/demo purposes.
