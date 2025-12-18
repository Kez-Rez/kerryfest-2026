// Google Sheets Configuration
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTAzFCzvVw1AKo1RBupfsYRo5rFJAWNmwKPKxq0W5SFUcBl_bPWlxab7uiZTp2ODIu/exec';

// Get current time in Brisbane timezone
function getBrisbaneTime() {
    try {
        const now = new Date();
        const brisbaneTime = now.toLocaleString('en-AU', {
            timeZone: 'Australia/Brisbane',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        return brisbaneTime;
    } catch (error) {
        console.error('Error getting Brisbane time:', error);
        // Fallback to local time
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    }
}

// Final closing date - Sunday, February 15, 2026
const FINAL_CLOSE_DATE = new Date('2026-02-15T23:59:59');

// Fake ticket buyers for notifications
const FAKE_BUYERS = [
    'Jack O\'Neill',
    'Elizabeth Bennett',
    'Pippin Took',
    'Mark Watney',
    'Eugene Fitzherbert',
    'Colonel Fitzwilliam',
    'Eustace Clarence Scrubb',
    'Hannah Abbott',
    'Bill Masen',
    'Joe Quincy',
    'Jane Austin',
    'Andy Weir',
    'Richard Wagner',
    'Ole Kirk Christiansen',
    'Natalie Holt',
    'Holden Caulfield',
    'Huckleberry Finn',
    'Jo March',
    'Arwen Evenstar',
    'Lucy Pevensie',
    'John McClane',
    'Antonio Vivaldi',
    'Pyotr Tchaikovsky',
    'Ennio Morricone',
    'Ian Malcolm',           // Jurassic Park
    'Darryl Kerrigan',       // The Castle
    'Maurice Moss',          // IT Crowd
    'Regina George',         // Mean Girls
    'Bobby Fischer',
    'Yuri Gagarin',
    'Valentina Tereshkova',
    'Chloé Zhao',
    'Laika'
];

// Countdown Timer (15 minutes)
let timeRemaining = 15 * 60; // 15 minutes in seconds
let timerInterval;
let notificationInterval;

function checkFinalCloseDate() {
    const now = new Date();
    return now >= FINAL_CLOSE_DATE;
}

function startCountdown() {
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const timerDisplay = document.querySelector('.timer-display');
    const form = document.getElementById('ticketForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Check if we've passed the final closing date
    if (checkFinalCloseDate()) {
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        form.querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = true;
        });
        submitBtn.textContent = 'SALES PERMANENTLY CLOSED';
        submitBtn.style.background = '#999';
        timerDisplay.classList.add('warning');
        return;
    }

    timerInterval = setInterval(() => {
        timeRemaining--;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        // Update display
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // Add warning style when under 2 minutes
        if (timeRemaining <= 120) {
            timerDisplay.classList.add('warning');
        }

        // When time runs out
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';

            // Disable form temporarily
            form.querySelectorAll('input, select, textarea, button').forEach(element => {
                element.disabled = true;
            });

            submitBtn.textContent = 'TIME EXPIRED - REFRESH TO TRY AGAIN';
            submitBtn.style.background = '#ff6b6b';

            alert('Time\'s up! Refresh the page to get another 15 minutes. Final sales close February 15th, 2026.');
        }
    }, 1000);
}

