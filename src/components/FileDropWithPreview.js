import 'draft-js/dist/Draft.css'
import './FileDropWithPreview.styl'

import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

import { Image, Icon } from 'semantic-ui-react'
import { Container, Grid } from 'semantic-ui-react'

import { Dimmer, Loader, Segment, Header } from 'semantic-ui-react'

import FileDrop from 'react-file-drop';

export default class FileDropWithPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserDraggingFile: false,
        };
    }
    componentDidMount() {
        this.refs.dropArea.addEventListener("dragover", this.dragoverHandler);
        this.refs.dropArea.addEventListener("dragleave", this.dragleaveHandler);
    }
    componentWillUnmount() {
        this.setState({ isUserDraggingFile: false })
        this.refs.dropArea.removeEventListener("dragover", this.dragoverHandler)
        this.refs.dropArea.removeEventListener("dragleave", this.dragleaveHandler);
    }

    clickHandler = () => this.refs.imageInput.click();
    dragoverHandler = () => this.setState({ isUserDraggingFile: true });
    dragleaveHandler = () => this.setState({ isUserDraggingFile: false });

    dropHandler = fs => {
        this.setState({ isUserDraggingFile: false });

        this.refs.imageInput.files = fs;
        this.refs.imageInput.dispatchEvent(new Event('change'));
    }
   

    render() {
        const {
            isUserDraggingFile
        } = this.state;
        const {
            image,
            input,
            loading,
            error,
        } = this.props;
        const {
            rounded,
            circular,
        } = image;
        return (
            <div>
                <FileDrop
                    onDrop={this.dropHandler}
                    className="FileDrop"
                >
                    <div
                        className={`${isUserDraggingFile ? `DroppableAreaImageHolder ${circular ? 'DroppableAreaImageHolderCircular' : ''}` : ''}`} 
                    >
                        <Dimmer active={loading} inverted>
                            <Loader inverted/>
                        </Dimmer>
                        <div
                            className="DroppableArea"
                            ref="dropArea"
                        >                        
                            <Image
                                onClick={this.clickHandler}
                                {...image}
                                inline
                            />
                        </div>
                    </div>                    
                    <input
                        ref='imageInput'
                        type='file'
                        className='hide'
                        accept='image/*'
                        {...input}
                    />
                </FileDrop>
            </div>
        );
    }
}


