create extension if not exists "uuid-ossp";

create table carts (
	id uuid primary key default uuid_generate_v4(),
 	user_id uuid not null,
 	created_at date not null default current_date,
	updated_at date not null default current_date,
	status text check (status in ('OPEN', 'ORDERED'))
);
