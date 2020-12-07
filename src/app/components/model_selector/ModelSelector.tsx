import Axios from 'axios';
import React, { Component } from 'react';
import Loader from '../loader/Loader.jsx';
import './ModelSelector.scss';

import ModelProvider from '../../providers/ModelProvider';

export interface IModelSelectorProps{
    setSelectedModelState: (value: string) => void;
}

export default class ModelSelector extends Component<IModelSelectorProps, any> {
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

    valueChange = (e: any) =>{
        e.preventDefault()
        this.props.setSelectedModelState(e.target.value);
    }

    render() {
        let content = null
        if (this.state.loading === true){
            content = <div><Loader /></div>
        }
        else {
            let options = this.state.data.map((model: any) => {
                return (
                    <option value={model} key={model}>{model}</option>
                )
            })

            content = <div className="model-selector">
                            <select className='select-btn' onChange={this.valueChange}>
                                {options}
                            </select>
                        </div>
        }

        return content
    }
}