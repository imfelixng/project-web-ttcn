import React, { Component } from 'react'
import { Images } from "./../../../themes";
import {NavLink} from 'react-router-dom';
export default class SidebarLeft extends Component {

    componentDidMount() {
        this.props.getTopUsers();
        this.props.getTopTags();
    }

    showUser = (users) => {
        let result = null;
        if(users.length > 0) {
            result = users.map((user, index) => {
                
                if(index === 0) {
                    return <div className="suggestion-usd" key = {index}>
                    <img src= {user.avatar} alt = "logo" className = "suggestion-usd__avatar"/>
                    <div className="sgt-text">
                        <h4><NavLink to = {"users/" + user.userID}>{user.fullname}</NavLink></h4>
                        <i className="fa fa-heart"></i>
                        <span>{user.rating}</span>
                        <img src= "/images/ic_gold-medal.png" alt="goldMedal" className="img-award"></img>
                    </div>
                </div>;
                }

                if(index === 1) {
                    return <div className="suggestion-usd" key = {index}>
                        <img src= {user.avatar} alt = "logo" className = "suggestion-usd__avatar"/>
                        <div className="sgt-text">
                            <h4><NavLink to = {"users/" + user.userID}>{user.fullname}</NavLink></h4>
                            <i className="fa fa-heart"></i>
                            <span>{user.rating}</span>
                            <img src= "/images/ic_silver-medal.png" alt="goldMedal" className="img-award"></img>
                        </div>
                    </div>;
                }

                if(index === 2) {
                    return <div className="suggestion-usd" key = {index}>
                        <img src= {user.avatar} alt = "logo" className = "suggestion-usd__avatar"/>
                        <div className="sgt-text">
                            <h4><NavLink to = {"users/" + user.userID}>{user.fullname}</NavLink></h4>
                            <i className="fa fa-heart"></i>
                            <span>{user.rating}</span>
                            <img src= "/images/ic_bronze-medal.png" alt="goldMedal" className="img-award"></img>
                        </div>
                    </div>;
                } else {
                    return <div className="suggestion-usd" key = {index}>
                        <img src= {user.avatar} alt = "logo" className = "suggestion-usd__avatar"/>
                        <div className="sgt-text">
                            <h4><NavLink to = {"users/" + user.userID}>{user.fullname}</NavLink></h4>
                            <i className="fa fa-heart"></i>
                            <span>{user.rating}</span>
                        </div>
                    </div>;
                }

                
            });
        }
        return result;
    }

    showTag = (tags) => {
        let result = null;
        if(tags.length > 0) {
            result = tags.map((tag, index) => {
                return <div className="link-tag" key = {index}>
                            <NavLink to = {"/tags/" + tag._id.id} className="name-tag">{tag._id.text}</NavLink>
                            <button className="amount-tag">{tag.count}</button>
                        </div>
            });
        }

        return result;
    }

  render() {
    const {topUsers, topTags} = this.props;
    return (
      <React.Fragment>
                                <div className="main-left-sidebar no-margin">
                            <div className="suggestions full-width">
                                <div className="sd-title">
                                    <img className = "sidebar__icon" src = "/images/ic_top_supporters.png" alt = "icon"/>
                                    <h3>Top người giúp đỡ</h3>
                                </div>{/*sd-title end*/}
                                <div className="suggestions-list">
                                    {this.showUser(topUsers)}
                                </div>{/*suggestions-list end*/}
                            </div>{/*suggestions end*/}
                            <div className="suggestions full-width">
                            <div className="sd-title">
                                <img 
                                    className = "sidebar__icon" src = "/images/ic_top_tags.png"
                                    alt = "icon"
                                />
                                <h3>Top thẻ</h3>
                            </div>{/*sd-title end*/}
                            <div className="suggestions-list">
                            <div className="suggestion-usd">
                                <div className="sgt-text top-tag">
                                    {this.showTag(topTags)}
                                </div>
                            </div>
                            </div>{/*suggestions-list end*/}
                        </div>{/*suggestions end*/}
                        </div>{/*main-left-sidebar end*/}
      </React.Fragment>
    )
  }
}
