CREATE TABLE bike(
    id SERIAL PRIMARY key,
    name VARCHAR (255),
    type VARCHAR (255),
    rent BOOLEAN,
    price NUMERIC,
    rentdate TIMESTAMP
) 