import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import config

def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    # Fallback to console print if credentials aren't set
    if not config.SMTP_USERNAME or not config.SMTP_PASSWORD:
        print("\n=== [SMTP NOT CONFIGURED] Contact Form Submission ===")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Subject: {subject}")
        print(f"Message: {message}")
        print("===================================================\n")
        return True

    try:
        # Create message container
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Portfolio Contact: {subject} (from {name})"
        msg['From'] = config.SMTP_USERNAME
        msg['To'] = config.RECEIVER_EMAIL
        msg['Reply-To'] = email

        # Create HTML body
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fcfcfc;">
              <h2 style="color: #00E5FF; border-bottom: 2px solid #7B61FF; padding-bottom: 10px;">New Portfolio Message</h2>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
              <p><strong>Subject:</strong> {subject}</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 15px; border-left: 4px solid #00FFB3;">
                <p style="white-space: pre-wrap; margin: 0;">{message}</p>
              </div>
              <footer style="margin-top: 20px; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0; padding-top: 10px;">
                This email was sent from your AI Engineer Portfolio website contact form.
              </footer>
            </div>
          </body>
        </html>
        """
        msg.attach(MIMEText(html, 'html'))

        # Connect to server
        if config.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(config.SMTP_SERVER, config.SMTP_PORT)
        else:
            server = smtplib.SMTP(config.SMTP_SERVER, config.SMTP_PORT)
            server.ehlo()
            server.starttls()
            server.ehlo()

        server.login(config.SMTP_USERNAME, config.SMTP_PASSWORD)
        server.sendmail(config.SMTP_USERNAME, config.RECEIVER_EMAIL, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        # Print the message anyway in the logs so it's not lost
        print(f"[FALLBACK LOG] Name: {name}, Email: {email}, Message: {message}")
        return False
