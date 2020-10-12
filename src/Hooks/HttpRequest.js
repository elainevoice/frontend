import React, { useEffect, useState } from "react";
import axios from "axios";

export function useAxiosGet(url) {
    console.log('xd' + url)
    if (url == "") {
        return {
            loading: false,
            data: null,
            error: false,
        }
    }
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false,
    });
    useEffect(() => {
        setRequest({
            loading: true,
            data: null,
            error: false,
        });
        axios
            .get(url)
            .then((response) => {
                setRequest({
                    loading: false,
                    data: response.data,
                    error: false,
                });
            })
            .catch((error) => {
                setRequest({
                    loading: false,
                    data: null,
                    error: true,
                });
            });
    }, [url]);
    return request;
}
