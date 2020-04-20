import React, {Component} from 'react';
import HomePage from './components/HomePage';
import { Helmet } from 'react-helmet';

class App extends Component {
  render() {
    return (
        <div>
            <Helmet>
                <title>CGI proovitöö</title>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossOrigin=""
                />
            </Helmet>
            <HomePage/>
        </div>
    );
  }
}

export default App;
