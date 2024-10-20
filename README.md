# Gmail Reader OAuth App

This project is a full-stack web application that allows users to log in with their Google account and fetch their Gmail emails using Google OAuth 2.0 authentication. The application stores tokens securely using Redis and allows users to view their recent emails on a personalized dashboard.

## Features

- **Google OAuth 2.0 Authentication**: Users can sign in using their Google account.
- **Gmail Access**: After login, users can view a list of their recent Gmail messages.
- **Token Management**: Access tokens and refresh tokens are stored in Redis to authenticate Gmail API requests.
- **Secure API Calls**: All sensitive requests are made using the access token, which is securely stored and managed.
- **Local Storage for User Management**: The application stores user information in `localStorage` for session continuity.

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js (within Next.js API routes)
- **OAuth 2.0**: Google OAuth 2.0 for authentication and permission handling.
- **Database**: Redis for token storage and session management.
- **Gmail API**: Google Gmail API for fetching user emails.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14+)
- Redis (to store session tokens)

### Google Cloud Setup

To use Google OAuth 2.0, you will need to set up credentials in Google Cloud Console.

1. **Go to Google Cloud Console**:
    - If you don't already have an account, create one and log in.

2. **Create a New Project**:
    - Click on the project dropdown at the top left and then click on "New Project."
    - Give your project a name, and click "Create."

3. **Enable Gmail API**:
    - In the search bar, type "Gmail API."
    - Click "Enable" on the Gmail API page.

4. **Configure OAuth Consent Screen**:
    - On the left-hand sidebar, go to `APIs & Services > OAuth consent screen`.
    - Choose **External** for the user type, then click "Create."
    - Fill in the necessary fields (App name, support email, etc.).
    - Add the following scopes:
      ```
      https://www.googleapis.com/auth/gmail.readonly
      https://www.googleapis.com/auth/userinfo.email
      ```
    - Click "Save and Continue."

5. **Create OAuth 2.0 Credentials**:
    - On the left sidebar, go to `Credentials > Create Credentials > OAuth 2.0 Client IDs.`
    - Choose **Web Application**.
    - In the `Authorized redirect URIs` section, add:
      ```
      http://localhost:3000/api/auth/callback
      ```
    - After creating the credentials, you'll be shown your Client ID and Client Secret. Make sure to copy these for later use.

6. **Add Your Credentials to the Project**:
    - Create a `.env.local` file in the root directory and add the following environment variables:
      ```bash
      GOOGLE_CLIENT_ID=your-google-client-id
      GOOGLE_CLIENT_SECRET=your-google-client-secret
      GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
      ```

### Redis Installation

To store access tokens and refresh tokens, Redis is used as the database. Here are the steps to install Redis:

#### On macOS:
You can install Redis using `Homebrew`:

1. **Install Redis**:
    ```bash
    brew install redis
    ```

2. **Start Redis**:
    ```bash
    brew services start redis
    ```

3. **Verify that Redis is running**:
    ```bash
    redis-cli ping
    ```

    If Redis is running, it will return `PONG`.

#### On Ubuntu or Debian:
1. **Install Redis**:
    ```bash
    sudo apt update
    sudo apt install redis-server
    ```

2. **Start Redis**:
    ```bash
    sudo systemctl start redis
    ```

3. **Enable Redis to start on boot**:
    ```bash
    sudo systemctl enable redis
    ```

4. **Verify that Redis is running**:
    ```bash
    redis-cli ping
    ```

    If Redis is running, it will return `PONG`.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/gmail-reader-app.git
    cd gmail-reader-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Redis**:  
    Make sure Redis is running on your local machine. By default, the Redis client is set to `127.0.0.1:6379`. If you need to change this, adjust your Redis connection string in the Redis configuration.

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Open your browser**:  
    Open [http://localhost:3000](http://localhost:3000) to see the app in action.
