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