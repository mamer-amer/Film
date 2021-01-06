package com.example.MoviesBackend.Services;

import com.example.MoviesBackend.Commons.ApiResponse;
import com.example.MoviesBackend.Commons.Status;
import com.example.MoviesBackend.DTO.MoviesDTO;
import com.example.MoviesBackend.Models.Movies;
import com.example.MoviesBackend.Repositories.MoviesRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoviesService implements MoviesServiceInterface {
    @Autowired
    MoviesRepositories moviesRepositories;


    //Implementation for post or add movie
    @Override
    public ResponseEntity<Movies> postMovie(MoviesDTO moviesDTO){

        Movies movies = new Movies();
        movies.setTitle(moviesDTO.getTitle());
        movies.setDirector(moviesDTO.getDirector());
        movies.setReview(moviesDTO.getReview());
        movies.setStars(moviesDTO.getStars());
        movies.setYear(moviesDTO.getYear());
        moviesRepositories.save(movies);

        if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_XML)
                    .body(movies);
        }
        else {
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(movies);
        }

    }

    //Implementation for get all movies
    @Override
    public ResponseEntity<List<Movies>> getMoviesList(MoviesDTO moviesDTO){
        List<Movies> moviesList = moviesRepositories.findAll();
        if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_XML)
                    .body(moviesList);
        }

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(moviesList);

    }

    //Implementation for get movie by Id
    @Override
    public ResponseEntity<Movies> getMovieById(Long id,MoviesDTO moviesDTO){
        Optional<Movies> moviesOptional = moviesRepositories.findById(id);
        if(moviesOptional!=null){
            Movies movies = moviesOptional.get();
            if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
                return ResponseEntity.status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_XML)
                        .body(movies);
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(movies);

        }
        else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Implementation for update movie by Id
    @Override
    public ResponseEntity<Movies> updateMovie(Long id,MoviesDTO moviesDTO){
        Optional<Movies> moviesOptional = moviesRepositories.findById(id);
        if(moviesOptional!=null){
            Movies movie = moviesOptional.get();
            movie.setTitle(moviesDTO.getTitle());
            movie.setDirector(moviesDTO.getDirector());
            movie.setStars(moviesDTO.getStars());
            movie.setReview(moviesDTO.getReview());
            movie.setYear(moviesDTO.getYear());
            moviesRepositories.save(movie);
            if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
                return ResponseEntity.status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_XML)
                        .body(movie);
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(movie);
        }
        else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Implementation for delete movie by Id
    @Override
    public ResponseEntity<Movies> deleteById(Long id,MoviesDTO moviesDTO){
        Optional<Movies> moviesOptional = moviesRepositories.findById(id);
        if(moviesOptional!=null){
           moviesRepositories.deleteById(id);
            if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
                return ResponseEntity.status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_XML)
                        .body(null);
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(null);
        }
        else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        }
    }

    //Implementation for search movie by name
    @Override
    public ResponseEntity<List<Movies>> searchByName(String name,MoviesDTO moviesDTO){
        List<Movies> movie = moviesRepositories.searchByName(name);
        if(movie!=null){
            if(moviesDTO.getContentType().equalsIgnoreCase("XML")){
                return ResponseEntity.status(HttpStatus.OK)
                        .contentType(MediaType.APPLICATION_XML)
                        .body(movie);
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(movie);
        }
        else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }
}

