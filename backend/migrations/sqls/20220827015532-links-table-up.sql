CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    whatsapp VARCHAR(255),
    telegram VARCHAR(255),
    user_id BIGINT REFERENCES person(id)
);