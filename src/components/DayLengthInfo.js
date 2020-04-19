import React, {Component} from 'react';

// Based on: https://reactjs.org/docs/faq-ajax.html
// Using this API: https://sunrise-sunset.org/api?fbclid=IwAR1Rg_gy7uAfxklZ4NcyN-7Qmc9y4wjnJ8FvvxMO7zHp0pyNA_BcVMv8GZc
class DayLengthInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: [],
            status: null,
            fetchLink: "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2020-04-19",
        };
    }

    componentDidMount() {
        fetch(this.props.fetchLink)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        results: result.results,
                        status: result.status,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, results } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>
                <p>Laeb...</p>
                <p>Laeb...</p>
                <p>Laeb...</p>
            </div>;
        } else {
            return (
                <div>
                    <p>Päikesetõusu kellaaeg: {results.sunrise} UTC</p>
                    <p>Päikeseloojangu kellaaeg: {results.sunset} UTC</p>
                    <p>Päeva pikkus: {results.day_length} UTC</p>
                </div>
            );
        }
    }
}

export default DayLengthInfo;