// backend/src/controllers/SessionController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

class SessionController {
  async store(req, res) {
    try {
      const { email, senha } = req.body;

      // 1. Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado." });
      }

      // 2. Compara a senha enviada com a senha_hash no banco
      const isPasswordCorrect = await bcrypt.compare(senha, user.senha_hash);
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      const { id, nome } = user;

      // 3. Se tudo estiver certo, gera o Token JWT
      const token = jwt.sign({ id }, process.env.APP_SECRET, {
        expiresIn: "7d",
      });

      return res.json({
        user: {
          id,
          nome,
          email,
        },
        token,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Falha no login.", details: error.message });
    }
  }
}

module.exports = new SessionController();
