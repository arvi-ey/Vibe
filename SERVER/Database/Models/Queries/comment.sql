create table comment (
comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
comenter UUID NOT NULL,
time TEXT NOT NULL,
post_id UUID NOT NULL,
comment_text TEXT NOT NULL,
foreign key (post_id) references post(postid),
foreign key (comenter) references "user"(uid)
);