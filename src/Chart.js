import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Dividing all people data into separate group by 'param' value
const generateStats = (data, param) => {
  return data
    .reduce((stats, curPerson) => {
      if (curPerson.score) {
        const curGroupObj = stats.find(
          groupObj => groupObj.label === curPerson[param]
        );
        if (curGroupObj) {
          curGroupObj.scoreArr.push(curPerson.score);
        } else {
          stats.push({
            label: curPerson[param],
            scoreArr: [curPerson.score],
          });
        }
      }
      return stats;
    }, [])
    .map(({ label, scoreArr }) => ({
      label: label !== null ? label : "Not specified",
      score:
        scoreArr.reduce((totalScore, curScore) => totalScore + curScore, 0) /
        scoreArr.length,
    }))
    .sort((bar1, bar2) => bar2.score - bar1.score);
};

export default function Chart(props) {
  const { data, xValue, width, aspect } = props;
  const chartData = generateStats(data, xValue);

  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer width={width} aspect={aspect}>
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="label" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Average score
            </Label>
          </YAxis>
          <Bar
            isAnimationActive={false}
            type="monotone"
            dataKey="score"
            fill="#556CD6"
          />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
