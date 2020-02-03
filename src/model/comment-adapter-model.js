export default class CommentAdapterModel {
  constructor(endData) {
    this.id = endData[`id`];
    this.author = endData[`author`];
    this.emotion = endData[`emotion`];
    this.comment = endData[`comment`];
    this.date = endData[`date`] ? new Date(endData[`date`]) : null;
  }

  static parseComment(endData) {
    return new CommentAdapterModel(endData);
  }

  static parseComments(endData) {
    return endData.map(CommentAdapterModel.parseComment);
  }
}
