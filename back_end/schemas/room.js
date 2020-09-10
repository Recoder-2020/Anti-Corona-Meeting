/**
 * @swagger
 * /room/createRoom:
 *   post:
 *     tags:
 *       - Room
 *     name:
 *     summary: 방 생성
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             ROOM_NAME:
 *               type: string
 *             TYPE:
 *               type: string
 *             TOTAL:
 *               type: integer
 *             DENSITY:
 *               type: string
 *             DEADLINE:
 *               type: string
 *             ID:
 *               type: string
 *           example:
 *             ROOM_NAME: 방1
 *             TYPE: 카페
 *             TOTAL: 5
 *             DENSITY: yes
 *             DEADLINE: 2020/02/02
 *             ID: user1
 *
 *     responses:
 *       '200':
 *         description: success

 * /room/getRoomInfo:
 *   get:
 *     tags:
 *       - Room
 *     name:
 *     summary: 모든 방 정보 불러오기
 *     responses:
 *       '200':
 *         description: success

 * /room/getRoomInfo/{IDX}:
 *   get:
 *     tags:
 *       - Room
 *     name:
 *     summary: 특정 방, 방장 정보 불러오기
 *     parameters:
 *       - name: IDX
 *         in: path
 *         type: integer
 *         required: true
 *         schema:
 *
 *     responses:
 *       '200':
 *         description: success

 * /room/updateRoomInfo:
 *   put:
 *     tags:
 *       - Room
 *     name:
 *     summary: 저장되어 있던 방과 방장의 정보를 수정한다
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             IDX:
 *               type: integer
 *             ROOM_NAME:
 *               type: string
 *             TYPE:
 *               type: string
 *             TOTAL:
 *               type: integer
 *             DENSITY:
 *               type: string
 *             DEADLINE:
 *               type: string
 *             USER_IDX:
 *               type: integer
 *             ID:
 *               type: string
 *           example:
 *             IDX: 21
 *             ROOM_NAME: 변경
 *             TYPE: 술집
 *             TOTAL: 10
 *             DENSITY: no
 *             DEADLINE: 2020/07/02
 *             USER_IDX: 20
 *             ID: user1(변경)
 *
 *     responses:
 *       '200':
 *         description: success
 */
