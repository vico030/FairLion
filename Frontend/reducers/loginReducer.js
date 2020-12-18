const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
};
const loginReducer = (prevState, action) => {
    switch (action.type) {
        case "RETRIEVE_TOKEN":
            return {
                ...prevState,
                userToken: action.token,
                    isLoading: false,
            };
        case "LOGIN":
            return {
                ...prevState,
                userName: action.id,
                    userToken: action.token,
                    isLoading: false,
            };
        case "LOGOUT":
            return {
                ...prevState,
                userName: null,
                    userToken: null,
                    isLoading: false,
            };
        case "REGISTER":
            return {
                ...prevState,
                userName: action.id,
                    userToken: action.token,
                    isLoading: false,
            };
    }
};

export {initialLoginState, loginReducer};