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
            images: [],
            categoryID: 'null',
            tags: []
        }

    }
    
    onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };

    handleFileAdded(file) {
        this.setState({
            images: [...this.state.images, file]
        });
    }

    handleFileRemoved(file) {
        console.log(file);
        let imgID = file.upload.uuid;
        this.setState({
            images: this.state.images.filter(img => img.upload.uuid != imgID)
        });
    }

    onAddNewQuestion = () => {

        if(this.state.categoryID === "null") {
            alert("Vui lòng chọn chuyên mục cho câu hỏi!");
            return false;
        }
        let questionItem = {
            questionID: new Date().getTime() + "",
            content: this.state.contentState,
            images: this.state.images,
            topComment: {},
            categoryID: this.state.categoryID,
            tags: [],
            userID: ''
        }
        this.props.addNewQuestion(questionItem);
    }
    
    showCategories  = (categories) => {
        if(categories.length > 0) {
            return categories.map((category, index) => {
                return <option key = {index} value = {category.categoryID}>{category.name}</option>
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            categoryID: e.target.value    
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
                            <select className = "post-category__select" onChange = {this.handleChange}>
                                <option value = "null">Chọn Chuyên Mục</option>
                                {this.showCategories(this.props.categories)}
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
                        <li><a className="post-jb active" onClick = {this.onAddNewQuestion}>Post this question</a></li>
                    </ul>
                </div>{/*post-st end*/}
            </div>{/*post-topbar end*/}
      </React.Fragment>
    )
  }
}
