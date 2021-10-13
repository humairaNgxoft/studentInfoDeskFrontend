import React, { Fragment, useContext, useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';

const DatePicker = () => {
    const handleSelect = (ranges) => {
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    return (
        <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
        />
    )
}
export default DatePicker

// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';


// export default function TableRow(props) {

//     // const deleteRec = () => {
//     //     axios.get('http://localhost:4000/business/delete/' + props.obj._id)
//     //         .then(() => {
//     //             console.log('Deleted');
//     // props.getBusinessData();
//     //         }).catch(err => console.log(err))
//     // }

//     { console.log(props.obj, "props") }
//     return (<>
//         <tr>
//             <td>
//                 {props.obj.id}
//             </td>
//             <td>
//                 {props.obj.value}
//             </td>
//             <td>
//                 {props.obj.somethig}
//             </td>
//             {/* <td>
//                 <Link to={"/edit/" + props.obj._id} className="btn btn-primary">Editer</Link>
//             </td> */}
//             {/* <td>
//                 <button onClick={deleteRec} className="btn btn-danger">Supprimer</button>
//             </td> */}
//         </tr>
//     </>
//     );

// }
