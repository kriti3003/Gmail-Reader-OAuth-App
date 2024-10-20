import { google } from 'googleapis';
import { saveTokens } from '../../../tokenStorage';  // Adjust the path as needed

export default async function handler(req, res) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Fetch user information
        const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
        const userinfoResponse = await oauth2.userinfo.get();
        const userId = userinfoResponse.data.email; // Use email as user ID

        await saveTokens(userId, tokens);

        // Redirect to the front-end with the user ID in the query parameters
        res.redirect(`/dashboard?auth=success&userId=${encodeURIComponent(userId)}`);
    } catch (error) {
        console.error('Error during token exchange:', error);
        res.status(500).json({ error: "Error authenticating" });
    }
}