// Fake notification system
function showTicketNotification(buyerName) {
    const container = document.getElementById('notificationContainer');

    const notification = document.createElement('div');
    notification.className = 'ticket-notification';

    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-name">${buyerName}</div>
            <div class="notification-text">just bought a ticket!</div>
        </div>
        <div class="notification-icon">✓</div>
    `;

    container.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function startNotifications() {
    // Show first notification after 3-8 seconds
    const firstDelay = 3000 + Math.random() * 5000;

    setTimeout(() => {
        showRandomNotification();

        // Continue showing notifications at random intervals
        notificationInterval = setInterval(() => {
            showRandomNotification();
        }, 8000 + Math.random() * 12000); // Every 8-20 seconds
    }, firstDelay);
}

function showRandomNotification() {
    const randomBuyerName = FAKE_BUYERS[Math.floor(Math.random() * FAKE_BUYERS.length)];
    showTicketNotification(randomBuyerName);
}

// Fetch last commit info from GitHub
async function fetchLastCommitInfo() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    try {
        const response = await fetch('https://api.github.com/repos/Kez-Rez/kerryfest-2026/commits/main');
        const data = await response.json();

        const commitDate = new Date(data.commit.author.date);
        const brisbaneDate = commitDate.toLocaleString('en-AU', {
            timeZone: 'Australia/Brisbane',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const commitHash = data.sha.substring(0, 7);
        lastUpdatedElement.textContent = `${brisbaneDate} (${commitHash})`;
    } catch (error) {
        console.error('Error fetching commit info:', error);
        lastUpdatedElement.textContent = 'Unable to fetch update time';
    }
}

// Start countdown and notifications when page loads
window.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    startNotifications();

    // Set last updated time from latest GitHub commit
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        fetchLastCommitInfo();
    }

    // Detect Facebook/Instagram browser and add class
    if (isInAppBrowser()) {
        document.body.classList.add('fb-browser');
    }
});

// Form submission handler
document.getElementById('ticketForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');

    // Prevent double submission
    if (submitBtn.disabled) {
        return;
    }

    // Disable button and show processing state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'PROCESSING...';

    const formData = {
        fullName: document.getElementById('fullName').value,
        team: document.getElementById('team').value,
        guests: document.getElementById('guests').value,
        dietaryReqs: document.getElementById('dietaryReqs').value,
        timestamp: getBrisbaneTime()
    };

    try {
        // Send data to Google Sheets
        await sendToGoogleSheets(formData);

        // Generate ticket
        generateTicket(formData);

        // Switch to ticket page
        document.getElementById('bookingPage').classList.remove('active');
        document.getElementById('ticketPage').classList.add('active');

        // Hide countdown timer and stop countdown on ticket page
        document.getElementById('countdownTimer').style.display = 'none';
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        // Keep notifications running

        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        // Re-enable button if there's an error
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        console.error('Error during form submission:', error);
    }
});

// Send data to Google Sheets
async function sendToGoogleSheets(data) {
    console.log('sendToGoogleSheets called with data:', data);
    console.log('Google Script URL:', GOOGLE_SCRIPT_URL);

    // Only send if URL is configured
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        console.log('⚠️ Google Sheets not configured. Data:', data);
        alert('Google Sheets is not configured. Data will not be saved.');
        return;
    }

    console.log('✅ Sending data to Google Sheets...');

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log('✅ Data sent to Google Sheets successfully');
        console.log('Response:', response);
    } catch (error) {
        console.error('❌ Error sending to Google Sheets:', error);
        alert('Error sending to Google Sheets: ' + error.message);
        // Still generate ticket even if Google Sheets fails
    }
}

// Generate ticket with user data
function generateTicket(data) {
    const ticketContainer = document.querySelector('.ticket-container');
    const numberOfAdditionalGuests = parseInt(data.guests);
    const totalTickets = numberOfAdditionalGuests + 1; // Main person + guests

    // Clear existing tickets
    ticketContainer.innerHTML = '';

    // Add success message at the top
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    const printTip = totalTickets > 1
        ? '<p style="font-size: 0.9em; margin-top: 10px; color: #764ba2;"><strong>Print tip:</strong> Select "Landscape" orientation and A4 paper for best results (2 A6 tickets per page)</p>'
        : '<p style="font-size: 0.9em; margin-top: 10px; color: #764ba2;"><strong>Print tip:</strong> Select A6 paper size in your print dialog</p>';
    successMsg.innerHTML = `
        <h3>🎉 You're on the list!</h3>
        <p>Print your ${totalTickets > 1 ? 'tickets' : 'ticket'} and stick ${totalTickets > 1 ? 'them' : 'it'} on the fridge. See you on 💖Valentine's!💖</p>
        ${printTip}
    `;
    ticketContainer.appendChild(successMsg);

    // Add buttons after success message
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';
    buttonGroup.innerHTML = `
        <button onclick="window.print()" class="action-btn print-btn">🖨️ PRINT TICKETS</button>
        <button onclick="addToCalendar()" class="action-btn calendar-btn">📅 ADD TO CALENDAR</button>
    `;
    ticketContainer.appendChild(buttonGroup);

    // Generate tickets for main person + guests
    for (let i = 0; i < totalTickets; i++) {
        const ticket = createTicketElement(data, i, totalTickets, numberOfAdditionalGuests);
        ticketContainer.appendChild(ticket);
    }

    // Add class based on number of tickets for print layout
    if (totalTickets === 1) {
        ticketContainer.classList.add('single-ticket');
        ticketContainer.classList.remove('multiple-tickets');
    } else {
        ticketContainer.classList.add('multiple-tickets');
        ticketContainer.classList.remove('single-ticket');
    }
}

function createTicketElement(data, index, total, numberOfGuests) {
    const ticketDiv = document.createElement('div');
    ticketDiv.className = 'ticket';
    ticketDiv.id = `ticket-${index}`;

    const isMainTicket = index === 0;
    const ticketName = isMainTicket ? data.fullName.toUpperCase() : `GUEST OF ${data.fullName.toUpperCase()}`;
    const barcodeId = `barcode-${index}`;
    const partySizeText = total === 1 ? '1 Person' : `${total} People`;

    ticketDiv.innerHTML = `
        <div class="ticket-header">
            <img src="KERRYTIX.png" alt="KERRYTIX" class="ticket-logo" crossorigin="anonymous">
        </div>

        <div class="ticket-body">
            <h2>ADMIT ONE</h2>
            <h1 class="event-title">THE 40th ANNUAL<br>FESTIVAL OF KERRY</h1>

            <div class="ticket-description">
                <p>A day of crafts, pinball, lawn bowls, and good times!</p>
            </div>

            <div class="ticket-details">
                <div class="detail-row">
                    <span class="label">NAME:</span>
                    <span class="value">${ticketName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">HOUSE:</span>
                    <span class="value">${data.team}</span>
                </div>
                <div class="detail-row">
                    <span class="label">DATE:</span>
                    <span class="value">Saturday February 14</span>
                </div>
                <div class="detail-row">
                    <span class="label">TIME:</span>
                    <span class="value">1pm-8pm</span>
                </div>
                <div class="detail-row">
                    <span class="label">VENUE:</span>
                    <span class="value">Koala Room, Moorooka Bowls Club</span>
                </div>
                <div class="detail-row">
                    <span class="label">PARTY SIZE:</span>
                    <span class="value">${partySizeText}</span>
                </div>
            </div>

            <div class="barcode-section">
                <svg id="${barcodeId}"></svg>
                <p class="barcode-number">140219862026</p>
            </div>
        </div>

        <div class="ticket-footer">
            <p>Stick me on your fridge • Non-transferable • Crafty Fun </p>
        </div>
    `;

    // Generate barcode after adding to DOM
    setTimeout(() => {
        JsBarcode(`#${barcodeId}`, "140219862026", {
            format: "CODE128",
            width: 2,
            height: 60,
            displayValue: false,
            margin: 10
        });
    }, 0);

    return ticketDiv;
}

