import React from 'react';

class NavigationBar extends React.Component {
    state = {
        width: '30px',
        userImage: 'https://via.placeholder.com/200x200'
    }
    render() {
        fetch('https://api.github.com/users/enjames')
            .then(res => res.json())
            .then(res => this.setState({
                userImage: res.avatar_url
            }));

        return (
            <nav className="navbar navbar-primary bg-primary">
                <a className="navbar-brand" href="index.html">Navbar</a>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <form
                            className="nav-form"
                            style={{width: this.state.width}}
                            onClick={() => this.setState({width: '210px'})}
                            method="post" id="searchForm"
                            >
                            <i className="fa fa-search"></i>
                            <input type="text" />
                        </form>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="fa fa-bell"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="user">
                                <div className="user-avatar">
                                    <img src={this.state.userImage} alt=""/>
                                </div>
                                <i className="fa fa-caret-down"></i>
                            </div>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">My events</a>
                            <a className="dropdown-item" href="#">Create event</a>
                            <a className="dropdown-item" href="#">Profile</a>
                            <a className="dropdown-item" href="#">Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavigationBar;
