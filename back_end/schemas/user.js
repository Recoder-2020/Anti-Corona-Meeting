/**
 * @swagger
 * /user/join:
 *   post:
 *     tags:
 *       - User
 *     name:
 *     summary: 유저 방 입장(회원가입)
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             ROOM_CODE:
 *               type: string
 *             ID:
 *               type: string
 *           example:
 *             ROOM_CODE: abcd
 *             ID: testUser
 *
 *     responses:
 *       '200':
 *         description: success
 *       '404':
 *         description: Not Found RoomCode
 *       '409':
 *         description: Duplicate User Id

 * /user/rejoin:
 *   post:
 *     tags:
 *       - User
 *     name:
 *     summary: 유저 방 재입장(로그인)
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             ROOM_CODE:
 *               type: string
 *             ID:
 *               type: string
 *           example:
 *             ROOM_CODE: abcd
 *             ID: testUser
 *
 *     responses:
 *       '200':
 *         description: success
 *       '404':
 *         description: Not Found RoomCode
 *       '409':
 *         description: Not Found Id

 * /user:
 *   get:
 *     tags:
 *       - User
 *     name:
 *     summary: 모든 유저(방장 포함) 정보 불러오기
 *     responses:
 *       '200':
 *         description: success

 * /user/idx/{IDX}:
 *   get:
 *     tags:
 *       - User
 *     name:
 *     summary: 특정 유저 정보 불러오기
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

 * /user/roomIdx/{ROOM_IDX}:
 *   get:
 *     tags:
 *       - User
 *     name:
 *     summary: 방의 모든 유저 정보 불러오기
 *     parameters:
 *       - name: ROOM_IDX
 *         in: path
 *         type: integer
 *         required: true
 *         schema:
 *
 *     responses:
 *       '200':
 *         description: success

 * /user/location/{IDX}:
 *   put:
 *     tags:
 *       - User
 *     name:
 *     summary: 유저의 주소와 위치좌표 저장하기
 *     parameters:
 *       - name: IDX
 *         in: path
 *         type: integer
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             COORDINATE:
 *               type: string
 *             ADDRESS:
 *               type: string
 *           example:
 *             COORDINATE: "123.123 , 123.123"
 *             ADDRESS: "서울시 강남구 도곡동"
 *
 *     responses:
 *       '200':
 *         description: success
 */
