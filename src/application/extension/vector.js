const nj = require('numjs');

const cosinesim = (A, B) => {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (let i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / mA * mB;
    return similarity;
};

const sum = vectors => {
    if (!vectors) return;
    if (vectors.length == 0) return;
    let base = vectors
        .map(val => nj.array(val))
        .reduce((s, vector) => s.add(vector));
    return base.tolist().length == 0
        ? Array.apply(null, Array(vectors[0].length)).map(function() {
              return 0;
          })
        : base.tolist();
};

const sub = (vec1, vec2) => {
    if (!vec1 || !vec2) return;
    if (vec1.length == 0 || vec2.length == 0) return;
    let base = nj.array(vec1).subtract(nj.array(vec2));
    return base.tolist().length == 0
        ? Array.apply(null, Array(vec1.length)).map(function() {
              return 0;
          })
        : base.tolist();
};

module.exports = {
    cosinesim,
    sum,
    sub,
};
