import nodemailer from "nodemailer";
import path from "path";

export const sendTicketEmail = async (
  to: string,
  subject: string,
  text: string,
  pdfPath: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "royalwolesax@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "royalwolesax@gmail.com",
    to,
    subject,
    text,
    attachments: [
      {
        filename: path.basename(pdfPath),
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};
