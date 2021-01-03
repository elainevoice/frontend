import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
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
        if (this.state.loading === true){
            return  <div className="container mt-3">
                        <div className="d-flex justify-content-center mb-3">
                            <ScaleLoader
                                height={20}
                                width={4}
                                radius={2}
                                margin={2}
                                color={'#0be881'}
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
        }
        else {
            let options = this.state.data && this.state.data > 0 ?
             this.state.data.map((model: string) => {
                return (
                    <option value={model} key={model}>{model.charAt(0).toUpperCase() + model.slice(1)}</option>
                )
            }): this.state.data.map((model: string) => {
                return (
                    <option value={model} key={model}>{model.charAt(0).toUpperCase() + model.slice(1)}</option>
                )
            })

            return <div className="model-selector">
                        <select className='select-btn' onChange={this.valueChange}>
                            {options}
                        </select>
                    </div>
        }
    }
}