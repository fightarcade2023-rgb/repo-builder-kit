import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2 } from "lucide-react";
import { useSoundAlert } from "@/contexts/SoundAlertContext";
import { useState } from "react";

export function SoundAlertControl() {
  const { playManualAudio, alertMode, setAlertMode } = useSoundAlert();
  const [selectedAudio, setSelectedAudio] = useState("1");

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Volume2 className="w-5 h-5" />
          Controle de Áudio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Modo de Alerta</label>
          <Select value={alertMode} onValueChange={(value: 'automatic' | 'manual') => setAlertMode(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automático</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Testar Áudio</label>
          <div className="flex gap-2">
            <Select value={selectedAudio} onValueChange={setSelectedAudio}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Áudio 1</SelectItem>
                <SelectItem value="2">Áudio 2</SelectItem>
                <SelectItem value="3">Áudio 3</SelectItem>
                <SelectItem value="4">Áudio 4</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => playManualAudio(selectedAudio)}>
              Testar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
