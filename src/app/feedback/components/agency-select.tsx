import { useEffect, useState } from "react";
import { SelectField } from "./select-field";
import { Agency, fetchAgency } from "@/service/api";
import { UseFormReturn } from "react-hook-form";

function AgencySelect(form: UseFormReturn<any>) {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Agency[]>([]);

  useEffect(() => {
    async function loadAgency() {
      try {
        setIsLoading(true);
        const data = await fetchAgency();

        setOptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    loadAgency();
  }, [setOptions]);

  return (
    <SelectField
      title="Selecione seu ponto de atendimento"
      placeholder="Selecione seu ponto de atendimento..."
      name="paId"
      isLoading={isLoading}
      data={options}
      {...form}
    />
  );
}

export { AgencySelect };
