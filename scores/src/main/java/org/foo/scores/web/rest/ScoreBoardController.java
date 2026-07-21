package org.foo.scores.web.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.foo.scores.model.Score;
import org.foo.scores.service.ScoreBoardService;
import org.foo.scores.web.rest.doc.ApiErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("ratings")
@Tag(name = "Game score", description = "Endpoints for tracking and retrieving top game scores")
public class ScoreBoardController {

    private final ScoreBoardService scoreBoardService;

    public ScoreBoardController(ScoreBoardService scoreBoardService) {
        this.scoreBoardService = scoreBoardService;
    }

    @Operation(
            summary = "Get top 10 game mode scores",
            description = "Retrieves the top 10 recorded scores.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successfully retrieved the best scores",
                            content = @Content(array = @ArraySchema(schema = @Schema(implementation = Score.class)))
                    )
            }
    )
    @GetMapping("{mode}/top-10")
    public List<Score> top10 (@PathVariable("mode") String mode) {
        return scoreBoardService.top10(mode);
    }


    @Operation(
            summary = "Get player's best score",
            description = "Retrieves the highest recorded score for a specific player in a given game mode.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successfully retrieved the best score",
                            content = @Content(schema = @Schema(implementation = Score.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Player or game mode not found", content = @Content)
            }
    )
    @GetMapping("{username}/{mode}/best")
    public ResponseEntity<Score> bestUser(@PathVariable("mode") String mode, @PathVariable("username") String username) {
        Optional<Score> topScore = scoreBoardService.bestUser(mode, username);
        return ResponseEntity.of(topScore);
    }

    @Operation(
            summary = "Submit a new game score",
            description = "Submits a player score for a specific mode. The database automatically generates the ID.",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Score successfully saved",
                            content = @Content(schema = @Schema(implementation = Score.class))
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid request payload",
                            content = @Content(schema = @Schema(implementation = ApiErrorResponse.class))
                    )
            }
    )
    @PostMapping
    public ResponseEntity<Score> setScore(@RequestBody Score score) {
        return ResponseEntity.ok(scoreBoardService.setNewScore(score));
    }
}
