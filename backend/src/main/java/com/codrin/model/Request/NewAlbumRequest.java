package com.codrin.model.Request;

import java.util.Date;

public record NewAlbumRequest (String title, String description, int artistId, Date releaseDate, String coverImageUrl) {
}
