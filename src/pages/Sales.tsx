import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import SaleForm from "../components/sales/SaleForm";

export default function Sales() {
  const queryClient = useQueryClient();
  const [editingSale, setEditingSale] = useState(null);

  const { data: sales = [] } = useQuery({
    queryKey: ['sales'],
    queryFn: () => base44.entities.Sale.list("-created_date"),
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Sale.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => base44.entities.Sale.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      setEditingSale(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => base44.entities.Sale.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    },
  });

  const handleSubmit = (saleData: any) => {
    if (editingSale) {
      updateMutation.mutate({ id: (editingSale as any).id, data: saleData });
    } else {
      createMutation.mutate(saleData);
    }
  };

  const handleEdit = (sale: any) => {
    setEditingSale(sale);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta venda?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingSale(null);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Vendas</h1>
          <p className="text-slate-600">Registre e acompanhe todas as vendas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <SaleForm 
              products={products} 
              onSubmit={handleSubmit} 
              initialData={editingSale} 
              onCancel={handleCancelEdit} 
            />
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Data</TableHead>
                        <TableHead className="font-semibold">Produto</TableHead>
                        <TableHead className="font-semibold">Cliente</TableHead>
                        <TableHead className="font-semibold">Qtd</TableHead>
                        <TableHead className="font-semibold">Receita</TableHead>
                        <TableHead className="font-semibold">Lucro</TableHead>
                        <TableHead className="font-semibold text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.map((sale: any) => (
                        <TableRow key={sale.id} className="hover:bg-slate-50">
                          <TableCell>
                            {sale.sale_date ? format(new Date(sale.sale_date), "dd/MM/yyyy") : "-"}
                          </TableCell>
                          <TableCell className="font-medium">{sale.product_name}</TableCell>
                          <TableCell>{sale.customer_name || "-"}</TableCell>
                          <TableCell>{sale.quantity}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            R$ {sale.total_revenue?.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary"
                              className={(sale.total_profit || 0) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              R$ {sale.total_profit?.toFixed(2)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(sale)}
                              className="mr-1"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(sale.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
