const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se o servidor está rodando
 *     description: Retorna status 200 para verificar se o servidor está funcionando corretamente
 *     responses:
 *       200:
 *         description: Servidor está rodando
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = router;