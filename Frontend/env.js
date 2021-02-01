// Solution: https://dev.to/giacomocerquone/re-thinking-react-native-env-vars-589d
import active from "./active.env"

const envs = {
    local: {
        BACKEND_URL: "http://10.0.2.2:3000/",
        IMAGE_URL: "http://10.0.2.2:3000/"
    },
    remote: {
        BACKEND_URL: "http://18.185.102.149/",
        IMAGE_URL: "http://18.185.102.149/"
    },
}

const env = envs[active];
export default env;
