import { getComments, user } from './api.js'
import {
    initCommentsEventListeners,
    initFormEventListener,
} from './event-listeners.js'
import { generateCommentsPage, generatePosts } from './html-generators.js'
import { handleComments } from './handle-comments.js'
import { renderSignIn } from './render-sign-in.js'

export const renderComments = () => {
    const appElement = document.getElementById('app')
    let posts = []

    appElement.innerHTML = generateCommentsPage(user)
    const listElement = document.getElementById('list')
    const buttonElement = document.getElementById('add-button')
    const nameInputElement = document.getElementById('name-input')
    const textInputElement = document.getElementById('text-input')
    const loadingIndicator = document.getElementById('loading-indicator')

    fetchPromise()
    if (user) {
        appElement.classList.add('authorized')
        initFormEventListener(
            buttonElement,
            nameInputElement,
            textInputElement,
            fetchPromise,
        )
    }
    checkIfAuthorized(user)

    function fetchPromise() {
        show(loadingIndicator)
        return getComments()
            .then((responseData) => {
                posts = handleComments(responseData.comments)
                listElement.innerHTML = generatePosts(posts)
                if (user) {
                    initCommentsEventListeners(
                        posts,
                        textInputElement,
                        listElement,
                    )
                }
            })
            .finally(() => hide(loadingIndicator))
    }
}

function checkIfAuthorized(user) {
    const addForm = document.getElementById('add-form')
    const authLink = document.getElementById('link-to-link')
    if (user) {
        show(addForm)
    } else {
        show(authLink)
        initAuthLinkEventListeners(authLink)
    }
}

function show(blockElement) {
    blockElement.style.display = 'flex'
}

function hide(blockElement) {
    blockElement.style.display = 'none'
}

function initAuthLinkEventListeners(authLink) {
    authLink.addEventListener('click', () => {
        renderSignIn(renderComments)
    })
}
