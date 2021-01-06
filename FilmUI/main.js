    var BASE_URL = "http://localhost:8080";
    class URLS {
        constructor() {

        }
        static GET_MOVIES = BASE_URL + '/api/movies/get';
        static GET_MOVIES_BY_ID = BASE_URL + '/api/movies/get';
        static GET_MOVIES_BY_NAME = BASE_URL + '/api/movies/search';
        static ADD_MOVIE = BASE_URL + '/api/movies/post';
        static EDIT_MOVIE = BASE_URL+'/api/movies/update';

    }
    var allMovies = [];
    var movieModel = {
        id: null,
        title: "",
        year: "",
        director: "",
        stars: "",
        review: "", 
        contentType: "JSON"
    }

    var option = {

    }

    var movieId = 0;

    $(document).ready(function () {
    

        // important to first convert json string into object
        getAll(movieModel);
        
        


        $("#btnAddFilm").click(function () {
            $("#exampleModalLabel").text("Add New Film");
            $("#addFilmModal").modal('show');
            $("#btnSave").removeAttr('data-id');
            emptyFileds();

        })
        $(document).on('click','.btnUpdate',function () {
            movieId = $(this).attr('data-id');
            $("#exampleModalLabel").text("Edit Film");
            $("#btnSave").attr('data-id',movieId);
            $("#btnSave").text("Update");

            $("#addFilmModal").modal('show');
            let obj = allMovies.find(item=>item.id==movieId);
            
        $("#title").val(obj.title);
        $("#director").val(obj.director);
        $("#review").val(obj.review);
        $("#releasedYear").val(obj.releasedYear);
        $("#stars").val(obj.stars);

        

            //populate movie with ID;



        });
        $("#btnShowAllFilms").click(function () {
            movieModel = {};
            movieModel.contentType = $("#type").val()
            allMovies = []  
            getAll(movieModel);


        });
        $("#btnSave").click(function () {
        
            
            if(movieId>0){
                update(movieId);
            }
            else{
                save();
            }
            
        });


        
        $("#btnSearch").click(function () {
        let search = $("#btnInputSearch").val();
        if(search==""){
            popupBox('warning',"Plese write something to search", " :( ")
        }
        
        else{
            movieModel = {};
            movieModel.contentType = $("#type").val()
            let searchByType = $('input[name="btnRadio"]:checked').val();
        
            if(searchByType=="searchByName"){
        
                movieByName(movieModel,search);
            }
            else{
                movieById(movieModel,search)
            }
        }
    

        });

    });


    function emptyFileds(){
        $("#title").val("");
        $("#director").val("");
        $("#review").val("");
        $("#releasedYear").val("");
        $("#stars").val("");
    }


    function save() {
        
        movieModel = {};
        movieModel.contentType = $('input[name="optradio"]:checked').val();
        movieModel.title = $("#title").val();
        movieModel.director = $("#director").val();
        movieModel.review = $("#review").val();
        movieModel.year = $("#releasedYear").val();
        movieModel.stars = $("#stars").val();
        console.log(movieModel);


        if (movieModel.contentType == "XML") {
            let movieXmlModel = convertJsonToXML(movieModel);
            movieXmlModel = "<Movies>"+movieXmlModel+"</Movies>";
            console.log(movieXmlModel);
            saveMovieXMLAjaxCall(movieXmlModel, (response) => {
                console.log("THIS IS XML FROM SERVER",response);
                popupBox('info',"Movie addedd","Unsuccessfull");
                
                let json = xmlToJson.parse(response);
                //this the json;
                if(json!=null){
                    getAll(movieXmlModel);
                }

                console.log(JSON.stringify(json, null, 4));
            });

        }

        else {  
            saveMovieAjaxCall(movieModel, (response) => {
                console.log(response);
                if (response != null) {
                    
                    movieModel = {};
                    
                    $('input[name="optradio"]:checked').val("");
                    movieModel.title = null;
                    $("#title").val("");
                    movieModel.director = null;
                    $("#director").val("");
                    movieModel.review = null;
                    $("#review").val("");
                    movieModel.year = null;
                    $("#releasedYear").val("");
                    movieModel.stars = null;
                    $("#stars").val("");
                    movieModel.contentType = "JSON";
                    getAll(movieModel);
                }

            });

        }



    }

    function update(id) {

        
        movieModel = {};
        movieModel.contentType = $('input[name="optradio"]:checked').val();
        movieModel.title = $("#title").val();
        movieModel.director = $("#director").val();
        movieModel.review = $("#review").val();
        movieModel.year = $("#releasedYear").val();
        movieModel.stars = $("#stars").val();
        console.log(movieModel);


        if (movieModel.contentType == "XML") {

            let movieXmlModel = convertJsonToXML(movieModel);
            movieXmlModel = "<Movies>"+movieXmlModel+"</Movies>";
            console.log(movieXmlModel)
            editMovieXMLAjaxCall(id,movieXmlModel, (response) => {
                console.log(response);
                
            

                if (response != null) {
                    let json = xmlToJson.parse(response);
                //this the json;
                if(json!=null){
                    getAll(movieModel);
                }

                console.log(JSON.stringify(json, null, 4));
                
                    movieModel = {};
                    $("#addFilmModal").modal('hide');
                    movieModel.contentType = null;
                    $('input[name="optradio"]:checked').val("");
                    movieModel.title = null;
                    $("#title").val("");
                    movieModel.director = null;
                    $("#director").val("");
                    movieModel.review = null;
                    $("#review").val("");
                    movieModel.year = null;
                    $("#releasedYear").val("");
                    movieModel.stars = null;
                    $("#stars").val("");
                }
            });

        }

        else {  
            editMovieAjaxCall(id,movieModel, (response) => {
                console.log(response);
                    
                if (response != null) {
                    getAll(movieModel);
                    movieModel = {};
                    $("#addFilmModal").modal('hide');
                    movieModel.contentType = null;
                    $('input[name="optradio"]:checked').val("");
                    movieModel.title = null;
                    $("#title").val("");
                    movieModel.director = null;
                    $("#director").val("");
                    movieModel.review = null;
                    $("#review").val("");
                    movieModel.year = null;
                    $("#releasedYear").val("");
                    movieModel.stars = null;
                    $("#stars").val("");
                }

            });

        }

    }

    function convertJsonToXML(json) {
        return json2xml(json);

    }



    function getAll(obj) {
        getAllAjaxCall(obj, (response) => {

            if (response != null) {
                console.log(response);
                allMovies = [];
                $(".movieSection").empty();
                popupBox('info',"Movies present","Successfull");
                let searchByType = $('#type').val();
                if(searchByType=="XML"){
                    let json = xmlToJson.parse(response);
                    console.log(json)
                    allMovies = json['List']['item'];
                }
                else{
                    allMovies = response;
                }
                allMovies.forEach(d => {
                    // let html = '<div class="movie_card"> <div class="info_section"> <div class="movie_header"><!-- <img class="locandina" src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"/> --> <h1 id="movie_title">'+d.title+'</h1> <h4 id="movie_year">'+d.year+','+d.stars+'</h4> <span class="minutes">'+d.director+'</span> </div><div class="movie_desc"> <p class="text" id="movie_review">'+d.review+'</p></div><div class="row"> <div class="col-lg-12"> <button class="btn btn-dark btn-lg" id="btnUpdate" data-id="'+d.id+'">Update Movie</button> </div></div></div></div>'

                    $(".movieSection").append(htmlMovieCard(d));
                });

            



            }
        });
    }

    function htmlMovieCard({ title = "N/A", year = "N/A", director = "N/A", stars = "N/A", review = "N/A", id = "N/A" }) {
        let html = '<div class="movie_card"> <div class="info_section"> <div class="movie_header"><!-- <img class="locandina" src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"/> --> <h1 id="movie_title">' + title + '</h1> <h4 id="movie_year">' + year + ',' + stars + '</h4> <span class="minutes">Film ID : ' + id + '</span> <span class="minutes">Director : ' + director + '</span> </div><div class="movie_desc"> </br></br><p class="text" id="movie_review">' + review + '</p></div><div class="row"> <div class="col-lg-12"> <button class="btn btn-dark btn-lg btnUpdate" data-id="' + id + '">Update Movie</button> </div></div></div></div>'
        return html;
    }

    function movieByName(obj,name) {
    getMovieByNameAjaxCall(obj,name,(response)=>{
        console.log(response);
        allMovies = [];
        if(response.length<1){
            popupBox('error',"No movies present with the name "+name,"Unsuccessfull");
        }
        else{
            $(".movieSection").empty();
            popupBox('info',"Movies with name "+name,"Successfull");
            let searchByType = $('#type').val();
                if(searchByType=="XML"){
                    let json = xmlToJson.parse(response);
                    console.log(json)
                    allMovies = json['List']['item'];
                }
                else{
                    allMovies = response;
                }
            
            allMovies.forEach(d => {
                    $(".movieSection").append(htmlMovieCard(d));
                });
        }
        
    });
    }
    function movieById(obj,id) {
    getMovieByIdAjaxCall(obj,id,(response)=>{
        console.log(response);
        if(response!=null){
            popupBox('info',"Movie present with the ID = "+id,"Successfull");
            $(".movieSection").empty();
            allMovies = [];
            
            allMovies.push(response);
            allMovies.forEach(item=>{
                $(".movieSection").append(htmlMovieCard(item));
            });
        }
        else{
            popupBox('error',"No movies present with the ID = "+id,"Unsuccessfull");

        }
    
        
                
    });
    }


    function getMovieByNameAjaxCall(obj,name,successCallback) {
        var response = "";
        $.ajax({
            url: URLS.GET_MOVIES_BY_NAME+"/"+name,
            method: "POST",

            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            

            success: successCallback,
            error: function (err) {
                response = err
                popupBox('error',"Something went wrong","Unsuccessfull");
                return response;
            }

        });
    }

    function saveMovieAjaxCall(obj, successCallback) {
        var response = "";
        $.ajax({
            url: URLS.ADD_MOVIE,
            method: "POST",
            dataType: "JSON",

            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            success: successCallback,
            error: function (err) {
                popupBox('error',"Movie addedd failed","Unsuccessfull");
                response = err
                return response;

            }

        });
    }
    function saveMovieXMLAjaxCall(obj, successCallback) {
        var response = "";
        $.ajax({
            url: URLS.ADD_MOVIE,
            method: "POST",
            

            data: obj,
            contentType: 'application/xml; charset=utf-8',
            success: successCallback,
            error: function (err) {
                popupBox('error',"Movie addedd failed","Unsuccessfull");
                response = err
                return response;

            }

        });
    }
    function editMovieXMLAjaxCall(id,obj, successCallback) {
        var response = "";
        $.ajax({
            url: URLS.EDIT_MOVIE+'/'+id,
            method: "POST",
            

            data: JSON.stringify(obj),
            contentType: 'application/xml; charset=utf-8',
            success: successCallback,
            error: function (err) {
                popupBox('error',"Movie update failed","Unsuccessfull");
                response = err
                return response;

            }

        });
    }

    function editMovieAjaxCall(id,obj,successCallback) {
        var response = "";
        $.ajax({
            url: URLS.EDIT_MOVIE+'/'+id,
            method: "POST",
            dataType: "JSON",

            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            success: successCallback,
            error: function (err) {
                popupBox('error',"Movie update failed","Unsuccessfull");
                response = err
                return response;

            }

        });

    }

    function getAllAjaxCall(obj,successCallback) {
        var response = "";
        $.ajax({
            url: URLS.GET_MOVIES,
            method: "POST",

            contentType: 'application/json; charset=utf-8',

            data: JSON.stringify(obj),

            success: successCallback,
            error: function (err) {
                popupBox('error',"Something went wrong","Unsuccessfull");
                response = err
                return response;
            }

        });
    }

    function getMovieByIdAjaxCall(obj,id,successCallback) {
        var response = "";
        $.ajax({
            url: URLS.GET_MOVIES_BY_ID+"/"+id,
            method: "POST",

            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            success: successCallback,
            error: function (err) {
                response = err
                popupBox('error',"Something went wrong","Unsuccessfull");
                console.log(responses.statusText)
                return response;
            }

        });

    
        
    }

    function popupBox(type,message,title){
        toastr[type](message,title);
    }





