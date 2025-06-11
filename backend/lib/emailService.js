import nodemailer from 'nodemailer';
import TrackingPDFGenerator from '../utils/TrackingPDFGenerator.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@globallogistics.com';
  }

  async sendShipmentNotification(shipment, recipientType = 'sender') {
    try {
      const recipient = recipientType === 'sender' ? shipment.sender : shipment.recipient;
      const isForSender = recipientType === 'sender';

      // PDF generation disabled - no attachment
      let pdfBuffer = null;

      const subject = isForSender 
        ? `Shipment Created - Tracking Number: ${shipment.trackingNumber}`
        : `Package Coming Your Way - Tracking Number: ${shipment.trackingNumber}`;

      const html = this.generateEmailHTML(shipment, isForSender);

      const mailOptions = {
        from: `"GlobalLogistics" <${process.env.EMAIL_USER}>`,
        to: recipient.email,
        subject: subject,
        html: html,
        attachments: pdfBuffer ? [
          {
            filename: `tracking-${shipment.trackingNumber}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ] : []
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${recipient.email} (${recipientType}):`, result.messageId);
      return { success: true, messageId: result.messageId };

    } catch (error) {
      console.error(`Failed to send email to ${recipientType}:`, error);

      // Send error notification to admin
      await this.notifyAdminOfError(shipment, recipientType, error);

      return { success: false, error: error.message };
    }
  }

  async notifyAdminOfError(shipment, recipientType, error) {
    try {
      const recipient = recipientType === 'sender' ? shipment.sender : shipment.recipient;

      const errorMailOptions = {
        from: `"GlobalLogistics" <${process.env.EMAIL_USER}>`,
        to: this.adminEmail,
        subject: `Email Delivery Failed - Tracking: ${shipment.trackingNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Email Delivery Failed</h2>
            <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
            <p><strong>Recipient Type:</strong> ${recipientType}</p>
            <p><strong>Recipient Email:</strong> ${recipient.email}</p>
            <p><strong>Recipient Name:</strong> ${recipient.name}</p>
            <p><strong>Error Message:</strong></p>
            <pre style="background: #f3f4f6; padding: 10px; border-radius: 5px; overflow-x: auto;">${error.message}</pre>
            <p><strong>Error Stack:</strong></p>
            <pre style="background: #f3f4f6; padding: 10px; border-radius: 5px; overflow-x: auto; font-size: 12px;">${error.stack}</pre>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `
      };

      await this.transporter.sendMail(errorMailOptions);
      console.log('Admin notification sent for email delivery failure');
    } catch (adminError) {
      console.error('Failed to notify admin of email error:', adminError);
    }
  }

  generateEmailHTML(shipment, isForSender) {
    const recipient = isForSender ? shipment.sender : shipment.recipient;
    const otherParty = isForSender ? shipment.recipient : shipment.sender;
    const role = isForSender ? 'sender' : 'recipient';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shipment ${isForSender ? 'Created' : 'Notification'}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">GlobalLogistics</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 5px 0 0 0; font-size: 16px;">
              ${isForSender ? 'Shipment Created Successfully' : 'Package Coming Your Way'}
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 30px 20px;">

            <!-- Greeting -->
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
              Hello ${recipient.name}!
            </h2>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
              ${isForSender 
                ? `Your shipment has been successfully created and is ready for pickup. Here are the details:`
                : `You have a package coming your way from ${otherParty.name}. Here are the details:`
              }
            </p>

            <!-- Tracking Number -->
            <div style="background-color: #f3f4f6; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">Tracking Number</h3>
              <p style="color: #10b981; font-size: 24px; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">
                ${shipment.trackingNumber}
              </p>
            </div>

            <!-- Shipment Details -->
            <div style="margin: 25px 0;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Shipment Details</h3>

              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Status:</td>
                  <td style="padding: 12px 0; color: #1f2937; text-transform: capitalize;">${shipment.status.replace('_', ' ')}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Service Type:</td>
                  <td style="padding: 12px 0; color: #1f2937; text-transform: capitalize;">${shipment.serviceType}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Priority:</td>
                  <td style="padding: 12px 0; color: #1f2937; text-transform: capitalize;">${shipment.priority}</td>
                </tr>
                ${shipment.estimatedDelivery ? `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Estimated Delivery:</td>
                  <td style="padding: 12px 0; color: #1f2937;">${new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 12px 0; color: #6b7280; font-weight: 500;">Package Description:</td>
                  <td style="padding: 12px 0; color: #1f2937;">${shipment.packageDetails.description}</td>
                </tr>
              </table>
            </div>

            <!-- From/To Information -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0;">
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #dbeafe;">
                <h4 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">From:</h4>
                <p style="color: #1f2937; font-weight: 500; margin: 0 0 5px 0;">${shipment.sender.name}</p>
                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">${shipment.sender.address}</p>
              </div>

              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #dcfce7;">
                <h4 style="color: #16a34a; margin: 0 0 10px 0; font-size: 16px;">To:</h4>
                <p style="color: #1f2937; font-weight: 500; margin: 0 0 5px 0;">${shipment.recipient.name}</p>
                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">${shipment.recipient.address}</p>
              </div>
            </div>

            <!-- Special Instructions -->
            ${shipment.specialInstructions ? `
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px;">Special Instructions:</h4>
              <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 1.5;">${shipment.specialInstructions}</p>
            </div>` : ''}

            <!-- Tracking Information Notice -->
            <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #0c4a6e; margin: 0; font-size: 14px;">
                📱 <strong>Tracking:</strong> You can track your shipment anytime using the tracking number above on our website.
              </p>
            </div>

            <!-- Next Steps -->
            <div style="margin: 30px 0;">
              <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
              <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; padding-left: 20px;">
                ${isForSender ? `
                <li style="margin-bottom: 8px;">Your package will be picked up according to the scheduled date</li>
                <li style="margin-bottom: 8px;">You'll receive updates as your shipment moves through our network</li>
                <li style="margin-bottom: 8px;">Track your shipment anytime using the tracking number above</li>
                ` : `
                <li style="margin-bottom: 8px;">Your package is being prepared for shipment</li>
                <li style="margin-bottom: 8px;">You'll receive updates as it moves through our network</li>
                <li style="margin-bottom: 8px;">Track the shipment anytime using the tracking number above</li>
                `}
                <li>Contact us if you have any questions or concerns</li>
              </ul>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              Questions? Contact us at <a href="mailto:support@globallogistics.com" style="color: #10b981; text-decoration: none;">support@globallogistics.com</a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} GlobalLogistics. All rights reserved.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;
  }
}

export default EmailService;