CREATE TABLE post (
    postId UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    caption TEXT,
    image TEXT,
	image_public_id TEXT,
    type TEXT NOT NULL,
    time TEXT NOT NULL,
    userId UUID NOT NULL,
    FOREIGN KEY (userId)
    REFERENCES "user"(uid)
    ON DELETE CASCADE
);  