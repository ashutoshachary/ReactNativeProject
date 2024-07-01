import { Alert } from "react-native";

export const AUTH_USER_ACTIONS = Object.freeze({
    SET_AUTH_USER: 0,
})


export const authUserReducer = (state, action) => {
    switch (action.type) {
        case AUTH_USER_ACTIONS.SET_AUTH_USER:
            const authUser = {
                ...action?.payload,
                isLoggedIn : true,

            }
            return authUser
        default:
            Alert.alert('Invalid Action')
            return state;
    }
}
