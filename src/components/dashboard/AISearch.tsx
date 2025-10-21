import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

export default function AISearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // AI search functionality would go here
    console.log("Searching:", query);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold">Pesquisa Inteligente (IA)</h3>
        </div>
        <form onSubmit={handleSearch} className="flex gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pergunte qual quer coisa sobre seus dados..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
          <Button type="submit" variant="secondary" className="px-6">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
