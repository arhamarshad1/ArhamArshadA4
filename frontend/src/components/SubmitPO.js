/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 3 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
import React, {useEffect, useState} from 'react';

function SubmitPO() {
    useEffect( () => {
        fetchItems();
    }, []);

    useEffect( () => {
        fetchClients();
    }, []);

    const [items, setItems] = useState([]);
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const data = await fetch('/validateClient');
        const clients = await data.json();
        setClients(clients);
    };
    const fetchItems = async () => {
        const data = await fetch('/getPartsWithLowestPrice');
        const items = await data.json();
        setItems(items);
    };
    const [number, setNumber] = useState(""); 
    const [quantity, setQuantity] = useState(""); 

    return(
        <section>  
            <div class="container-fluid">
                 <h1 class="mt-5">Submit a Purchase Order</h1>
                 <p>Please fill in the following information to submit a purchase order:</p>
                <form method="POST" action="http://localhost:4000/submitPO">
                    <div class="input-group justify-content-center">
                        {<div>
                            {clients.map((client) => (
                            <>
                                <label>Name:</label>
                                <input type="text" name="clientName" class="form-control" />
                                <br></br>
                                <label>Client ID:</label>
                                <input type="text" name="clientID" class="form-control" value={number} onChange={(e) => setNumber(e.target.value)}/>
                                {(number.toString() !== client.clientID939.toString() && number.toString() !== "") && (
                                    <>
                                        <p style={{ color: "red" }}>
                                            Error: {number} is not a valid clientID.
                                        </p>
                                        <br></br>
                                    </>
                                )}
                            </>
                            ))}
                            <label>Part:</label>&nbsp;<br></br>
                            <select name='partName' multiple style={{width: '300px', height: '150px', textAlign: 'center'}}>
                            {items.map(item => (        
                            <option>{item.partName939}</option>))}
                            </select><br></br>
                            <label>Requested Quantity:</label><input type="text" name="reqQuantity" class="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}/><br></br>
                            <label>Quantity in stock:</label>&nbsp;
                            {items.map(item => (        
                            <h6 style={{fontWeight: 'bold'}}>{item.partName939}- {item.QoH939} {item.Availability}</h6>))}
                            <br></br>
                            <label>Part Prices:</label>&nbsp;
                            {items.map(item => (        
                            <h6 style={{fontWeight: 'bold'}}>{item.partName939} - ${item.CurrentPrice}</h6>))}
                            <br></br>
                            <input type="submit" value="Submit" class="btn btn-primary mb-1" onClick={()=>{ alert('Purchase Order Successfully submitted'); }}/>
                        </div> }
                    </div>
                </form> 
            </div>
        </section>
    );
}

export default SubmitPO;