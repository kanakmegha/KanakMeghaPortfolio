"use server"
import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
  // 1. Validate environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { success: false, message: "Server configuration error." };
  }

  // 2. Create the transporter with 2026 security standards
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for SSL (highly recommended)
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Your 16-digit App Password
    },
    tls: {
      // Helps avoid self-signed certificate issues in some environments
      rejectUnauthorized: false 
    }
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send the message to yourself
      replyTo: formData.email,
      subject: `New Message from ${formData.name}`,
      text: formData.message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        </div>
      `,
    });

    return { success: true, message: "Thank you! Your message has been sent." };
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return { success: false, message: "Failed to send email. Please try again later." };
  }
}