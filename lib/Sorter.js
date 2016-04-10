export default class Sorter {
  /**
   * Sort the specified documents.
   *
   * @param docs:object[] The documents to sort.
   * @param fields:object The fields to set the order.
   * @return object[]
   */
  sort(docs, fields) {
    var field, type;

    //(1) set field and clause
    for (let i = 0, names = Object.keys(fields); i < 1; ++i) {
      field = names[i];
      type = fields[field].toUpperCase();
    }

    //(2) sort
    return docs.sort(function compare(a, b) {
      var res;

      //(1) check
      if (a[field] > b[field]) res = (type == "ASC" ? 1 : -1);
      else if (a[field] < b[field]) res = (type == "ASC" ? -1 : 1);
      else res = 0;

      //(2) return
      return res;
    });
  }
}
