import { google } from "googleapis";
import { config } from "../config/index.js";

function getSheetsClient() {
  const { clientEmail, privateKey, spreadsheetId } = config.googleSheets;
  if (!clientEmail || !privateKey || !spreadsheetId) return null;

  const auth = new google.auth.JWT(clientEmail, null, privateKey, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export async function exportLeadToSheets(teamId, lead) {
  const client = getSheetsClient();
  if (!client) {
    console.log("[sheets] Mock export lead:", lead.id);
    return;
  }

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: "Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.source_channel,
        lead.intent,
        lead.score,
        lead.status,
      ]],
    },
  });
}

export async function exportBookingToSheets(booking) {
  const client = getSheetsClient();
  if (!client) {
    console.log("[sheets] Mock export booking:", booking.id);
    return;
  }

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range: "Bookings!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        booking.contact_name,
        booking.contact_email,
        booking.scheduled_at,
        booking.meeting_type,
        booking.channel,
        booking.status,
      ]],
    },
  });
}
