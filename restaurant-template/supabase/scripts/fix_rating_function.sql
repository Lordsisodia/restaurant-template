-- Create function to calculate average rating
create or replace function get_restaurant_rating(restaurant_uuid uuid)
returns jsonb as $$
  select jsonb_build_object(
    'average', round(avg(rating)::numeric, 1),
    'total', count(*),
    'breakdown', jsonb_build_object(
      '5_stars', count(*) filter (where rating = 5),
      '4_stars', count(*) filter (where rating = 4),
      '3_stars', count(*) filter (where rating = 3),
      '2_stars', count(*) filter (where rating = 2),
      '1_star', count(*) filter (where rating = 1)
    )
  )
  from review
  where restaurant_id = restaurant_uuid
    and status = 'published';
$$ language sql stable;
