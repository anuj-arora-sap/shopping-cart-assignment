# test-Shopping-Cart
test-Shopping-Cart Test API 
Node version v12.13.1
Mongodb version 4.2.2


All APIs except login and signUp are accessible with token only.[i.e Require auth]
[POST]http://localhost:3001/shoppingCart/api/v1/public/user/signUpWithEmail     User SignUp
[POST]http://localhost:3001/shoppingCart/api/v1/public/user/login               Login
[POST]http://localhost:3001/shoppingCart/api/v1/user/order                      Add order
[GET]http://localhost:3001/shoppingCart/api/v1/user/order                Get accumulated user and order data with pagination

Steps to use APIs
1.git clone repository
2.Install pm2 globally  npm i -g pm2
2.pm2 start  server.js -i max or node server.js to start without pm2
 
 APIs started at port 3001 by default