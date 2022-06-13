/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 2 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
import React, {useEffect, useState} from 'react';
function ListLines() {
        useEffect( () => {
             fetchItems();
         }, []);

         const [items, setItems] = useState([]);
         const fetchItems = async () => {
              const data = await fetch('/listPoWithLines');
              const items = await data.json();
              setItems(items);
          };
          const [search, setSearch] = useState([]);
    return(
        <section> 
            <div class="container-fluid">
                 <h1 class="mt-5">List Lines of a Purchase Order</h1>
                 <p>Please enter your given Purchase Order number</p>
                <form>
                    <div class="input-group justify-content-center">
                        {<div class="input-group-prepend">
                            <input type="text" name="linesOfPO" class="form-control" onChange={(e)=>setSearch(e.target.value)}/>
                        </div> }
                    </div>
                </form> 
                <br></br>
                {items.filter(item=>item.poNumber939.toString() === (search||'')).map(item => (
                     <div class="column padding">
                         <div class="alert alert-info rounded-pill" style={{backgroundColor: 'lightgrey'}}>
                             <h5>Purchase Order Number:</h5><i>{item.poNumber939} </i><br></br>
                             <h5>Purchase Order Date:</h5><i>{item.datePO939}</i><br></br>
                             <h5>Status of Purchase Order:</h5><i>{item.status939}</i><br></br>
                             <h5>Line Number:</h5><i>{item.lineNo939}</i><br></br>
                             <h5>Requested Quantity:</h5><i>{item.quantity939}</i><br></br>
                             <h5>Part Name:</h5><i>{item.partName939}</i><br></br>
                             <h5>Part Description:</h5><i>{item.partDescription939}</i><br></br>
                             <h5>Price Ordered:</h5><i>${item.priceOrdered939}</i><br></br>
                             </div>
                         </div>   
                 ))
                }
            </div>
        </section>
    );
}

export default ListLines;