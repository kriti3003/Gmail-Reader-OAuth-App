// tokenStorage.js
import redis from './redis'; // Ensure correct path to your Redis setup file

export async function saveTokens(userId, tokens) {
    await redis.set(`user_tokens:${userId}`, JSON.stringify(tokens), 'EX', 3600); // Save with an expiration (e.g., 3600 seconds)
    console.log(`${new Date().toISOString()} - Saving tokens for user ${userId}:`, tokens);
}

export async function getTokens(userId) {
    const tokenString = await redis.get(`user_tokens:${userId}`);
    if (!tokenString) return null;
    return JSON.parse(tokenString);
}

