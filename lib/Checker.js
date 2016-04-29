/**
 * A checker.
 */
export default class Checker {
  /**
   * Check whether a document validates a given query.
   *
   * @param doc:object
   * @param query:object
   * @return boolean
   */
  check(doc, query) {
    var res;

    //(1) check
    res = true;

    for (let field in query) {
      let op = query[field];

      if (["number", "string", "boolean"].indexOf(typeof(op)) >= 0 || op instanceof Array) {
        res = eq(doc, field, op);
      } else {
        for (let optor in op) {
          let value = op[optor];

          switch (optor) {
            case "$eq": res = eq(doc, field, value); break;
            case "$neq": case "$ne": res = neq(doc, field, value); break;
            case "$lt": res = lt(doc, field, value); break;
            case "$lte": case "$le": res = lte(doc, field, value); break;
            case "$gt": res = gt(doc, field, value); break;
            case "$gte": case "$ge": res = gte(doc, field, value); break;
            case "$between": res = between(doc, field, value); break;
            case "$nbetween": case "$notBetween": res = nbetween(doc, field, value); break;
            case "$like": res = like(doc, field, value); break;
            case "$nlike": case "$notLike": res = nlike(doc, field, value); break;
            case "$contain": res = contain(doc, field, value); break;
            case "$ncontain": case "$notContain": res = ncontain(doc, field, value); break;
            case "$in": res = iin(doc, field, value); break;
            case "$nin": case "$notIn": res = nin(doc, field, value); break;
            default: throw new Error(`Invalid operator: '${optor}'.`);
          }
        }
      }

      if (!res) break;
    }

    //(2) return result
    return res;
  }
}

function eq(doc, field, value) {
  return doc[field] == value;
}

function neq(doc, field, value) {
  return doc[field] != value;
}

function lt(doc, field, value) {
  return doc[field] < value;
}

function lte(doc, field, value) {
  return doc[field] <= value;
}

function gt(doc, field, value) {
  return doc[field] > value;
}

function gte(doc, field, value) {
  return doc[field] >= value;
}

function between(doc, field, value) {
  return doc[field] >= value[0] && doc[field] <= value[1];
}

function nbetween(doc, field, value) {
  return !between(doc, field, value);
}

function like(doc, field, value) {
  if (!(value instanceof RegExp)) value = new RegExp(value);
  return value.test(doc[field]);
}

function nlike(doc, field, value) {
  return !like(doc, field, value);
}

function contain(doc, field, value) {
  return (doc[field].indexOf(value) >= 0);
}

function ncontain(doc, field, value) {
  return !contain(doc, field, value);
}

function iin(doc, field, value) {
  return (value.indexOf(doc[field]) >= 0);
}

function nin(doc, field, value) {
  return !iin(doc, field, value);
}
