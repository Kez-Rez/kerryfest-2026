# Google Sheets Setup Instructions

Follow these steps to collect RSVP data from your birthday ticket website:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Kerry's 40th Birthday RSVPs"
4. In the first row, add these headers:
   - Column A: **Timestamp**
   - Column B: **Full Name**
   - Column C: **House**
   - Column D: **Number of Guests**
   - Column E: **Notes**

## Step 2: Create a Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any code in the editor
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName('Sheet1');
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.team,
      data.guests,
      data.dietaryReqs
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project (e.g., "Birthday RSVP Handler")

## Step 3: Deploy the Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: Birthday RSVP Collector
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** > **Go to [project name] (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

## Step 4: Update Your Website

1. Open `script.js` in your code editor
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your copied URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
   ```
4. Save the file

## Step 5: Test It!

1. Open your website
2. Fill out the form with test data
3. Check your Google Sheet - the data should appear!

## Viewing Your RSVPs

Simply open your Google Sheet to see all the responses in real-time. You can:
- Sort by name, house, or timestamp
- Filter responses
- Export to Excel if needed
- See who's coming, which house they chose, and their notes
- Track which houses are most popular!

---

**Note**: If you update the Apps Script code, you'll need to create a NEW deployment (Deploy > New deployment) to get a new URL.
