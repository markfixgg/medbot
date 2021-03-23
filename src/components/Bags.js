import MaterialTable from "material-table";
import React, {useState, useEffect, useCallback} from "react";
import ChatComponent from './ChatComponent';
import axios from 'axios';

const deleteTicket = async (data, callback) =>{
    await axios.delete('http://127.0.0.1:80/api/bags', {data: {ticketID: data._id} })
    .then(response => callback())
    .catch(e => console.log(e))
}

const setCompleted = async (data, callback) =>{
    await axios.patch('http://127.0.0.1:80/api/bags', {ticketID: data._id, state: true})
    .then(response => callback())
    .catch(e => console.log(e))
}

const Bags = () => {
    const [data, setData] = useState([]);

    const columns = [
        {title: "Имя", field: "firstName"},
        {title: "Фамилия", field: "secondName"},
        {title: "Дата", field: "date"},
        {title: "Время", field: "time"},
        {title: "Статус", field: "completed"},
    ]

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:80/api/bags')
            var filtered = [];
            response.data.map(item => item.completed ? filtered.push(item) : {})
            setData(filtered)
        }
        fetchData()
    }, [])

    return (
        <div className="wrapper" style={{marginTop: "10px"}}>
            <div className="block">
                <div className="wrapper">
                    <p className="block__title">Список багов</p>
                </div>
                <div className="registerTable">
                   <MaterialTable
                        title=""
                        columns={columns}
                        data={data}
                        options={{actionsColumnIndex: -1}}
                        actions={
                            [
                                {
                                    icon: 'done',
                                    tooltip: 'Принять',
                                    onClick: (event, rowData) => {
                                        console.log(rowData)
                                        window.confirm(`Закрыть заявку ?`) ? setCompleted(rowData, () => {
                                            const dataDelete = [...data];
                                            const index = rowData.tableData.id;
                                            dataDelete.splice(index, 1);
                                            setData([...dataDelete]);
                                        }) : console.log("Canceled")         
                                    }
                                }
                            ]
                        }
                        editable={{
                            onRowDelete: oldData => new Promise((resolve)=>{
                                deleteTicket(oldData, () => {
                                    const dataDelete = [...data]
                                    const index = oldData.tableData.id
                                    dataDelete.splice(index, 1)
                                    setData([...dataDelete])
                                    resolve()
                                })
                            })
                    
                        }}
                        detailPanel={rowData => {return <ChatComponent ticketID={rowData._id} creatorID={rowData.creator} messagesList={rowData.messages}/> }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    /> 
                </div>
            </div>
        </div>
    )
}

export default Bags