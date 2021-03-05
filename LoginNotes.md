BACK END

* utilize SESSIONS, PASSPORT, SESSION STORE, COOKIES

* set up session middleware -> app.use(session(...))
* protection session secret
* create session store & hook up to session middleware

* initialize passport ->
  * app.use(passport.initialize())
  * app.use(passport.session())
* passport serialize/deserialize

* Login route

  * router.put('/login', etc...)
    * User.findOne({  
       where: {email.req.body.email, password: req.body.password}
      })
    * if/else statements
      * if user doesn't exist/wrong PW, give 401/403 status code
      * if user does exist
        * send user object as response
        * Persist user -> attach user's id to req.session (express-session)

* Get user route

  * router.get('/me', etc...)
    * if userId is not present on req.session -> 404 error
    * if userId is present on req.session
    * user = User.findById(req.session.userId), & respond with that user

* Sign up route to create user

  * router.post('/signup', etc...)
    * User.create()
    * then set the user on the session (req.login)

* Each time user opens a new type of browser or different device, user will have to login again
  * but b/c we saved their cart on the server, once user is logged in than we can retrieve the user's persisted cart

FRONT END

* User state:

  * state.user = {} ---> logged out
  * state.user = {data} ---> logged in

* Store

  * action type -> get logged in user from server
  * action creator -> create action with action type & user that you're receiving

  * reducer -> when receive 'get_user' action, update user on state with the user from action creator

  * login thunk -> receive the login form data object, make axios PUT request ('/login'), pass returned data to action creator & dispatch it
  * getUser thunk -> make axios GET request ('/me'), pass returned data to action creator & dispatch it

* Components:

  * routes

    * signup/login route (available to all users)
    * home page or profile route (after logging in)
    * what route do we want for non logged in visitors?

  * log-in (form)

    * email, password, submit button
    * extract form data and pass it to login thunk creator, dispatch the thunk it returns
    * use history.push to go to user profile/page

  * sign-up (form)

    * user info, submit button

  * user profile/page

    * map user on state to props of component
    * if not a real user (!user.id), redirect to ...
    * if real user, render user info, user hx, current cart
