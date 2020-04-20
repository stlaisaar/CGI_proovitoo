import React, {Component} from 'react';
import './HomePage.css';

import Header from "./Header";
import MapContainer from "./Map";
import DayLengthInfo from "./DayLengthInfo";

import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import ReactVisChart from "./ReactVisChart";
import LeafletMap from "./LeafletMap";


class HomePage extends Component {

    // DatePicker logic: https://www.npmjs.com/package/react-datepicker &
    //                   https://reactdatepicker.com/

    handleCurrentDateChange = date => {
        this.setState({
            currentDate: date,
            currentDateString: date.toISOString().substring(0, date.toISOString().indexOf('T')),
        });
    };

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    state = {
        message: '',
        latitude: '',
        longtitude: '',
        currentDate: new Date(),
        currentDateString: "",
        startDate: new Date(),
        endDate: new Date(),
        showInfo: false,
        showGraph: false,
        linkToFetch: "https://api.sunrise-sunset.org/json?lat=",
        infoKeyValue: 1,
        graphKeyValue: 1,
    };

    handleInputChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleClick = e => {
        /* API ei toeta pikkuskraadi ja/või laiuskraadi, mille väärtus on täpselt 0, seega tuleb veidi muuta */
        let lat = this.state.latitude;
        let long = this.state.longtitude;
        if (parseFloat(long) === 0.0) {
            this.setState({
                longtitude: parseFloat(long) + 0.0001,
            });
            long = parseFloat(long) + 0.0001;
        }
        if (parseFloat(lat) === 0.0) {
            this.setState({
                latitude: parseFloat(lat) + 0.0001,
            });
            lat = parseFloat(lat) + 0.0001;
        }
        if (parseFloat(lat) >= -85.0 && parseFloat(lat) <= 85.0 &&
            parseFloat(long) >= -180.0 && parseFloat(long) <= 180.0) {
            this.setState({
                currentDateString: this.state.currentDate.toISOString(),
                linkToFetch: "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng="
                    + long + "&date=" + this.state.currentDateString,
                showInfo: true,
                infoKeyValue: this.state.infoKeyValue + 1,
            });
        }
        else {
            alert("Sisestatud koordinaadid on vigased! \n" +
                "Laiuskraadide vahemik on -90.0, 90.0). \n" +
                "Pikkuskraadide vahemik on (-180.0, 180.0).");
        }
    };

    handleBarGraphClick = e => {
        let lat = this.state.latitude;
        let long = this.state.longtitude;
        if (this.state.latitude == null || this.state.longtitude == null) {
            alert('Sisestage ja kinnitage enne graafiku joonistamist koordinaadid!');
        }
        else if (this.state.startDate >= this.state.endDate) {
            alert('Alguskuupäev peab olema väiksem kui lõppkuupäev!');
        }
        else {
            this.setState({
                linkToFetch: "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng="
                    + long + "&date=",
                showGraph: true,
                graphKeyValue: this.state.graphKeyValue + 1,
            });
        }
    };


    render() {
        return (
           <div className="centered-column" id="main-div">
               <Header/>

               <div>
                   <h3>Valige oma asukoht kaardilt:</h3>
               </div>

               <div className="centered-column">
                   <h3>või sisestage siia oma koordinaadid (EPSG:4326 süsteemis):</h3>
                   <div className="centered-column">
                       <form>
                           <input className="coordinate-field" type="text" placeholder="Laiuskraadid" name="latitude"
                                  onChange={(e) => this.handleInputChange(e, 'latitude')}
                           />
                       </form>
                       <form>
                           <input className="coordinate-field" type="text" placeholder="Pikkuskraadid" name="longtitude"
                                  onChange={(e) => this.handleInputChange(e, 'longtitude')}
                           />
                       </form>
                   </div>
                   <h3>Valige seejärel sobiv kuupäev:</h3>
                   <div className="centered-column">
                       <DatePicker
                           selected={this.state.currentDate}
                           onChange={this.handleCurrentDateChange}
                           className="date-picker"
                           id="current-date-picker"
                       />
                   </div>
                   <input className="submit-data-button" type="submit" value="Kinnita andmed"
                          onClick={(e) => this.handleClick(e)}
                   />
               </div>

               <div>
                   {this.state.showInfo ?
                    <DayLengthInfo fetchLink={this.state.linkToFetch} key={this.state.infoKeyValue}/> :
                       <div>
                           <p>Päikesetõusu kellaaeg: ...</p>
                           <p>Päikeseloojangu kellaaeg: ...</p>
                           <p>Päeva pikkus: ...</p>
                       </div>
                    }
               </div>

               <div>
                   <h3>Kui soovite näha päeva pikkuste graafikut, valige siit kuupäevavahemik (max 30 päeva):</h3>
                   <div className="centered-column">
                       <div className="centered-row">
                           <DatePicker
                               selected={this.state.startDate}
                               onChange={this.handleStartDateChange}
                               className="date-picker"
                           />
                           <DatePicker
                               selected={this.state.endDate}
                               onChange={this.handleEndDateChange}
                               className="date-picker"
                           />
                       </div>
                       <input className="submit-data-button" type="submit" value="Kinnita kuupäevad"
                              onClick={(e) => this.handleBarGraphClick(e)}
                       />
                   </div>
               </div>

               <div>
                   {this.state.showGraph ?
                       <ReactVisChart startDate={this.state.startDate} endDate={this.state.endDate}
                                      fetchLink={this.state.linkToFetch}
                                      key={this.state.graphKeyValue}/> :
                       <div>
                           <p>Siia kuvatakse kuupäevade kinnitamisel vastav graafik.</p>
                       </div>
                   }
               </div>
           </div>
        );
    }
}

export default HomePage;