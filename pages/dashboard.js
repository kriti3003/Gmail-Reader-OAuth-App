// pages/dashboard.js
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify'; // You may need to install dompurify with `npm install dompurify`
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userId = router.query.userId || localStorage.getItem('userId');

        if (userId) {
            localStorage.setItem('userId', userId); // Store userId in localStorage for future use

            const fetchEmailDetails = async () => {
                setLoading(true);
                const res = await fetch('/api/emails', {
                    headers: {
                        'x-user-id': userId, // Send the userId in the request headers
                    }
                });
                if (res.ok) {
                    const { messages } = await res.json();
                    const detailedEmails = await Promise.all(messages.map(async (message) => {
                        const detailRes = await fetch(`/api/emails/details/${message.id}`, {
                            headers: {
                                'x-user-id': userId, // Pass userId in each request
                            }
                        });
                        return detailRes.json();
                    }));
                    setEmails(detailedEmails);
                } else {
                    console.error('Failed to fetch emails');
                }
                setLoading(false);
            };

            fetchEmailDetails();
        } else {
            // If no userId, force login again
            window.location.href = '/';
        }
    }, [router.query.userId]);

    if (loading) {
        return <p>Loading emails...</p>;
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard. You are logged in!</p>
            <h2>Recent Emails</h2>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>
                        <strong>From:</strong> {email.from || "No sender data"}<br/>
                        <strong>Subject:</strong> {email.subject || "No subject data"}<br/>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(email.body) }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
