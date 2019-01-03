import React, { Component } from 'react'
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import DropzoneComponent from 'react-dropzone-component';

export default class CommentQuestion extends Component {

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

        this.questionDropzone = null;

        this.state = {
            editorState: EditorState.createEmpty(),
            images: [],
            currentUserID: null,
            isLoading: false
        }

    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
      };

    handleFileAdded = (file) => {
        this.setState({
            images: [...this.state.images, file]
        });
    }

    handleFileRemoved = (file) => {
        let imgID = file.upload.uuid;
        this.setState({
            images: this.state.images.filter(img => img.upload.uuid !== imgID)
        });
    }

    initCallback  = (dropzone) => {
        this.questionDropzone = dropzone;
    }

    removeFile = (files) => {
        if (this.questionDropzone && files.length > 0) {
            for(let i = 0 ; i < files.length ; i++) {
                this.questionDropzone.removeFile(files[i]);
            }
            
        }
        this.setState({
            images: [],
        });
    }

    onAdd = () => {

        if(this.state.isLoading) {
            return;
        }

        this.setState({
            isLoading: true
        })

        if(!this.state.editorState.getCurrentContent().hasText()) {
            alert("Vui lòng nhập nội dung câu hỏi!");
            this.setState({
                isLoading: false
            })
            return false;
        }

        let timesamp = new Date().getTime();

        if(this.props.type === 'comment') {
            
            let comment = {
                commentID: "cm_" + timesamp + this.props.currentUser.userID + this.props.questionID,
                questionID: this.props.questionID,
                userID: this.props.currentUser.userID,
                content: convertToRaw(this.state.editorState.getCurrentContent()),
                votes: 0,
                unvotes: 0,
                images: this.state.images,
                replies: [],
            }
            this.props.onAddNewComment(comment).then(() => {
                this.removeFile(this.state.images);
                this.setState({
                    isLoading: false,
                    editorState: EditorState.createEmpty(),
                });
    
            })
            .catch(err => console.log(err));
        } else {
            
            let reply = {
                replyID: "rcm_" + timesamp + this.props.currentUser.userID + this.props.comment.commentID,
                commentID: this.props.comment.commentID,
                userID: this.props.currentUser.userID,
                content: convertToRaw(this.state.editorState.getCurrentContent()),
                votes: 0,
                unvotes: 0,
                images: this.state.images,
            }
            this.props.onAddNewReplyComment(reply).then(() => {
                this.props.addReply(reply);
                this.removeFile(this.state.images);
                this.setState({
                    isLoading: false,
                    editorState: EditorState.createEmpty(),
                });
    
            })
            .catch(err => console.log(err));

        }
        

    }

  render() {

    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
        init: this.initCallback,
        addedfile: this.handleFileAdded,
        removedfile: this.handleFileRemoved
    }

    const { editorState } = this.state;

    return (
      <React.Fragment>
            <div className="post-topbar">
                <div className="user-picy">
                    <img src = {this.props.currentUser ? this.props.currentUser.avatar : '/images/users/img_avatar_default.png'} />
                </div>
                <div className="post-st">
                    <div className = "post-content">
                        <Editor
                            placeholder = "Bạn có câu hỏi gì không ?"
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                    <div className="row post">
                        <div className = "post-img">
                            <DropzoneComponent config={config}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig} />
                        </div>
                    </div>
                    <ul className="text-right">
                        <li><a className="post-jb active_comment" onClick = {this.onAdd}>
                            {
                                this.state.isLoading ?
                                    <img className = "loading" src = "/images/ic_loading.gif"/>
                                :
                                <span>Comment</span>
                            }
                        </a></li>
                    </ul>
                </div>{/*post-st end*/}
            </div>{/*post-topbar end*/}
      </React.Fragment>
    )
  }
}
