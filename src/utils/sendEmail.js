import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

const sendBookingNotificationEmail = async (bookingDetails) => {
    const recipientEmail = 'preyasi28@gmail.com'; 

    console.log('--- Preparing to send email via Brevo API ---');

    const emailData = {
        sender: {
            name: 'Preyasi Mehendi Website',
            email: SENDER_EMAIL
        },
        to: [
            {
                email: recipientEmail,
                name: 'Payal Chauhan'
            }
        ],
        subject: `New Mehendi Booking Request from ${bookingDetails.firstName}`,
        htmlContent: `
            <html><body>
                <h1>You have a new booking request!</h1>
                <p><strong>Name:</strong> ${bookingDetails.firstName} ${bookingDetails.lastName}</p>
                <p><strong>Phone:</strong> ${bookingDetails.phone}</p>
                <p><strong>Email:</strong> ${bookingDetails.email || 'Not provided'}</p>
                <p><strong>Event Date:</strong> ${new Date(bookingDetails.eventDate).toDateString()}</p>
                <p><strong>Booking Type:</strong> ${bookingDetails.bookingType}</p>
                <p><strong>Address:</strong> ${bookingDetails.address1}, ${bookingDetails.address2 || ''}, ${bookingDetails.city} - ${bookingDetails.pincode}</p>
            </body></html>
        `
    };

    const config = {
        method: 'post',
        url: 'https://api.brevo.com/v3/smtp/email',
        headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY, // The API key goes in the header
            'content-type': 'application/json'
        },
        data: emailData
    };

    try {
        await axios(config);
        console.log('✅ Email notification sent successfully via Brevo API!');
    } 
    catch (error) {
        console.error('❌ BREVO API EMAIL FAILED TO SEND ❌');
        // This provides a more detailed error from Brevo's server
        if (error.response) {
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
};

export { sendBookingNotificationEmail };