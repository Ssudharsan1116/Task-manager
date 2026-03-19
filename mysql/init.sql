-- Targeting the default Railway database Instead

-- Users table: core identity and auth
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    uid VARCHAR(12) NOT NULL UNIQUE, -- Alphanumeric referral ID
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_uid (uid),
    INDEX idx_username (username)
);

-- Tree positions: physical placement in the 3x3 structure
CREATE TABLE IF NOT EXISTS tree_positions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    parent_id BIGINT DEFAULT NULL, -- NULL for root
    position_name ENUM('A', 'B', 'C') DEFAULT NULL, -- NULL for root
    level INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_parent (parent_id),
    INDEX idx_level (level)
);

-- Referral relationships: tracks who actually referred the user (ownership)
CREATE TABLE IF NOT EXISTS referral_relationships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    referrer_id BIGINT NOT NULL,
    referred_id BIGINT NOT NULL UNIQUE,
    placement_order INT NOT NULL, -- Global order for metrics
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (referred_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_referrer (referrer_id)
);

-- Global state for atomic placement tracking
CREATE TABLE IF NOT EXISTS global_placement_state (
    id INT PRIMARY KEY,
    last_filled_user_id BIGINT DEFAULT NULL,
    next_position_index INT DEFAULT 0 -- 0-8 for the A->A...C->C cycle
);

INSERT IGNORE INTO global_placement_state (id, next_position_index) VALUES (1, 0);
