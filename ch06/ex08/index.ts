import * as _ from "lodash";
/**
 * 引数
 * `target` 削除先オブジェクト —
 *          削除対象プロパティを適用するもので、オリジナル変更後に返されます。
 *          Symbol と継承プロパティは削除対象外です。
 * `template` テンプレートオブジェクト —
 *          このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。
 *          継承プロパティはテンプレートオブジェクトに存在していても
 *          削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。
 * 返値
 * 削除先オブジェクトです。
 */
export function restrict(target: Object, template: Object) {
  for (const tarKey of Object.keys(target)) {
    if (
      // templateの独自プロパティに対象となるキーがあるかを判別した後、等しいかどうかを判定する。
      // 予め「templateの独自プロパティに対象となるキーがあるかを判別」することでtemplateの継承プロパティを見ることを避ける。
      Object.keys(template).some((x) => x === tarKey) &&
      _.isEqual(target[tarKey], template[tarKey])
    ) {
      continue;
    }
    delete target[tarKey];
  }
  return target;
}

const o1 = { a: {} };
console.log(_.isObject(o1["a"]));

/**
 * 引数
 *  `target` 削除先オブジェクト —
 *          削除対象プロパティを適用するもので、オリジナル変更後に返されます。
 *          Symbol と継承プロパティは削除対象外です。
 * `sources` 削除対象指定オブジェクト (単数または複数) —
 *           削除したいプロパティを含むオブジェクトです。
 *           Symbol と継承プロパティは削除対象になりません。
 * 返値
 * 削除先オブジェクトです。
 */
export function substract(target: Object, ...sources: Object[]) {
  for (const tarKey of Object.keys(target)) {
    // sources内のオブジェクトを一つずつ取り出して確認し、削除対象と合致する場合は削除処理をした上で、targetの次のループに移る。
    for (const template of sources) {
      if (
        // templateの独自プロパティに対象となるキーがあるかを判別した後、等しいかどうかを判定する。
        // 予め「templateの独自プロパティに対象となるキーがあるかを判別」することでtemplateの継承プロパティを見ることを避ける。
        Object.keys(template).some((x) => x === tarKey) &&
        _.isEqual(target[tarKey], template[tarKey])
      ) {
        delete target[tarKey];
        break;
      }
    }
  }
  return target;
}
