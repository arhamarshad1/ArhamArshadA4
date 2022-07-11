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
            const qry = `SELECT partName939,partDescription939, Availability, MIN(currentPrice939) AS 'CurrentPrice'
            FROM(
               SELECT partName939,partDescription939,Availability,currentPrice939 FROM CompX_Parts939 UNION SELECT partName939,partDescription939,Availability,currentPrice939 FROM CompY_Parts939
            ) as subQuery
            GROUP BY partName939
            ORDER BY partName939;`;
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
// router.get('/getPO', async (req, res) => {
//     pool.getConnection( (err, conn) => {
//         if (err) throw err;

//         try {
//             const qry = `SELECT * FROM \`PO's939\``;
//             conn.query(qry, (err, result) => {
//                 conn.release();
//                 if (err) throw err;
//                 res.send(JSON.stringify(result));
//             });
//         } catch (err) {
//             console.log(err);
//             res.end();
//         }
//     });
// });
// router.get('/listPoWithLines', async (req, res) => {
//     pool.getConnection( (err, conn) => {
//         if (err) throw err;

//         try {
//             const qry = `SELECT * FROM \`PO's939\` JOIN Lines939 ON poNumber939 = \`PO's939_poNumber939\` JOIN Parts939 ON Parts939_partNo939 = partNo939`;
//             conn.query(qry, (err, result) => {
//                 conn.release();
//                 if (err) throw err;
//                 res.send(JSON.stringify(result));
//             });
//         } catch (err) {
//             console.log(err);
//             res.end();
//         }
//     });
// });

router.post('/submitPO', async (req, res) => {
    const clientID = req.body.clientID;
    const quantity = req.body.reqQuantity;
    const partName = req.body.partName;
    let getPO = 0;
    let getPartNo = 0;
    console.log(partName[1]);

    pool.getConnection( (err, conn) => {
        if (err) throw err;

        const qry = `INSERT INTO \`POs939\`(datePO939, status939, Client939_clientID939, quantity939) VALUES(NOW(),'Processing',?,?)`;
        conn.query(qry, [clientID, quantity], (err, result) => {
            if (err) throw err;
            alert('Verififed!');
        });

        const qry2 = `SELECT poNumber939 FROM \`POs939\` WHERE Client939_clientID939 =`+clientID;
        conn.query(qry2, (err, result1) => {
            if (err) alert("ClientID is invalid");
            getPO = JSON.stringify(result1);
            console.log(err);
            JSON.parse(getPO).forEach(element => {
            
            //start
            for(var i =0; i<partName.length;i++){
            const qry3 = `SELECT partNo939 FROM Parts939 WHERE partName939 =` + "'" + partName[i] + "'";
            conn.query(qry3, (err, result2) => {
            if (err) throw err;
            getPartNo = JSON.stringify(result2);
            
            JSON.parse(getPartNo).forEach(item => {
            const qry4 = `INSERT INTO Lines939 (\`PO's939_poNumber939\`, Parts939_partNo939, qty939, priceOrdered939) VALUES(?, ?, ?, 19.99)`;
            conn.query(qry4, [element.poNumber939, item.partNo939, quantity], (err, result3) => {

            if (err) throw err;
            console.log('Purchase Order Submitted!');
        });
        });
        });
    }
        //end
            });
            conn.release();
        });

        res.redirect('http://localhost:3000/ListPO');
        res.end();
    });
});

module.exports = router;