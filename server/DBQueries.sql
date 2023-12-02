
-- $$ is used to create multiline syntax. It can also be done with out $$ by using ''

create or replace function
  public.handle_new_user () returns trigger as $$
begin
  insert into public."Customers" (id, created_at, "displayName", cart, orders)
  values (new.id, current_timestamp, '', null, ARRAY[]::text[]);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger
  on_auth_user_created
after
  insert on auth.users for each row
execute
  procedure public.handle_new_user ();


-- Usage of  ''

create or replace function
  public.handle_new_user () returns trigger as '
begin
  insert into public."Customers" (id, created_at, "displayName", cart, orders)
  values (new.id, current_timestamp, '', null, ARRAY[]::text[]);
  return new;
end;' language plpgsql security definer;