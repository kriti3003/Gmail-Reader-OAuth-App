import { google } from 'googleapis';
import { getTokens } from '../../tokenStorage'; // Adjust the path as needed

export default async function handler(req, res) {
    const userId = req.headers['x-user-id']; // Ensure this header is sent from the client

    if (!userId) {
        console.error("User ID is missing from the request headers");
        return res.status(400).json({ error: "User ID is missing from request" });
    }

    console.log("Retrieved User ID:", userId);

    const tokens = await getTokens(userId);
    if (!tokens) {
        console.error("No tokens found for user ID:", userId);
        return res.status(401).json({ error: "User not authenticated" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);

    console.log("Tokens for user:", tokens);

    const gmail = google.gmail({ auth: oauth2Client, version: 'v1' });
    try {
        const result = await gmail.users.messages.list({ userId: 'me' });
        console.log("Fetched emails:", result.data);
        res.status(200).json(result.data);
    } catch (error) {
        console.error('Failed to fetch emails:', error);
        res.status(500).json({ error: 'Failed to fetch emails' });
    }
}

