# Google Sheets Troubleshooting Guide

If your Google Sheets integration isn't working, follow these steps:

## Step 1: Check Browser Console

1. Open your website in the browser
2. Press **F12** to open Developer Tools
3. Click the **Console** tab
4. Fill out the form and submit
5. Look for these messages:

### What You Should See:

```
sendToGoogleSheets called with data: {fullName: "...", email: "...", ...}
Google Script URL: https://script.google.com/macros/s/.../exec
✅ Sending data to Google Sheets...
✅ Data sent to Google Sheets successfully
```

### Common Issues:

#### Issue 1: "Google Sheets not configured"
**Problem:** URL is still the placeholder
**Solution:** Make sure you replaced 'YOUR_GOOGLE_SCRIPT_URL_HERE' with your actual URL in script.js

#### Issue 2: Network Error
**Problem:** Can't reach Google's servers
**Solution:**
- Check your internet connection
- Make sure the URL ends with `/exec`
- Verify the URL in your browser - it should redirect or show a message

#### Issue 3: Data Sent But Not Appearing in Sheet
**Problem:** Apps Script not processing correctly
**Solution:** See Step 2 below

## Step 2: Test Your Google Apps Script Directly

1. Go to your Google Apps Script project
2. Click **Deploy** > **Test deployments**
3. Copy the test URL
4. Open a new browser tab
5. Paste this URL but add test data at the end:
   ```
   https://script.google.com/macros/s/YOUR_ID/exec?fullName=Test&email=test@test.com
   ```
6. Press Enter
7. You should see: `{"result":"success"}`

If you see an error, the problem is with your Apps Script.

## Step 3: Verify Apps Script Deployment

Make sure your deployment is correct:

1. **In Apps Script**, click **Deploy** > **Manage deployments**
2. Check these settings:
   - ✅ Type: **Web app**
   - ✅ Execute as: **Me** (your email)
   - ✅ Who has access: **Anyone**
3. If anything is wrong, create a **New deployment** with correct settings

## Step 4: Check Column Headers

Your Google Sheet's first row must have EXACTLY these headers:

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Full Name | House | Number of Guests | Notes |

**Important:** No extra spaces, exact capitalization!

## Step 5: Test with Minimal Data

Try submitting the form with just:
- Name: Test
- House: Curious Quolls
- Guests: 0
- (leave notes empty)

If this works but full data doesn't, there might be an issue with special characters.

## Step 6: Check Apps Script Logs

1. In your Apps Script project
2. Click **Executions** (clock icon on left sidebar)
3. Look for recent executions
4. Click on any failed ones to see the error

## Step 7: Verify the Apps Script Code

Your `doPost` function should look EXACTLY like this:

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

## Quick Checklist

- [ ] Google Sheet created with correct headers
- [ ] Apps Script code copied correctly
- [ ] Apps Script deployed as Web app
- [ ] "Execute as" set to "Me"
- [ ] "Who has access" set to "Anyone"
- [ ] Authorized the script
- [ ] Copied the Web App URL (ends with /exec)
- [ ] Pasted URL into script.js (replacing placeholder)
- [ ] Refreshed the webpage (Ctrl+F5)
- [ ] Checked browser console for errors

## Still Not Working?

If you've tried everything:

1. **Create a brand new deployment:**
   - Go to Apps Script
   - Click **Deploy** > **New deployment**
   - Get the NEW URL
   - Update script.js with the new URL

2. **Check your Google account permissions:**
   - Make sure you're logged into the same Google account
   - Try in an incognito/private window

3. **Test the form locally:**
   - Open Browser Console (F12)
   - The console logs will tell you exactly what's happening

---

**Note:** Due to browser security (`mode: 'no-cors'`), we can't see detailed error responses. But the console logs and Apps Script execution logs will show you what's happening.
