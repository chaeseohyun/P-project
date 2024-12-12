const mysql = require('mysql');

// MariaDB 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbid233',
    password: 'dbpass233',
    database: 'db24305',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.error('MariaDB 연결 실패:', err);
        return;
    }
    console.log('MariaDB 연결 성공!');
});

const dropTablesQuery = `
    DROP TABLE IF EXISTS board;
    DROP TABLE IF EXISTS restaurantReview;
    DROP TABLE IF EXISTS destinationReview;
    DROP TABLE IF EXISTS recommendation;
    DROP TABLE IF EXISTS wishList;
    DROP TABLE IF EXISTS restaurant;
    DROP TABLE IF EXISTS destination;
    DROP TABLE IF EXISTS user;
    DROP TABLE IF EXISTS category;
`;

connection.query(dropTablesQuery, (err, results) => {
    if (err) {
        console.error('테이블 삭제 실패:', err);
        return;
    }
    console.log('모든 테이블이 성공적으로 삭제되었습니다!');
    connection.end();
});
