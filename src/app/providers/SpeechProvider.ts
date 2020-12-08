import Axios from 'axios';
import { Observable } from 'rxjs';

// Typescript issues
declare const process: {
    env: any
}

export enum Model {
    LJSPEECH = 'ljspeech',
    WHISTLE = 'whistle'
}

// This would be better as an injectable.
export default class SpeechProvider {
    private static ENDPOINT_SPEECH_BY_TEXT = '/taco';
    private static ENDPOINT_SPEECH_BY_AUDIO = '/taco_audio';

    public static requestSpeechByText(text: string, model: Model): Observable<any> {
        const headers = {'model': model }
        const data = { text }
        return SpeechProvider.request(SpeechProvider.ENDPOINT_SPEECH_BY_TEXT, data, headers);
    }

    public static requestSpeechByAudio(audio: any, model: Model): Observable<any> {
        const headers = { 'content-type': 'multipart/form-data', 'model': model }
        return SpeechProvider.request(SpeechProvider.ENDPOINT_SPEECH_BY_AUDIO, audio, headers);
    }

    private static request(path: string, data: any, headers?: any): Observable<any> {
        return Observable.create((observer: any) => {
            Axios({
                url: process.env.REACT_APP_API + path,
                method: 'POST',
                responseType: 'blob',
                headers,
                data,
            }).then((response: any) => {
                observer.next(response.data);
            }).catch((error: any) => {
                observer.error(error);
            })
        })
    }
}
