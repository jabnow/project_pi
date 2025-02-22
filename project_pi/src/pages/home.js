import React, {useState} from "react";
import DatePicker from 'react-datepicker';


function Home(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    return(
        <div>
            <h2>Select a Date</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
            />
            <p>Selected Date: {selectedDate.toDateString()}</p>
        </div>
    )
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#202124',
    },
    selectedDate: {
        marginTop: '20px',
        fontSize: '16px',
        color: '#5f6368',
    },
};
export default Home;