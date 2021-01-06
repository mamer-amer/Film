package com.example.MoviesBackend.Controller;

import com.example.MoviesBackend.DTO.MoviesDTO;
import com.example.MoviesBackend.Models.Movies;
import com.example.MoviesBackend.Services.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/movies")
public class MoviesController {

    @Autowired
    MoviesService moviesService;


        //Post controller to handle post request for movies in json or xml
        @RequestMapping(value="/post",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<Movies> postMovies(@RequestBody MoviesDTO moviesDTO){
          return moviesService.postMovie(moviesDTO);
        }

        //Get controller to handle get all movies request for movies in json or xml
        @RequestMapping(value="/get",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<List<Movies>> getMoviesList(@RequestBody MoviesDTO moviesDTO){
        return moviesService.getMoviesList(moviesDTO);
        }

       //Get controller to handle get movie by id request for movies in json or xml
        @RequestMapping(value="/get/{id}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<Movies> getMoviesById(@PathVariable("id") Long id,@RequestBody MoviesDTO moviesDTO){
        return moviesService.getMovieById(id,moviesDTO);
        }

        //Update controller to handle update movie request for movies in json or xml
        @RequestMapping(value="/update/{id}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<Movies> updateMovies(@PathVariable("id") Long id, @RequestBody MoviesDTO moviesDTO){
        return moviesService.updateMovie(id,moviesDTO);
        }

        //Delete controller to handle delete movie request for movie in json or xml
        @RequestMapping(value="/delete/{id}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<Movies> deleteMovies(@PathVariable("id") Long id, @RequestBody MoviesDTO moviesDTO){
        return moviesService.deleteById(id,moviesDTO);
        }

        //Get controller to handle search movie by name request for movie in json or xml
        @RequestMapping(value="/search/{name}",
        consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
        produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
        public ResponseEntity<List<Movies>> searchByName(@PathVariable("name") String name, @RequestBody MoviesDTO moviesDTO){
        return moviesService.searchByName(name,moviesDTO);
    }
}