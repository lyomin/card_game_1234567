package org.foo.scores.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name="SCORE_BOARD")
public record Score(@Id Long id, Long points, String username, String mode) {
}
