import { useEffect, useState } from 'react';

export default function Home() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    if (userId) {
      fetchEmails(userId);
    }
  }, []);

  const fetchEmails = async (userId) => {
    const response = await fetch(`/api/gmail/getEmails`, {
      headers: {
        'x-user-id': userId, // Send the user ID to the server to fetch emails
      },
    });
    const data = await response.json();
    setEmails(data.messages || []);
  };

  return (
    <div>
      <button onClick={() => window.location.href = '/api/auth/start'}>Login with Google</button>
      <ul>
        {emails.map(email => (
          <li key={email.id}>{email.id}</li>
        ))}
      </ul>
    </div>
  );
}
