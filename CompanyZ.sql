-- MySQL Workbench Forward Engineering
USE aarshad;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aarshad
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aarshad
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aarshad` DEFAULT CHARACTER SET utf8 ;
USE `aarshad` ;

-- -----------------------------------------------------
-- Table `aarshad`.`CompZ_Client939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aarshad`.`CompZ_Client939` (
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
-- Table `aarshad`.`CompZ_POs939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aarshad`.`CompZ_POs939` (
  `poNumber939` INT NOT NULL AUTO_INCREMENT,
  `datePO939` DATE NOT NULL,
  `status939` VARCHAR(45) NULL,
  `quantity939` INT NOT NULL,
  `CompZ_Client939_clientID939` INT NOT NULL,
  PRIMARY KEY (`poNumber939`),
  INDEX `fk_CompZ_POs939_CompZ_Client9391_idx` (`CompZ_Client939_clientID939` ASC),
  CONSTRAINT `fk_CompZ_POs939_CompZ_Client9391`
    FOREIGN KEY (`CompZ_Client939_clientID939`)
    REFERENCES `aarshad`.`CompZ_Client939` (`clientID939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aarshad`.`CompZ_Lines939`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aarshad`.`CompZ_Lines939` (
  `lineNo939` INT NOT NULL AUTO_INCREMENT,
  `qty939` INT NOT NULL,
  `priceOrdered939` INT NOT NULL,
  `CompZ_POs939_poNumber939` INT NOT NULL,
  PRIMARY KEY (`CompZ_POs939_poNumber939`),
  UNIQUE INDEX `lineNo939_UNIQUE` (`lineNo939` ASC),
  INDEX `fk_CompZ_Lines939_CompZ_POs9391_idx` (`CompZ_POs939_poNumber939` ASC),
  CONSTRAINT `fk_CompZ_Lines939_CompZ_POs9391`
    FOREIGN KEY (`CompZ_POs939_poNumber939`)
    REFERENCES `aarshad`.`CompZ_POs939` (`poNumber939`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;