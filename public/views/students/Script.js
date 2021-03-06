'use strict';

$(document).ready( function () {
    config.checkAuth("FACULTY");
    navbar.init("#navbar");
    sidebar.init("#sidebar");
    
    const content = $('#student-list');
    var timeoutID = null;


    function add_data(data){
        for (var student in data){
                var row = $("<li></li>");
                    row.attr("id", data[student].student_number);
                    row.addClass("student-data");
                    row.addClass("modal-trigger");
                    row.attr("href", "#student_modal");
                    var student_header = $("<div></div>").addClass("collapsible-header");
                        if(data[student].picture == null){
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });
                        }else{
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });
                        }
                        image.addClass("circle");
                        var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
                        text.addClass("center-align");
                    student_header.append(image);
                    student_header.append(text);
                row.append(student_header);
                content.append(row);
            }

            $('.student-data')
                .click(function(){
                    $.ajax({
                        url: '/api/student/' + $(this).attr("id"),
                        method: 'GET',
                        headers: util.headers,
                        success: function(data_student){
                            $('#student_header').empty();
                            $('#student_number').empty();
                            $('#student_name').empty();
                            $('#student_course').empty();
                            $('#student_college').empty();
                            $('#student_gender').empty();
                            $('#student_birthday').empty();

                            $('#student_header').append($("<span></span>").html(data_student[0].last_name + ", " + data_student[0].first_name + " " + data_student[0].middle_name));
                            $('#student_number').append($("<span></span>").html("Student number: " + data_student[0].student_number));
                            $('#student_course').append($("<span></span>").html("Course: " + data_student[0].course));
                            $('#student_college').append($("<span></span>").html("College: " + data_student[0].college));
                            $('#student_gender').append($("<span></span>").html("Gender: " + data_student[0].gender));
                            $('#student_birthday').append($("<span></span>").html("Birthday: " + data_student[0].birthday));

                            $('#student_modal').openModal();

                        },
                        error: function(err){
                            util.errorHandler(err);
                        }
                    });
            });
    }

    function refresh () {
        $.ajax({
            url: '/api/student',
            method: 'GET',
            headers: util.headers,
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                add_data(data);
            },
            error: function(err){
                util.errorHandler(err);
            }
        });
    }

    function search(str){
        $.ajax({
            url: '/api/student/search/' + str,
            method: 'GET',
            headers: util.headers,
            success: function(data_student){
                content.empty();
                add_data(data_student);
            },
            error: function(err){
                refresh();
                util.errorHandler(err);
            }
        });
    }

    $('#search-student').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();

        }
        content.empty();

        if($(this).val() === ''){
            refresh();
            return;
        }

        search($(this).val());

    });


    refresh();
});
