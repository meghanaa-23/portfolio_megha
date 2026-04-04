@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   PORTFOLIO UPDATE ^& GITHUB PUSH
echo ========================================

:: Check for git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    pause
    exit /b
)

:: Add all changes
echo [1/3] Adding changes...
git add .

:: Commit with dynamic message
set "commit_msg=Update portfolio: UI improvements and integrated resume viewer"
echo [2/3] Committing: "!commit_msg!"
git commit -m "!commit_msg!"

:: Detect current branch
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set branch=%%i
echo [3/3] Pushing to origin !branch!...

:: Push to detected branch
git push origin !branch!

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo Possible causes: 
    echo - No internet connection
    echo - Remote repository doesn't match 'origin'
    echo - Someone pushed changes to GitHub that you don't have yet (run 'git pull')
) else (
    echo.
    echo [SUCCESS] Portfolio updated on GitHub!
    echo Vercel will now start the deployment.
)

echo.
pause
