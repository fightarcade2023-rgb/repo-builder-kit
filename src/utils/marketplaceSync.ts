// Utilitários para sincronização de pedidos de marketplace

interface MarketplaceOrder {
  id: string;
  order_number: string;
  customer_name: string;
  items: { product: string; quantity: number; location?: string }[];
  status: "pendente" | "separando" | "concluido" | "concluído";
  created_date: string;
  created_at?: string;
  completed_by?: string;
}

const STORAGE_KEY = 'marketplace_orders';

export function initializeMarketplaceStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export function validateAndNormalizeOrders(): MarketplaceOrder[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const orders = JSON.parse(stored);
    const normalized = orders.map((order: any) => ({
      ...order,
      status: order.status === 'concluído' ? 'concluido' : order.status,
      created_date: order.created_date || order.created_at || new Date().toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (error) {
    console.error('Erro ao normalizar pedidos:', error);
    return [];
  }
}

export function updateOrderStatus(orderId: string, status: MarketplaceOrder['status'], completedBy?: string) {
  const orders = validateAndNormalizeOrders();
  const updatedOrders = orders.map(order => 
    order.id === orderId 
      ? { ...order, status, completed_by: completedBy }
      : order
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  return updatedOrders;
}

export function addMarketplaceOrder(order: Omit<MarketplaceOrder, 'id' | 'created_date'>) {
  const orders = validateAndNormalizeOrders();
  const newOrder: MarketplaceOrder = {
    ...order,
    id: `order_${Date.now()}`,
    created_date: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return newOrder;
}

export function getMarketplaceOrders(): MarketplaceOrder[] {
  return validateAndNormalizeOrders();
}
