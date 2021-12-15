//session is empty when the user is not logged in
//the session will keep track of the user's id through loggedIn property;
var session = {};

//get the session value
const getSession = () => {
    return session;
};

//set the session value
const setSession = (ses) => {
    session = ses;
}

module.exports = {getSession, setSession};