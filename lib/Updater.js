export default class Updater {
  /**
   * Update a document.
   *
   * @param doc:object  The documento to update.
   * @param upd:object  The update document.
   */
  update(doc, upd) {
    for (let field in upd) {
      let op = upd[field];

      if (["number", "string", "boolean"].indexOf(typeof(op)) >= 0 || op instanceof Array) {
        set(doc, field, op);
      } else {
        for (let optor in op) {
          let value = op[optor];

          switch (optor) {
            case "$set": set(doc, field, value); break;
            case "$inc": inc(doc, field, value); break;
            case "$dec": dec(doc, field, value); break;
            case "$mul": mul(doc, field, value); break;
            case "$div": div(doc, field, value); break;
            case "$add": add(doc, field, value); break;
            case "$push": push(doc, field, value); break;
            case "$concat": concat(doc, field, value); break;
            case "$pop": pop(doc, field, value); break;
            default: throw new Error(`Invalid operator: '${optor}'.`);
          }
        }
      }
    }
  }
}

function set(doc, field, value) {
  doc[field] = value;
}

function inc(doc, field, value) {
  doc[field] += value;
}

function dec(doc, field, value) {
  doc[field] -= value;
}

function mul(doc, field, value) {
  doc[field] *= value;
}

function div(doc, field, value)  {
  doc[field] /= value;
}

function add(doc, field, value) {
  if (doc[field].indexOf(value) < 0) doc[field].push(value);
}

function push(doc, field, value) {
  doc[field].push(value);
}

function concat(doc, field, value) {
  var coll = doc[field];

  if (coll instanceof Array) doc[field] = coll.concat(value);
  else if (typeof(coll) == "string") doc[field] += value;
  else throw new Error("Invalid $concat.");
}

function pop(doc, field, value) {
  for (let i = 0; i < value; ++i) doc[field].pop();
}
