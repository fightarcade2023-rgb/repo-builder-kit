import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function Services() {
  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Serviços</h1>
          <p className="text-slate-600">Gerencie serviços prestados</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <Wrench className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Gestão de Serviços</h2>
            <p className="text-slate-600">Esta página está em desenvolvimento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
