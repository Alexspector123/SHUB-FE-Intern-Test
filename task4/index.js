import axios from "axios";

async function main() {
  try {
    const getRes = await axios.get(
      "https://share.shub.edu.vn/api/intern-test/input"
    );
    const { token, data, query } = getRes.data;

    const n = data.length;

    const prefixSum = Array(n + 1).fill(0);
    for (let i = 1; i < n; i++) {
      prefixSum[i + 1] = prefixSum[i] + data[i];
    }

    const prefixSum2 = Array(n + 1).fill(0);
    for (let i = 1; i < n; i++) {
      if (i % 2 === 0) {
        prefixSum2[i + 1] = prefixSum2[i] + data[i];
      } else {
        prefixSum2[i + 1] = prefixSum2[i] - data[i];
      }
    }

    const result = query.map((q) => {
      let [l, r] = q.range;
      l -= 1;
      r -= 1;

      if (q.type === 1) {
        return prefixSum[r + 1] - prefixSum[l];
      } else {
        let s = prefixSum2[r + 1] - prefixSum2[l];
        if (l % 2 === 0) {
          return s;
        } else {
          return -s;
        }
      }
    });

    console.log("Result: ", result);

    const postRes = await axios.post(
      "https://share.shub.edu.vn/api/intern-test/output",
      result,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Post response: ", postRes.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();
