import { createTransport } from "../../lib/mailer.js";
import { top5Html, pointsEarnedHtml, welcomeHtml } from "../../lib/email-template.js";

type TopUser = {
  email: string;
  username: string;
  points: number;
};

export class EmailService {
  private transporter = createTransport();

  async sendWelcomeEmail(to: string, username: string) {
    await this.transporter.sendMail({
      to,
      subject: "Bem-vindo!",
      html: welcomeHtml(username),
    });
  }

  async sendTop5Emails(users: TopUser[]) {
    const results = await Promise.allSettled(
      users.map((user, index) =>
        this.transporter.sendMail({
          to: user.email,
          subject: `Parabéns! Você está no Top ${Math.min(5, users.length)} (${index + 1}º)`,
          html: top5Html(user.username, index + 1, user.points || 0),
        })
      )
    );

    const success = results.filter(r => r.status === "fulfilled").length;
    const failed = results.length - success;
    return { success, failed };
  }

  async sendPointsEarnedEmail(
    to: string,
    username: string,
    referredUsername: string,
    totalPoints: number
  ) {
    await this.transporter.sendMail({
      to,
      subject: "Você ganhou pontos!",
      html: pointsEarnedHtml(username, referredUsername, totalPoints),
    });
  }
}