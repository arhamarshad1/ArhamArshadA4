/*
ARHAM ARSHAD
B00768939
CSCI 4140 - Assignment 3 

Code adapted from: https://github.com/codrkai/node_react_mysql_db_tutorial
*/
const express = require('express');
const router = express.Router();
const pool =  require('../config/db.js');

router.get('/getParts', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT partName939,partDescription939,currentPrice939 FROM CompX_Parts939 UNION SELECT partName939,partDescription939,currentPrice939 FROM CompY_Parts939`;
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
            const qry = `SELECT partName939,partDescription939, QoH939, Availability, MIN(currentPrice939) AS 'CurrentPrice' FROM( SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompX_Parts939 UNION SELECT partName939,partDescription939, QoH939, Availability,currentPrice939 FROM CompY_Parts939 ) as subQuery GROUP BY partName939 ORDER BY partName939`;
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

    pool.getConnection( (err, conn) => {
        if (err) throw err;

        const qry = `INSERT INTO CompZ_POs939 (datePO939, status939, CompZ_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',?,?)`;
        conn.query(qry, [clientID, quantity], (err, result) => {
            if (err) throw err;
            console.log('Verififed!');
        });
        const qryx = `INSERT INTO CompX_POs939 (datePO939, status939, CompX_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',7,?)`;
        conn.query(qryx, [quantity], (err, result) => {
            if (err) throw err;
            console.log('Verififed!');
        });

        const qryY = `INSERT INTO CompY_POs939 (datePO939, status939, CompY_Client939_clientID939, quantity939) VALUES(NOW(),'Processing',4,?)`;
        conn.query(qryY, [quantity], (err, result) => {
            if (err) throw err;
            console.log('Verififed!');
        });
            //handle lines for Company X and check if part exists
            JSON.parse(JSON.stringify(partName)).forEach(part => {
            const partNumberX = `SELECT partNo939 FROM CompX_Parts939 WHERE partName939 =`+"'"+part+"'";
            conn.query(partNumberX, (err, result2) => { //one
                if (err) throw err;
                getPartNo = JSON.stringify(result2);
                JSON.parse(getPartNo).forEach(number => { //two
                const qryPOnumX = `SELECT poNumber939 FROM CompX_POs939 WHERE CompX_Client939_clientID939 = 7`;
                conn.query(qryPOnumX, (err, result4) => { //three
                    if (err) throw err;
                    poNumberX = JSON.stringify(result4);
                    JSON.parse(poNumberX).forEach(poX => { //four
                        const checkPart = `INSERT INTO CompX_Lines939(qty939,CompX_POs939_poNumber939,CompX_Parts939_partNo939) VALUES(?, ?, ?)`;
                        conn.query(checkPart, [quantity,poX.poNumber939,number.partNo939], (err, result3) => { //five
                        if (err) throw err;
                })
            })
        })     
        //end    
        //insert into copany Y 
        const partNumberY = `SELECT partNo939 FROM CompY_Parts939 WHERE partName939 =`+"'"+part+"'";
        conn.query(partNumberY, (err, result2) => { //one
            if (err) throw err;
            getPartNoY = JSON.stringify(result2);
            JSON.parse(getPartNo).forEach(number => { //two
            const qryPOnumY = `SELECT poNumber939 FROM CompY_POs939 WHERE CompY_Client939_clientID939 = 7`;
            conn.query(qryPOnumY, (err, result4) => { //three
                if (err) throw err;
                poNumberY = JSON.stringify(result4);
                JSON.parse(poNumberY).forEach(poY => { //four
                    const checkPartY = `INSERT INTO CompY_Lines939(qty939,CompY_POs939_poNumber939,CompY_Parts939_partNo939) VALUES(?, ?, ?)`;
                    conn.query(checkPartY, [quantity,poY.poNumber939,number.partNo939], (err, result3) => { //five
                    if (err) throw err;
            }) 
        }) 
    }) 
}) 
})   
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
});
});
            
        });
        conn.release();
    });

        res.redirect('http://localhost:3000/ListPO');
        res.end();
    });


module.exports = router;