// Check if user is in Facebook/Instagram in-app browser
function isInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1) || (ua.indexOf('Instagram') > -1);
}

// Check if user is on iOS
function isIOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Add event to calendar
function addToCalendar() {
    // Event details
    const eventTitle = 'The 40th Annual Festival of Kerry';
    const eventLocation = 'The Clubhouse Moorooka, The Koala Room';
    const eventDescription = 'A day of crafts, pinball, lawn bowls and good times! Come anytime between 1pm-8pm. See you on Valentine\'s Day! 💖';

    // Date: February 14, 2026, 1pm-8pm Brisbane time
    const startDate = '20260214T130000';
    const endDate = '20260214T200000';

    // For iOS devices, use Google Calendar link as it works more reliably
    if (isIOS()) {
        // Google Calendar URL format
        const googleCalendarUrl = createGoogleCalendarUrl(eventTitle, eventDescription, eventLocation, startDate, endDate);

        // Try to open in new window/tab
        const opened = window.open(googleCalendarUrl, '_blank');

        if (!opened) {
            // If popup blocked, show instructions
            if (confirm('📅 Add to Calendar\n\nFor iPhone/iPad, this will open Google Calendar.\n\nAlternatively, you can:\n• Screenshot this page and add manually to your calendar\n• Use the event details: Saturday Feb 14, 2026, 1pm-8pm\n\nPress OK to open Google Calendar, or Cancel to stay here.')) {
                window.location.href = googleCalendarUrl;
            }
        }
        return;
    }

    // For desktop and Android, use .ics file download
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//KerryFest//Birthday Party//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${eventTitle}`,
        `LOCATION:${eventLocation}`,
        `DESCRIPTION:${eventDescription}`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: KerryFest tomorrow!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'kerryfest-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// Create Google Calendar URL
function createGoogleCalendarUrl(title, description, location, startDate, endDate) {
    // Convert from YYYYMMDDTHHMMSS to YYYYMMDDTHHMMSSZ format
    const start = startDate.replace(/[-:]/g, '') + 'Z';
    const end = endDate.replace(/[-:]/g, '') + 'Z';

    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${start}/${end}`,
        details: description,
        location: location,
        ctz: 'Australia/Brisbane'
    });

    return `${baseUrl}?${params.toString()}`;
}

// Reset form and go back
function resetForm() {
    document.getElementById('ticketForm').reset();
    document.getElementById('ticketPage').classList.remove('active');
    document.getElementById('bookingPage').classList.add('active');
    window.scrollTo(0, 0);

    // Don't restart countdown if past final close date
    if (!checkFinalCloseDate()) {
        // Restart countdown timer
        timeRemaining = 15 * 60;
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        // Remove warning class
        const timerDisplay = document.querySelector('.timer-display');
        timerDisplay.classList.remove('warning');

        startCountdown();

        // Re-enable form if it was disabled
        const form = document.getElementById('ticketForm');
        const submitBtn = document.querySelector('.submit-btn');
        form.querySelectorAll('input, select, textarea, button').forEach(element => {
            element.disabled = false;
        });
        submitBtn.textContent = 'GET MY TICKET';
        submitBtn.style.background = '';
    }
}

// Print setup handler
window.addEventListener('beforeprint', function() {
    const ticketContainer = document.querySelector('.ticket-container');
    if (ticketContainer && ticketContainer.classList.contains('multiple-tickets')) {
        // For multiple tickets, remind user to use landscape
        const tickets = ticketContainer.querySelectorAll('.ticket');
        if (tickets.length > 1) {
            console.log('Printing multiple tickets - please select landscape orientation in your print dialog for best results (2 tickets per page)');
        }
    }
});

