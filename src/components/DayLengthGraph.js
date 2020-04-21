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
import './DayLengthGraph.css';

class DayLengthGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchResults: [],
            isLoaded: false,
            error: null,
        };
    }

    // Lisame kõik algus- ja lõppkuupäeva (kaasa arvatud) vahel olevad kuupäevad listi ja tagastame
    calculateDatesBetween(startDate, endDate) {
        let datesBetweenList = [];
        datesBetweenList.push(startDate);
        let currentDate = new Date(startDate);
        while (currentDate < endDate) {
            datesBetweenList.push(currentDate);
            let newDate = currentDate.setDate(currentDate.getDate() + 1);
            currentDate = new Date(newDate);
        }
        // Millegipärast satuvad array-sse vahepeal valed kuupäevad
        // Viimane kuupäev on suurem kui ta peaks, kustutame ta
        if (datesBetweenList[datesBetweenList.length-1].getDay() > endDate.getDay()) {
            datesBetweenList.pop();
        }
        // Viimane kuupäev on väiksem kui ta peaks, lisame õige viimase
        if (datesBetweenList[datesBetweenList.length-1].getDay() < endDate.getDay()) {
            datesBetweenList.push(endDate);
        }
        // Esimene kuupäev on väiksem kui ta peaks, kustutame ta
        if (datesBetweenList[0].getDay() < startDate.getDay()) {
            datesBetweenList.shift();
        }
        // Esimene kuupäev on suurem kui ta peaks, lisame õige esimese
        if (datesBetweenList[0].getDay() > startDate.getDay()) {
            datesBetweenList.unshift(startDate);
        }
        return datesBetweenList;
    }

    componentDidMount() {
        let datesToLoop = this.calculateDatesBetween(this.props.startDate, this.props.endDate);

        // Teeme igale listis olevale kuupäevale vastava API päringu
        for (let i = 0; i < datesToLoop.length; i++) {
            let fetchLinkBase = this.props.fetchLink;
            let fullFetchLink = fetchLinkBase + datesToLoop[i].toISOString().substring(0, datesToLoop[i].toISOString().indexOf('T'));
            console.log(fullFetchLink);
            fetch(fullFetchLink)
                .then(res => res.json())
                .then(
                    (result) => {
                        // Teisendame tulemused sobivale kujule ja lisame senini saadud tulemuste hulka
                        let datePieces = datesToLoop[i].toString().split(" ");
                        let dateString = datePieces[1] + ". " + datePieces[2];
                        let dayLengthPieces = result.results.day_length.split(':');
                        let minutesOfSunlight = (+dayLengthPieces[0]) * 60 + (+dayLengthPieces[1]);
                        let resultsSoFar = this.state.fetchResults;
                        resultsSoFar.push({x: dateString, y: minutesOfSunlight});
                        this.setState({
                            fetchResults: resultsSoFar,
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
                  <p>Error: API-st andmete saamisel esines viga.</p>
              </div>
            );
        }
        else if (fetchResults.length === datesLength && isLoaded) {
            return (
                <div className="barChart">
                    <XYPlot
                        height={300} width={450}
                        xType="ordinal"
                        color={"#e11937"}
                    >
                        <VerticalGridLines/>
                        <MarkSeries data={fetchResults}/>
                        <HorizontalGridLines/>
                        <XAxis
                            style={{fontSize: "10px"}}
                            tickLabelAngle={90}
                            tickPadding={34}
                        />
                        <YAxis
                            title={"Minuteid päevas"}
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

export default DayLengthGraph;