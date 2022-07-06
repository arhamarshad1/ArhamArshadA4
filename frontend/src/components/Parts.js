/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 3 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
import React, {useEffect, useState} from 'react';

function Parts() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/getParts');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
            <div class="container-fluid">
                <h2>Parts Available</h2>
                {
                items.map(item => (
                    <div class="column padding">
                        <div class="alert alert-info rounded-pill">
                            <h5>Part Name:</h5><i>{item.partName939}</i><br></br>
                            <h5>Part Description:</h5><i> {item.partDescription939}</i><br></br>
                            <h5>Part Price:</h5><i>${item.currentPrice939}</i>
                            </div>
                        </div>   
                ))
                }
            </div>
        </section>
    );
}

export default Parts;