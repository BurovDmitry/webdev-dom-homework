import { signIn, setUser } from './api.js'
import { generateSignInPage } from './html-generators.js'
import { renderSignUp } from './render-sign-up.js'

export const renderSignIn = (renderComments) => {
    const appElement = document.getElementById('app')
    appElement.innerHTML = generateSignInPage()
    const buttonElement = document.getElementById('login-button')
    const loginInputElement = document.getElementById('login-input')
    const passwordInputElement = document.getElementById('password-input')
    const signUpLink = document.getElementById('link-to-sign-up')

    buttonElement.addEventListener('click', () => {
        signIn({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setUser(responseData.user)
            })
            .then(() => {
                renderComments()
            })
            .catch((err) => alert(err))
    })

    signUpLink.addEventListener('click', () => {
        renderSignUp(renderComments)
    })
}
