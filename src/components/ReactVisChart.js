import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, VerticalBarSeries} from 'react-vis';

class ReactVisChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,

            fetchData: [],
            results: [],
            status: null,
            fetchLink: props.fetchLink,
        };
    }

    componentDidMount() {
        let fetchLinkBase = this.state.fetchLink;
        let start = this.state.startDate;
        let end = this.state.endDate;

        let innerFetchData = [];

        let loop = new Date(start);
        while(loop <= end){
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);

            let fullFetchLink = fetchLinkBase + loop.toISOString();

            fetch(fullFetchLink)
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
                );

            innerFetchData.push(this.state.results);
        }
        this.setState({
            fetchData: innerFetchData,
        });

        console.log(innerFetchData);
    }


    render() {
        let fetchDataList = this.state.fetchData;
        let listLength = fetchDataList.length;

        let data = [];
        let i;
        for (i = 0; i < listLength; i++) {
            let yearMonthDay = fetchDataList[i].sunrise.substring(0, fetchDataList[0].sunrise.indexOf('T'));
            let monthDay = yearMonthDay.substring(yearMonthDay.indexOf('-')+1, yearMonthDay.length);
            let dayLength = fetchDataList[i].day_length;
            let dayLengthPieces = dayLength.split(':');
            let minutes = (+dayLengthPieces[0]) * 60 + (+dayLengthPieces[1]);

            data.push({x: monthDay, y: minutes});
        }
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
            <div className="App">
                <XYPlot height={240} width={400}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data} />
                </XYPlot>
            </div>
        );
    }
}

export default ReactVisChart;