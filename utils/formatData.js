export const formatData = (data) => {
  const arr = data
    .map((row, i) => {
      return {
        row: i + 1,
        so: row[0] ? row[0] : "",
        rma: row[1] ? row[1] : "",
        done: row[2] ? row[2] : "",
        received: row[3] ? row[3] : "",
        completed: row[4] ? row[4] : "",
        part: row[5] ? row[5] : "",
        qty: row[6] ? row[6] : "",
        note: row[7] ? row[7] : "",
      };
    })
    .slice(1)
    .filter(rowNotEmpty);
  return arr;
};

const rowNotEmpty = (row) => {
  if (
    row.so === "" &&
    row.rma === "" &&
    row.received === "" &&
    row.completed === ""
  ) {
    return false;
  }
  return true;
};

export const getTotalCount = (data) => {
  return data.slice(1).filter(rowNotEmpty).length;
};
