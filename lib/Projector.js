export default class Projector {
  /**
   * Projects the specified fields.
   *
   * @overload
   * @param doc:object      The source document.
   * @param fields:string[] The fields to project.
   * @param opts?:object    The options.
   * @return object
   *
   * @overload
   * @param doc:object      The source document.
   * @param fields:object   The fields to project.
   * @param opts?:object    The options.
   * @return object
   *
   * @overload
   * @param docs:object[]   The source documents.
   * @param fields:string[] The fields to project.
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
    var res;

    //(1) arguments
    if (!fields) fields = {};

    //(2) project
    if (Object.keys(fields).length === 0) {
      res = docs;
    } else {
      if (docs instanceof Array) {
        res = [];
        for (let doc of docs) res.push(prjDoc(doc, fields, opts));
      } else {
        res = prjDoc(docs, fields, opts);
      }
    }

    //(3) return
    return res;
  }
}

function prjDoc(doc, fields, opts) {
  var res;

  //(1) project
  res = {};

  if (typeof(fields) == "string") {
    if (opts.top) res = doc[fields];
    else prjField(doc, fields, fields, res);
  } else if (fields instanceof Array) {
    for (let field of fields) prjField(doc, field, field, res);
  } else {
    for (let field in fields) prjField(doc, field, fields[field], res);
  }

  //(2) return
  return res;
}

function prjField(doc, name, alias, row) {
  if (doc.hasOwnProperty(name)) row[alias] = doc[name];
}
