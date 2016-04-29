//imports
import lodash from "lodash";

/**
 * A sorter.
 */
export default class Sorter {
  /**
   * Sort the specified documents.
   *
   * @param docs:object[] The documents to sort.
   * @param fields:object The fields to set the order.
   * @return object[]
   */
  sort(docs, fields) {
    var ff, oo;

    //(1)  get fields and orders
    ff = [];
    oo = [];

    for (let field in fields) {
      ff.push(field);
      oo.push(fields[field].toLowerCase());
    }

    //(2) sort
    return lodash.orderBy(docs, ff, oo);
  }
}
