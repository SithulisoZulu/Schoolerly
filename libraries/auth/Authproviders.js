/**
 * Object with all Auth Providers
 * @param {string} AuthProviders - Object with all Auth Providers that we can use to sign up  and sign users
 * @param {string} createUserWithEmailAndPassword - Basic provider with Email and password
 * @param {string} GoogleAuthProvider - Sign in and Signup a user using google OAuth Api
 */

const AuthProviders = {
    createUserWithEmailAndPassword: "createUserWithEmailAndPassword",
    GoogleAuthProvider            : "GoogleAuthProvider",
    FacebookAuthProvider          : "FacebookAuthProvider"
}
  
export default AuthProviders;