'use strict';

$(document).ready( function () {
	config.checkAuth("ADMIN");
    const content = $('#faculty-list');

    navbar.init('#navbar');
    sidebar.init('#sidebar');

    function add_data (data) {

        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var faculty_ in data){
            var faculty = $("<span></span>").text(data[faculty_].name);
            faculty.attr("emp_num", data[faculty_].emp_num);
            faculty.addClass("title courses");

            var delete_faculty = $("<a title='Delete Faculty'><i class='material-icons options-text'>delete</i></a>");
            delete_faculty.addClass("remove");
            delete_faculty.attr("emp_num", data[faculty_].emp_num);

            var validate_faculty = $("<a title='Validate Registration'><i class='material-icons options-text'>verified_user</i></a>");
            validate_faculty.addClass("validate");
            validate_faculty.attr("emp_num", data[faculty_].emp_num);            

            var options_div = $("<div class='options'></div>");
            options_div.append(delete_faculty);
            options_div.append(validate_faculty);
            

            if (color_flag % 2 == 0) {
                var faculty_div = $("<div class='hex z-depth-2 hexagon-red'></div>");
                
            } else {
                var faculty_div = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            faculty_div.attr("id", data[faculty_].emp_num);
            faculty_div.append(faculty);

            if (num_flag < 3) {
                var row_div = $("<div class='three'></div>");   
                row_div.append(faculty_div);
                content.append(row_div);  
            } else  content.append(faculty_div);
            
            content.append(options_div);

            color_flag++;   
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }


       $('.options').hide();


        $('.three,.options')
        .mouseenter(function() {
           if($(this).attr("class") == 'three'){
            $(this).next().show();
           }else{
            $(this).css( 'cursor', 'pointer' );
            $(this).show();
           } 
        })
        .mouseleave(function(){
            if($(this).attr("class") == "three"){
             $(this).next().hide();
           }else{
            $(this).hide();
           }
        });
        
        $('.hex.z-depth-2')
        .mouseenter(function() {
           if($(this).parent().attr("class") != 'three'){
            $(this).next().show();
           }
        })
        .mouseleave(function(){
            if($(this).parent().attr("class") != "three"){
             $(this).next().hide();
           }
        });

        //var isoptions =false, ishex = false;

        // $('.hex')
        // .hover(function() {
        //    $(this).parent().next().show();
        // },
        // function() {
        //     if (true) {}
        //      $(this).parent().next().hide();
        // });
        

        // $('.courses').click(function(){ // Redirect to View Section in a Class
        //     localStorage.course_code = $(this).attr("emp_num");
        //     window.location.href = "/views/section";
        // });
        
        $('.remove')
            .click(function(){
                var emp_num = $(this).attr("emp_num");
                if(!confirm("Are you sure you want to delete this faculty?")) return false;
                $.ajax({
                    url: '/api/faculty',
                    method: 'DELETE',
                    headers: util.headers,
                    data: {
                        emp_num: emp_num
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        $('#' + emp_num).remove();
                        return Materialize.toast("Successfully deleted faculty!",2500,"",function(){
                            return window.location.href = "/views/admin/";
                        });
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });
            });

        $('.validate')
            .click(function(){
                var emp_num = $(this).attr("emp_num");
                if(!confirm("Are you sure you want to validate this faculty?")) return false;
                $.ajax({
                    url: '/api/validate',
                    method: 'POST',
                    headers: util.headers,
                    data: {
                        emp_num: emp_num
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in validating. Please try again!",2500);
                        }

                        $('#' + emp_num).remove();
                        return Materialize.toast("Successfully validated faculty!",2500,"",function(){
                            return window.location.href = "/views/admin/";
                        });
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });
            });

    } // end of add data


/*
    function add_data(data){
        for (var faculty in data){
                var row = $("<li></li>");
                    row.text(data[faculty].name);
                content.append(row);
            }
    }
*/
    function Refresh(){
    	$.ajax({
	        url: '/api/faculty',
	        method: 'GET',
            headers: util.headers,
	        success: function(data){
	        	if(!data){
	            	return Materialize.toast("Error in fetching data",2500);
	        	}
                data = jQuery.grep(data, function(value){
                    return value.is_validated == 0;
                });
	            add_data(data);
	        },
	        error: function(err){
	            return Materialize.toast(err.responseText,2500);
	        }
	    });	
    }

    $('#search-faculty').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
        content.empty();

        
        if($(this).val() === ''){
            Refresh(); 
            return;
        }

        $.ajax({
            url: '/api/faculty/search/' + $(this).val(),
            method: 'GET',
            headers: util.headers,
            success: 
            function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                content.empty();
                add_data(data);

            },
            error: 
            function(err){
                if(e.keyCode == 13){
                	Refresh();
                    return Materialize.toast(err.responseText,2500);    
                }
            }
        });
    });

    $('.remove')
            .click(function(){
                var course_code = $(this).attr("course_code");
                if(!confirm("Are you sure you want to delete this class?")) return false;
                $.ajax({
                    url: '/api/class',
                    method: 'DELETE',
                    headers: util.headers,
                    data: {
                        course_code: course_code
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        $('#' + course_code).remove();
                        return Materialize.toast("Successfully deleted class!",2500);
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });
            });

	Refresh();

});
