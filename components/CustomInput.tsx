import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
// import Image from "next/image";

const formSchema = authFormSchema("sign-up")

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  //   show?: boolean;
  //   setShow?: (show: boolean) => void;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  //   show,
  //   setShow,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                type={name === "password" ? "password" : "text"}
                placeholder={placeholder}
                className="input-class"
                {...field}
              />

              {/* SHOW AND HIDE PASSWORD ICON */}
              {/* {name === "password" && setShow && (
                <Image
                  src={show ? "/show.svg" : "/hide.svg"}
                  width={20}
                  height={20}
                  alt={show ? "Show" : "Hide"}
                  onClick={() => setShow(!show)}
                />
              )} */}

            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
