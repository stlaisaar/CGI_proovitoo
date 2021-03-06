import React, {Component} from 'react';
import './HomePage.css';

import Header from "./Header";
import DayLengthInfo from "./DayLengthInfo";

// DatePicker logic: https://www.npmjs.com/package/react-datepicker &
//                   https://reactdatepicker.com/
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";

import DayLengthGraph from "./DayLengthGraph";

import WorldMap from "./WorldMap";


class HomePage extends Component {

    handleCurrentDateChange = date => {
        this.setState({
            currentDate: date,
        });
    };

    handleStartDateChange = date => {
        this.setState({
            startDate: date,
            showGraph: false,
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date,
            showGraph: false,
        });
    };


    state = {
        latitude: '58.377916',
        latitudeTemp: null,
        longtitude: '26.729050',
        longtitudeTemp: null,
        currentDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        showInfo: false,
        showGraph: false,
        linkToFetch: "https://api.sunrise-sunset.org/json?lat=",
        infoKeyValue: 1,
        graphKeyValue: 1,
        mapKeyValue: 1,
    };

    handleInputChange = (e, name) => {
        this.setState({
            [name]: e.target.value,
        });
    };

    /* API ei toeta pikkuskraadi ja/või laiuskraadi, mille väärtus on täpselt 0, seega tuleb veidi muuta */
    fixZeroCoordinates(latitude, longtitude) {
        if (parseFloat(latitude) === 0) {
            latitude = 0.0001.toString();
        }
        if (parseFloat(longtitude) === 0) {
            longtitude = 0.0001.toString();
        }
        return [latitude, longtitude];
    }

    handleClick = e => {
        // Võtame koordinaatide väärtused tekstiväljadest
        let currentLatitudeTemp = this.state.latitudeTemp;
        let currentLongtitudeTemp = this.state.longtitudeTemp;
        // Kui koordinaadid on null (pole sisestatud), kasutame kaardilt saadud koordinaate
        if (currentLatitudeTemp === null) {
            currentLatitudeTemp = this.state.latitude;
        }
        if (currentLongtitudeTemp === null) {
            currentLongtitudeTemp = this.state.longtitude;
        }
        let currentDateString = this.state.currentDate.toISOString();
        // Kontrollime, kas kumbki koordinaatidest on väärtusega 0, kui jah, muudame väärtuse 0.0001-ks
        let fixedCoordinates = this.fixZeroCoordinates(currentLatitudeTemp, currentLongtitudeTemp);
        currentLatitudeTemp = fixedCoordinates[0];
        currentLongtitudeTemp = fixedCoordinates[1];
        // Kontrollime, et koordinaadid on õiges vahemikus
        if (parseFloat(currentLatitudeTemp) >= -85.0 && parseFloat(currentLatitudeTemp) <= 85.0 &&
            parseFloat(currentLongtitudeTemp) >= -180.0 && parseFloat(currentLongtitudeTemp) <= 180.0) {
            this.setState({
                linkToFetch: "https://api.sunrise-sunset.org/json?lat=" + currentLatitudeTemp +
                    "&lng=" + currentLongtitudeTemp +
                    "&date=" + currentDateString,
                showInfo: true,
                infoKeyValue: this.state.infoKeyValue + 1,
            });
            let updateMap = false;
            // Kui tektstiväljadest saadud koordinaadid ei kattu state-s olevatega, uuendame state
            if (this.state.latitude !== currentLatitudeTemp) {
                updateMap = true;
                this.setState({
                    latitude: currentLatitudeTemp,
                });
            }
            if (this.state.longtitude !== currentLongtitudeTemp) {
                updateMap = true;
                this.setState({
                    longtitude: currentLongtitudeTemp,
                });
            }
            // Kui kumbki state-s olevatest koordinaatidest uuendati, uuendame ka kaarti
            if (updateMap) {
                this.setState({ mapKeyValue: this.state.mapKeyValue + 1 })
            }
        }
        else {
            alert("Sisestatud koordinaadid on vigased! \n" +
                "Laiuskraadide vahemik on [-85.0, 85.0]. \n" +
                "Pikkuskraadide vahemik on [-180.0, 180.0].");
        }
    };

