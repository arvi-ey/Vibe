-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
  uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  mobile VARCHAR(10),
  email TEXT ,
  password TEXT,
  school TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  cover_photo TEXT,
  bio TEXT,
  profession TEXT,
  gender TEXT,
  profile_image TEXT,
  image_public_id TEXT,
  dob DATE,
  cover_public_id TEXT,
  verified BOOLEAN,
  verificationcode TEXT,
  relationship_status TEXT
);

-- CREATE TYPE friendship_status AS ENUM ('not', 'sent', 'received');
create table friends (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
sender UUID,
receiver UUID,
status friendship_status,
foreign key (sender) references "user"(uid),
foreign key (receiver) references "user"(uid),
sent_time Text
);


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


create table comment (
comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
comenter UUID NOT NULL,
time TEXT NOT NULL,
post_id UUID NOT NULL,
comment_text TEXT NOT NULL,
foreign key (post_id) references post(postid),
foreign key (comenter) references "user"(uid)
);

CREATE TABLE reaction(
  reaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  time TEXT NOT NULL,
  foreign key (user_id) references "user"(uid),
  foreign key (post_id) references post(postid)
);



Create table story (
storyid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
uploader UUID not null,
image text,
caption text,
time text ,
foreign key (uploader) references "user" (uid)
)