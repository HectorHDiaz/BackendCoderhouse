CREATE TABLE mascota(
    id INT,
    nombre VARCHAR(20),
    especie VARCHAR(20),
    edad INT
);
INSERT INTO `mascota` (`id`,`nombre`,`especie`,`edad`) 
VALUES (1,'Patita','Perro',7);
INSERT INTO `mascota` (`id`,`nombre`,`especie`,`edad`) 
VALUES (1,'Matute','Gato',5);

SELECT * FROM mascota;

SELECT * FROM mascota 
WHERE especie = 'Gato';

UPDATE mascota SET id=2 
WHERE nombre = 'Matute';

DELETE FROM mascota
WHERE id=1;