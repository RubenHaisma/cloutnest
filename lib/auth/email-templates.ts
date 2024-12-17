export const emailTemplates = {
  verification: (name: string, confirmLink: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            background-color: #0891b2;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
          }
          .footer { font-size: 12px; color: #666; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to CloutNest, ${name}!</h1>
          <p>Thank you for joining our community. To get started, please verify your email address by clicking the button below:</p>
          <a href="${confirmLink}" class="button">Verify Email Address</a>
          <p>If you didn't create an account with CloutNest, you can safely ignore this email.</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} CloutNest. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

  welcome: (name: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            background-color: #0891b2;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin: 20px 0;
          }
          .footer { font-size: 12px; color: #666; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome aboard, ${name}!</h1>
          <p>Your email has been verified and your CloutNest account is now active. Here's what you can do next:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Connect your social media accounts</li>
            <li>Explore available opportunities</li>
          </ul>
          <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">Go to Dashboard</a>
          <div class="footer">
            <p>© ${new Date().getFullYear()} CloutNest. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,
};
