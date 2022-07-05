-- -----------------------------------------------------
-- Tables for Company Y
-- -----------------------------------------------------
USE aarshad;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aarshad
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `CompY_Client939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompY_Client939` (
  `clientID939` INT NOT NULL AUTO_INCREMENT,
  `clientName939` VARCHAR(45) NOT NULL,
  `clientCity939` VARCHAR(45) NULL,
  `clientCompPassword939` VARCHAR(45) NULL,
  `dollarsOnOrder939` DECIMAL(5,2) NULL,
  `moneyOwed939` DECIMAL(5,2) NULL,
  `clientStatus939` VARCHAR(45) NULL,
  PRIMARY KEY (`clientID939`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CompY_POs939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompY_POs939` (
  `poNumber939` INT NOT NULL AUTO_INCREMENT,
  `datePO939` DATE NOT NULL,
  `status939` VARCHAR(45) NULL,
  `quantity939` INT NOT NULL,
  `CompY_Client939_clientID939` INT NOT NULL,
  PRIMARY KEY (`poNumber939`),
  INDEX `fk_CompY_POs939_CompY_Client9391_idx` (`CompY_Client939_clientID939` ASC),
  CONSTRAINT `fk_CompY_POs939_CompY_Client9391`
    FOREIGN KEY (`CompY_Client939_clientID939`)
    REFERENCES `CompY_Client939` (`clientID939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CompY_Parts939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompY_Parts939` (
  `partNo939` INT NOT NULL AUTO_INCREMENT,
  `partName939` VARCHAR(45) NOT NULL,
  `partDescription939` VARCHAR(45) NULL,
  `currentPrice939` DECIMAL(5,2) NULL,
  `QoH939` INT NULL,
  PRIMARY KEY (`partNo939`),
  UNIQUE INDEX `partNo_UNIQUE` (`partNo939` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CompY_Lines939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompY_Lines939` (
  `lineNo939` INT NOT NULL AUTO_INCREMENT,
  `qty939` INT NOT NULL,
  `priceOrdered939` INT NOT NULL,
  `CompY_POs939_poNumber939` INT NOT NULL,
  `CompY_Parts939_partNo939` INT NOT NULL,
  PRIMARY KEY (`CompY_POs939_poNumber939`, `CompY_Parts939_partNo939`),
  UNIQUE INDEX `lineNo939_UNIQUE` (`lineNo939` ASC),
  INDEX `fk_CompY_Lines939_CompY_POs9391_idx` (`CompY_POs939_poNumber939` ASC),
  INDEX `fk_CompY_Lines939_CompY_Parts9391_idx` (`CompY_Parts939_partNo939` ASC),
  CONSTRAINT `fk_CompY_Lines939_CompY_POs9391`
    FOREIGN KEY (`CompY_POs939_poNumber939`)
    REFERENCES `CompY_POs939` (`poNumber939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CompY_Lines939_CompY_Parts9391`
    FOREIGN KEY (`CompY_Parts939_partNo939`)
    REFERENCES `CompY_Parts939` (`partNo939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;