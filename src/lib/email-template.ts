/**
 * Template de email de boas-vindas
 * @param {string} username - Nome do usuário
 */
export function welcomeHtml(username: string) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;background-color:#f4f4f4">
      <div style="background-color:#ffffff;padding:30px;border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
        <h1 style="color:#4CAF50;text-align:center;margin-bottom:20px">Bem-vindo, ${username}!</h1>
        <p style="color:#666;font-size:16px;line-height:1.8;text-align:center">
          Sua conta foi criada com sucesso. Aproveite a plataforma!
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:30px 0">
        <p style="color:#999;font-size:14px;text-align:center">
          Equipe de Competição de Indicações
        </p>
      </div>
    </div>
  `;
}

/**
 * Template de email para o Top 5 do ranking
 * @param {string} username - Nome do usuário
 * @param {number} position - Posição no ranking (1-5)
 * @param {number} points - Total de pontos
 */
export function top5Html(username: string, position: number, points: number) {
    const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];
    const medal = medals[position - 1] || '🏅';
    
    return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;background-color:#f4f4f4">
      <div style="background-color:#ffffff;padding:30px;border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
        <h1 style="color:#4CAF50;text-align:center;margin-bottom:20px">${medal} Parabéns, ${username}!</h1>
        <h2 style="color:#333;text-align:center">Você está no Top 5!</h2>
        <div style="background-color:#f8f9fa;padding:20px;border-radius:8px;margin:20px 0;text-align:center">
          <p style="font-size:18px;margin:10px 0"><strong>Sua posição:</strong> ${position}º lugar</p>
          <p style="font-size:18px;margin:10px 0"><strong>Total de pontos:</strong> ${points}</p>
        </div>
        <p style="color:#666;font-size:16px;line-height:1.8">
          Você está entre os melhores! Continue compartilhando seu link de indicação para manter sua posição no ranking.
        </p>
        <p style="color:#666;font-size:16px;line-height:1.8">
          Obrigado por participar da nossa competição de indicações!
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:30px 0">
        <p style="color:#999;font-size:14px;text-align:center">
          Equipe de Competição de Indicações
        </p>
      </div>
    </div>`;
}

/**
 * Template de email para notificar quando alguém ganha pontos
 * @param {string} username - Nome do usuário que ganhou pontos
 * @param {string} referredUsername - Nome do usuário que se cadastrou
 * @param {number} totalPoints - Total de pontos atual
 */
export function pointsEarnedHtml(username: string, referredUsername: string, totalPoints: number) {
    return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;background-color:#f4f4f4">
      <div style="background-color:#ffffff;padding:30px;border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
        <h1 style="color:#4CAF50;text-align:center;margin-bottom:20px">🎉 Você ganhou pontos!</h1>
        <p style="color:#333;font-size:18px;text-align:center;margin-bottom:30px">
          Olá, <strong>${username}</strong>!
        </p>
        <div style="background-color:#e8f5e9;padding:20px;border-radius:8px;margin:20px 0;border-left:4px solid #4CAF50">
          <p style="font-size:16px;margin:10px 0;color:#333">
            <strong>${referredUsername}</strong> se cadastrou usando seu link de indicação!
          </p>
          <p style="font-size:18px;margin:15px 0;color:#4CAF50">
            <strong>+1 ponto</strong>
          </p>
        </div>
        <div style="background-color:#f8f9fa;padding:15px;border-radius:8px;margin:20px 0;text-align:center">
          <p style="font-size:16px;margin:5px 0;color:#666">
            Total de pontos: <strong style="color:#4CAF50;font-size:20px">${totalPoints}</strong>
          </p>
        </div>
        <p style="color:#666;font-size:16px;line-height:1.8">
          Continue compartilhando seu link de indicação para ganhar mais pontos e subir no ranking!
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:30px 0">
        <p style="color:#999;font-size:14px;text-align:center">
          Equipe de Competição de Indicações
        </p>
      </div>
    </div>`;
}