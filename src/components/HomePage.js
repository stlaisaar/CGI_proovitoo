import React, {Component} from 'react';
import './HomePage.css';

import Header from "./Header";

import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";


class HomePage extends Component {

    // DatePicker logic: https://www.npmjs.com/package/react-datepicker &
    //                   https://reactdatepicker.com/
    state = {
        currentDate: new Date(),
        startDate: new Date(),
        endDate: new Date()
    };

    handleCurrentDateChange = date => {
        this.setState({
            currentDate: date
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

    render() {
        return (
           <div className="centered-column">
               <Header/>

               <div>
                   <h3>Valige oma asukoht kaardilt:</h3>
               </div>

               <div className="centered-column">
                   <h3>... või sisestage siia oma koordinaadid:</h3>
                   <div className="centered-column">
                       <form>
                           <input className="coordinate-field" type="text" placeholder="Laiuskraadid" name="latitude" />
                       </form>
                       <form>
                           <input className="coordinate-field" type="text" placeholder="Pikkuskraadid" name="longtitude" />
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
                   <input className="submit-data-button" type="submit" value="Kinnita" />
               </div>

               <div className="day-length-text">
                   <p>Päikesetõusu kellaaeg on 8:00 UTC.</p>
                   <p>Päikeseloojangu kellaaeg on 18:00 UTC.</p>
                   <p>Päeva pikkus on 10 tundi.</p>
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