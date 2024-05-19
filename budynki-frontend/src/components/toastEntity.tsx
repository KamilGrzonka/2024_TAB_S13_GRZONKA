import { AnyEntity } from "@/types/Entities";
import { toast } from "sonner";

export function toastEntity(
  entity: AnyEntity,
  title?: string,
) {
  type DataKeyType = keyof typeof entity;
  toast(
    <div>
      {title ? <p className="font-bold">{title}</p> : <></>}
      <div>
        {Object.keys(entity).map((key) => {
          return (
            <p key={key}>
              {key}: {entity[key as DataKeyType]}
            </p>
          );
        })}
      </div>
    </div>,
  );
}
