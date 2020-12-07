import Axios from 'axios';
import { Observable } from 'rxjs';

// Typescript issues
declare const process: {
    env: any
}

// This would be better as an injectable.
export default class ModelProvider {
    private static ENDPOINT_GET_MODELS = '/get_models';

    public static request(): Observable<any> {
        return Observable.create((observer: any) => {
            Axios({
                url: process.env.REACT_APP_API + ModelProvider.ENDPOINT_GET_MODELS,
                method: 'GET',
            }).then((response: any) => {
                observer.next(response.data);
            })
        })
    }
}