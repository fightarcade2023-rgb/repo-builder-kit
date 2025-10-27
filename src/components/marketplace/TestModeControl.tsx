import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addMarketplaceOrder } from "@/utils/marketplaceSync";
import { toast } from "sonner";

export function TestModeControl() {
  const addTestOrder = () => {
    const testOrder = {
      order_number: `TEST-${Date.now()}`,
      customer_name: 'Cliente Teste',
      items: [
        { product: 'Produto Teste 1', quantity: 2, location: 'A1' },
        { product: 'Produto Teste 2', quantity: 1, location: 'B3' }
      ],
      status: 'pendente' as const
    };
    
    addMarketplaceOrder(testOrder);
    toast.success('Pedido de teste adicionado!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modo de Teste</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={addTestOrder}>
          Adicionar Pedido de Teste
        </Button>
      </CardContent>
    </Card>
  );
}
