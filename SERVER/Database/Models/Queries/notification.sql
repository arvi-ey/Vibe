create table notification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender UUID REFERENCES users(uid) ON DELETE CASCADE,
  receiver UUID REFERENCES users(uid) ON DELETE CASCADE,
  type TEXT,
  message TEXT,
  time TIMESTAMP DEFAULT now(),
  post UUID REFERENCES post(postId) ON DELETE CASCADE
);
