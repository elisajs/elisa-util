//imports
import Checker from "./Checker";

//internal data
const check = new Checker().check;

/**
 * A filter.
 */
export default class Filter {
  /**
   * Filter the documents that validate a given query.
   *
   * @param docs:object[] The documents.
   * @param query:object  The filter object.
   * @return object[]
   */
  filter(docs, query) {
    var res;

    //(1) check
    res = [];

    for (let doc of docs) {
      if (check(doc, query)) res.push(doc);
    }

    //(2) return result
    return res;
  }
}
