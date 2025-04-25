CREATE TABLE users (
    id serial PRIMARY KEY,
    firstname text,
    role text,
    avatar text,
    email text,
    password text
);

CREATE TABLE addresses (
    id serial PRIMARY KEY,
    street text,
    housenumber text,
    additionalinfo text
);

CREATE TABLE categories (
    id serial PRIMARY KEY,
    categoryname text,
    description text,
    parentcategoryid integer REFERENCES categories(id)
);

CREATE TABLE manufacturers (
    id serial PRIMARY KEY,
    name text,
    description text,
    contactinfo text,
    address integer REFERENCES addresses(id)
);

CREATE TABLE branches (
    id serial PRIMARY KEY,
    addressid integer REFERENCES addresses(id),
    rating numeric(3,2),
    workinghours text
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    name text,
    description text,
    image text,
    quantity integer,
    price numeric(10,2),
    categoryid integer REFERENCES categories(id),
    manufacturerid integer REFERENCES manufacturers(id)
);

CREATE TABLE purchases (
    id serial PRIMARY KEY,
    userid integer REFERENCES users(id),
    price numeric(10,2),
    purchasedate timestamp with time zone,
    paymentstatus text,
    status text
);

CREATE TABLE order_items (
    id serial PRIMARY KEY,
    purchaseid integer REFERENCES purchases(id),
    productid integer REFERENCES products(id),
    quantity integer,
    price numeric(10,2)
);

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    productid integer REFERENCES products(id),
    userid integer REFERENCES users(id),
    reviewtext text,
    rating integer,
    reviewdate timestamp with time zone
);

CREATE TABLE cart_items (
    id serial PRIMARY KEY,
    userid integer REFERENCES users(id),
    productid integer REFERENCES products(id),
    quantity integer,
    added_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);