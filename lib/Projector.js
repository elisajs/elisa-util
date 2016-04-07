export default class Projector {
  /**
   * Projects the specified fields.
   *
   * @overload
   * @param docs:object[]   The source documents.
   * @param fields:object[] The fields to project.
   * @param opts?:object    The options: top (boolean).
   * @return object[]
   *
   * @overload
   * @param docs:object[]   The source documents.
   * @param field:object    The field to project.
   * @param opts?:object    The options: top (boolean).
   * @return object[]
   */
  project(docs, fields, opts = {}) {
    var rows;

    //(1) project
    rows = [];

    for (let doc of docs) {
      let row = {};

      if (typeof(fields) == "string") {
        if (opts.top) row = doc[fields];
        else  prj(doc, fields, fields, row);
      } else if (fields instanceof Array) {
        for (let field of fields) prj(doc, field, field, row);
      } else {
        for (let field in fields) prj(doc, field, fields[field], row);
      }

      rows.push(row);
    }

    //(2) return
    return rows;
  }
}

function prj(doc, name, alias, row) {
  if (doc.hasOwnProperty(name)) row[alias] = doc[name];
}
