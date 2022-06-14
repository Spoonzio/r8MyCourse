import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../constants";

const useStyles = makeStyles({
    tableContainer: {
      alignSelf: "center",
      height: '400px',
      width: '80%'
    },
    gridContainer: {
        paddingTop: '16%'
    },
    divContainer: {
        width: 'screen',
        height: 'screen',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default function Home() {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/review/${id}`);
    }
    useEffect( () => {
        getDepartments();
    },[])

    useEffect(() =>{
        if (selectedDepartment == null) return;
        getCourses(selectedDepartment?._id);
    },[selectedDepartment]);

    const getCourses = async (departmentId) => {
        setLoading(true);
        let row = await axios.get(`${baseUrl}/courses/department/${departmentId}`)
        .then(res => {
            let dataArr = res.data;
            dataArr.forEach(r => {
                const courseID = r._id; 
                axios.get(`${baseUrl}/reviews/course/${courseID}`)
                .then(res => {
                    r.courseReviews = res.data.length;
                });

                r.id = r._id;
            });
            return(dataArr);
        });
        
        var waitTime = row.length * 10;
        setRows(row);
        setTimeout(() => {
            setLoading(false);
        }, waitTime);
    }

    const getDepartments = async () => {
        await axios.get(`${baseUrl}/departments`)
        .then(res => {
            const result = res.data;
            setDepartments(result);
        }).catch(error => console.log(error));
    }

    const options = [
        "Applied & Natural Sciences",
        "Business & Media",
        "Computing & IT",
        "Engineering",
        "Health Sciences",
        "Trade & Apprenticeships",
        "Access & Transfer"
    ];

    const columns = [
        { field: 'courseId', headerName: 'Course ID', width: 200 },
        { field: 'courseName', headerName: 'Course name', width: 370 },
        { field: 'courseReviews', headerName: 'No. of Reviews', width: 370 }
    ];
    
    const handleOnChangeDepartment = (event, value) => {
        console.log(event);
        console.log(value);
        if (value === null) {
            setShowTable(false);
        } else {
            setShowTable(true);
        }
        setSelectedDepartment(value);
    }

    return (
        <div className={classes.divContainer}>
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.gridContainer}
            >
            <Grid item xs='auto' >
                <ThumbsUpDownIcon sx={{fontSize: 80}} color='secondary' />
            </Grid>
            <Grid item xs='auto' >
                <Typography variant="h3" align="center" color='primary' >
                    r8MyCourses
                </Typography>
            </Grid>
            <Grid item xs='auto' >
                <Typography variant="h6" align="center" color='secondary'>
                    For BCIT students, by BCIT students
                </Typography>
            </Grid>
            <Grid item xs='auto' >
                <Typography variant="subtitle1" align="center" >
                    Select the department to view courses
                </Typography>
            </Grid>
            <Grid item xs='auto' >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={departments}
                    getOptionLabel={(option) => option.deptName}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Department" />}
                    onChange={(event, value) => handleOnChangeDepartment(event, value)}
                />  
            </Grid>
            

            {showTable ? 
                <Grid item xs={8} className={classes.tableContainer} >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        loading={loading}
                        onCellClick={(row) => {handleClick(row.row._id);}}
                    />
                </Grid>
                :
                <></>
            }
        </Grid>
        </div>
    );
}