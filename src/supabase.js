import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTIwMjQ3MSwiZXhwIjoxOTQwNzc4NDcxfQ.3GNP9p8MYpC7anhnELw5pVdusxhKw-W2gMhAm6saYVQ'

const SUPABASE_URL = 'https://qnhvakrhfycqcfkjmpfw.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase }
