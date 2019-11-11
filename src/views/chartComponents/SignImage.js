import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

// From StackOverflow:
// https://stackoverflow.com/questions/49736475/react-konva-how-to-change-image-after-uploading

export default class SignImage extends Component {
    constructor(props) {
        super(props);
        this.updateImage = this.updateImage.bind(this);
        this.state = {
            image: null
        };

    }

    static propTypes = {
        image: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.updateImage();
    }

    // componentDidUpdate() {
    //     this.updateImage();
    // }

    updateImage() {
        const image = new window.Image();
        image.src = this.props.image;
        image.onload = () => {
            this.setState({
                image: image
            });
        };
    }

    render() {
        return <Image
            image={this.state.image}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            offsetX={10}
            offsetY={10}
        />;
    }
}