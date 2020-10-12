import axios from "axios";
let request = {
    loading: true,
    data: null,
    error: false,
}

export function useAxiosGet(url) {
    axios.get(url)
        .then(response => {
            request = {
                loading: false,
                data: response.data,
                error: false,
            }
        })
        .catch(error => {
            request = {
                loading: false,
                data: null,
                error: true,
            };
        })
    return request

}
