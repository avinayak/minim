import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class BookmarksBar extends Component {
    render() {
        return (
            <div className="bookmarks-bar">
                <Button className="bookmark-button" variant="dark" size="sm">
                    <img className="bookmark-fav"  src='https://news.ycombinator.com/y18.gif'/>
                    Heigt
                </Button>
                <Button className="bookmark-button" variant="dark" size="sm" onClick={(e)=> {
                    window.location.href='https://google.com'
                } }>
                    <img className="bookmark-fav"  src='https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196'/>
                    stackoverflow
                </Button>
            </div>
        );
    }
}

export default BookmarksBar;
