import React, { Component } from 'react'

import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import DropzoneComponent from 'react-dropzone-component';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default class QuestionTopbar extends Component {

    constructor(props) {
        super(props);
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            autoProcessQueue: false
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            listImg: []
        }

    }
    
    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };

    handleFileAdded(file) {
        this.setState({
            listImg: [...this.state.listImg, file]
        });
    }

    handleFileRemoved(file) {
        console.log(file);
        let imgID = file.upload.uuid;
        this.setState({
            listImg: this.state.listImg.filter(img => img.upload.uuid != imgID)
        });
    }
    
  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
        addedfile: this.handleFileAdded.bind(this),
        removedfile: this.handleFileRemoved.bind(this)
    }
    const { contentState } = this.state;
    return (
      <React.Fragment>
            <div className="post-topbar">
                <div className="user-picy">
                    <img src="/images/resources/user-pic.png" />
                </div>
                <div className="post-st">
                    <div className = "post-content">
                        <Editor
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onContentStateChange={this.onContentStateChange}
                        />
                    </div>
                    
                    <div className = "post-img">
                        <h4 className= "mt-4">Chọn ảnh của bạn:</h4>
                        <DropzoneComponent config={config}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />
                    </div>
                    <div className= "post-relation">
                        <div className = "post-category">
                            <span> Chuyên mục: </span>
                            <select>
                                <option>Toan</option>
                                <option>Ly</option>
                            </select>
                        </div>
                        <div className = "post-tag">
                            <form>
                                <span>Thẻ </span>
                                <input />
                            </form>
                        </div>
                    </div>
                    <ul className="text-right">
                        <li><a className="post-jb active" href="#" >Post this question</a></li>
                    </ul>
                </div>{/*post-st end*/}
            </div>{/*post-topbar end*/}
      </React.Fragment>
    )
  }
}
