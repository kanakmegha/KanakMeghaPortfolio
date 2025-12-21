"use server";

import { generateAlternativeContent } from "@/ai/flows/generate-alternative-content";
import type { GenerateAlternativeContentOutput } from "@/ai/flows/generate-alternative-content";
import { portfolioChatbot } from "@/ai/flows/portfolio-chatbot";
import type { PortfolioChatbotInput } from "@/ai/flows/portfolio-chatbot";
import nodemailer from "nodemailer";
import { z } from "zod";

// Contact form schema
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;


export async function getAlternatives(
  currentHeadline: string,
  currentBio: string
): Promise<GenerateAlternativeContentOutput> {
  try {
    const result = await generateAlternativeContent({ currentHeadline, currentBio });
    return result;
  } catch (error) {
    console.error("Error generating alternative content:", error);
    // Return empty arrays or a specific error object
    return {
      alternativeHeadlines: [],
      alternativeBios: [],
    };
  }
}

export async function askChatbot(input: PortfolioChatbotInput): Promise<string> {
    try {
        const result = await portfolioChatbot(input);
        return result;
    } catch (error) {
        console.error("Error in chatbot:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate the form data
    const validatedData = ContactFormSchema.parse(data);
    
    // Create transporter (using Gmail SMTP as an example)
    // You'll need to set up environment variables for your email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER, // Where to receive the emails
      subject: `Portfolio Contact: Message from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #007bff; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #333;">${validatedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 5px;">
            <p style="margin: 0; color: #0056b3; font-size: 14px;">
              <strong>Reply to:</strong> ${validatedData.email}
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your form data and try again.",
      };
    }
    
    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later.",
    };
  }
}
