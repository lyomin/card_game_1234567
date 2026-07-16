package org.foo.scores.repository;

import org.foo.scores.model.Score;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jdbc.repository.support.SimpleJdbcRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreBoardRepository extends CrudRepository<Score,Long> {
    @Query("SELECT * FROM score_board ORDER BY points DESC LIMIT 10")
    public List<Score> getTop10();

    @Query("SELECT * FROM score_board WHERE username = :username ORDER BY points DESC LIMIT 1")
    public Optional<Score> getBestUser(@Param("username") String username);
}
