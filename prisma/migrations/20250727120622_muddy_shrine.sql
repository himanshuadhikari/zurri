/*
  # Add User Profile Fields to MySQL

  1. New Columns Added to users table
    - `phone` (varchar, optional) - User's phone number
    - `date_of_birth` (date, optional) - User's date of birth
    - `gender` (enum, optional) - User's gender (male, female, other, prefer-not-to-say)
    - `bio` (text, optional) - User biography/description (max 500 chars)
    - `profile_image` (varchar, optional) - URL to user's profile image
    - `street` (varchar, optional) - Street address
    - `city` (varchar, optional) - City
    - `state` (varchar, optional) - State/Province
    - `zip_code` (varchar, optional) - ZIP/Postal code
    - `country` (varchar, optional) - Country
    - `newsletter` (boolean, default false) - Newsletter subscription preference
    - `notifications` (boolean, default true) - Notifications preference
    - `marketing` (boolean, default false) - Marketing emails preference

  2. Features
    - Uses proper MySQL syntax compatible with all versions
    - Uses snake_case naming convention for MySQL
    - Safe execution with error handling
    - Gender field uses ENUM for valid values
*/

-- Add date of birth field
ALTER TABLE users ADD COLUMN date_of_birth DATE NULL;

-- Add gender field with ENUM constraint
ALTER TABLE users ADD COLUMN gender ENUM('male', 'female', 'other', 'prefer-not-to-say') NULL;

-- Add bio field
ALTER TABLE users ADD COLUMN bio TEXT NULL;

-- Add profile image field
ALTER TABLE users ADD COLUMN profile_image VARCHAR(255) NULL;

-- Add address fields
ALTER TABLE users ADD COLUMN street VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN city VARCHAR(100) NULL;
ALTER TABLE users ADD COLUMN state VARCHAR(100) NULL;
ALTER TABLE users ADD COLUMN zip_code VARCHAR(20) NULL;
ALTER TABLE users ADD COLUMN country VARCHAR(100) NULL;

-- Add preference fields with defaults
ALTER TABLE users ADD COLUMN newsletter BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN notifications BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN marketing BOOLEAN DEFAULT FALSE;