USE aarshad;
#Theses insert statements add sample content to the Client DB
INSERT INTO `CompY_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('Arham Arshad', 'Halifax', '********', '20.00', '0.00', 'Processing');

INSERT INTO `CompY_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('Jane Doe', 'Toronto', '********', '20.00', '0.00', 'Processing');

INSERT INTO `CompY_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('Jake Johnson', 'Vancouver', '********', '5.00', '0.00', 'Processing');

#Theses insert statements add sample content to the Parts DB
INSERT INTO `CompY_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Air filter', 'Lorem ipsum dolor sit amet.', '5.60', '30');

INSERT INTO `CompY_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Gear Leaver', 'Lorem ipsum dolor sit amet. ', '14.99', '6');

INSERT INTO `CompY_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Headlights', 'Lorem ipsum dolor sit amet. ', '37.99', '15');

INSERT INTO `CompY_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Radiator', 'Lorem ipsum dolor sit amet.', '10.50', '8');

#Theses insert statements add sample content to the PO's DB
INSERT INTO `CompY_POs939` (`datePO939`, `status939`, `CompY_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/19', 'Processing', '1', '5');

INSERT INTO `CompY_POs939` (`datePO939`, `status939`, `CompY_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/20', 'Processing', '1', '3');

INSERT INTO `CompY_POs939` (`datePO939`, `status939`, `CompY_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/18', 'Processing', '1', '8');