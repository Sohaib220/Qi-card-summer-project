document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    const statusBtn = document.getElementById('status-btn');
    const active_text = document.getElementById('activated_text');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const profileImage = document.getElementById('profileImage');
    const fileInput = document.getElementById('fileInput');
    const navbarProfilePic = document.getElementById('navbar-profile-pic');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const navbarUsername = document.getElementById('navbar-username');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Hide nav links on mobile after selection
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Optionally, show the first section by default
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }

    // Toggle online/offline status
    statusBtn.addEventListener('click', () => {
        if (active_text.innerText=='not activated'){
            active_text.innerText='activated';
        }
        else{
            active_text.innerText=' not activated'
        }
        statusBtn.classList.toggle('active');
    });

    // Toggle nav links on mobile
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Change profile image
    profileImage.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                navbarProfilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Update username in the navbar
    firstNameInput.addEventListener('input', () => {
        updateUsername();
    });

    lastNameInput.addEventListener('input', () => {
        updateUsername();
    });

    function updateUsername() {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        navbarUsername.textContent = `${firstName} ${lastName}`.trim() || 'User Name';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const addServicesBtn = document.querySelector('.add-services-btn');
    const servicesModal = document.getElementById('addServicesModal');
    const servicesCloseBtn = document.querySelector('.services-close-btn');
    const addServicesForm = document.getElementById('addServicesForm');
    const servicesAddButton = document.getElementById('servicesAddButton');

    addServicesBtn.addEventListener('click', () => {
        servicesModal.style.display = 'block';
    });

    servicesCloseBtn.addEventListener('click', () => {
        servicesModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == servicesModal) {
            servicesModal.style.display = 'none';
        }
    });

    addServicesForm.addEventListener('input', () => {
        const inputs = addServicesForm.querySelectorAll('input, textarea');
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });
        servicesAddButton.disabled = !allValid;
    });

    addServicesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userServicesName = document.getElementById('userServicesName').value;
        const serviceServicesName = document.getElementById('serviceServicesName').value;
        const servicesDescription = document.getElementById('servicesDescription').value;
        const servicesPrice = document.getElementById('servicesPrice').value;
        const servicesPhoto = document.getElementById('servicesPhoto').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const newServicesBox = document.createElement('div');
            newServicesBox.classList.add('services-box');
            newServicesBox.innerHTML = `
                <div class="services-info">
                    <span class="user-services-name">${userServicesName}</span>
                    <span class="services-name">${serviceServicesName}</span>
                    <p class="services-description">${servicesDescription}</p>
                    <span class="services-price">${servicesPrice}</span>
                </div>
                <img src="${e.target.result}" alt="${serviceServicesName}" class="services-photo">
            `;
            document.querySelector('.my-services').appendChild(newServicesBox);
            servicesModal.style.display = 'none';
            addServicesForm.reset();
            servicesAddButton.disabled = true;
        };
        reader.readAsDataURL(servicesPhoto);
    });
});
/* the order page */
const usernames = ["Zain Adel", "Ameer Ali", "Mohammed Ahmed", "Ameer abdulah", "Ali Taha"];
const userProfilePhotos = [
    "man1.jpg",
    "man2.jpg",
    "man3.jpg",
    "man4.jpg",
    "man5.jpg"
];
const locations = ["Baghdad-Mansour", "Baghdad-Karada", "Baghdad-Al-Admiah", "Baghdad-Dora", "Baghdad-Harthia"];
const requestContainer = document.getElementById("requestContainer");

function generateRandomRequest() {
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const profilePhoto = userProfilePhotos[Math.floor(Math.random() * userProfilePhotos.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const showEmergency = Math.random() < 0.5; // 50% chance to show emergency

    return {
        username,
        profilePhoto,
        location,
        timer: 15, // 15 seconds for the timer
        showEmergency
    };
}

function createRequestBox(request) {
    const box = document.createElement("div");
    box.classList.add("request-box");
    box.innerHTML = `
        <img src="${request.profilePhoto}" alt="Profile Photo">
        <div class="customer-name">${request.username}</div>
        <div class="location">${request.location}</div>
        <div class="description">I want your services please.</div>
        ${request.showEmergency ? '<div class="emergency-box">Emergency</div>' : ''}
        <button class="accept-button">Accept Order</button>
        <div class="time-label">${request.timer} seconds</div>
        <div class="timer" style="width: 100%;"></div>
    `;

    const acceptButton = box.querySelector(".accept-button");
    const timerBar = box.querySelector(".timer");
    const timeLabel = box.querySelector(".time-label");

    acceptButton.addEventListener("click", () => {
        acceptButton.innerText = "Order Accepted";
        acceptButton.disabled = true; // Disable button after accepting
        timeLabel.style.display = 'none'; // Hide the timer
        timerBar.style.display = 'none'; // Hide the timer bar
        requestContainer.prepend(box); // Move the accepted box to the top
    });

    const interval = setInterval(() => {
        request.timer--;
        timerBar.style.width = `${(request.timer / 15) * 100}%`;
        timeLabel.innerText = `${request.timer} seconds`;
        if (request.timer <= 0) {
            clearInterval(interval);
            if (!acceptButton.disabled) {
                requestContainer.removeChild(box);
                // Generate a new request after removing the old one
                addNewRequest();
            }
        }
    }, 1000);

    requestContainer.appendChild(box);
}

// Function to add a new request
function addNewRequest() {
    if (requestContainer.children.length < 3) { // Limit to 3 boxes
        const newRequest = generateRandomRequest();
        createRequestBox(newRequest);
    }
}

// Initial request generation
for (let i = 0; i < 2; i++) {
    addNewRequest();
}

// Refresh request every 10 seconds
setInterval(() => {
    addNewRequest();
}, 10000);
