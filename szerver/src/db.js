import { Sequelize } from "sequelize";

export default new Sequelize(
    "speedformula",  
    "Speedformula",  
    "Speedformula123",  
    {
        host: "localhost", 
        dialect: "mariadb",
        port:3306
    }
);
/*
CREATE USER 'Speedformula'@'localhost' IDENTIFIED BY 'Speedformula123';
GRANT ALL PRIVILEGES ON Speedformula.* TO 'Speedformula'@'localhost';
FLUSH PRIVILEGES;
*/ 