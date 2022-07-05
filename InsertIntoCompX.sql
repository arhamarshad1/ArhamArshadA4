USE aarshad;
#Theses insert statements add sample content to the Client DB
INSERT INTO `CompX_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('John Doe', 'Halifax', '********', '10.00', '0.00', 'Processing');

INSERT INTO `CompX_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('Jane Doe', 'Toronto', '********', '20.00', '0.00', 'Processing');

INSERT INTO `CompX_Client939` (`clientName939`, `clientCity939`, `clientCompPassword939`, `dollarsOnOrder939`, `moneyOwed939`, `clientStatus939`) 
VALUES ('Alex Johnson', 'Calgary', '********', '5.00', '0.00', 'Processing');

#Theses insert statements add sample content to the Parts DB
INSERT INTO `CompX_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Air filter', 'Lorem ipsum dolor sit amet.', '5.60', '10');

INSERT INTO `CompX_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Muffler', 'Lorem ipsum dolor sit amet. ', '14.99', '5');

INSERT INTO `CompX_Parts939` (`partName939`, `partDescription939`, `currentPrice939`, `QoH939`)
VALUES ('Radiator', 'Lorem ipsum dolor sit amet.', '10.50', '8');

#Theses insert statements add sample content to the PO's DB
INSERT INTO `CompX_POs939` (`datePO939`, `status939`, `CompX_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/19', 'Processing', '1', '5');

INSERT INTO `CompX_POs939` (`datePO939`, `status939`, `CompX_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/20', 'Processing', '1', '3');

INSERT INTO `CompX_POs939` (`datePO939`, `status939`, `CompX_Client939_clientID939`, `quantity939`) 
VALUES ('2022/05/18', 'Processing', '1', '8');