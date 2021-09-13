import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Select, FormControl, Grid, MenuItem, Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import NavBar from './navbar';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        maxWidth: 1200,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        textAlign: 'right',
        color: theme.palette.text.secondary,
    },
}));

const getMenuItems = (products) => {
    return products.map(product => {
        return <MenuItem value={product.id}>{product.name}</MenuItem>
    })
}

function App() {

    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [type, setType] = useState('CARTON');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await fetch("http://localhost:8080/products/", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        var rows = [];
        data.map(product => {
            console.log(product);
            rows.push(product);
        });
        setProducts(rows);
    };

    const changeProduct = (event) => {
        setProductId(event.target.value);
    }

    const changeType = (event) => {
        setType(event.target.value);
    }

    const changQuantity = (event) => {
        setQuantity(event.target.value);
    }

    const calculatePrice = async (event) => {
        const response = await fetch("http://localhost:8080/products/pricing/calculate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "productId": productId,
                "quantity": quantity,
                "quantityType": type
            })
        });
        const data = await response.json();
        setPrice(data.price);
    }


    return (
        <div className="App">
            <NavBar/> <br/><br/><br/><br/><br/><br/>
            <Grid>
                <Paper className={classes.paper}>
                    <div>
                        <form noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4}>
                                    <FormControl>
                                        <Select onChange={changeProduct} className="dropdown"
                                                variant="outlined">
                                            {getMenuItems(products)}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={"auto"} sm={"auto"}>
                                    <TextField value={quantity} onChange={changQuantity} autoComplete="fname"
                                               name="Quantity" variant="outlined" required id="firstName"
                                               label="Quantity" autoFocus/>
                                </Grid>

                                <Grid item xs={"auto"} sm={"auto"}>
                                    <FormControl>
                                        <Select value={type} onChange={changeType} className="dropdown"
                                                variant="outlined">
                                            <MenuItem value="CARTON">CARTON</MenuItem>
                                            <MenuItem value="UNIT">UNIT</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {productId && quantity &&
                                <Button variant="contained" onClick={calculatePrice} color="primary"
                                        className={classes.submit}> Calculate </Button>}


                            </Grid>

                        </form>
                        <br/><br/>

                        <div align="center">
                            <Box width="25%" border={1}>
                                <br/>
                                {price}
                                <br/> <br/>
                            </Box>
                        </div>

                    </div>
                </Paper>
            </Grid>

        </div>
    );
}

export default App;
