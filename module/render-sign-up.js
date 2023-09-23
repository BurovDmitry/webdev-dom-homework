import { signUp, setUser } from './api.js'
import { generateSignUpPage } from './html-generators.js'
import { renderSignIn } from './render-sign-in.js'

export const renderSignUp = (renderComments) => {
    const appElement = document.getElementById('app')
    appElement.innerHTML = generateSignUpPage()
    const buttonElement = document.getElementById('sign-up-button')
    const loginInputElement = document.getElementById('login-input')
    const nameInputElement = document.getElementById('name-input')
    const passwordInputElement = document.getElementById('password-input')
    const signInLink = document.getElementById('link-to-sign-in')

    buttonElement.addEventListener('click', () => {
        signUp({
            login: loginInputElement.value,
            name: nameInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setUser(responseData.user)
            })
            .then(() => {
                renderComments()
            })
            .catch((err) => alert(err.message))
    })

    signInLink.addEventListener('click', () => {
        renderSignIn()
    })
}
