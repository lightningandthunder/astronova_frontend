import React, { Component } from 'react';
import { Image } from 'react-konva';

// From StackOverflow:
// https://stackoverflow.com/questions/49736475/react-konva-how-to-change-image-after-uploading

export default class SignImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            coord: props.coord
        };
        this.updateImage = this.updateImage.bind(this);
    }

    componentDidMount() {
        this.updateImage();
    }

    componentDidUpdate() {
        // Prevent infinite loop, since updateImage will re-trigger componentDidUpdate
        if (this.props.coord !== this.state.coord)  
            this.updateImage();
    }

    updateImage() {
        const image = new window.Image();
        image.src = this.props.image;
        image.onload = () => {
            this.setState({
                image: image,
                coord: this.props.coord
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

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/