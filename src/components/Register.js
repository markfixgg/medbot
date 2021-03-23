import MaterialTable from "material-table";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect, useCallback} from "react";

const axios = require('axios');


const columns = [
    {
      title: "Имя",
      field: "firstName"
    },
    {
      title: "Фамилия",
      field: "secondName"
    },
    {
      title: "Возраст",
      field: "age"
    },
    {
      title: "Номер телефона",
      field: "phoneNumber"
    },
    {
      title: "Откуда узнали",
      field: "from"
    }
];


const DeleteUser = async (userID, callback) =>{
    await axios.delete('http://127.0.0.1:80/api/users', {data:{userID: userID, notify: true}})
        .then(function (response) {
            alert(response.data)
            callback()
        })
        .catch(function (error) {
            alert("Какая-то ошибка.")
        })
}

const AcceptUser = async (userID, callback) =>{
    await axios.put('http://127.0.0.1:80/api/users', {userID: userID})
    .then(function (response) {
        console.log(response.data)
        callback()
    })
    .catch(function (error) {
        alert("Какая-то ошибка.")
    })
}

const Register = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get("http://127.0.0.1:80/api/users")
            var filtered = [];
            response.data.map(item => !item.auth ? filtered.push(item) : {} )
            setData(filtered)
        }
        fetchData()
    }, [])

    return (
        <div className="wrapper" style={{marginTop: "10px"}}>
            <div className="block">
                <div className="wrapper">
                    <p className="block__title">Ожидающие подтверждения регистрации</p>
                </div>
                <div className="registerTable">
                <MaterialTable title="" data={data} columns={columns} options={{actionsColumnIndex: -1}} actions={
                    [
                        {
                            icon: 'check',
                            tooltip: 'Принять',
                            onClick: (event, rowData) => {
                                window.confirm(`Принять заявку ${rowData.firstName}?`) ? AcceptUser(rowData.tgID, () => {
                                    const dataDelete = [...data]
                                    const index = rowData.tableData.id
                                    dataDelete.splice(index, 1)
                                    setData([...dataDelete])
                                } ) : console.log("Canceled")         
                            }
                        },                            
                        {
                            icon: 'close',
                            tooltip: 'Отклонить',
                            onClick: (event, rowData) => {
                                window.confirm(`Удалить ${rowData.firstName}?`) ? DeleteUser(rowData.tgID, () => {
                                    const dataDelete = [...data]
                                    const index = rowData.tableData.id
                                    dataDelete.splice(index, 1)
                                    setData([...dataDelete])
                                }) : console.log("Canceled")
                            }
                        }
                    ]
                    }/>
                </div>
            </div>
        </div>
    )
}

export default Register