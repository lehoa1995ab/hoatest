import React, { useState, useReducer } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];
        case 'DELETE':
            return state.filter((_, index) => index !== action.payload);
        case 'EDIT':
            return state.map((item, index) => {
                if (index === action.payload.index) {
                    return action.payload.value;
                }
                return item;
            });
        default:
            return state;
    }
};

export default function Appbar1() {
    const [inputValue, setInputValue] = useState('');
    const [inputList, dispatch] = useReducer(reducer, []);
    const [editValue, setEditValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (index) => {
        dispatch({ payload: { value: !inputList[index].checked } })
      };

    const handleChange = (e) => {
        if (editIndex !== null) {
            setEditValue(e.target.value);
        } else {
            setInputValue(e.target.value);
        }
    };

    const handleAdd = () => {
        if (editIndex !== null) {
            dispatch({ type: 'EDIT', payload: {  value: editValue } });
            setEditValue('');
            setEditIndex(null);
        } else {
            dispatch({ type: 'ADD', payload: inputValue });
            setInputValue('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(inputList[index]);
    };

    const handleDelete = (index) => {
        dispatch({ type: 'DELETE', payload: index });
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
                backgroundColor: "",
            }}>
                <table
                    style={{
                        padding: '20px',
                        margin: 'auto',
                        marginTop: '20px',
                        textAlign: 'center',
                        borderCollapse: 'collapse',
                        borderBottom: "1px solid",
                    }}
                >
                    {inputList.map((item, index) => (
                        <tbody>
                            <tr
                                style={{
                                    borderTop: "1px solid",

                                }}
                            >
                                <td>
                                    <Checkbox 
                                    defaultChecked={item.checked}
                                    size="small"
                                    checked={item.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                     />
                                </td>
                                <td>
                                    {editIndex === index ? (
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            style={{ width: "100px" ,
                                        }}
                                        />
                                    ) : (
                                        <del 
                                        style={{ textDecoration: checked ? 'line-through' : 'none'}}
                                        >{item}</del>
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
                        </tbody>

                    ))}
                </table>
            </div>
        </Box>


    );
}

