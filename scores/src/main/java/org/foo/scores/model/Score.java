package org.foo.scores.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name="score_board")
public record Score(@Id Long id, Long points, String username) {
}
