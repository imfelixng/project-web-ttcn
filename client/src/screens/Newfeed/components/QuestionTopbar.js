import React, { Component } from 'react'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import DropzoneComponent from 'react-dropzone-component';

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



    }

    state = {
        editorState: EditorState.createEmpty(),
      }
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };


    onChange = ({value}) => {
        this.setState({
            value
        });
    }

    handleFileAdded(file) {
        console.log(file);
    }
    
  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
        addedfile: this.handleFileAdded.bind(this)
    }
    const { editorState } = this.state;
    return (
      <React.Fragment>
            <div className="post-topbar">
                <div className="user-picy">
                    <img src="/images/resources/user-pic.png" />
                </div>
                <div className="post-st">
                    <div className = "post-content">
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
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
