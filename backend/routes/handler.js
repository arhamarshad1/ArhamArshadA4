/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 4 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');
const transactionID = 2;

router.get('/getParts', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT partName939,partDescription939, QoH939, Availability, MIN(currentPrice939) AS 'CurrentPrice' 
            FROM( SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompX_Parts939 
                UNION SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompY_Parts939 ) 
                as subQuery WHERE QoH939>0 GROUP BY partName939 ORDER BY partName939`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});
router.get('/getPartsWithLowestPrice', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT partName939,partDescription939, QoH939, Availability, MIN(currentPrice939) AS 'CurrentPrice' 
            FROM( SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 
            FROM CompX_Parts939 UNION SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompY_Parts939 ) 
            as subQuery GROUP BY partName939 ORDER BY partName939`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});
router.get('/validateClient', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT * FROM CompZ_Client939;`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});
router.get('/getPO', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT * FROM CompX_POs939 UNION SELECT * FROM CompY_POs939 UNION SELECT * FROM CompZ_POs939`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});
router.get('/listPoWithLines', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT * FROM (CompX_POs939 JOIN CompX_Lines939 ON poNumber939 = CompX_POs939_poNumber939 JOIN CompX_Parts939 ON partNo939 = CompX_Parts939_partNo939) UNION SELECT * FROM (CompY_POs939 JOIN CompY_Lines939 ON poNumber939 = CompY_POs939_poNumber939 JOIN CompY_Parts939 ON partNo939 = CompY_Parts939_partNo939)`;
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
});

router.post('/submitPO', async (req, res) => {
    const clientID = req.body.clientID;
    const quantity = req.body.reqQuantity;
    const partName = req.body.partName;
    let getPO = 0;
    let getPartNo = 0;
    let poNumberX = 0;
    let getPartNoY = 0;
    let poNumberY = 0;
    let success  = false; //keep track of XA's
    pool.getConnection( (err, conn) => {
        if (err) throw err;
        try{      
            //start transaction Z
            conn.query("XA START " +"'"+transactionID+"'", (err, result) => {
                if (err) throw err;
                console.log('Transaction Z Started!');
            });     
            
            //query transaction Z
            const qry = `INSERT INTO CompZ_POs939 (datePO939, status939, CompZ_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',?,?)`;
            conn.query(qry, [clientID, quantity], (err, result) => {
            if (err) throw err;
            console.log('Transaction Query Successful for Z!');
            });
            //if query was successfull send message to start XA for X and Y
            if(result = true){
            //start X    
            conn.query("XA START " +"'"+transactionID+"'", (err) => {
            if (err) throw err;
            console.log('Transaction X Started!');
            });
            const qryx = `INSERT INTO CompX_POs939 (datePO939, status939, CompX_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',7,?)`;
            conn.query(qryx, [quantity], (err) => {
                if (err) throw err;
                console.log('Transaction Query Successful for X!');
            });
            conn.query("XA END " +"'"+transactionID+"'", (err) => {
                if (err) throw err;
                console.log('Transaction X Ended!');
            });
            conn.query("XA PREPARE " +"'"+transactionID+"'", (err) => {
                if (err) throw err;
                console.log('Transaction X Prepared!');
            });
            //commit X
            conn.query("XA COMMIT " +"'"+transactionID+"'", (err, CompX) => {
                if (err) throw err;
                console.log('Transaction X COMMITTED!');
            });

            //Send Begin XA for Company Y
            if(CompX = true){
            conn.query("XA START " +"'"+transactionID+"'", (err) => {
                if (err) throw err;
                console.log('Transaction Y Started!');
                });
                const qryy = `INSERT INTO CompY_POs939 (datePO939, status939, CompY_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',4,?)`;
                conn.query(qryy, [quantity], (err) => {
                    if (err) throw err;
                    console.log('Transaction Query Successful for Y!');
                });
                conn.query("XA END " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Y Ended!');
                });
                conn.query("XA PREPARE " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Y Prepared!');
                });
                conn.query("XA COMMIT " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Y COMMITTED!');
                });
             }
            }
            success = true;
            //if X AND Y were success then query and commit Z
            if(success = true){
                conn.query("XA END " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Z Ended!');
                });
                conn.query("XA PREPARE " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Z Prepared!');
                });
                
                conn.query("XA COMMIT " +"'"+transactionID+"'", (err) => {
                    if (err) throw err;
                    console.log('Transaction Z COMMITTED!');
            
                });
            }       
    }
    //if any error caught, ABORT all transactions
    catch (err) {
        conn.query("XA ROLLBACK " +"'"+transactionID+"'", (err) => {
            if (err) throw err;
            console.log('Transaction Z ABORTED!');
        });
        conn.query("XA ROLLBACK " +"'"+transactionIDX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X ABORTED!');
        });
        conn.query("XA ROLLBACK " +"'"+transactionIDY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y ABORTED!');
        });
    }
            const qry2 = `SELECT poNumber939 FROM CompZ_POs939 WHERE CompZ_Client939_clientID939 =`+clientID;
            conn.query(qry2, (err, result1) => {
            if (err) throw err;
            getPO = JSON.stringify(result1);
            JSON.parse(getPO).forEach(element => {
            const qry4 = `INSERT INTO CompZ_Lines939 (CompZ_POs939_poNumber939, qty939, priceOrdered939) VALUES(?, ?, 19.99)`;
            conn.query(qry4, [element.poNumber939, quantity], (err, result4) => {
            if (err) throw err;   
    }
        //end         
        )});
        });
        conn.release();
    });
        res.redirect('http://localhost:3000/ListPO');
        res.end();
    })

module.exports = router;