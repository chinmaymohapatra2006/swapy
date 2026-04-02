@echo off
cd /d "C:\Hackethon\Hack matrix\Skill swap parter project"

echo ========================================================================
echo   BUILDING HM36 SKILL SWAP PLATFORM
echo ========================================================================
echo.

echo [1/4] Creating backend server files...
python BUILD_PLATFORM_PART1.py
if %ERRORLEVEL% NEQ 0 (
    echo ERROR in Part 1
    pause
    exit /b 1
)

echo.
echo [2/4] Creating React components...
python BUILD_PLATFORM_PART2.py
if %ERRORLEVEL% NEQ 0 (
    echo ERROR in Part 2
    pause
    exit /b 1
)

echo.
echo [3/4] Creating React pages...
python BUILD_PLATFORM_PART3.py
if %ERRORLEVEL% NEQ 0 (
    echo ERROR in Part 3
    pause
    exit /b 1
)

echo.
echo [4/4] Creating CSS styles and docs...
python BUILD_PLATFORM_PART4.py
if %ERRORLEVEL% NEQ 0 (
    echo ERROR in Part 4
    pause
    exit /b 1
)

echo.
echo ========================================================================
echo   ✅ BUILD COMPLETE! 
echo ========================================================================
echo.
echo Your platform is ready at: skill-swap-platform\
echo.
echo Next steps:
echo   1. cd skill-swap-platform\server
echo   2. npm install
echo   3. copy .env.example to .env
echo   4. cd ..\client
echo   5. npm install
echo   6. Start MongoDB
echo   7. Run server: npm run dev (in server folder)
echo   8. Run client: npm start (in client folder)
echo.
echo See BUILD_GUIDE.md for detailed instructions!
echo.
pause
