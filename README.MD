
[] nodemon install
[] express install and start function
[] mongodb create
[] connectjs
[] import 'dotenv' and setup package ( for .env file)
[] error-handle and not found middleware

[morgan package]

###User Model

- [] create models folder and User.js file
- [] validator install
- [] create schema with name,email, password (all type:String)
- [] export mongoose model

- []dormitory model


#### Auth Routes Structure

- [x] create controllers folder
- [x] add authController file
- [x] export (register,login,logout) functions
- [x] res.send('some string value')
- [x] create routes folder
- [x] setup authRoutes file
- [x] import all controllers
- [x] setup three routes
- [x] post('/register') post('/login') get('/logout')
- [x] import authRoutes as authRouter in the app.js
- [x] setup app.use('/api/v1/auth', authRouter)

#### Register Controller

- [x] create user
- [x] send response with entire user (only while testing)
- [x] check if email already in use (schema and controller)
- [x] ignore 'role'
- [x] alternative 'admin' setup


#### Hash

bcryptjs install
userchema pre function = create salt and hash
userchema methods = compare passwords

create utils folder
create jwt.js index.js
create createJWT(jsonwebtoken install), isTokenValid,attachCookiesToResponse functions in jwt.js
call   attachCookiesToResponse and token in authController
app.use(cookieParser(process.env.JWT_SECRET));


create authentication.js(authenticateUser,authhorizePermissions,) as a middleware
create tokenUser in utils after add index.js
create checkPermissions in utils after add index.js

 [x] add userController file
- [x] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [x] setup userRoutes file
- [x] import all controllers
- [x] setup just  route - router.route('/').get(getAllUsers);
- [x] import userRoutes as userRouter in the app.js
- [x] setup app.use('/api/v1/users', userRouter)





-------------------------------------------------------- AUTH COMPLETE ----------------------------------------------------



Dormitory 
create model,controller,router, app.js --- postman tests

Activities
create model,controller,router, app.js --- postman tests

Post
create model,controller,router, app.js --- postman tests

Comment
create model,controller,router, app.js --- postman tests


 