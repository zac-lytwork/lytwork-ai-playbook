/**
 * Lytwork AI Playbook - Google Apps Script
 *
 * This script receives form submissions from the playbook gate page
 * and appends each lead (name, email, timestamp, source) to a Google Sheet.
 *
 * SETUP INSTRUCTIONS (5 minutes):
 * ─────────────────────────────────
 * 1. Go to sheets.google.com and create a new spreadsheet.
 *    Name it something like "Lytwork Playbook Leads".
 *
 * 2. Open the spreadsheet, then click:
 *    Extensions > Apps Script
 *
 * 3. Delete any existing code in the editor, then paste ALL of this file.
 *
 * 4. Click Save (floppy disk icon or Ctrl+S).
 *
 * 5. Click "Deploy" > "New deployment".
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click "Deploy", then authorize when prompted.
 *
 * 6. Copy the Web App URL that appears (it looks like:
 *    https://script.google.com/macros/s/AKfy.../exec)
 *
 * 7. Open index.html in this project, find this line near the bottom:
 *    var APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
 *    Replace the placeholder with your copied URL.
 *
 * 8. Commit and push the updated index.html. Done!
 *
 * Every lead that fills out the gate form will now appear as a new row
 * in your Google Sheet with columns: Timestamp | Name | Email | Source
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    // Parse incoming JSON body
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // Append the lead row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name      || '',
      data.email     || '',
      data.source    || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: test this function manually inside the Apps Script editor
// by running it directly (it won't append a row without real POST data,
// but it confirms the sheet connection works without errors).
function testConnection() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('Connected to sheet: ' + sheet.getName());
  Logger.log('Current rows: ' + sheet.getLastRow());
}
