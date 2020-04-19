import React, {Component} from 'react';
import './HomePage.css';

import Header from "./Header";
import MapContainer from "./Map";
import DayLengthInfo from "./DayLengthInfo";

import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";


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
        linkToFetch: "https://api.sunrise-sunset.org/json?lat=",
        keyValue: 1,
    };

    handleInputChange = (e, name) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleClick = e => {
        /* API ei toeta pikkuskraadi ja/või laiuskraadi, mille väärtus on täpselt 0, seega tuleb seda suurendada */
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
                keyValue: this.state.keyValue + 1,
            });
        }
        else {
            alert("Sisestatud koordinaadid on vigased! \n" +
                "Laiuskraadide vahemik on -90.0, 90.0). \n" +
                "Pikkuskraadide vahemik on (-180.0, 180.0).");
        }
    };


    render() {
        return (
           <div className="centered-column" id="main-div">
               <Header/>

               <div>
                   <h3>Valige oma asukoht kaardilt:</h3>
               </div>

               <div style={{width: '100%', height: '240px', zIndex: '-1'}}>
                   <MapContainer/>
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
                   <input className="submit-data-button" type="submit" value="Kinnita"
                          onClick={(e) => this.handleClick(e)}
                   />
               </div>

               <div>
                   {this.state.showInfo ?
                    <DayLengthInfo fetchLink={this.state.linkToFetch} key={this.state.keyValue}/> :
                       <div>
                           <p>Päikesetõusu kellaaeg: ...</p>
                           <p>Päikeseloojangu kellaaeg: ...</p>
                           <p>Päeva pikkus: ...</p>
                       </div>
                    }
               </div>

               <div>
                   <h3>Kui soovite näha päeva pikkusi üle mitme päeva, valige siit kuupäevavahemik:</h3>
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
                       <input className="submit-data-button" type="submit" value="Kinnita" />
                   </div>
               </div>

               <div>
                   <p> Graafik </p>
               </div>

           </div>
        );
    }
}

export default HomePage;