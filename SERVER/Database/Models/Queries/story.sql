Create table story (
storyid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
uploader UUID not null,
image text,
caption text,
time text ,
foreign key (uploader) references "user" (uid)
)

Create table storyView (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
storyid UUID not null,
viewer UUID ,
foreign key (storyid) references story(storyid),
foreign key (viewer) references "user"(uid)
)