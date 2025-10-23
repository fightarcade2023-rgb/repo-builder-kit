import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Truck } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Assets() {
  const queryClient = useQueryClient();
  const [editingAsset, setEditingAsset] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: () => base44.entities.Asset.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => base44.entities.Asset.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast.success("Ativo cadastrado com sucesso!");
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => base44.entities.Asset.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast.success("Ativo atualizado com sucesso!");
      setEditingAsset(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => base44.entities.Asset.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      toast.success("Ativo excluído com sucesso!");
    },
  });

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Máquinas e Veículos</h1>
          <p className="text-slate-600">Gerencie os ativos da sua empresa</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => { setShowForm(!showForm); setEditingAsset(null); }}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            <Truck className="w-4 h-4 mr-2" />
            Novo Ativo
          </Button>
        </div>

        {showForm && (
          <AssetForm
            initialData={editingAsset}
            onSubmit={(data) => {
              if (editingAsset) {
                updateMutation.mutate({ id: editingAsset.id, data });
              } else {
                createMutation.mutate(data);
              }
            }}
            onCancel={() => { setShowForm(false); setEditingAsset(null); }}
          />
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Identificação</TableHead>
                  <TableHead>Data Aquisição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset: any) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.asset_name}</TableCell>
                    <TableCell>{asset.asset_type}</TableCell>
                    <TableCell>{asset.identification || "-"}</TableCell>
                    <TableCell>
                      {asset.acquisition_date ? format(new Date(asset.acquisition_date), "dd/MM/yyyy") : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { setEditingAsset(asset); setShowForm(true); }}
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (window.confirm("Deseja excluir este ativo?")) {
                            deleteMutation.mutate(asset.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AssetForm({ initialData, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState(initialData || {
    asset_name: "",
    asset_type: "maquina",
    model: "",
    serial_number: "",
    identification: "",
    acquisition_value: 0,
    acquisition_date: new Date().toISOString().split('T')[0],
    maintenance_history: []
  });

  const addMaintenanceEntry = () => {
    setFormData({
      ...formData,
      maintenance_history: [
        ...(formData.maintenance_history || []),
        { description: "", cost: 0, date: new Date().toISOString().split('T')[0] }
      ]
    });
  };

  const updateMaintenanceEntry = (index: number, field: string, value: any) => {
    const updated = [...(formData.maintenance_history || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, maintenance_history: updated });
  };

  const removeMaintenanceEntry = (index: number) => {
    const updated = formData.maintenance_history.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, maintenance_history: updated });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardTitle>{initialData ? 'Editar' : 'Novo'} Ativo</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nome *</Label>
              <Input
                value={formData.asset_name}
                onChange={(e) => setFormData({ ...formData, asset_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={formData.asset_type} onValueChange={(v) => setFormData({ ...formData, asset_type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maquina">Máquina</SelectItem>
                  <SelectItem value="veiculo">Veículo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Ano/Modelo</Label>
              <Input
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div>
              <Label>Placa/Nº de Série</Label>
              <Input
                value={formData.serial_number}
                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Valor de Aquisição (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.acquisition_value}
                onChange={(e) => setFormData({ ...formData, acquisition_value: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label>Data de Aquisição</Label>
              <Input
                type="date"
                value={formData.acquisition_date}
                onChange={(e) => setFormData({ ...formData, acquisition_date: e.target.value })}
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <Label className="text-base font-semibold">Histórico de Manutenção</Label>
              <Button type="button" onClick={addMaintenanceEntry} size="sm" variant="outline">
                + Adicionar
              </Button>
            </div>
            
            {formData.maintenance_history?.map((entry: any, index: number) => (
              <div key={index} className="grid md:grid-cols-[2fr,1fr,1fr,auto] gap-3 mb-3 p-3 bg-slate-50 rounded-lg">
                <div>
                  <Label className="text-xs">Descrição</Label>
                  <Input
                    value={entry.description}
                    onChange={(e) => updateMaintenanceEntry(index, 'description', e.target.value)}
                    placeholder="Descrição da manutenção"
                  />
                </div>
                <div>
                  <Label className="text-xs">Custo (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={entry.cost}
                    onChange={(e) => updateMaintenanceEntry(index, 'cost', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Data</Label>
                  <Input
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateMaintenanceEntry(index, 'date', e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMaintenanceEntry(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-green-600">
              Salvar Ativo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
