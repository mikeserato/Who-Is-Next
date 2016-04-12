var db = require(__dirname + './../lib/Mysql');

/* Adds the class to the database */
exports.add = function (req, res, next) {
    db.query("INSERT INTO CLASS(course_code, course_title, class_section,"
        + "section_number, emp_num) VALUES(?, ?, ?, ?, ?)",
        [req.body.course_code, req.body.course_title, req.body.class_section,
        req.body.section_number, req.body.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
    });
}

/* Adds the section to a class to the database */
exports.addSection = function (req, res, next) {
    db.query("INSERT INTO CLASS(course_code, course_title, class_section,"
        + "section_number, emp_num) SELECT course_code, course_title, ?, ?, ? FROM CLASS WHERE course_code=? LIMIT 1",
        [req.body.class_section, req.body.section_number, req.session.emp_num, req.params.course_code],
      
        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
    });
}


/* Edits a specific class in the database */
exports.edit = function (req, res, next) {
    db.query("UPDATE CLASS SET " +
        "class_section = ?, section_number = ? WHERE class_id = ?",
        [req.body.class_section,
        req.body.section_number, req.body.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
    });
}

exports.editClass = function (req, res, next) {
    db.query("UPDATE CLASS SET " +
        "course_code = ?, course_title = ? WHERE course_code = ?",
        [req.body.course_code,
        req.body.course_title, req.body.course_code_o],

        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
    });
}

/* Removes an entire class and all of its sections */
exports.removeClass = function(req, res, next){
    if (!req.body.course_code) {
        res.send(400, "Error: Missing course code.");
    }
    
    db.query('DELETE from CLASS where course_code = ?', 
        [req.body.course_code], function (err, rows){
            if (err) {
                return next(err);
            }
        	
            if (!rows.affectedRows) {
                res.send(400, "Error: No class was deleted.");
            }
		    
		    res.send(rows);
    });
}

//Removes an entire section from a class
exports.removeSection = function(req, res, next){
    if (!req.body.class_id) {
        res.send(400, "Error: Missing class id.");
    }
    
    db.query('DELETE from CLASS where class_id = ?', [req.body.class_id],
        function (err, rows){
            if (err) {
                return next(err);
            }
		    
            if (!rows.affectedRows) {
                res.send(400, "Error: No section was deleted.");
            }
            
            res.send(rows);
    });
}

/* Shows all the courses of a faculty user */
exports.viewAll = function(req, res, next) {
    db.query("SELECT DISTINCT course_code FROM CLASS where emp_num = ?", [req.session.emp_num], function (err, rows) {
		if (err) {
		    return next(err);
		}
		
		if (rows.length === 0) {
		    res.send(404, "Error: Classes were not found.");
		} else {
			res.send(rows);
		}
    });
}

/* Shows the details of all classes from a course code of a faculty user */
exports.viewOne = function(req, res, next) {
    db.query("SELECT * FROM CLASS where emp_num = ? and course_code = ?", [req.session.emp_num, req.params.course_code], function (err, rows) {
		if (err) {
		    return next(err);
		}
		
		if (rows.length === 0) {
		    res.send(404, "Error: Classes were not found.");
		} else {
			res.send(rows);
		}
    });
}

/* Searches a class */
exports.search = function(req, res, next) {
    db.query("SELECT * FROM CLASS WHERE emp_num = ? and course_code like '%?%'", [req.params.emp_num, req.params.course_code],
        function (err, rows) {
			if (err) {
				return next(err);
			}
		
			if (rows.length === 0) {
				res.send(404, "Error: Class not found.");
			} else {
				res.send(rows);
			}
	});
}
