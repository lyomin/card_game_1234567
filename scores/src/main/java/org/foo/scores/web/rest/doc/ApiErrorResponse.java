package org.foo.scores.web.rest.doc;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Map;

@Schema(description = "Standartinė klaidos atsako struktūra įvykus validacijos ar užklausos klaidai")
public record ApiErrorResponse(
        @Schema(description = "Klaidos laiko žyma", example = "2026-07-21T11:05:49.558Z")
        LocalDateTime timestamp,

        @Schema(description = "HTTP statuso kodas", example = "400")
        int status,

        @Schema(description = "HTTP statuso tekstas", example = "Bad Request")
        String error,

        @Schema(description = "Užklausos kelias, kuriame įvyko klaida", example = "/ratings")
        String path,

        @Schema(description = "Išsamus klaidos pranešimas", example = "Validation failed for object 'score'")
        String message,

        @Schema(description = "Konkrečių laukų validacijos klaidos (jei yra)", example = "{\"points\": \"Must be greater than 0\"}")
        Map<String, String> errors
) {}
