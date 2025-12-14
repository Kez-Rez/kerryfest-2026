# KERRYTIX - KerryFest Ticket Website

A fun, concert-style ticket booking website for the 40th Annual Festival of Kerry (KerryFest)!

## Features

- Concert ticket-style booking form for "KerryFest"
- **15-minute countdown timer** - creates urgency for ticket purchases
- **Fake ticket sale notifications** - shows other "buyers" getting tickets
- **Timed ticket sales** - refreshable until final close date (Feb 15, 2026)
- Generates printable tickets with barcodes (using your custom number: 140219862026)
- Collects RSVP data to Google Sheets
- Download tickets as images
- Not searchable by search engines
- Mobile-friendly design

## Setup Instructions

### 1. Update Event Details

Edit [index.html](index.html) and replace these placeholders with your actual party details:
- `[Add Your Date]` - Your party date
- `[Add Your Time]` - Your party time
- `[Add Your Venue]` - Your party venue

### 2. Set Up Avatar Images

Add avatar images for the fake ticket notifications:
1. Follow instructions in [AVATAR_SETUP.md](AVATAR_SETUP.md)
2. Add 50x50px to 200x200px images to the `avatars` folder
3. Images work without avatars - they just won't show the pictures

### 3. Set Up Google Sheets (Optional)

Follow the instructions in [SETUP_GOOGLE_SHEETS.md](SETUP_GOOGLE_SHEETS.md) to collect RSVP data.

### 4. Deploy to GitHub Pages

1. Create a new repository on GitHub (make it **private** if you don't want it indexed)
2. Initialize git in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Birthday ticket website"
   ```
3. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
4. Enable GitHub Pages:
   - Go to your repository settings
   - Click "Pages" in the sidebar
   - Under "Source", select "main" branch
   - Click "Save"
5. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 5. Share with Friends

Send the GitHub Pages URL to your friends. They can fill out the form and get their tickets!

## How It Works

### Countdown Timer
- Starts at 15:00 (15 minutes) when the page loads
- Turns red and blinks when under 2 minutes remain
- When it hits 0:00, the form is disabled
- Users can **refresh the page** to get another 15 minutes
- **Permanently closes on Sunday, February 15, 2026** at 11:59 PM

### Fake Notifications
- Random "ticket purchase" notifications appear every 8-20 seconds
- Shows celebrity names and avatars (if you've added images)
- Pop up in the bottom-left corner
- Creates FOMO (fear of missing out) and urgency
- Completely fake - just for fun!

## Files

- `index.html` - Main website page
- `styles.css` - All the styling
- `script.js` - Form handling, countdown timer, notifications, and ticket generation
- `KERRYTIX.png` - Your branding logo
- `robots.txt` - Prevents search engine indexing
- `avatars/` - Folder for notification avatar images
- `AVATAR_SETUP.md` - Instructions for adding avatar images
- `SETUP_GOOGLE_SHEETS.md` - Instructions for Google Sheets integration

## Customization

### Change the Countdown Duration
Edit [script.js](script.js#L28) line 28:
```javascript
let timeRemaining = 15 * 60; // Change 15 to your desired minutes
```

### Change the Final Close Date
Edit [script.js](script.js#L6) line 6:
```javascript
const FINAL_CLOSE_DATE = new Date('2026-02-15T23:59:59'); // Your date
```

### Add/Remove Fake Buyers
Edit [script.js](script.js#L9) starting at line 9 - modify the `FAKE_BUYERS` array with your own names and avatar paths.

## Privacy Notes

- The `robots.txt` file tells search engines not to index this page
- For extra privacy, make your GitHub repository private
- Only people with the direct link can access the page

## Local Testing

To test locally, simply open `index.html` in your web browser. Note that Google Sheets integration won't work until you've completed the setup steps.

---

Have an amazing party! 🎉
