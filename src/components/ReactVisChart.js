import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, VerticalBarSeries} from 'react-vis';
import './ReactVisChart.css';

class ReactVisChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchResults: [],
            isLoaded: false,
            error: null,
        };
    }

    calculateDatesBetween(startDate, endDate) {
        let datesBetween = [];
        let currentDate = new Date(startDate);
        while(currentDate <= endDate){
            datesBetween.push(currentDate);
            let newDate = currentDate.setDate(currentDate.getDate() + 1);
            currentDate = new Date(newDate);
        }
        return datesBetween;
    }

    componentDidMount() {
        let loopDates = this.calculateDatesBetween(this.props.startDate, this.props.endDate);

        for (let i = 0; i < loopDates.length; i++) {
            let fetchLinkBase = this.props.fetchLink;
            let fullFetchLink = fetchLinkBase + loopDates[i].toISOString();
            fetch(fullFetchLink)
                .then(res => res.json())
                .then(
                    (result) => {
                        let date = loopDates[i];
                        let datePieces = date.toString().split(" ");
                        let dateString = datePieces[1] + datePieces[2];
                        let dayLength = result.results.day_length;
                        let dayLengthPieces = dayLength.split(':');
                        let minutes = (+dayLengthPieces[0]) * 60 + (+dayLengthPieces[1]);
                        let midResults = this.state.fetchResults;
                        midResults.push({x: dateString, y: minutes});
                        this.setState({
                            fetchResults: midResults,
                            isLoaded: true,
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
    }


    render() {
        const { fetchResults, isLoaded, error } = this.state;
        let datesLength = this.calculateDatesBetween(this.props.startDate, this.props.endDate).length;

        console.log(fetchResults);
        console.log(fetchResults.length);
        console.log(datesLength);
        console.log(isLoaded);
        console.log("- - - - - -");

        if (error) {
            return (
              <div>
                  <p>Error: {error.message}</p>
              </div>
            );
        }
        else if (fetchResults.length === datesLength && isLoaded) {
            /*
            const data = [
                {x: 0, y: 8},
                {x: 1, y: 5},
                {x: 2, y: 4},
                {x: 3, y: 9},
                {x: 4, y: 1},
                {x: 5, y: 7},
                {x: 6, y: 6},
                {x: 7, y: 3},
                {x: 8, y: 2},
                {x: 9, y: 0}
            ];
            */
            return (
                <div className="barChart">
                    <XYPlot height={240} width={400} xType="ordinal">
                        <VerticalGridLines/>
                        <HorizontalGridLines/>
                        <XAxis/>
                        <YAxis/>
                        <VerticalBarSeries data={fetchResults}/>
                    </XYPlot>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Graafik laeb...</p>
                </div>
            );
        }
    }
}

export default ReactVisChart;