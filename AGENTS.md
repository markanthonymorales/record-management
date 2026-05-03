# AGENTS.md — Record Management System

## Project Status

**Greenfield project** — no code exists yet. See `docs/BRD.md` for requirements.

## What Exists

- `docs/BRD.md` — Business Requirements Document (functional specs, user roles, scope)
- `README.md` — one-liner pointing to the project name

## Planned Tech Stack (from BRD §8)

- **Frontend only**: HTML, CSS, JavaScript (+ Bootstrap for UI)
- **No backend/database** — local storage or JSON files for demo data
- **No build tools or framework** mentioned — likely plain static files
- **Local dev** via Laragon or any static file server

## Key Facts for Agents

- Two user roles: **Administrator** (full access) and **Staff** (limited access)
- Scope is **frontend prototype only** — no server, no database, no deployment
- Run locally in browser; no `npm`, `composer`, or test commands exist yet
- Git repo has a single commit on `main`; no other branches

## Before Writing Code

Read `docs/BRD.md` §6 (Functional Requirements) and §9 (User Roles) to understand what to build. The BRD defines the full scope — do not add features beyond it unless asked.
