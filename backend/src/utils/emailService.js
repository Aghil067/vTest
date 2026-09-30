const nodemailer = require('nodemailer');

/**
 * Create SMTP Transporter based on environment variables.
 * Falls back to console logging if SMTP settings are not configured.
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  if (!user || !pass) {
    return null;
  }

  // If host is Gmail, use nodemailer's built-in gmail service for maximum reliability
  if (host && host.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user.trim(),
        pass: pass
      }
    });
  }

  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: user.trim(),
      pass: pass
    }
  });
};

/**
 * Format enquiry details into a clean, modern HTML email template
 */
const renderEnquiryHtml = (enquiry) => {
  const adminUrl = process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/admin/enquiries` : '#';
  const submittedAt = new Date(enquiry.createdAt || Date.now()).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Website Enquiry</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f4f6f9;
          margin: 0;
          padding: 20px;
          color: #1e293b;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }
        .header {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
          color: #ffffff;
          padding: 28px 32px;
          text-align: left;
        }
        .header h2 {
          margin: 0 0 6px 0;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 0;
          font-size: 14px;
          color: #c7d2fe;
        }
        .badge {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .content {
          padding: 32px;
        }
        .section-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #64748b;
          margin-bottom: 12px;
        }
        .details-grid {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .details-grid td {
          padding: 10px 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 14px;
        }
        .details-grid tr:last-child td {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #475569;
          width: 35%;
        }
        .value {
          color: #0f172a;
          word-break: break-word;
        }
        .value a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .message-box {
          background-color: #f8fafc;
          border-left: 4px solid #4f46e5;
          border-radius: 0 8px 8px 0;
          padding: 18px 20px;
          font-size: 14px;
          line-height: 1.6;
          color: #334155;
          margin-bottom: 28px;
          white-space: pre-wrap;
        }
        .btn-container {
          text-align: center;
          margin-top: 24px;
          margin-bottom: 16px;
        }
        .btn {
          display: inline-block;
          background-color: #4f46e5;
          color: #ffffff !important;
          font-weight: 600;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .footer {
          background-color: #f8fafc;
          padding: 20px 32px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📩 New Client Enquiry Received</h2>
          <p>A new enquiry was submitted via the Vtest website</p>
          <span class="badge">${enquiry.enquiryType || 'General Inquiry'}</span>
        </div>
        
        <div class="content">
          <div class="section-title">Client Information</div>
          <table class="details-grid">
            <tr>
              <td class="label">Full Name</td>
              <td class="value"><strong>${enquiry.name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone Number</td>
              <td class="value">${enquiry.phone || '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td class="label">Company</td>
              <td class="value">${enquiry.company || '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td class="label">Country</td>
              <td class="value">${enquiry.country || '<em>Not provided</em>'}</td>
            </tr>
            <tr>
              <td class="label">Form Source</td>
              <td class="value">${enquiry.source || 'Website Contact Form'}</td>
            </tr>
            <tr>
              <td class="label">Submitted At</td>
              <td class="value">${submittedAt}</td>
            </tr>
          </table>

          <div class="section-title">Enquiry Message</div>
          <div class="message-box">
            ${enquiry.message}
          </div>

          <div class="btn-container">
            <a href="${adminUrl}" class="btn">View in Admin Portal &rarr;</a>
          </div>
        </div>

        <div class="footer">
          This is an automated notification from Vtest Admin System.<br>
          Submitted IP / Source: ${enquiry.source || 'Web'}
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Send email notification to Admin when an enquiry is created
 */
const sendEnquiryEmailToAdmin = async (enquiry) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const fromEmail = process.env.EMAIL_FROM || `"Vtest Enquiries" <${process.env.SMTP_USER || 'noreply@vtest.com'}>`;

  const htmlContent = renderEnquiryHtml(enquiry);
  const subject = `[New Enquiry] ${enquiry.enquiryType || 'General'} from ${enquiry.name} (${enquiry.company || enquiry.email})`;

  const transporter = createTransporter();

  if (!transporter || !adminEmail) {
    console.log('---------------------------------------------------------');
    console.log('📧 [MOCK EMAIL NOTIFICATION]');
    console.log(`To Admin Email: ${adminEmail || 'NOT SET (Set ADMIN_EMAIL in .env)'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Client: ${enquiry.name} <${enquiry.email}>`);
    console.log(`Message: ${enquiry.message}`);
    console.log('⚠️  Configure SMTP_HOST, SMTP_USER, SMTP_PASS, and ADMIN_EMAIL in backend/.env to send real emails.');
    console.log('---------------------------------------------------------');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      replyTo: `${enquiry.name} <${enquiry.email}>`,
      subject: subject,
      html: htmlContent
    });

    console.log(`✅ Enquiry notification email sent to ${adminEmail}. MessageID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send enquiry email:`, err.message);
    return false;
  }
};

module.exports = {
  sendEnquiryEmailToAdmin,
  renderEnquiryHtml
};
