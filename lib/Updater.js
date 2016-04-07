export default class Updater {
  set(doc, field, value) {
    doc[field] = value;
  }

  inc(doc, field, value) {
    doc[field] += value;
  }

  dec(doc, field, value) {
    doc[field] -= value;
  }

  mul(doc, field, value) {
    doc[field] *= value;
  }

  div(doc, field, value)  {
    doc[field] /= value;
  }

  add(doc, field, value) {
    if (doc[field].indexOf(value) < 0) doc[field].push(value);
  }

  push(doc, field, value) {
    doc[field].push(value);
  }

  concat(doc, field, value) {
    var coll = doc[field];

    if (coll instanceof Array) doc[field] = coll.concat(value);
    else if (typeof(coll) == "string") doc[field] += value;
    else throw new Error("Invalid $concat.");
  }

  pop(doc, field, value) {
    for (let i = 0; i < value; ++i) doc[field].pop();
  }

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
        this.set(doc, field, op);
      } else {
        for (let optor in op) {
          let value = op[optor];

          switch (optor) {
            case "$set": this.set(doc, field, value); break;
            case "$inc": this.inc(doc, field, value); break;
            case "$dec": this.dec(doc, field, value); break;
            case "$mul": this.mul(doc, field, value); break;
            case "$div": this.div(doc, field, value); break;
            case "$add": this.add(doc, field, value); break;
            case "$push": this.push(doc, field, value); break;
            case "$concat": this.concat(doc, field, value); break;
            case "$pop": this.pop(doc, field, value); break;
            default: throw new Error(`Invalid operator: '${optor}'.`);
          }
        }
      }
    }
  }
}

function set(doc, value) {

}
