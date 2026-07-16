package org.foo.scores.service;

import org.foo.scores.model.Score;

import java.util.List;
import java.util.Optional;

public interface ScoreBoardService {
    List<Score> top10();
    Optional<Score> bestUser(String username);
    Score setNewScore(Score score);
}
