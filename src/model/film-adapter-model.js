export default class FilmAdapterModel {
  constructor(endData) {
    this.id = endData[`id`];
    this.filmInfo = {
      title: endData[`film_info`][`title`],
      alternativeTitle: endData[`film_info`][`alternative_title`],
      totalRating: endData[`film_info`][`total_rating`],
      poster: endData[`film_info`][`poster`],
      ageRating: endData[`film_info`][`age_rating`],
      director: endData[`film_info`][`director`],
      writers: endData[`film_info`][`writers`],
      actors: endData[`film_info`][`actors`],
      release: {
        date: endData[`film_info`][`release`][`date`] ? new Date(endData[`film_info`][`release`][`date`]) : null,
        country: endData[`film_info`][`release`][`release_country`],
      },
      runtime: endData[`film_info`][`runtime`],
      genre: endData[`film_info`][`genre`],
      description: endData[`film_info`][`description`],
    };
    this.userDetails = {
      personalRating: endData[`user_details`][`personal_rating`],
      watchlist: endData[`user_details`][`watchlist`],
      alreadyWatched: endData[`user_details`][`already_watched`],
      watchingDate: endData[`user_details`][`watching_date`],
      favorite: endData[`user_details`][`favorite`],
    };
    this.comments = endData[`comments`];
  }

  static parseFilm(endData) {
    return new FilmAdapterModel(endData);
  }

  static parseFilms(endData) {
    return endData.map(FilmAdapterModel.parseFilm);
  }
}
