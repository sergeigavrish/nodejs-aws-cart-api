do $$
declare
  cart1_id uuid := uuid_generate_v4();
  cart2_id uuid := uuid_generate_v4();
  cart3_id uuid := uuid_generate_v4();
  cart4_id uuid := uuid_generate_v4();
  cart5_id uuid := uuid_generate_v4();
begin

insert into carts (id, user_id, created_at, updated_at, status)
values
  (cart1_id, uuid_generate_v4(), '2025-03-01', '2025-03-01', 'OPEN'),
  (cart2_id, uuid_generate_v4(), '2025-03-05', '2025-03-06', 'ORDERED'),
  (cart3_id, uuid_generate_v4(), '2025-03-10', '2025-03-10', 'OPEN'),
  (cart4_id, uuid_generate_v4(), '2025-02-15', '2025-03-20', 'ORDERED'),
  (cart5_id, uuid_generate_v4(), '2025-03-25', '2025-03-25', 'OPEN');

insert into cart_items (cart_id, product_id, count)
values
  (cart1_id, uuid_generate_v4(), 2),
  (cart2_id, uuid_generate_v4(), 1),
  (cart3_id, uuid_generate_v4(), 5),
  (cart4_id, uuid_generate_v4(), 3),
  (cart5_id, uuid_generate_v4(), 10);

end $$;