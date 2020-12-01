CREATE SCHEMA IF NOT EXISTS `Academy`;

CREATE TABLE IF NOT EXISTS `Academy`.`Student`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      `studentAlias` VARCHAR(5) NOT NULL,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `student_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Academy`.`Subject`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
      `subjectAlias` VARCHAR(3) NOT NULL ,
      `semester` INT(1) NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `subject_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Academy`.`Grade`
    ( `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `grade` INT NOT NULL ,
      `date` DATE NOT NULL ,
      `student_id` INT UNSIGNED NOT NULL ,
      `subject_id` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`_id`),
      UNIQUE INDEX `grade_id_UNIQUE` (`_id` ASC),
      CONSTRAINT `student_fk` FOREIGN KEY (`student_id`) REFERENCES `Academy`.`Student` (`_id`),
      CONSTRAINT `subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `Academy`.`Subject` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `Academy`.`Student` (`_id`, `firstName`, `lastName`, `email`, `studentAlias`) VALUES
  (1, 'Jan', 'Kowalski', 'jan.kowalski@acme.com','s1234'),
  (2, 'Adam', 'Zieliński', 'adam.zielinski@acme.com','s8273'),
  (3, 'Marian', 'Nowak', 'marian.nowak@acme.com','s7261')
;

INSERT IGNORE INTO `Academy`.`Subject` (`_id`, `name`, `subjectAlias`, `semester`) VALUES
  (1, 'Programowanie', 'PPR', 1),
  (2, 'Technika i Architekrura Komputerów', 'TAK', 1),
  (3, 'Matematyka Dyskretna', 'MAD', 1)
;

INSERT IGNORE INTO `Academy`.`Grade` (`_id`, `student_id`, `subject_id`, `grade`, `date`) VALUES
  (1, 1, 3, 4, '2020-11-20'),
  (2, 2, 1, 3, '2020-11-20'),
  (3, 3, 2, 2, '2020-11-20')
;