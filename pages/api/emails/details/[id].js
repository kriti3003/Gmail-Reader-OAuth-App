import { google } from 'googleapis';
import { getTokens } from '../../../../tokenStorage';

export default async function handler(req, res) {
    const { id } = req.query; // Extract the email ID from the query
    const userId = req.headers['x-user-id']; // Retrieve user ID from headers
    const tokens = await getTokens(userId);

    if (!tokens) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ auth: oauth2Client, version: 'v1' });
    try {
        const email = await gmail.users.messages.get({
            userId: 'me',
            id: id,
            format: 'full' // This fetches the full email body
        });

        // Simplified response, assuming you want certain parts of the email
        const response = {
            from: email.data.payload.headers.find(header => header.name === 'From')?.value,
            subject: email.data.payload.headers.find(header => header.name === 'Subject')?.value,
            body: email.data.snippet // or use body data depending on your needs
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Failed to fetch email details:', error);
        res.status(500).json({ error: 'Failed to fetch email details' });
    }
}
