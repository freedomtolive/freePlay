@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\inquirer\ques.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\inquirer\ques.js" %*
)