/**
 * @swagger
 * /test:
 *   post:
 *     tags:
 *       - test
 *     name: Post Test!!!!!!!!!!!!!!!!!!!!!!!!!!
 *     summary: test Summary
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             gender:
 *               type: string
 *             address:
 *               type: string
 *           example:
 *             name: 남상우
 *             gender: 남자
 *             address: 은평구
 *
 *     responses:
 *       '200':
 *         description: success
 *       '404':
 *         description: fail

 *   get:
 *     tags:
 *       - test
 *     name: Get Test
 *     summary: Get Summary
 *     parameters:
 *       - name: idx
 *         in: query
 *         schema:
 *           type: integer
 *           example : 1
 *       - name: path
 *         in: query
 *         schema:
 *           type: integer
 *           example : 1
 *       - name: query
 *         in: query
 *         schema:
 *           type: integer
 *           example : 1
 *
 *     responses:
 *       '200':
 *         description: success
 *       '404':
 *         description: fail

 * /test/update/{idx}:
 *   put:
 *     tags:
 *       - test
 *     name: Put Test
 *     summary: test Summary
 *     parameters:
 *       - name: idx
 *         in: path
 *         type: integer
 *         required: true
 *         schema:
 *           example: 2
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             gender:
 *               type: string
 *             address:
 *               type: string
 *           example:
 *             name: 남상우
 *             gender: 남자
 *             address: 은평구
 *
 *     responses:
 *       '200':
 *         description: success
 *       '404':
 *         description: fail
 */
