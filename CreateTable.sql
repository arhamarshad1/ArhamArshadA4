USE aarshad;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aarshad
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `Client939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Client939` (
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
-- Table `PO's939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PO's939` (
  `poNumber939` INT NOT NULL AUTO_INCREMENT,
  `datePO939` DATE NOT NULL,
  `status939` VARCHAR(45) NULL,
  `Client939_clientID939` INT NOT NULL,
  `quantity939` INT NOT NULL,
  PRIMARY KEY (`poNumber939`),
  INDEX `fk_PO's939_Client939_idx` (`Client939_clientID939` ASC),
  CONSTRAINT `fk_PO's939_Client939`
    FOREIGN KEY (`Client939_clientID939`)
    REFERENCES `Client939` (`clientID939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Parts939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Parts939` (
  `partNo939` INT NOT NULL AUTO_INCREMENT,
  `partName939` VARCHAR(45) NOT NULL,
  `partDescription939` VARCHAR(45) NULL,
  `currentPrice939` DECIMAL(5,2) NULL,
  `QoH939` INT NULL,
  PRIMARY KEY (`partNo939`),
  UNIQUE INDEX `partNo_UNIQUE` (`partNo939` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Lines939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Lines939` (
  `PO's939_poNumber939` INT NOT NULL,
  `Parts939_partNo939` INT NOT NULL,
  `lineNo939` INT NOT NULL AUTO_INCREMENT,
  `qty939` INT NOT NULL,
  `priceOrdered939` INT NOT NULL,
  PRIMARY KEY (`PO's939_poNumber939`, `Parts939_partNo939`),
  INDEX `fk_PO's939_has_Parts939_Parts9391_idx` (`Parts939_partNo939` ASC),
  INDEX `fk_PO's939_has_Parts939_PO's9391_idx` (`PO's939_poNumber939` ASC),
  UNIQUE INDEX `lineNo939_UNIQUE` (`lineNo939` ASC),
  CONSTRAINT `fk_PO's939_has_Parts939_PO's9391`
    FOREIGN KEY (`PO's939_poNumber939`)
    REFERENCES `PO's939` (`poNumber939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PO's939_has_Parts939_Parts9391`
    FOREIGN KEY (`Parts939_partNo939`)
    REFERENCES `Parts939` (`partNo939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;