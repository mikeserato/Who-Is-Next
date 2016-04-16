'use strict';

$(document).ready( function () {
    /* Add Section */
    $('#add-section-form').submit(function (event) {
        var class_section = $("#class_section").val();
        var section_number = $("#section_number").val();

        $.ajax({
            type: "POST",
            url: "/api/class/" + localStorage.course_code,
            data: {
                class_section: class_section,
                section_number: section_number
            },
            success: function(){
                Materialize.toast(course_code + " added!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });

    /* Edit Section */
    $('#edit-section-form').submit(function (event) {
        var class_section = $("#class_section_edit").val();
        var section_number = $("#section_number_edit").val();

        $.ajax({
            type: "PUT",
            url: "/api/class",
            data: {
                class_section: class_section,
                section_number: section_number,
                class_id: localStorage.class_id
            },
            success: function(){
                Materialize.toast(course_code + " added!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });

    /* Edit Student */
    $('#edit-student-form').submit(function (event) {
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;
        if($("#male").val()){
            gender = "M";
        }
        else{
            gender = "F";
        }
        var birthday = $("#birthday").val();
        $.ajax({
            type: "PUT",
            url: "/api/student",
            data: {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                college: college,
                course: course,
                gender: gender,
                birthday: birthday,
                student_number: localStorage.student_number

            },
            success: function(){

            },
            dataType: "JSON"
        })

        window.location.href = "/views/section"

        return false;
    });

	const content = $('#section-list');
	config.checkAuth("FACULTY");

    $('#logout-btn')
        .click(function(){

            $.ajax({
                url: '/api/logout',
                method: 'POST',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in Logout. Please try again !",2500);
                    }

                    localStorage.clear();
                    Materialize.toast(data,2500);
                    window.location.href = '/';
                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });

        });

        $("#course-id").append($("<h2></h2>").text(localStorage.course_code));

        $.ajax({
            url: '/api/class/' + localStorage.course_code,
            method: 'GET',
            success: function(data){
                $("#course-id").append($("<h3></h3>").text(data[0].course_title));
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }

                var color_flag = 0; // For alternating the color
                var num_flag = 0;   // For althernating number per row
                for(var class_ in data){
                    /*var row = $("<li></li>");
                    var class_header = $("<div></div>").addClass("collapsible-header");
                    row.attr("id", data[class_].class_id);
                    if(data[class_].section_number == null){
                        var section = $("<span></span>").text(data[class_].class_section);
                    }else{
                        var section = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                    }

                    var trash = $("<a><i>delete</i></a>");
                    trash.addClass("material-icons right");
                    trash.addClass("remove");
                    trash.attr("class_id", data[class_].class_id);
                    row.attr("course_code", data[class_].course_code);
                    row.addClass("courses");

                    // Modal Trigger
                    var add_student = $("<a href='#add_student_modal'><i>add</i></a>");
                    var edit_section = $("<a class='edit-section-button modal-trigger' href='#edit_section_modal'><i>mode_edit</i></a>");

                    add_student.addClass("add-student-button material-icons right modal-trigger");
                    add_student.attr("class_id", data[class_].class_id);
                    edit_section.attr("class_id", data[class_].class_id);
                    edit_section.addClass("material-icons right");
                    section.addClass("title");
                    section.attr("class_id", data[class_].class_id);

                    var class_body = $("<div></div>").addClass("collapsible-body");
                    var student_info = $("<ul></ul>").addClass("collection");

                    class_body.append(student_info);
                    class_header.append(section);
                    class_header.append(trash);
                    class_header.append(edit_section);
                    class_header.append(add_student);
                    row.append(class_header);
                    row.append(class_body);
                    content.append(row);

                    $.ajax({
                        url: '/api/class_student/' + data[class_].class_id,
                        method: 'GET',
                        success: function(student_data){
                            for(var student in student_data){
                                var student_name = $("<li></li>").addClass("collection-item");
                                var body = $("<a class='edit-student-button modal-trigger' href='#edit_student_modal'><i>mode_edit</i></a>");
                                body.attr("student_id", student_data[student].student_number);
                                body.addClass("material-icons right");
                                student_info.append(body);
                                student_name.text(student_data[student].last_name + ", " + student_data[student].first_name + " " +
                                student_data[student].middle_name);
                                student_info.append(student_name);
                            }
                        },
                        error: function(err){
                            return Materialize.toast(err.responseText,2500);
                        }
                    });*/

                    if(data[class_].section_number == null){
                        var section = $("<span></span>").text(data[class_].class_section);
                    }else{
                        var section = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                    }
                    section.addClass("title courses");
                    section.attr("class_id", data[class_].class_id);
                    section.attr("course_code", data[class_].course_code);
                    section.attr("class_section", data[class_].class_section);
                    section.attr("section_number", data[class_].section_number);

                    var view_analytics = $("<a title='View Analytics'><i class='material-icons options-text'>insert_chart</i></a>");
                    view_analytics.addClass("modal-trigger view-analytics-button");
                    view_analytics.attr("class_id", data[class_].class_id);

                    var delete_section = $("<a title='Delete Section'><i class='material-icons options-text'>delete</i></a>");
                    delete_section.addClass("remove");
                    delete_section.attr("class_id", data[class_].class_id);

                    var edit_section = $("<a title='Edit Section' href='#edit_section_modal'><i class='material-icons options-text'>mode_edit</i></a>");
                    edit_section.addClass("modal-trigger edit-section-button");
                    edit_section.attr("class_id", data[class_].class_id);

                    var options_div = $("<div class='options'></div>");
                    options_div.append(view_analytics);
                    options_div.append(edit_section);
                    options_div.append(delete_section);

                    if (color_flag % 2 == 0) {
                        var section_dv = $("<div class='hex z-depth-2 hexagon-red'></div>");

                    } else {
                        var section_dv = $("<div class='hex z-depth-2 hexagon-grey'></div>");
                    }
                    section_dv.attr("id", data[class_].course_code.replace(' ', ''));
                    section_dv.append(section);

                    if (num_flag < 3) {
                        var row_div = $("<div class='three'></div>");
                        row_div.append(section_dv);
                        content.append(row_div);
                    } else  content.append(section_dv);

                    content.append(options_div);

                    color_flag++;
                    num_flag++;
                    if (num_flag == 7) num_flag = 0;
                }

                $('.options').hide();

                $('.courses')
                    .click(function(){
                        localStorage.class_id = $(this).attr("class_id");
                        localStorage.course_code = $(this).attr("course_code");
                        localStorage.class_section = $(this).attr("class_section");
                        localStorage.section_number = $(this).attr("section_number");
                        window.location.href = "/views/class_student";
                    });

                $('.hex').hover(function() {
                   $('.options').show();
                   $('.options').mouseleave(function() {
                        $('.options').hide();
                    });
                });

                $('.remove').click(function(){
                    var class_id = $(this).attr("class_id");
                    if(!confirm("Are you sure you want to delete this section?")) return false;
                    $.ajax({
                        url: '/api/class/' + class_id,
                        method: 'DELETE',
                        data: {
                            class_id: class_id
                        },
                        dataType: "JSON",
                        success: function(data){
                            if(!data){
                                return Materialize.toast("Error in deleting. Please try again!",2500);
                            }

                            $('#' + class_id).remove();
                            return Materialize.toast("Successfully deleted section!",2500);
                        },
                        error: function(err){
                            return Materialize.toast(err.responseText,2500);
                        }
                    });
                });

                /* Add Student */
                $('.add-student-button').click(function () {
                    localStorage.class_id = $(this).attr("class_id");
                    $('#add_student_modal').openModal();
                });

                /* View Analytics */
                $('.view-analytics-button').click(function () {
                    localStorage.class_id = $(this).attr("class_id");
                    $('#view_analytics_modal').openModal();
                });

                /* Edit Student */
                $('.edit-student-button').click(function () {
                    localStorage.student_number = $(this).attr("student_id");
                    $('#edit_student_modal').openModal();
                });


                /* Edit Section */
                $('.edit-section-button').click(function(){
                    console.log($(this).attr("class_id"));
                    localStorage.class_id = $(this).attr("student_number    ");
                    $('#edit_section_modal').openModal();
                });


            },

            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
    });

    /* Add Student */
    $('#add-student-form').submit(function (event) {
        var student_number = $("#student_number").val();
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;
        if($("#male").val()){
            gender = "M";
        }
        else{
            gender = "F";
        }
        var birthday = $("#birthday").val();
        if (!student_number.match(/^[0-9]{4}-[0-9]{5}$/)) {
            Materialize.toast("Invalid student number", 1000);
        }
        /*if (!birthday.match(/^[0-9]{4} - ([0][0-9] | [1][0-2])$/)) { //YAHHH PAANO TO???
            Materialize.toast("Invalid student number", 1000);
        }*/
        else {
            /* Add Student */
            $.ajax({
                type: "POST",
                url: "/api/student",
                data: {
                    student_number: student_number,
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    college: college,
                    course: course,
                    gender: gender,
                    birthday: birthday

                },
                success: function(){

                },
                dataType: "JSON"
            }).done(function(data){
                /* Add Student to a class */
                $.ajax({
                    type: "POST",
                    url: "/api/class_student",
                    data: {
                        class_id: localStorage.class_id,
                        student_number: student_number,
                        no_of_times_called: 0
                    },
                    success: function(){
                        Materialize.toast(student_number + " is added!", 1000);
                    },
                    dataType: "JSON"
                });
            });
        }

        return false;
    });

    $('.modal-trigger').leanModal();

    /* For the view analytics */
    var gender_frequency=[];
    var i;
    $.ajax({
        type: "GET",
        url: "/api/analytics/" + localStorage.class_id
    }).done(function(data){
        var data2=[];
        for(i=0; i<10; i++){
            //data2.push(JSON.parse(data[i]));
            var temp=[];
            temp.push(data[i].last_name);
            temp.push(data[i].no_of_times_called);
            data2.push(temp);
        }

        Highcharts.setOptions({
        	colors: ['#b42529', '#333333']
    	});


        $('#top-ten-div').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top Ten Students'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'No. of times called'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Top Ten Most Called Students',
                data: data2,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.0f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    });
    $.ajax({
        type: "GET",
        url: "/api/analyticsGender/"+localStorage.class_id+"/M"
    }).done(function(data) {
        gender_frequency.push(data[0].frequency);
    });
    $.ajax({
        type: "GET",
        url: "/api/analyticsGender/"+localStorage.class_id+"/F"
    }).done(function(data) {
        gender_frequency.push(data[0].frequency);

        Highcharts.getOptions().plotOptions.pie.colors = (function () {
	        var colors = [],
	            base = Highcharts.getOptions().colors[0],
	            i;

	        for (i = 0; i < 10; i += 1) {
	            // Start out with a darkened base color (negative brighten), and end
	            // up with a much brighter color
	            colors.push(Highcharts.Color(base).brighten((i-1) / 7).get());
	        }
	        return colors;
	    }());

        $('#gender-frequency-div').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Gender Frequency Distribution'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Number of Time Called',
                data: [
                    { name: 'Male', y: gender_frequency[0] },
                    { name: 'Female', y: gender_frequency[1] }
                ]
            }]
        });
    });

    $.ajax({
        type: "GET",
        url: "/api/analyticsFemale/" + localStorage.class_id
    }).done(function(datalang){
        var data4=[];
        for(i=0; i<datalang.length; i++){
            //data2.push(JSON.parse(data[i]));
            var temp=[];
            temp.push(datalang[i].first_name);
            temp.push(datalang[i].no_of_times_called)
            data4.push(temp);
        }
        $('#top-ten-females-div').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top Ten Most Called Female Students'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'No. of times called'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Top Ten Most Called Female Students',
                data: data4,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.0f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    });

    $.ajax({
            type: "GET",
            url: "/api/analyticsMale/" + localStorage.class_id
        }).done(function(datagg){
            var data3=[];
            for(i=0; i<datagg.length; i++){
                //data2.push(JSON.parse(data[i]));
                var temp=[];
                temp.push(datagg[i].first_name);
                temp.push(datagg[i].no_of_times_called);
                data3.push(temp);
            }
            $('#top-ten-males-div').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top Ten Most Called Male Students'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No. of times called'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Top Ten Most Called Male Students',
                    data: data3,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.0f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        });

    $.ajax({
            type: "GET",
            url: "/api/analyticsGetSection/" + localStorage.class_id
         }).done(function(section){
            var section_list = [];
            for(var i = 0; i < section.length ; i ++) {
                section_list.push( section[i].id );
            }

                var values = [];
                for(var i = 0 ; i < section_list.length ; i ++){
                    var link = "/api/analyticsLab/"+section_list[i];
                    $.ajax({
                         type: "GET",
                         url: link
                      }).done(function(frequency){
                           var temp = [];
                           temp.push(frequency[0].section);
                           temp.push(frequency[0].frequency);
                           values.push(temp);

                        $('#section-frequency-div').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: 'Section Frequency Distribution'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.y}</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: 'No. of Times Called',
                                data: values
                            }]
                        });
                     });
                }
           });

});
