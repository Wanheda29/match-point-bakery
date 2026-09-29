-- Ejecutar SOLO en hrcbprhmwqmymobxumao, después de schema.sql.
-- Primero crear el usuario en Authentication. No escribir contraseñas aquí.
-- Sustituir los dos valores antes de ejecutar.
do $$
declare
  owner_email text := 'REEMPLAZAR_EMAIL';
  business_name text := 'Match Point Bakery';
  owner_id uuid;
  new_business_id uuid;
begin
  if owner_email = 'REEMPLAZAR_EMAIL' or business_name = 'REEMPLAZAR_NOMBRE' then
    raise exception 'Completar email y nombre del nuevo negocio';
  end if;
  select id into owner_id from auth.users where lower(email) = lower(owner_email);
  if owner_id is null then
    raise exception 'Crear primero el usuario en Authentication';
  end if;
  if exists (select 1 from public.memberships where user_id = owner_id) then
    raise exception 'El usuario ya tiene un negocio; no se crearon duplicados';
  end if;
  select id into new_business_id from public.businesses where name = business_name;
  if new_business_id is null then
    insert into public.businesses(name) values (business_name) returning id into new_business_id;
  end if;
  insert into public.memberships(business_id, user_id, role)
  values (new_business_id, owner_id, 'client');
  -- La aplicación creará business_data al guardar por primera vez.
end;
$$;
