// 特定の年と月を数値の引数で受け取り、その月の日数を返す関数
export function getNumberOfDays(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getPeriod(stateDate: string, endDate: string) {
  const pStateDate = new Date(stateDate);
  const pEndDate = new Date(endDate);
  let count = 0;
  for (let i = pStateDate; i <= pEndDate; i.setDate(i.getDate() + 1)) {
    const day = i.getDay();
    if (day !== 0 && day !== 6) {
      count++;
    }
  }
  return count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getLocaleDay(date: string, locale: string) {
  const d = new Date(date);
  return d.toLocaleDateString(locale, { weekday: "long" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getLastMonthFirstDate() {
  const today = new Date();
  const year = today.getFullYear();
  const sMonth = today.toISOString().slice(5, 7);
  const month = parseInt(sMonth, 10);

  let lastMonth: Date;
  if (month === 1) {
    lastMonth = new Date(`${year - 1}-12-01T00:00:00`);
  } else {
    const lMonth = String(month - 1).padStart(2, "0");
    lastMonth = new Date(`${year}-${lMonth}-01T00:00:00`);
  }
  return lastMonth;
}
