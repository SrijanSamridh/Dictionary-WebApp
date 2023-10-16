// Simulate loading (you can replace this with your actual loading logic)
setTimeout(() => {
    // Hide the splash screen
    const splashScreen = document.querySelector('.splash');
    splashScreen.style.display = 'none';

    // Show the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.style.display = 'block';
}, 3000); // Adjust the time as needed (e.g., 3000ms = 3 seconds)

  