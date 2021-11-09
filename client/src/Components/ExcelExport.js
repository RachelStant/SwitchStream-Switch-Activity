import React from 'react'
import ReactExport from "react-export-excel";
import QuickActivityLogic from '../pages/quickActivity/QuickActivityLogic';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;





const ExcelExport = ({ exportData }) => {

  

     return (

        
        <ExcelFile element={<button className='btn btn-primary'>Download results to Excel</button>}>
        <ExcelSheet data={exportData} name="Name and Date">
            <ExcelColumn label="Metric Name" value="name"/>
            <ExcelColumn label="Value" value="value"/>
         
        </ExcelSheet>
        </ExcelFile>

      
    )
}


export default ExcelExport
