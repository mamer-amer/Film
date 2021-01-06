package com.example.MoviesBackend.Services;

import com.example.MoviesBackend.DTO.MoviesDTO;
import com.example.MoviesBackend.Models.Movies;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MoviesServiceInterface {

    public ResponseEntity<Movies> postMovie(MoviesDTO moviesDTO);

    public ResponseEntity<List<Movies>> getMoviesList(MoviesDTO moviesDTO);

    public ResponseEntity<Movies> getMovieById(Long id,MoviesDTO moviesDTO);

    public ResponseEntity<Movies> updateMovie(Long id,MoviesDTO moviesDTO);

    public ResponseEntity<Movies> deleteById(Long id,MoviesDTO moviesDTO);

    public ResponseEntity<List<Movies>> searchByName(String name,MoviesDTO moviesDTO);
}