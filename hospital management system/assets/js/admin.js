// Admin Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
    // Only init charts if they exist
    if (document.getElementById('patientChart')) {
        initCharts();
    }
});

let patientChartInstance = null;
let deptChartInstance = null;

const initCharts = () => {
    const textColor = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#f9fafb' : '#6b7280';
    const gridColor = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#374151' : '#e5e7eb';

    // Line Chart - Patient Visits
    const ctx1 = document.getElementById('patientChart').getContext('2d');
    patientChartInstance = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Patients',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderColor: '#4f46e5',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: gridColor }, ticks: { color: textColor } },
                x: { grid: { display: false }, ticks: { color: textColor } }
            }
        }
    });

    // Doughnut Chart - Departments
    const ctx2 = document.getElementById('deptChart').getContext('2d');
    deptChartInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
            datasets: [{
                data: [30, 20, 25, 25],
                backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#0ea5e9'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: textColor } }
            },
            cutout: '70%'
        }
    });
};

// Expose function to app.js for theme updates
window.updateChartsTheme = (theme) => {
    if(!patientChartInstance || !deptChartInstance) return;

    const textColor = theme === 'dark' ? '#f9fafb' : '#6b7280';
    const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

    patientChartInstance.options.scales.y.grid.color = gridColor;
    patientChartInstance.options.scales.y.ticks.color = textColor;
    patientChartInstance.options.scales.x.ticks.color = textColor;
    patientChartInstance.update();

    deptChartInstance.options.plugins.legend.labels.color = textColor;
    deptChartInstance.update();
};
