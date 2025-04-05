import { Headset } from "lucide-react";

function FalaCooperadoTitle({ iconsize }: { iconsize?: number }) {
  return (
    <h1 className="font-semibold text-center align-middle w-full flex items-center gap-2">
      <Headset size={iconsize} />
      Fala Cooperado!
    </h1>
  );
}

export { FalaCooperadoTitle };
