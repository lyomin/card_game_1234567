package org.foo.scores.web.rest.doc;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.Map;

@Schema(description = "Standard error response structure when a validation or request error occurs")
public record ApiErrorResponse(
        @Schema(description = "Error timestamp", example = "2026-07-21T11:05:49.558Z")
        LocalDateTime timestamp,

        @Schema(description = "HTTP status code", example = "400")
        int status,

        @Schema(description = "HTTP status text", example = "Bad Request")
        String error,

        @Schema(description = "Request path where the error occurred", example = "/ratings")
        String path,

        @Schema(description = "Detailed error message", example = "Validation failed for object 'score'")
        String message,

        @Schema(description = "Validation errors for specific fields (if applicable)", example = "{\"points\": \"Must be greater than 0\"}")
        Map<String, String> errors
) {}
