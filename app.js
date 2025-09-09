// ==============================================
// Node.js Express Server with JWT and Cookies
// This program does the following:
// 1. Sets up a server using Express.
// 2. Creates a JWT token and stores it as an HTTP-only cookie when visiting "/".
// 3. Reads the JWT cookie and decodes it when visiting "/read".
// 4. Logs the decoded JWT data to the terminal.
// ==============================================

// ==============================================
// 1. Import required libraries
// 必要なライブラリをインポート
// express -> For creating server and routes (サーバーとルートを作成するため)
// jsonwebtoken -> For creating and verifying JWT tokens (JWTトークンの作成と検証)
// cookie-parser -> To read cookies from client requests (クライアントのクッキーを読み取るため)
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// ==============================================
// 2. Create an Express app
// Expressアプリケーションを作成
const app = express();

// 3. Enable cookie-parser middleware
// Cookie-parserミドルウェアを有効化
// This allows us to read cookies from incoming requests
// これにより、リクエストからクッキーを読み取れるようになる
app.use(cookieParser());

// ==============================================
// 4. Route to set JWT token as a cookie
// JWTトークンをクッキーとして設定するルート
app.get("/", function(req, res) {
    
    // 4a. Create a JWT token
    // JWTトークンを作成
    // jwt.sign(payload, secret) generates a token with the payload and secret key
    // payload -> data we want to store inside the token (ここではメールアドレス)
    const token = jwt.sign({ email: "malikali0990@gmail.com" }, "secret");

    // 4b. Set the token as an HTTP-only cookie
    // HTTP-only cookieとしてトークンを設定
    // httpOnly -> prevents client-side scripts from accessing the cookie (XSS防止)
    res.cookie("token", token, { httpOnly: true });

    // 4c. Send response to client
    // クライアントにレスポンスを送信
    // Only send once, after setting the cookie
    // クッキーを設定した後、一度だけ送信
    res.send("Token has been set as a cookie!");
});

// ==============================================
// 5. Route to read JWT token from cookie and verify it
// クッキーからJWTトークンを読み取り検証するルート
app.get("/read", function(req, res) {

    // 5a. Get the token from cookies and verify it
    // クッキーからトークンを取得し検証
    // jwt.verify(token, secret) decodes and verifies token integrity
    // 成功すると payload (here email) が返される
    let data = jwt.verify(req.cookies.token, "secret");

    // 5b. Print decoded data to terminal
    // デコードしたデータをターミナルに表示
    console.log(data);

    // 5c. Send response to client
    // クライアントに確認用レスポンスを送信
    res.send("Check terminal for decoded JWT data!");
});

// ==============================================
// 6. Start the server on port 3000
// ポート3000でサーバーを起動
app.listen(3000, () => {
    // Print message in terminal when server is running
    // サーバー起動時にターミナルにメッセージ表示
    console.log("Server running on http://localhost:3000");
});

/* 
Program Summary / プログラムのまとめ:
- Visiting "/" generates a JWT and sets it as a cookie.
- "/" にアクセスするとJWTが生成され、クッキーとして保存される
- Visiting "/read" reads the cookie, verifies the JWT, and prints the payload to terminal.
- "/read" にアクセスするとクッキーを読み取り、JWTを検証してペイロードをターミナルに出力
- This demonstrates using cookies with JWTs in Express.
- ExpressでクッキーとJWTを使う例として機能
*/
