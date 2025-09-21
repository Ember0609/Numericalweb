import { Box } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function NewtonChart({ history, f }) {
  if (!history || history.length === 0) return null;

  // 1. สร้าง data สำหรับฟังก์ชัน f(x)
  const xValues = [];
  const allX = history.map((h) => [h.x0, h.x1]).flat();
  const xMin = Math.min(...allX) - 1;
  const xMax = Math.max(...allX) + 1;
  const step = (xMax - xMin) / 100;

  for (let x = xMin; x <= xMax; x += step) {
    xValues.push({ x, fx: f(x) });
  }

  // 2. เตรียม tangent lines ของแต่ละ iteration
  const tangents = history.map((h, i) => [
    { x: h.x0, y: h.fx },
    { x: h.x1, y: 0 },
  ]);

  return (
    <Box w="100%" h="400px" bg="white" border="1px solid #ccc" borderRadius="md" p={4}>
      <ResponsiveContainer width="100%" height={400}>
  <LineChart data={xValues}>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    <XAxis dataKey="x" />
    <YAxis />
    <Tooltip />

    {/* เส้นฟังก์ชัน */}
    <Line type="monotone" dataKey="fx" stroke="green" dot={false} />

    {/* จุด iteration */}
    {history.map((h, i) => (
      <Line
        key={i}
        type="linear"
        data={[
          { x: h.x0, y: h.fx },
          { x: h.x1, y: 0 }
        ]}
        dataKey="y"
        stroke="blue"
        dot={{ stroke: "red", r: 4 }}
      />
    ))}
  </LineChart>
</ResponsiveContainer>

    </Box>
  );
}
