// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import "./todo.scss"
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { auto } from '@popperjs/core';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

import Switch from '@mui/material/Switch';



export default function Todo({ loginuser }) {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [todouser, settodouser] = useState(loginuser);
  const [tododata, settododata] = useState([])
  const [todostatus, settodostatus] = useState("Incomplete")
  const [checked, setChecked] = useState(true);

  //
  const currentURL = () => {
    console.log(window.location.href)
  }

  let todoData = {
    Title: title,
    Description: desc,
    Todouser: todouser
  }

  const addtodo = async () => {
    let responce = await Axios.post("http://localhost:8000/newtodo", todoData)

    const readresponce = await Axios.get(`http://localhost:8000/tododata?param=${todouser}`);
    const formattedData = readresponce.data.map((item, index) => ({
      id: index + 1, // Generate unique id for each row
      ...item,
    }));
    settododata(formattedData);
    settitle('')
    setdesc("")
    console.log(responce)

  }

  useEffect(() => {
    async function getloaddData() {

      const readresponce = await Axios.get(`http://localhost:8000/tododata?param=${todouser}`);
      const formattedData = readresponce.data.map((item, index) => ({
        id: index + 1, // Generate unique id for each row
        ...item,
      }));
      settododata(formattedData);


    }
    getloaddData()
    currentURL()
  }, [])


  // delete Todo
  const handleDelete = async (_id,) => {
    // Filter out the row with the specified ID
    const deleteItem = await Axios.delete(`http://localhost:8000/delete?param=${_id}`)
    console.log(deleteItem.data)
    const readresponce = await Axios.get(`http://localhost:8000/tododata?param=${todouser}`);
    const formattedData = readresponce.data.map((item, index) => ({
      id: index + 1, // Generate unique id for each row
      ...item,
    }));
    settododata(formattedData);

  };

  //  Edit toto
  const handleEdit = async (_id, title, description) => {
    const editresponce = await Axios.put(`http://localhost:8000/update?param1=${_id}&param2=${title}&param3=${description}`)


    console.log(editresponce)

    columns.editable = "true";
  }

  const handleComplete = async (_id) => {
    const completeResponce = await Axios.put(`http://localhost:8000/todoStatus?param1=${_id}`)
    const readresponce = await Axios.get(`http://localhost:8000/tododata?param=${todouser}`);
    const formattedData = readresponce.data.map((item, index) => ({
      id: index + 1, // Generate unique id for each row
      ...item,
    }));
    settododata(formattedData);
    console.log(_id)
    console.log(completeResponce.data)

  }

  useEffect(() => {

    console.log("updated state", todostatus)
    async function getFilterdata() {
      const readresponce = await Axios.get(`http://localhost:8000/todofilter?param1=${todouser}&param2=${todostatus}`);
      const formattedData = readresponce.data.map((item, index) => ({
        id: index + 1, // Generate unique id for each row
        ...item,
      }));
      settododata(formattedData);
      console.log(todostatus)
    }
    // currentURL()
    getFilterdata()
  }, [todostatus, tododata])

  const handletodostatus = (event) => {
    settodostatus(event.target.value);

  }


  const columns = [

    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      editable: true,
      sortable: false,
    },

    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'Todo description.',
      sortable: false,
      editable: true,
      width: 400,

    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      description: 'Todo Date Creation',
      sortable: false,
      width: 110,

    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <DeleteIcon onClick={() => handleDelete(params.row._id)} className='deleteicon' />
      ),
    },
    {
      field: 'edit',
      headerName: 'Edite',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <EditIcon onClick={() => handleEdit(params.row._id, params.row.title, params.row.description)} className='deleteicon' />
      ),

    },
    {
      field: 'done',
      headerName: 'Done',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <DoneIcon onClick={() => handleComplete(params.row._id)} className='deleteicon' />
      ),

    },
    {
      field: 'todochecked',
      headerName: 'Status',
      width: 110,
      sortable: false,
    },
    {
      field: '_id',
      headerName: '_id',
      width: 1,
      sortable: false,
    }


  ];

  const handleChange = (event) => {


    setChecked(event.target.checked);


  }




  return (

    <div className={`todo ${checked ? 'dark' : 'light'}`}>
      <h3>Hello {loginuser}</h3>
      <div className='todoinput'>
        <input type='text' placeholder='Title' value={title} onChange={(e) => settitle(e.target.value)} />
        <textarea rows={1} placeholder='description' value={desc} onChange={(e) => setdesc(e.target.value)} />
        <button onClick={addtodo}>Add Todo</button>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <h3>{checked}</h3>

      </div>
      <select className="form-select" aria-label="Default select example" onChange={handletodostatus}>

        <option selected value="Incomplete">Incomplete</option>
        <option value="Complete" >Complete</option>
        {/* <option value="false">Incomplete</option> */}

      </select>
      <Box sx={{ height: 500, width: '100%' }} className="todobox">
        <DataGrid className='datagrid'
          rows={tododata}
          columns={columns.filter(col => col.field !== '_id')}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }

          }}
          pageSizeOptions={[8]}
          // checkboxSelection
          disableRowSelectionOnClick

          disableColumnFilter
          disableDensitySelector
          disableColumnMenu
          disableColumnSelector

        />
      </Box>
    </div>
  )
}
