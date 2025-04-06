create table cart_items (
	cart_id uuid not null,
	product_id uuid not null,
	count smallint not null check (count > 0),
	primary key (cart_id, product_id),
	foreign key (cart_id) references carts(id) on delete cascade
);
