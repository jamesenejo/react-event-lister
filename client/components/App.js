import React from 'react';
import NavigationBar from './NavigationBar';
import Events from './events/Events';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Events />
            </div>
        );
    }
}

export default App;
