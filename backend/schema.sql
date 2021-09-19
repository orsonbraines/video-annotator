CREATE TABLE video(
    id SERIAL PRIMARY KEY,
    video_url VARCHAR(1000) NOT NULL, 
    video_name VARCHAR(100) NOT NULL,
    video_length INT,
    thumbnail_url VARCHAR(1000)
);

CREATE TABLE annotation(
    id SERIAL PRIMARY KEY,
    video_id INT REFERENCES video,
    ts INT NOT NULL,
    msg VARCHAR(1000) NOT NULL
);

CREATE TABLE transcript(
    id SERIAL PRIMARY KEY,
    video_id INT REFERENCES video,
    ts INT NOT NULL,
    txt VARCHAR(1000) NOT NULL
);
