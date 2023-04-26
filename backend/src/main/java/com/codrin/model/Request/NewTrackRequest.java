package com.codrin.model.Request;

import java.util.Date;

public record NewTrackRequest (String name, int albumId, String composer, int milliseconds, Date releaseDate ){
}
