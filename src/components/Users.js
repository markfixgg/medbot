import MaterialTable from "material-table";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, { useState, useEffect } from "react";
const axios = require('axios');

const DeleteUser = async (userID, callback) =>{
    axios.delete('http://127.0.0.1:80/api/users', {data:{userID: userID, notify: false}})
        .then(function (response) {
            callback(null, response.data)
        })
        .catch(function (error) {
            alert("Какая-то ошибка.")
    })
}

const patchUser = (user, callback) =>{
    axios.patch('http://127.0.0.1:80/api/users', {user: user})
        .then(function (response) {
            callback()
        })
        .catch(function (error) {
            alert("Какая-то ошибка.")
    })
}

const Users = () => {
const [columns, setColumns] = useState([
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
        },
        {
        title: "Права",
        field: "role"
        },
        {
        title: "Авторизован",
        field: "auth"
    }
]);

const [data, setData] = useState([]);
 
useEffect(()=>{
    const fetchData = async () => {
        const response = await axios.get("http://127.0.0.1:80/api/users")
        var filtered = [];
        response.data.map(item => item.auth ? filtered.push(item) : {} )
        setData(filtered)
    }
    fetchData()
}, [])

return(
        <div className="wrapper" style={{marginTop: "10px"}}>
        <div className="block">
            <div className="wrapper">
                <p className="block__title">Список пользователей</p>
            </div>
            <div className="registerTable">
            <MaterialTable
                title=""
                columns={columns}
                data={data}
                options={{actionsColumnIndex: -1}}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        patchUser(newData, ()=>{
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            
                            resolve()   
                        })
                    }),
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        DeleteUser(oldData.tgID, (err, result)=>{
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        })
                    }), 
                }}
                />
            </div>
        </div>
    </div>
)

}

export default Users