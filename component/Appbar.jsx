import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



export default function Appbar() {
    const [inputValue, setInputValue] = useState('');
    const [inputList, setInputList] = useState([]);
    const [editValue, setEditValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        if (editIndex !== null) {
            setEditValue(e.target.value);
        } else {
            setInputValue(e.target.value);
        }
    };


    const handleAdd = () => {
        if (editIndex !== null) {
            const updatedList = [...inputList];
            updatedList[editIndex] = editValue;
            setInputList(updatedList);
            setEditValue('');
            setEditIndex(null);
        } else {
            setInputList([...inputList, inputValue]);
            setInputValue('');
        }
    };

    const handleDelete = (index) => {
        const updatedList = [...inputList];
        updatedList.splice(index, 1);
        setInputList(updatedList);
    };
    const handleEdit = (index) => {
        setEditValue(inputList[index]);
        setEditIndex(index);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Mini project
                    </Typography>
                    <SearchWrapper>
                        <SearchIconWrapper>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="New Task"
                            inputProps={{ 'aria-label': 'search' }}
                            value={inputValue}
                            onChange={handleChange}
                        />
                    </SearchWrapper>
                    <AddIcon onClick={handleAdd} />
                </Toolbar>
            </AppBar>
            <div style={{

                marginLeft: "20px",
                backgroundColor: "hsl(240, 100%, 100%)",
            }}>
                {inputList.map((item, index) => (
                    <table
                        style={{
                            padding: '20px',
                            margin: 'auto',
                            marginTop: '20px',
                            textAlign: 'center',
                            borderCollapse: 'collapse',
                            border: '1px solid black',
                        }}
                        key={index}
                    >
                        <tr>
                            <td>
                                <Checkbox defaultChecked size="small" />
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    item
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <button
                                        onClick={handleAdd}
                                        style={{
                                            backgroundColor: '#008000',
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            style={{
                                                backgroundColor: '#008000',
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            style={{
                                                backgroundColor: '#FF0000',
                                                marginLeft: '30px',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    </table>
                ))}
            </div>
        </Box>


    );
}
