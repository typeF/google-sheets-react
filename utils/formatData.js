export const formatData = (data) => {
  return data
    .slice(1)
    .filter(rowNotEmpty)
    .map((row) => {
      return {
        row: "zzz",
        so: row[0],
        rma: row[1],
        done: row[2],
        received: row[3] ? row[3] : "",
        completed: row[4] ? row[4] : "",
        part: row[5] ? row[5] : "",
        qty: row[6] ? row[6] : "",
        note: row[7] ? row[7] : "",
        coord: ["A1", "C2"],
      };
    });
};

const rowNotEmpty = (row) => {
  if (row.length === 0 || (row[0] === "" && row[1] === "")) {
    return false;
  }
  return true;
};

export const getTotalCount = (data) => {
  return data.slice(1).filter(rowNotEmpty).length;
};
