insert into puppygram_user (username, hash, isAdmin)
values (${username}, ${hash}, ${isAdmin})
returning *;