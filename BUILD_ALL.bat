python "Skill swap panter project\BUILD_COMPLETE_PLATFORM.py"@echo off
echo ========================================================================
echo   HM36 SKILL SWAP PLATFORM - ONE-CLICK BUILD
echo ========================================================================
echo.
echo This will create the complete platform with all files!
echo.
pause

python BUILD_COMPLETE_PLATFORM.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================================
    echo   SUCCESS! Platform built successfully!
    echo ========================================================================
    echo.
    echo Next: Follow the instructions above to install and run
    echo.
) else (
    echo.
    echo ========================================================================
    echo   ERROR! Build failed
    echo ========================================================================
    echo.
)

pause
