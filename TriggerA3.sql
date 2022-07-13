USE aarshad;
DELIMITER %%
CREATE PROCEDURE updateMoneyOwed(IN clientID int(11))
BEGIN
	UPDATE Client939 c, Parts939 p, `PO's939` d
	SET moneyOwed939 = c.moneyOwed939 + (d.quantity939 * p.currentPrice939)
    WHERE c.clientID939 = clientID;
END %%
DELIMITER ;

DELIMITER $$
CREATE TRIGGER afterInsertPurchaseOrder
AFTER INSERT on `PO's939`
FOR EACH ROW
BEGIN 
	CALL updateMoneyOwed(NEW.Client939_clientID939);
    #CALL updateQuantity(NEW.poNumber939);
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER createTempClientforX
AFTER INSERT on `CompZ_POs939`
FOR EACH ROW
BEGIN 
	UPDATE CompX_POs939
    SET clientStatus939 = 'External Client'
    WHERE clientName939 LIKE '%Company Z%';
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER createTempClientforY
AFTER INSERT on `CompZ_POs939`
FOR EACH ROW
BEGIN 
	INSERT INTO CompY_Client939(clientName939,dollarsOnOrder939,moneyOwed939, clientStatus939) 
    VALUES('Company Z',0.00,0.00,'External Client');
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER createLinesForX
AFTER INSERT on `CompX_POs939`
FOR EACH ROW
BEGIN 
	INSERT INTO CompX_Lines939(qty939,priceOrdered939,CompX_POs939_poNumber939, CompX_Parts939_partNo939) 
    VALUES('Company Z',0.00,0.00,'External Client');
END $$
DELIMITER ;
