document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        document.getElementById(tabId + '-content').classList.add('active');
        document.getElementById(tabId + '-tab').classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.id.replace('-tab', '');
            showTab(tabId);
        });
    });

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = "Dr. " + document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const url = 'https://script.google.com/macros/s/AKfycbyVGhDLptNvBJph-dM54SYafRL0MkayCxIWEglSWeb9KrSRVKnKRYpPcry-ZFlZ6uai/exec';

        const data = {
            'FName': firstName,
            'LName': lastName,
            'email': email,
            'phone': phone,
            'message': message
        };

        fetch(url, {
            method: 'POST',
            mode: 'no-cors', // This is important for CORS issues
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        })
        .then(response => {
            showNotification('Form submitted successfully!');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        });
    });


    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }


    // Show services tab by default
    showTab('services');
});
