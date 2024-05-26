/**
 * @swagger
 * /api/user/getall:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

export const getUsersEndpoint = {};