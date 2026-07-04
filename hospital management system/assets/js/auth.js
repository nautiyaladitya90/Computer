// Simulated Database for Auth
const mockUsers = {
    patient: {
        id: 1,
        role: 'patient',
        name: 'Azamtullah Zazai',
        email: 'patient@demo.com',
        password: 'demo'
    },
    doctor: {
        id: 101,
        role: 'doctor',
        name: 'Dr. Satish Mulla',
        email: 'doctor@demo.com',
        password: 'demo',
        specialty: 'Cardiology'
    },
    admin: {
        id: 999,
        role: 'admin',
        name: 'Super Admin',
        email: 'admin@demo.com',
        password: 'demo'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('loginRole').value; // Hidden input on each login page
            
            // Simple validation simulation
            if (email === mockUsers[role].email && password === mockUsers[role].password) {
                
                // Store user in session (LocalStorage)
                localStorage.setItem('currentUser', JSON.stringify(mockUsers[role]));
                
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${mockUsers[role].name}!`,
                    showConfirmButton: false,
                    timer: 1500,
                    background: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#1e293b' : '#fff',
                    color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#fff' : '#000',
                }).then(() => {
                    // Redirect based on role
                    if(role === 'admin') window.location.href = '../admin/dashboard.html';
                    if(role === 'doctor') window.location.href = '../doctor/dashboard.html';
                    if(role === 'patient') window.location.href = '../patient/dashboard.html';
                });

            } else {
                // Fail
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid credentials. Please try again.',
                    background: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#1e293b' : '#fff',
                    color: document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#fff' : '#000',
                });
            }
        });
    }
});
