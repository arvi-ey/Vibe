CREATE TABLE reaction(
  reaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL,
  user_id UUID NOT NULL,
  time TEXT NOT NULL,
  foreign key (user_id) references "user"(uid),
  foreign key (post_id) references post(postid)
);

