var db = require(__dirname + './../lib/Mysql');

exports.add = function (req, res, next) {
	db.query("INSERT INTO CLASS(course_code, course_title, class_section,"
        + "section_number, emp_num) VALUES(?, ?, ?, ?, ?)",
        [req.body.course_code, req.body.course_title, req.body.class_section,
        req.body.section_number, req.body.emp_num],

        function (err, rows) {
            if (err) {
                return(err);
            }
            res.send(rows);
	});
}

exports.edit = function (req, res, next) {
    db.query("UPDATE CLASS SET course_code = ?, course_title = ?, " +
        "class_section = ?, section_number = ? WHERE class_id = ?",
        [req.body.course_code, req.body.course_title, req.body.class_section,
        req.body.section_number, req.body.class_id],

        function (err, rows) {
            if (err) {
                return(err);
            }
            res.send(rows);
    });
}
