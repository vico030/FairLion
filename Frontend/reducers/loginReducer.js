const initialLoginState = {
    isLoading: true,
    userToken: null,
};
const loginReducer = (prevState, action) => {
    switch (action.type) {
        case "RETRIEVE_TOKEN":
            return {
                ...prevState,
                user: action.user,
                isLoading: false,
            };
        case "LOGIN":
            return {
                ...prevState,
                user: action.user,
                isLoading: false,
            };
        case "LOGOUT":
            return {
                ...prevState,
                user: null,
                isLoading: false,
            };
        case "REGISTER":
            return {
                ...prevState,
                user: action.user,
                isLoading: false,
            };
    }
};

export {initialLoginState, loginReducer};