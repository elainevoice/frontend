import React, { Component } from "react";

import "./SineWave.scss";

export default class SineWave extends Component<{}, {}> {
    private ctx: any = React.createRef();
    private canvas?: any;

    private width: number = 0;
    private height: number = 0;

    private startTime = 0;

    componentDidMount() {
        this.canvas = this.ctx.canvas;
        this.startTime = new Date().getTime();

        requestAnimationFrame(this.animate);
    }

    private animate = () => {
        this.updateSize();
        this.ctx.clearRect(0, 0, this.width, this.height);

        let currentTime = new Date().getTime();
        let runTime = currentTime - this.startTime;

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;

        let height = Math.sin(runTime * 0.008) * 0.2;
        let pointList = this.getPath(height);

        for (let i = 0; i < this.width; i++) {
            if (i === 0) {
                this.ctx.moveTo(pointList[0][0], (this.height / 2) + pointList[0][1]);
            } else {
                this.ctx.lineTo(pointList[i][0], (this.height / 2) + pointList[i][1]);
            }
        }
        this.ctx.stroke();

        requestAnimationFrame(this.animate);
    }

    private getPath(height: any) {
        let width = this.width;
        let spacing = 0.08;
        let loopNum = 0;
        let pointList = [];
        let i = 0;
      
        for (i = 0; i < width / 2; i++) {
            let x = loopNum;
            let y = Math.sin(loopNum * spacing) * (i * (height)) + 100;

            pointList[loopNum] = [x, y];
            loopNum++;
        }

        for (i = width / 2; i > 0; i--) {
            let x = loopNum;
            let y =  Math.sin(loopNum * spacing) * (i * (height)) + 100;

            pointList[loopNum] = [x, y];
            loopNum++;
        }

        return pointList;
    }

    private updateSize() {
        this.width = window.innerWidth;
        this.height = this.canvas.parentElement.offsetHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    render() {
        return (
            <canvas ref={
                (canvas:any) => {
                    if (canvas) this.ctx = canvas.getContext('2d')
                }
            }>
            </canvas>
        );
    }
}
    