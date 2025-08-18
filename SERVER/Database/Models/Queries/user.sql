-- -- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
