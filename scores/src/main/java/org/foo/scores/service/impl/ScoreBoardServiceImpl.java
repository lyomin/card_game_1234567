package org.foo.scores.service.impl;

import org.foo.scores.model.Score;
import org.foo.scores.repository.ScoreBoardRepository;
import org.foo.scores.service.ScoreBoardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreBoardServiceImpl implements ScoreBoardService {

    private final ScoreBoardRepository scoreBoardRepository;

    public ScoreBoardServiceImpl(ScoreBoardRepository scoreBoardRepository) {
        this.scoreBoardRepository = scoreBoardRepository;
    }

    @Override
    public List<Score> top10() {
        return scoreBoardRepository.getTop10();
    }

    @Override
    public Optional<Score> bestUser(String username) {
        return scoreBoardRepository.getBestUser(username);
    }

    @Transactional
    @Override
    public Score setNewScore(Score score) {
        return scoreBoardRepository.save(score);
    }
}
