package org.foo.scores.web.rest;

import org.foo.scores.model.Score;
import org.foo.scores.service.ScoreBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("ratings")
public class ScoreBoardController {

    private final ScoreBoardService scoreBoardService;

    public ScoreBoardController(ScoreBoardService scoreBoardService) {
        this.scoreBoardService = scoreBoardService;
    }

    @GetMapping("{mode}/top-10")
    public List<Score> top10 (@PathVariable("mode") String mode) {
        return scoreBoardService.top10(mode);
    }
    @GetMapping("{username}/{mode}/best")
    public ResponseEntity<Score> bestUser(@PathVariable("mode") String mode, @PathVariable("username") String username) {
        Optional<Score> topScore = scoreBoardService.bestUser(mode, username);
        return ResponseEntity.of(topScore);
    }
    @PostMapping
    public ResponseEntity<Score> setScore(@RequestBody Score score) {
        return ResponseEntity.ok(scoreBoardService.setNewScore(score));
    }
}
