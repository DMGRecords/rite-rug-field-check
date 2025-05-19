-- Create Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Subdivisions Table
CREATE TABLE subdivisions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Stages Table
CREATE TABLE stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subdivision_id INT,
  stage_name ENUM(
    'slabs', 'crawlspaces', 'framing', 'insulation', 'roofing',
    'drywall', 'trim', 'paint', 'tile', 'hardwood',
    'LVP', 'vinyl', 'carpet', 'completion'
  ) NOT NULL,
  stage_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subdivision_id) REFERENCES subdivisions(id) ON DELETE CASCADE
);

