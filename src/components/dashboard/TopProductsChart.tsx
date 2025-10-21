import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package } from "lucide-react";

interface TopProductsChartProps {
  data: Array<{ name: string; quantity: number }>;
}

export default function TopProductsChart({ data }: TopProductsChartProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md border-0">
      <CardHeader className="p-6">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-slate-900">Produtos Mais Vendidos</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              angle={-15}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
