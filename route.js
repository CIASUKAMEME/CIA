import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to, subject, text } = await request.json();

    // Buat koneksi ke Gmail pakai SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // email pengirim (disimpan di Environment Variables Vercel)
        pass: process.env.EMAIL_PASS, // password atau App Password Gmail
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    return new Response(JSON.stringify({ message: "Email terkirim!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Gagal kirim email." }), {
      status: 500,
    });
  }
      }
