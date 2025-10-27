import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ManualOrderFormProps {
  onSubmit: (order: any) => void;
  onCancel: () => void;
}

export function ManualOrderForm({ onSubmit, onCancel }: ManualOrderFormProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ product: '', quantity: 1, location: '' }]);

  const addItem = () => {
    setItems([...items, { product: '', quantity: 1, location: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      order_number: orderNumber,
      customer_name: customerName,
      items,
      status: 'pendente'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Pedido Manual</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Número do Pedido</Label>
            <Input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label>Nome do Cliente</Label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Itens do Pedido</Label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Produto"
                  value={item.product}
                  onChange={(e) => updateItem(index, 'product', e.target.value)}
                  required
                />
                <Input
                  type="number"
                  placeholder="Qtd"
                  className="w-20"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                  required
                />
                <Input
                  placeholder="Localização"
                  value={item.location}
                  onChange={(e) => updateItem(index, 'location', e.target.value)}
                />
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Item
            </Button>
          </div>

          <div className="flex gap-2">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
