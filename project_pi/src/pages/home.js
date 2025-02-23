import React from "react";
import Calendar from "../components/calendar";
import logo from "../components/logo.svg";

function Home(){

    return(
        <div style = {styles.container}>
            <Calendar/>
        </div>
    )
}

export default Home;

const styles = {
    container: {
        minHeight: "90vh",
        background: `url(${logo}) no-repeat right center / cover`,
        backgroundSize: "60%",
        backgroundPosition: "630px",
    },
};


// function Description(){
//     return(
//         <div style = {StyleSheet.container}>
//             {/* {text description bottom center page, flex, h2} */}
            
//         </div>
//     )
// }


