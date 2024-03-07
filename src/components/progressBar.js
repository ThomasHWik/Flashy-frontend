import React from "react";
import "./css/progressBar.css";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0 };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.current !== this.props.current) {
            this.animateWidthChange();
        }
    }

    animateWidthChange() {
        const animationDuration = 500; // match this with your CSS transition duration
        const frameDuration = 20; // how long each frame of the animation should last
        const totalFrames = animationDuration / frameDuration;
        const widthChangePerFrame = ((this.props.current + 1) / this.props.total * 100 - this.state.width) / totalFrames;

        console.log(this.props.current);

        let frame = 0;
        const animateFrame = () => {
            frame++;
            this.setState(state => ({ width: state.width + widthChangePerFrame }));

            if (frame < totalFrames) {
                setTimeout(animateFrame, frameDuration);
            }
        };

        animateFrame();
    }

    render() {
        return (
            <div className="progressContainer">
                <div className="progressBar" style={{ width: `${this.state.width}%` }} />
            </div>
        );
    }
}

export default ProgressBar;