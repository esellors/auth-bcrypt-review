insert into puppygram_user (username, hash, is_admin)
values (${username}, ${hash}, ${is_admin})
returning *;