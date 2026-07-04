// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // If Chart.js is on page, we need to update chart colors
    if (typeof updateChartsTheme === 'function') {
        updateChartsTheme(newTheme);
    }
};

const updateThemeIcon = (theme) => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        if (theme === 'dark') {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeBtn.classList.replace('text-dark', 'text-warning');
        } else {
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeBtn.classList.replace('text-warning', 'text-dark');
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Check Authentication state for protected routes
    checkAuth();
});

// Authentication Guard (Mock)
const checkAuth = () => {
    const path = window.location.pathname;
    
    // If not on login/landing page, check session
    if (path.includes('/admin/') || path.includes('/doctor/') || path.includes('/patient/')) {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            window.location.href = '../index.html';
            return;
        }
        
        const user = JSON.parse(userStr);
        // Basic role check based on path
        if (path.includes('/admin/') && user.role !== 'admin') window.location.href = '../index.html';
        if (path.includes('/doctor/') && user.role !== 'doctor') window.location.href = '../index.html';
        if (path.includes('/patient/') && user.role !== 'patient') window.location.href = '../index.html';
        
        // Setup username in UI if elements exist
        const userNameEls = document.querySelectorAll('.user-name-display');
        userNameEls.forEach(el => el.textContent = user.name);
    }
};

// Logout Function
const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
};

// Generic Utility for DataTables
const initDataTable = (tableId) => {
    if(document.getElementById(tableId) && typeof jQuery !== 'undefined') {
        return $(`#${tableId}`).DataTable({
            responsive: true,
            pageLength: 10,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records..."
            }
        });
    }
    return null;
};
