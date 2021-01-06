package com.example.MoviesBackend.Repositories;

import com.example.MoviesBackend.Models.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MoviesRepositories extends JpaRepository<Movies, Long> {

    @Query(value = "select * from movies where  movies.title like %:name%",nativeQuery = true)
    public List<Movies> searchByName(@Param("name") String name);
}