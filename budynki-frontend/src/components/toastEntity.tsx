import { ApartmentData } from "@/types/ApartmentData";
import { toast } from "sonner";

export function toastEntity(entity: ApartmentData, title?: string) {
  type apartmentDataKeyType = keyof typeof entity;
  toast(
    <div>
      {title ? <p className="font-bold">{title}</p> : <></>}
      <div>
        {Object.keys(entity).map((key) => {
          return (
            <p>
              {key}: {entity[key as apartmentDataKeyType]}
            </p>
          );
        })}
      </div>
    </div>,
  );
}
