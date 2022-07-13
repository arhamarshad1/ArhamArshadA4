/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 2 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
import React, {useEffect, useState} from 'react';

function ListPO() {
        useEffect( () => {
             fetchItems();
         }, []);

         const [items, setItems] = useState([]);
         const fetchItems = async () => {
              const data = await fetch('/getPO');
              const items = await data.json();
              setItems(items);
          };
          const [search, setSearch] = useState([]);
    return(
        <section> 
            <div class="container-fluid">
                 <h1 class="mt-5">List Purchase Orders</h1>
                 <p>Please enter you ClientID to list a purchase order</p>
                <form>
                    <div class="input-group justify-content-center">
                        {<div class="input-group-prepend">
                            <input type="text" name="purchaseOrder" class="form-control" onChange={(e)=>setSearch(e.target.value)}/>
                        </div> }
                    </div>
                </form> 
                <br></br>
                {items.filter(item=>item.CompX_Client939_clientID939.toString() === (search||'')).map(item => (
                     <div class="column padding">
                         <div class="alert alert-info rounded-pill" style={{backgroundColor: 'lightgrey'}}>
                             <h5>Client ID Number:</h5><i>{item.CompX_Client939_clientID939} </i><br></br>
                             <h5>Purchase Order Number:</h5><i>{item.poNumber939} </i><br></br>
                             <h5>Purchase Order Date:</h5><i>{item.datePO939}</i><br></br>
                             <h5>Status of Purchase Order:</h5><i>{item.status939}</i><br></br>
                             <h5>Requested Quantity:</h5><i>{item.quantity939}</i><br></br>
                             </div>
                         </div>   
                 ))
                }
            </div>
        </section>
    );
}

export default ListPO;