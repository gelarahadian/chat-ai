import api from "../lib/api"

export const signIn = (data: {email: string; password: string}) => {
    return api.post('/auth/sign-in', data)
}

export const signUp = (data: {email: string; password: string;}) => {
    return api.post('/auth/sign-up', data)
}

export const me = () => {
    return api.get('/auth/me')
}