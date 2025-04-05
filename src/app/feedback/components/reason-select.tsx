import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchReasons } from "@/service/api";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Reason = {
  id: number;
  group: string;
  description: string;
};

function ReasonSelect({ control }: UseFormReturn<any>) {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Record<string, Reason[]>>({});

  useEffect(() => {
    async function loadReasons() {
      try {
        setIsLoading(true);
        const data = await fetchReasons();

        console.log("Dados recebidos:", data);
        const groupedOptions = data.reduce((acc, reason) => {
          if (!acc[reason.group]) {
            acc[reason.group] = [];
          }
          acc[reason.group].push(reason);
          return acc;
        }, {} as Record<string, Reason[]>);

        setOptions(groupedOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }

    loadReasons();
  }, [setOptions]);

  return (
    <FormField
      control={control}
      name="reasonId"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Selecione a razão</FormLabel>
          <Select
            disabled={!!isLoading}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a sua razão..."></SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="h-80">
              {Object.entries(options).map(([group, items]) => (
                <SelectGroup key={group}>
                  <SelectLabel>{group}</SelectLabel>
                  {items.map((item, i) => (
                    <SelectItem key={item.id} value={item.id + ""}>
                      {i + 1}. {item.description}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { ReasonSelect };
