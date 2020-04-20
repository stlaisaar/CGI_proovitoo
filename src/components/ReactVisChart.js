import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    YAxis,
    XAxis,
    MarkSeries,
} from 'react-vis';
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

        if (error) {
            return (
              <div>
                  <p>Error: API-st andmete saamisel esines viga ({error.message}).</p>
              </div>
            );
        }
        else if (fetchResults.length === datesLength && isLoaded) {
            return (
                <div className="barChart">
                    <XYPlot height={300} width={450}
                            xType="ordinal"
                            color={"#e11937"}
                    >
                        <VerticalGridLines/>
                        <MarkSeries data={fetchResults}/>
                        <HorizontalGridLines/>
                        <XAxis style={{fontSize: "10px"}}
                               tickLabelAngle={60}
                        />
                        <YAxis title={"Minuteid päevas"}
                               style={{fontSize: "10px"}}
                        />
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