import React, { Component } from "react";

export default class Loader extends Component<{}, {}> {
    render() {
        return (
            <div className="flex justify-center">
                <div className="loader"></div>
            </div>
        );
    }
}
