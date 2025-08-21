import React, { useState } from 'react'
import axios from 'axios'
import backendUrl from '../App'

const List = () => {
    const [list, setList] = useState([])
    const fetchDataFromDB = async () => {
        const respose = await axios.get()
    }
    return (
        <div>
            
        </div>
    )
}

export default List
