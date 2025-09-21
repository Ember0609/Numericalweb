import { Box}from "@chakra-ui/react";
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";

export default function OnePointChart({ data }) {
    if (!data || data.length === 0) return null;

    return (
        <Box w="100%" h="400px" bg="white" border="1px solid #ccc" borderRadius="md" p={4}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis
                        dataKey="x"
                        type="number"
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 12 }}
                        label={{ value: "X", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                        type="number"
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => {
                            if (Math.abs(value) >= 1000) {
                                return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
                            }
                            return value.toFixed(2);
                        }}
                        label={{ value: "F(x)", angle: -90, position: "insideLeft", offset: 1 }}
                    />
                    <ReferenceLine x={0} stroke="black" strokeDasharray="3 3" />
                    <ReferenceLine y={0} stroke="black" strokeDasharray="3 3" />
                    <Tooltip
                        formatter={(value) => {
                            if (Math.abs(value) >= 1000) {
                                return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
                            }
                            return value.toFixed(6);
                        }}
                        labelFormatter={(label) => `X: ${label}`}
                    />
                    <Line
                        type="monotone"
                        dataKey="fx"
                        stroke="green"
                        strokeWidth={2}
                        dot={{ stroke: "red", strokeWidth: 2, r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}