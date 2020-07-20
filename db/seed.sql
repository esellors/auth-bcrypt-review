drop table if exists puppygram_puppy;
drop table if exists puppygram_user;

create table puppygram_user (
  puppygram_user_id serial primary key,
  username varchar(15),
  hash varchar(500),
  is_admin boolean
);

create table puppygram_puppy (
  puppygram_puppy_id serial primary key,
  puppygram_user_id integer references puppygram_user(puppygram_user_id),
  puppy_name varchar(150),
  puppy_img_url varchar(500)
);

insert into puppygram_user (username, hash, is_admin)
values 
  ('dogluvr13', 'aas98fh9498qhgruqqsfh98h8q94h38hasf8h9qw48', false),
  ('tammyhazit', '98h5g9h9eh98h4f8qh49hq84hg0q438hg0834hg08q', false);

insert into puppygram_puppy (puppygram_user_id, puppy_name, puppy_img_url)
values
  (1, 'lil bowwow', 'https://img-aws.ehowcdn.com/140x140/photos.demandstudios.com/getty/article/103/60/87603422_XS.jpg'),
  (2, 'bob barker', 'https://s3-media1.fl.yelpcdn.com/bphoto/xqYHtOZQ6HNDLTy2kHfaXg/180s.jpg');