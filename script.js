/* =========================================
   HOME SERVICE BOOKING APP
========================================= */


/* =========================================
   VARIABLES
========================================= */

let bookings =
    JSON.parse(localStorage.getItem("homeBookings")) || [];


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    displayBookings();

    setMinimumDate();

});


/* =========================================
   SET MINIMUM DATE
========================================= */

function setMinimumDate() {

    const dateInput =
        document.getElementById("date");

    if (!dateInput) return;

    const today =
        new Date().toISOString().split("T")[0];

    dateInput.min = today;
}


/* =========================================
   SCROLL TO SERVICES
========================================= */

function scrollToServices() {

    document
        .getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   SELECT SERVICE
========================================= */

function selectService(serviceName) {

    const service =
        document.getElementById("service");

    service.value = serviceName;

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        serviceName + " selected"
    );

}


/* =========================================
   SELECT PROVIDER
========================================= */

function selectProvider(providerName) {

    const provider =
        document.getElementById("provider");

    provider.value = providerName;

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        providerName + " selected"
    );

}


/* =========================================
   BOOKING FORM
========================================= */

document
    .getElementById("bookingForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const service =
            document.getElementById("service").value;

        const provider =
            document.getElementById("provider").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const customerName =
            document.getElementById("customerName").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;

        const description =
            document.getElementById("description").value;


        /* Generate booking ID */

        const bookingId =
            "HB" +
            Date.now().toString().slice(-6);


        /* Create booking object */

        const newBooking = {

            id: bookingId,

            service: service,

            provider: provider,

            date: date,

            time: time,

            customerName: customerName,

            phone: phone,

            address: address,

            description: description,

            status: "Pending",

            createdAt:
                new Date().toLocaleString()

        };


        /* Add booking */

        bookings.push(newBooking);


        /* Save in browser */

        localStorage.setItem(
            "homeBookings",
            JSON.stringify(bookings)
        );


        /* Clear form */

        document
            .getElementById("bookingForm")
            .reset();


        /* Display bookings */

        displayBookings();


        /* Success message */

        showToast(
            "Booking confirmed! ID: " +
            bookingId
        );


        /* Go to bookings */

        setTimeout(function () {

            document
                .getElementById("bookings")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 700);

    });


/* =========================================
   DISPLAY BOOKINGS
========================================= */

function displayBookings() {

    const bookingList =
        document.getElementById("bookingList");


    if (bookings.length === 0) {

        bookingList.innerHTML = `

            <div class="empty-booking">

                <i class="fa-solid fa-calendar-xmark"></i>

                <h3>No bookings yet</h3>

                <p>
                    Your bookings will appear here.
                </p>

            </div>

        `;

        return;

    }


    bookingList.innerHTML = "";


    bookings.forEach(function (booking, index) {

        const card =
            document.createElement("div");

        card.className = "booking-card";


        card.innerHTML = `

            <div class="booking-header">

                <h3>
                    ${booking.service}
                </h3>

                <span class="status">
                    ${booking.status}
                </span>

            </div>


            <div class="booking-details">

                <p>
                    <strong>Booking ID:</strong>
                    ${booking.id}
                </p>

                <p>
                    <strong>Provider:</strong>
                    ${booking.provider}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${booking.date}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${booking.time}
                </p>

                <p>
                    <strong>Customer:</strong>
                    ${booking.customerName}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${booking.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${booking.address}
                </p>

                <p>
                    <strong>Problem:</strong>
                    ${booking.description || "Not provided"}
                </p>

            </div>


            <button
                class="cancel-btn"
                onclick="cancelBooking(${index})">

                Cancel Booking

            </button>

        `;


        bookingList.appendChild(card);

    });

}


/* =========================================
   CANCEL BOOKING
========================================= */

function cancelBooking(index) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) return;


    bookings.splice(index, 1);


    localStorage.setItem(
        "homeBookings",
        JSON.stringify(bookings)
    );


    displayBookings();


    showToast(
        "Booking cancelled successfully"
    );

}


/* =========================================
   LOGIN MODAL
========================================= */

function openLogin() {

    document
        .getElementById("loginModal")
        .style.display = "flex";

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .style.display = "none";

}


/* =========================================
   LOGIN
========================================= */

function login() {

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    if (
        email.trim() === "" ||
        password.trim() === ""
    ) {

        showToast(
            "Please enter email and password"
        );

        return;

    }


    closeLogin();


    showToast(
        "Login successful!"
    );

}


/* =========================================
   TOAST MESSAGE
========================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.style.display = "block";


    setTimeout(function () {

        toast.style.display = "none";

    }, 3000);

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("loginModal");


        if (event.target === modal) {

            closeLogin();

        }

    }
);