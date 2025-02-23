import React, { createContext, useContext, useState, useEffect} from 'react';
// import {axios} from 'axios';

const planContext = createContext(null);

export const PlanContextProvider = ({children}) => {
    const [planData, setPlanData] = useState(null);

    //useEffect(()=>{
            //axios.get('/generate-roadmap').then(
                //response => setPlanData(response.data)
            //)
        //},[]
    //)
    
    return (
        <planContext.Provider value={{planData}}>
            {children}
        </planContext.Provider>
    )
}

export const usePlanData= () => {
    return useContext(planContext)
}