    handleBarGraphClick = e => {
        let currentLatitude = this.state.latitude;
        let currentLongtitude = this.state.longtitude;
        if (this.state.startDate >= this.state.endDate) {
            alert('Alguskuupäev peab olema väiksem kui lõppkuupäev!');
        }
        else {
            // Loeme kokku päevade arvu algus- ja lõppkuupäeva vahel, kui suurem kui 30, siis ei luba
            let currentDate = new Date(this.state.startDate);
            let amountOfDates = 0;
            let endDate = this.state.endDate;
            while (currentDate <= endDate) {
                amountOfDates++;
                let newDate = currentDate.setDate(currentDate.getDate() + 1);
                currentDate = new Date(newDate);
            }
            if (amountOfDates > 30) {
                alert('Kuupäevade vahe võib olla maksimaalselt 30 päeva!')
            }
            else {
                this.setState({
                    linkToFetch: "https://api.sunrise-sunset.org/json?lat=" + currentLatitude +
                        "&lng=" + currentLongtitude +
                        "&date=",
                    showGraph: true,
                    graphKeyValue: this.state.graphKeyValue + 1,
                });
            }
        }
    };

    // WorldMap kasutab seda HomePage funktsiooni, et uuendada HomePage state-s koordinaate
    handleCoordinates = (newCoordinates) => {
        this.setState({
            latitude: newCoordinates['lat'].toString(),
            longtitude: newCoordinates['lng'].toString(),
        });
    };


    render() {
        return (
           <div className="centered-column">
               <Header/>

               <div>
                   <h3>
                       Aktiivsed koordinaadid –
                       lat: {this.state.latitude.substring(0, 9)},
                       lng: {this.state.longtitude.substring(0, 9)}
                   </h3>
               </div>

               <WorldMap
                   onCoordinatesChange={this.handleCoordinates}
                   latlng={{lat: this.state.latitude, lng: this.state.longtitude}}
                   key={this.state.mapKeyValue}
               />

               <div className="centered-column">
                   <h3>
                       Valige asukoht kaardilt ... <br/>
                       ... või sisestage alla vastavad (EPSG:4326) koordinaadid:
                   </h3>

                   <div className="centered-column">
                       <form>
                           <input
                               className="coordinate-field" type="text" placeholder="Laiuskraadid" name="latitude"
                               onChange={(e) => this.handleInputChange(e, 'latitudeTemp')}
                           />
                       </form>
                       <form>
                           <input
                               className="coordinate-field" type="text" placeholder="Pikkuskraadid" name="longtitude"
                               onChange={(e) => this.handleInputChange(e, 'longtitudeTemp')}
                           />
                       </form>
                   </div>

                   <h3>Valige seejärel kuupäev:</h3>

                   <div className="centered-column">
                       <DatePicker
                           selected={this.state.currentDate}
                           onChange={this.handleCurrentDateChange}
                           className="date-picker"
                           id="current-date-picker"
                       />
                   </div>

                   <input
                       className="submit-data-button" type="submit" value="Kinnita andmed"
                       onClick={(e) => this.handleClick(e)}
                   />
               </div>

               <div>
                   {this.state.showInfo ?
                    <DayLengthInfo
                        fetchLink={this.state.linkToFetch}
                        key={this.state.infoKeyValue}
                    /> :
                       <div>
                           <p>&nbsp;</p>
                           <p>Siia kuvatakse andmete kinnitamisel päeva pikkuse info.</p>
                           <p>&nbsp;</p>
                       </div>
                    }
               </div>

               <div>
                   <h3>Päevade pikkuste graafiku kuvamiseks valige alt kuupäevavahemik (max 30 päeva):</h3>

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

                       <input
                           className="submit-data-button" type="submit" value="Kinnita kuupäevad"
                           onClick={(e) => this.handleBarGraphClick(e)}
                       />
                   </div>
               </div>

               <div>
                   {this.state.showGraph ?
                       <DayLengthGraph
                           startDate={this.state.startDate}
                           endDate={this.state.endDate}
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