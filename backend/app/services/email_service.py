import smtplib
from email.message import EmailMessage

def send_expiry_email(to_email, product_name):
    msg = EmailMessage()
    msg.set_content(f"{product_name} is about to expire!")
    msg["Subject"] = "Expiry Alert"
    msg["From"] = "your@email.com"
    msg["To"] = to_email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login("your@email.com", "app_password")
        server.send_message(msg)



