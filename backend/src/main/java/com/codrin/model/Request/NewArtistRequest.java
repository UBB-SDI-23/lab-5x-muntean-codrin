package com.codrin.model.Request;

import java.util.Date;

public record NewArtistRequest (String name, String description, String websiteLink, int debutYear, String profilePictureUrl){
}