import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Printer, Copy } from "lucide-react";
import ProductForm from "../components/products/ProductForm";

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selected, setSelected] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list("-created_date"),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Product.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      setEditingProduct(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => base44.entities.Product.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      setEditingProduct(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => base44.entities.Product.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (productData: any) => {
    if (editingProduct?.id) {
      updateMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createMutation.mutate(productData);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleClone = (product: any) => {
    const { id, created_date, updated_date, ...clonedData } = product;
    setEditingProduct({
      ...clonedData,
      product_name: clonedData.product_name,
      variation_name: `${clonedData.variation_name} (Cópia)`,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? products.map((p: any) => p.id) : []);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={showForm} onOpenChange={setShowForm}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 no-print">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 printable-page-title">Produtos e Custos</h1>
              <p className="text-slate-600">Gerencie seus produtos e variações</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" /> Imprimir</Button>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(null)} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="w-5 h-5 mr-2" /> Novo Produto
                </Button>
              </DialogTrigger>
            </div>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 no-print"><Checkbox onCheckedChange={handleSelectAll} /></TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Variação</TableHead>
                    <TableHead>Custo Total</TableHead>
                    <TableHead>Preço Venda</TableHead>
                    <TableHead>Margem</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead className="text-right no-print">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell className="no-print"><Checkbox checked={selected.includes(product.id)} onCheckedChange={() => handleSelect(product.id)} /></TableCell>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.variation_name}</TableCell>
                      <TableCell>R$ {product.total_cost?.toFixed(2)}</TableCell>
                      <TableCell>R$ {product.sale_price?.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={(product.profit_margin || 0) > 0 ? "default" : "destructive"}>
                          {product.profit_margin?.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell className="text-right no-print">
                        <Button variant="ghost" size="icon" onClick={() => handleClone(product)}><Copy className="w-4 h-4 text-gray-500" /></Button>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}><Edit className="w-4 h-4 text-blue-600" /></Button>
                        </DialogTrigger>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <DialogContent className="max-w-4xl no-print">
        <DialogHeader>
          <DialogTitle>{editingProduct?.id ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
