CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL
);

CREATE TABLE retailers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE price_history (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id),
    retailer_id INT NOT NULL REFERENCES retailers(id),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX price_history_product_retailer_date_idx
    ON price_history (product_id, retailer_id, recorded_at DESC, id DESC);
