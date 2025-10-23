import { base44 } from "@/api/base44Client";

export const createDemoData = async () => {
  try {
    // Produtos demo
    const demoProducts = [
      {
        product_name: "Cadeira Gamer Pro",
        variation: "Preta com LED RGB",
        components: "Estrutura de aço, espuma de alta densidade, couro sintético",
        component_cost: 250.00,
        production_cost: 80.00,
        sale_price: 899.90,
        quantity: 15,
        total_cost: 330.00,
        profit: 569.90,
        profit_margin: 63.33
      },
      {
        product_name: "Mesa para Escritório",
        variation: "Madeira MDF 120x60cm",
        components: "MDF, pés de metal",
        component_cost: 180.00,
        production_cost: 50.00,
        sale_price: 549.90,
        quantity: 8,
        total_cost: 230.00,
        profit: 319.90,
        profit_margin: 58.17
      },
      {
        product_name: "Estante Modular",
        variation: "6 prateleiras - Branca",
        components: "MDF, suportes metálicos, parafusos",
        component_cost: 120.00,
        production_cost: 40.00,
        sale_price: 399.90,
        quantity: 12,
        total_cost: 160.00,
        profit: 239.90,
        profit_margin: 60.00
      }
    ];

    // Clientes demo
    const demoCustomers = [
      {
        name: "João Silva",
        email: "joao.silva@email.com",
        phone: "(11) 98765-4321",
        address: "Rua das Flores, 123 - São Paulo, SP",
        notes: "Cliente VIP - desconto 10%"
      },
      {
        name: "Maria Santos",
        email: "maria.santos@email.com",
        phone: "(21) 97654-3210",
        address: "Av. Principal, 456 - Rio de Janeiro, RJ",
        notes: "Prefere pagamento à vista"
      },
      {
        name: "Tech Solutions Ltda",
        email: "contato@techsolutions.com",
        phone: "(11) 3456-7890",
        address: "Rua Comercial, 789 - São Paulo, SP",
        notes: "Empresa - Pedidos recorrentes"
      }
    ];

    // Fornecedores demo
    const demoSuppliers = [
      {
        supplier_name: "Madeiras Brasil Ltda",
        cnpj: "12.345.678/0001-90",
        contact_person: "Carlos Mendes",
        email: "vendas@madeirasbrasil.com",
        phone: "(11) 4567-8901",
        address: "Av. Industrial, 1000 - São Paulo, SP",
        notes: "Fornecedor principal de MDF"
      },
      {
        supplier_name: "Ferragens & Metais",
        cnpj: "98.765.432/0001-01",
        contact_person: "Ana Paula",
        email: "contato@ferragensmetais.com",
        phone: "(11) 4321-0987",
        address: "Rua das Indústrias, 500 - Guarulhos, SP",
        notes: "Pés de metal e estruturas"
      }
    ];

    // Funcionários demo
    const demoEmployees = [
      {
        name: "Pedro Oliveira",
        position: "Marceneiro Senior",
        department: "Produção",
        email: "pedro.oliveira@empresa.com",
        phone: "(11) 91234-5678",
        salary: 3500.00,
        hire_date: "2022-01-15",
        address: "Rua A, 100 - São Paulo, SP",
        notes: "Especialista em móveis planejados"
      },
      {
        name: "Juliana Costa",
        position: "Designer",
        department: "Design",
        email: "juliana.costa@empresa.com",
        phone: "(11) 91234-5679",
        salary: 4000.00,
        hire_date: "2021-06-01",
        address: "Rua B, 200 - São Paulo, SP",
        notes: "Responsável pelos projetos customizados"
      }
    ];

    // Materiais demo
    const demoMaterials = [
      {
        material_name: "Chapa MDF 18mm",
        supplier_name: "Madeiras Brasil Ltda",
        quantity: 50,
        minimum_quantity: 20,
        unit_cost: 85.00,
        notes: "Cor branca texturizada"
      },
      {
        material_name: "Pé de Metal para Mesa",
        supplier_name: "Ferragens & Metais",
        quantity: 30,
        minimum_quantity: 15,
        unit_cost: 25.00,
        notes: "Altura regulável 70-75cm"
      },
      {
        material_name: "Dobradiça de Aço",
        supplier_name: "Ferragens & Metais",
        quantity: 100,
        minimum_quantity: 50,
        unit_cost: 3.50,
        notes: "Modelo invisível"
      }
    ];

    // Despesas demo
    const demExpenses = [
      {
        expense_name: "Energia Elétrica",
        category: "Utilidades",
        value: 850.00,
        expense_date: new Date().toISOString().split('T')[0],
        notes: "Conta mensal da fábrica"
      },
      {
        expense_name: "Aluguel do Galpão",
        category: "Instalações",
        value: 3500.00,
        expense_date: new Date().toISOString().split('T')[0],
        notes: "Aluguel mensal"
      }
    ];

    // Criar produtos
    console.log("Criando produtos demo...");
    await base44.entities.Product.bulkCreate(demoProducts);
    
    // Criar clientes
    console.log("Criando clientes demo...");
    await base44.entities.Customer.bulkCreate(demoCustomers);
    
    // Criar fornecedores
    console.log("Criando fornecedores demo...");
    await base44.entities.Supplier.bulkCreate(demoSuppliers);
    
    // Criar funcionários
    console.log("Criando funcionários demo...");
    await base44.entities.Employee.bulkCreate(demoEmployees);
    
    // Criar materiais
    console.log("Criando materiais demo...");
    await base44.entities.Material.bulkCreate(demoMaterials);
    
    // Criar despesas
    console.log("Criando despesas demo...");
    await base44.entities.Expense.bulkCreate(demExpenses);

    // Aguardar um pouco e criar vendas e serviços
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Buscar produtos e clientes criados
    const products = await base44.entities.Product.list();
    const customers = await base44.entities.Customer.list();

    if (products.length > 0 && customers.length > 0) {
      const demoSales = [
        {
          product_id: products[0].id,
          product_name: products[0].product_name,
          unit_cost: products[0].total_cost,
          quantity: 2,
          sale_price: products[0].sale_price,
          total_revenue: products[0].sale_price * 2,
          total_cost: products[0].total_cost * 2,
          total_profit: (products[0].sale_price - products[0].total_cost) * 2,
          customer_name: customers[0].name,
          sale_date: new Date().toISOString().split('T')[0],
          notes: "Venda de inauguração"
        },
        {
          product_id: products[1]?.id || products[0].id,
          product_name: products[1]?.product_name || products[0].product_name,
          unit_cost: products[1]?.total_cost || products[0].total_cost,
          quantity: 1,
          sale_price: products[1]?.sale_price || products[0].sale_price,
          total_revenue: products[1]?.sale_price || products[0].sale_price,
          total_cost: products[1]?.total_cost || products[0].total_cost,
          total_profit: (products[1]?.sale_price || products[0].sale_price) - (products[1]?.total_cost || products[0].total_cost),
          customer_name: customers[1]?.name || customers[0].name,
          sale_date: new Date().toISOString().split('T')[0],
          notes: "Cliente novo"
        }
      ];

      console.log("Criando vendas demo...");
      await base44.entities.Sale.bulkCreate(demoSales);
    }

    // Serviços demo
    const demoServices = [
      {
        service_name: "Montagem de Móveis",
        service_type: "Instalação",
        machine_name: "Parafusadeira Elétrica",
        client_name: customers[0]?.name || "Cliente Demo",
        hourly_rate: 80.00,
        hours_worked: 3,
        total_value: 240.00,
        service_date: new Date().toISOString().split('T')[0],
        notes: "Montagem completa"
      },
      {
        service_name: "Manutenção Preventiva",
        service_type: "Manutenção",
        machine_name: "Serra Circular",
        client_name: customers[1]?.name || "Cliente Demo 2",
        hourly_rate: 100.00,
        hours_worked: 2,
        total_value: 200.00,
        service_date: new Date().toISOString().split('T')[0],
        notes: "Revisão trimestral"
      }
    ];

    console.log("Criando serviços demo...");
    await base44.entities.Service.bulkCreate(demoServices);

    return { success: true, message: "Dados demo criados com sucesso!" };
  } catch (error) {
    console.error("Erro ao criar dados demo:", error);
    return { success: false, message: "Erro ao criar dados demo", error };
  }
};
