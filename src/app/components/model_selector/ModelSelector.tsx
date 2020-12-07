import Axios from 'axios';
import React, { Component } from 'react';
import Loader from '../loader/Loader.jsx';

import ModelProvider from '../../providers/ModelProvider';

export default class ModelSelector extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            loading: true,
        };
    }

    async set_data() {
        ModelProvider.request().subscribe(
            (result: any) => {
                console.log(result)
                this.setState({
                    data : result,
                    loading : false
                });
            }
        );
    }

    async componentDidMount() {
        await this.set_data();
    }

    render() {
        let content = null
        if (this.state.loading === true){
            content = <div><Loader /></div>
        }
        else {
            let options = this.state.data.map((model: any) => {
                return (
                    <option value={model}>{model}</option>
                )
            })

            content = <div className="ModelSelector">
                            <select>
                                {options}
                            </select>
                        </div>
        }

        return content

        // return (
        //     <div className="ModelSelector">
        //         <select defaultValue="whistling" name="models" id="models" className="options">
        //             <option value="" disabled>
        //                 Select a model
        //             </option>
        //             <option value="whistling">Whistling</option>
        //             <option value="xhosa" disabled>
        //                 Xhosa
        //             </option>
        //             <option value="human" disabled>
        //                 Human
        //             </option>
        //         </select>{content}
        //     </div>
        // );
    }
    // {torrents.data.map((torrent) => {
    //     return (
    //       <tr
    //         key={torrent.id}
    //         onClick={() => {
    //           setModalTorrent(torrent);

    //           setModalShow(true);
    //         }}
    //       >
    //         <td>{torrent.id}</td>
    //         <td>{torrent.magnet} </td>
    //         <td>{torrent.contributor_id}</td>
    //       </tr>
    //     );
    //   })}
}