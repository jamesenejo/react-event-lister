import React from 'react';

const Spinner = () => (
    <div className="text-center">
        <i className="fa fa-spinner fa-spin"></i>
    </div>
)

const CategoryBar = () => (
    <div className="event-categories">
        <div className="categories">
            <a className="nav-link" href="#">Entertainment</a>
            <a className="nav-link" href="#">Trainings</a>
            <a className="nav-link" href="#">Rallies</a>
            <a className="nav-link" href="#">Debate</a>
        </div>
    </div>
);

const PublishedEvent = (props) => (
    <div className="col-lg-6">
        <a href="#">
            <div className="event">
                <div className="image-div">
                    <img src="http://www.ourweddingideas.com/cdn/file/beautiful-party-planning-services-low-budget-wedding-party-photography-birthday-photographers-chennai.jpg" alt="Event Image" />
                </div>
                <div className="info-div">
                    <div className="description">
                        <h4>{props.name}</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
                        <p>{props.date}</p>
                    </div>
                    <div className="metrics">
                        <p>Going: {props.going}</p>
                        <p>Views: {props.views}</p>
                    </div>
                    <div className="user-post">
                        <div className="profile-image">
                            <img src={props.userImage} alt="User Image" />
                        </div>
                        <div className="post-stat">
                            <p>Enejo James</p>
                            <p>Aug 17</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
);

const AllPublishedEvents = (props) => (
    <div className="container">
        <div className="row">
            {props.allEvents.map((eachEvent, i) => {
                console.log('some');
                return <PublishedEvent key={i} {...eachEvent} />
            })}
        </div>
    </div>
)

class Events extends React.Component {
    state = {
        events: []
    }

    componentDidMount() {
        console.log('something');
        fetch('/events')
            .then(res => res.json())
            .then(res => this.setState(prevState => ({
                events: prevState.events.concat(res.responseObject)
            })));
    }

    render() {
        return (
            <div>
                <CategoryBar />
                {this.state.events.length === 0?
                <Spinner />
                :
                <AllPublishedEvents allEvents={this.state.events} />}
            </div>
        );
    }
}

export default Events;
