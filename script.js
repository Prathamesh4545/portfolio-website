
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  const target = document.elementFromPoint(e.clientX, e.clientY);
  if (target) { // Add a null check here
    const fontSize = getComputedStyle(target).fontSize;
    if (fontSize) {
      const scaleFactor = parseInt(fontSize) / 16; // adjust scale factor based on font size
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${scaleFactor})`;
    } else {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(0.5)`;
    }
  }
});

// get elements
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// handle scrolling
window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

// handle menu icon click
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// contact by sending mail
// Update the sendMail function to display the notification popup on validation failure
function sendMail() {
  const formElements = {
    fullName: document.getElementById("full_name"),
    subject: document.getElementById("subject"),
    emailId: document.getElementById("email_id"),
    phoneNumber: document.getElementById("phone_number"),
    message: document.getElementById("message"),
  };

  const params = {
    from_name: formElements.fullName.value.trim(),
    to_subject: formElements.subject.value.trim(),
    email_id: formElements.emailId.value.trim(),
    to_number: formElements.phoneNumber.value.trim(),
    message: formElements.message.value.trim(),
  };

  if (!validateForm(params)) {
    showNotification("Please fill in all fields.");
    return;
  }

  emailjs
    .send("service_nwg029n", "template_39xg3j5", params)
    .then((res) => {
      console.log("Email sent successfully! ${res.status}");
      showNotification("Email sent successfully!");
      resetForm(formElements);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      showNotification("Error sending email. Please try again.");
    });
}

// Add a new function to display the notification popup
function showNotification(message) {
  const notificationMessage = document.getElementById("notification-message");
  notificationMessage.textContent = message;

  if (message.includes("success") || message.includes("sent")) {
    notificationMessage.classList.add("success");
  } else {
    notificationMessage.classList.add("error");
  }

  const notificationPopup = document.getElementById("notification-popup");
  notificationPopup.classList.add("show");

  // Add an event listener to close the notification popup
  document
    .getElementById("notification-close")
    .addEventListener("click", () => {
      notificationPopup.classList.remove("show");
      notificationMessage.classList.remove("success", "error");
    });
}
function validateForm(params) {
  return Object.values(params).every((value) => value !== "");
}

function resetForm(formElements) {
  Object.values(formElements).forEach((element) => {
    element.value = "";
  });
}
