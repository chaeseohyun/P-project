const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbid233',
    password: 'dbpass233',
    database: 'db24305',
    multipleStatements: true // 다중 SQL 문 실행 활성화
});

connection.connect((err) => {
    if (err) {
        console.error('MariaDB 연결 실패:', err);
        return;
    }
    console.log('MariaDB 연결 성공!');
});

const createTablesQuery = `
    -- category 테이블 생성
    CREATE TABLE IF NOT EXISTS category (
        category_id VARCHAR(20),
        category_name VARCHAR(100),
        keyword_id VARCHAR(20) UNIQUE,
        keyword_name VARCHAR(100),
        count INT DEFAULT 0,
        PRIMARY KEY (category_id, keyword_id)
    );

    -- user 테이블 생성
    CREATE TABLE IF NOT EXISTS user (
        user_id VARCHAR(255) PRIMARY KEY,
        nickname VARCHAR(100) NOT NULL,
        profile_image VARCHAR(255),
        keyword_id VARCHAR(20),
        FOREIGN KEY (keyword_id) REFERENCES category(keyword_id)
    );

    -- destination 테이블 생성
    CREATE TABLE IF NOT EXISTS destination (
        dest_id VARCHAR(20) PRIMARY KEY,
        dest_name VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        address VARCHAR(200),
        description TEXT,
        keyword_id VARCHAR(20),
        image VARCHAR(255),
        FOREIGN KEY (keyword_id) REFERENCES category(keyword_id)
    );

    -- restaurant 테이블 생성
    CREATE TABLE IF NOT EXISTS restaurant (
        rest_id VARCHAR(255) PRIMARY KEY,
        rest_name VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        address VARCHAR(200),
        description TEXT,
        image TEXT,
        contact VARCHAR(50)
    );

    -- wishList 테이블 생성
    CREATE TABLE IF NOT EXISTS wishList (
        user_id VARCHAR(255),
        dest_list JSON,
        rest_list JSON,
        PRIMARY KEY (user_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    );

    -- recommendation 테이블 생성
    CREATE TABLE IF NOT EXISTS recommendation (
        recommend_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255),
        dest_id VARCHAR(20),
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (dest_id) REFERENCES destination(dest_id)
    );

    -- destinationReview 테이블 생성
    CREATE TABLE IF NOT EXISTS destinationReview (
        dest_rev_id INT AUTO_INCREMENT PRIMARY KEY,
        dest_id VARCHAR(20),
        user_id VARCHAR(255),
        date DATE,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dest_id) REFERENCES destination(dest_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    );

    -- restaurantReview 테이블 생성
    CREATE TABLE IF NOT EXISTS restaurantReview (
        rest_rev_id INT AUTO_INCREMENT PRIMARY KEY,
        rest_id VARCHAR(20),
        user_id VARCHAR(255),
        date DATE,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rest_id) REFERENCES restaurant(rest_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    );

    -- board 테이블 생성
    CREATE TABLE IF NOT EXISTS board (
        type_id VARCHAR(20),
        board_id VARCHAR(20),
        user_id VARCHAR(255),
        title VARCHAR(200),
        date DATE,
        content TEXT,
        PRIMARY KEY (type_id, board_id),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
    );
`;

connection.query(createTablesQuery, (err, results) => {
    if (err) {
        console.error('테이블 생성 실패:', err);
        return;
    }
    console.log('모든 테이블이 성공적으로 생성되었습니다!');
    connection.end();
});
