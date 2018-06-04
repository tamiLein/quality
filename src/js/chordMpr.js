import _ from 'underscore';

//*******************************************************************
//  CHORD MAPPER
//*******************************************************************

export default function chordMpr (data) {
  let mpr = {}, mmap = {}, n = 0,
      matrix = [], filter, accessor;

      mpr.setFilter = function (fun) {
        filter = fun;
        return this;
      };
      mpr.setAccessor = function (fun) {
        accessor = fun;
        return this;
      };
      mpr.getMatrix = function () {
        matrix = [];

        _.each(mmap, function (a) {
                    if (!matrix[a.id]) matrix[a.id] = [];
          _.each(mmap, function (b) {
            let recs = _.filter(data, function (row) {
              return filter(row, a, b);
            });
            matrix[a.id][b.id] = accessor(recs, a, b);
          });
        });
        return matrix;
      };
      mpr.getMap = function () {
        return mmap;
      };
      mpr.printMatrix = function () {
        _.each(matrix, function (elem) {
        })
      };
      mpr.addToMap = function (value, info) {
        if (!mmap[value]) {
          mmap[value] = { name: value, id: n++, data: info };
        }
      };
      mpr.addValuesToMap = function (varName, info) {
        let values = _.uniq(_.pluck(data, varName));

        _.map(values, function (v) {
          if (!mmap[v]) {
            mmap[v] = { name: v, id: n++, data: info };
          }
        });
        return this;
      };
  return mpr;
}