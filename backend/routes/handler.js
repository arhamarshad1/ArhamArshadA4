/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 3 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');

router.get('/getParts', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT partName939,partDescription939, QoH939, Availability, MIN(currentPrice939) AS 'CurrentPrice' FROM( SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 
                FROM CompX_Parts939 UNION SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompY_Parts939 ) as subQuery WHERE QoH939>0 GROUP BY partName939 ORDER BY partName939`;
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
            const qry = `SELECT partName939,partDescription939, QoH939, Availability, MIN(currentPrice939) AS 'CurrentPrice' FROM( SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 
                FROM CompX_Parts939 UNION SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompY_Parts939 ) as subQuery GROUP BY partName939 ORDER BY partName939`;
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
    const transactionIDforX = 1;
    const transactionIDforY = 2;
    const transactionIDforZ = 3;
    const clientID = req.body.clientID;
    const quantity = req.body.reqQuantity;
    const partName = req.body.partName;
    let getPO = 0;
    let getPartNo = 0;
    let poNumberX = 0;
    let getPartNoY = 0;
    let poNumberY = 0;

    pool.getConnection( (err, conn) => {
        if (err) throw err;
        //start all transactions
        try{
            conn.query("XA START " +"'"+transactionIDforZ+"'", (err, result) => {
                if (err) throw err;
                console.log('Transaction Z Started!');
            });
            const qry = `INSERT INTO CompZ_POs939 (datePO939, status939, CompZ_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',?,?)`;
            conn.query(qry, [clientID, quantity], (err, result) => {
            if (err) throw err;
            console.log('Transaction Query Successful for Z!');
        });
        //if query is successfull then END and PREPARE 
        conn.query("XA END " +"'"+transactionIDforZ+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Z Ended!');
        });
        conn.query("XA PREPARE " +"'"+transactionIDforZ+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Z Prepared!');
        });
        //commit
        conn.query("XA COMMIT " +"'"+transactionIDforZ+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Z COMMITTED!');
        });

        conn.query("XA START " +"'"+transactionIDforX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X Started!');
        });
        const qryx = `INSERT INTO CompX_POs939 (datePO939, status939, CompX_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',7,?)`;
        conn.query(qryx, [quantity], (err, result) => {
            if (err) throw err;
            console.log('Transaction Query Successful for X!');
        });
        conn.query("XA END " +"'"+transactionIDforX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X Ended!');
        });
        conn.query("XA PREPARE " +"'"+transactionIDforX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X Prepared!');
        });
        conn.query("XA COMMIT " +"'"+transactionIDforX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X COMMITTED!');
        });

        conn.query("XA START " +"'"+transactionIDforY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y Started!');
        });
    
        const qryY = `INSERT INTO CompY_POs939 (datePO939, status939, CompY_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',4,?)`;
        conn.query(qryY, [quantity], (err, result) => {
            if (err) throw err;
            console.log('Transaction Query Successful for Y!');
        });

        conn.query("XA END " +"'"+transactionIDforY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y Ended!');
        });
        conn.query("XA PREPARE " +"'"+transactionIDforY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y Prepared!');
        });

        conn.query("XA COMMIT " +"'"+transactionIDforY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y COMMITTED!');
        });
    }
    catch (err) {
        conn.query("XA ROLLBACK " +"'"+transactionIDforZ+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Z ABORTED!');
        });

        conn.query("XA ROLLBACK " +"'"+transactionIDforX+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction X ABORTED!');
        });

        conn.query("XA ROLLBACK " +"'"+transactionIDforY+"'", (err, result) => {
            if (err) throw err;
            console.log('Transaction Y ABORTED!');
        });
        console.log(err);
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
    });


module.exports = router;