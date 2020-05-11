CREATE TABLE IF NOT EXISTS `users` (
  id_user int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  pass varchar(255) NOT NULL,
  firstname varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  birthDate date,
  email varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
