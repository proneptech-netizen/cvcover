create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  whatsapp_number text not null check (char_length(trim(whatsapp_number)) between 7 and 30),
  email text check (email is null or char_length(email) <= 254),
  preferred_completion_date date,
  service text not null check (char_length(trim(service)) between 2 and 150),
  target_airline text check (target_airline is null or char_length(target_airline) <= 200),
  message text not null check (char_length(trim(message)) between 5 and 5000),
  consent boolean not null check (consent = true),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'information_pending', 'payment_pending', 'drafting', 'review', 'revision', 'completed', 'cancelled')
  ),
  source text not null default 'website'
);

alter table public.enquiries enable row level security;

revoke all on table public.enquiries from anon;
revoke all on table public.enquiries from authenticated;
grant select, update, delete on table public.enquiries to authenticated;

create policy "Approved admin can view enquiries"
on public.enquiries for select to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'cvandcoverletternepal@gmail.com');

create policy "Approved admin can update enquiries"
on public.enquiries for update to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'cvandcoverletternepal@gmail.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'cvandcoverletternepal@gmail.com');

create policy "Approved admin can delete enquiries"
on public.enquiries for delete to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'cvandcoverletternepal@gmail.com');

create or replace function public.submit_enquiry(
  p_full_name text,
  p_whatsapp_number text,
  p_email text,
  p_preferred_completion_date date,
  p_service text,
  p_target_airline text,
  p_message text,
  p_consent boolean
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_enquiry_id uuid;
begin
  if p_consent is not true then raise exception 'Consent is required.'; end if;
  if char_length(trim(p_full_name)) not between 2 and 120 then raise exception 'Enter a valid full name.'; end if;
  if char_length(trim(p_whatsapp_number)) not between 7 and 30 then raise exception 'Enter a valid WhatsApp number.'; end if;
  if char_length(trim(p_service)) not between 2 and 150 then raise exception 'Select a valid service.'; end if;
  if char_length(trim(p_message)) not between 5 and 5000 then raise exception 'Enter a valid message.'; end if;

  insert into public.enquiries (
    full_name, whatsapp_number, email, preferred_completion_date,
    service, target_airline, message, consent
  ) values (
    trim(p_full_name), trim(p_whatsapp_number), nullif(trim(coalesce(p_email, '')), ''),
    p_preferred_completion_date, trim(p_service), nullif(trim(coalesce(p_target_airline, '')), ''),
    trim(p_message), true
  ) returning id into new_enquiry_id;

  return new_enquiry_id;
end;
$$;

revoke all on function public.submit_enquiry(text, text, text, date, text, text, text, boolean) from public;
grant execute on function public.submit_enquiry(text, text, text, date, text, text, text, boolean) to anon, authenticated;
