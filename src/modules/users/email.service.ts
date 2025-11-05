import { createTransport } from "../../lib/mailer.js";
import { top5Html, pointsEarnedHtml, welcomeHtml } from "../../lib/email-template.js";

export class EmailService {
  private transporter = createTransport();

  async sendWelcomeEmail(to: string, username: string) {
    await this.transporter.sendMail({
      to,
      subject: "Bem-vindo!",
      html: welcomeHtml(username),
    });
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

  async sendTop5EmailsFromRanking(ranking: any[]) {
    if (!ranking || ranking.length === 0) {
      throw new Error("Nenhum usuário encontrado no ranking");
    }

    const top5WithEmails = ranking.map((user) => ({
      email: user.email,
      username: user.username,
      points: user.referred_total || 0,
    }));

    const validUsers = top5WithEmails.filter(user => user.email);

    if (validUsers.length === 0) {
      throw new Error("Nenhum usuário do Top 5 possui email válido");
    }

    const results = await Promise.allSettled(
      validUsers.map((user, index) =>
        this.transporter.sendMail({
          to: user.email,
          subject: `Parabéns! Você está no Top ${Math.min(5, validUsers.length)} (${index + 1}º)`,
          html: top5Html(user.username, index + 1, user.points || 0),
        })
      )
    );

    const success = results.filter(r => r.status === "fulfilled").length;
    const failed = results.length - success;
    return { success, failed };
  }
}