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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { UseFormReturn } from "react-hook-form";

interface SelectProps extends UseFormReturn<any> {
  name: string;
  data: { id: number; description: string }[];
  isLoading: boolean;
  title: string;
  required?: boolean;
  placeholder: string;
}

function SelectField({
  control,
  name,
  isLoading,
  required,
  data,
  title,
  placeholder,
}: SelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            <p>
              {title}
              {required && <span className="text-red-500">*</span>}
            </p>
          </FormLabel>
          <Select
            disabled={!!isLoading}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="flex flex-col h-40 w-[462px]">
              {data.map((item, i) => (
                <SelectItem key={item.id} value={item.id + ""}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { SelectField };
