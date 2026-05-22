@echo off
:: Change to the frontend directory
cd /d "%~dp0"

:: Install dependencies if not already installed
if not exist node_modules ( npm install )

:: Start the Vite dev server
npm run dev
