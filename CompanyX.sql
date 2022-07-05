-- MySQL Workbench Forward Engineering
Use aarshad;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aarshad
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `CompX_Client939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompX_Client939` (
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
-- Table `CompX_POs939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompX_POs939` (
  `poNumber939` INT NOT NULL AUTO_INCREMENT,
  `datePO939` DATE NOT NULL,
  `status939` VARCHAR(45) NULL,
  `quantity939` INT NOT NULL,
  `CompX_Client939_clientID939` INT NOT NULL,
  PRIMARY KEY (`poNumber939`),
  INDEX `fk_CompX_POs939_CompX_Client9391_idx` (`CompX_Client939_clientID939` ASC),
  CONSTRAINT `fk_CompX_POs939_CompX_Client9391`
    FOREIGN KEY (`CompX_Client939_clientID939`)
    REFERENCES `CompX_Client939` (`clientID939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CompX_Parts939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompX_Parts939` (
  `partNo939` INT NOT NULL AUTO_INCREMENT,
  `partName939` VARCHAR(45) NOT NULL,
  `partDescription939` VARCHAR(45) NULL,
  `currentPrice939` DECIMAL(5,2) NULL,
  `QoH939` INT NULL,
  PRIMARY KEY (`partNo939`),
  UNIQUE INDEX `partNo_UNIQUE` (`partNo939` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CompX_Lines939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CompX_Lines939` (
  `lineNo939` INT NOT NULL AUTO_INCREMENT,
  `qty939` INT NOT NULL,
  `priceOrdered939` INT NOT NULL,
  `CompX_POs939_poNumber939` INT NOT NULL,
  `CompX_Parts939_partNo939` INT NOT NULL,
  PRIMARY KEY (`CompX_POs939_poNumber939`, `CompX_Parts939_partNo939`),
  UNIQUE INDEX `lineNo939_UNIQUE` (`lineNo939` ASC),
  INDEX `fk_CompX_Lines939_CompX_POs9391_idx` (`CompX_POs939_poNumber939` ASC),
  INDEX `fk_CompX_Lines939_CompX_Parts9391_idx` (`CompX_Parts939_partNo939` ASC),
  CONSTRAINT `fk_CompX_Lines939_CompX_POs9391`
    FOREIGN KEY (`CompX_POs939_poNumber939`)
    REFERENCES `CompX_POs939` (`poNumber939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CompX_Lines939_CompX_Parts9391`
    FOREIGN KEY (`CompX_Parts939_partNo939`)
    REFERENCES `CompX_Parts939` (`partNo939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
