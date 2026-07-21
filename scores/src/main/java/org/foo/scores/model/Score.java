package org.foo.scores.model;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Schema(description = "Game mode results")
@Table(name="SCORE_BOARD")
public record Score(
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        @Id Long id,
        Long points,
        String username,
        String mode
) {
}
