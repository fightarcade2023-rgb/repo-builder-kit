import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, MapPin } from "lucide-react";
import { getMarketplaceOrders } from "@/utils/marketplaceSync";

export default function MarketplaceSlide() {
  const orders = getMarketplaceOrders().filter(o => o.status === 'pendente');

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <ShoppingBag className="w-16 h-16 text-green-400" />
          <h2 className="text-6xl font-bold text-white">PEDIDOS MARKETPLACE</h2>
        </div>
        <Badge className="bg-green-600 text-white text-2xl px-8 py-3">
          {orders.length} Pedido{orders.length !== 1 ? 's' : ''} Pendente{orders.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-white/50" />
            <p className="text-3xl text-white">Nenhum pedido pendente! 🎉</p>
          </div>
        ) : (
          orders.slice(0, 6).map((order) => (
            <Card key={order.id} className="bg-white/95 backdrop-blur border-2 border-green-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">#{order.order_number}</p>
                    <p className="text-lg text-slate-600">{order.customer_name}</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white text-lg px-4 py-1">
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-lg">
                      <span className="font-medium">{item.product}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">Qtd: {item.quantity}</span>
                        {item.location && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
