import { toast } from "sonner";
import { toastEntity } from "../toastEntity";
import { AnyEntity } from "@/types/Entities";

export async function formSubmit(
  fn: (endpoint: string, method?: string, body?: unknown) => Promise<AnyEntity>,
  endpoint: string,
  method?: string,
  body?: unknown,
) {
  try {
    const newEntity: AnyEntity = await fn(endpoint, method, body);
    toastEntity(newEntity, method == "POST" ? "Dodano wpis" : "Edytowano wpis");
    return true;
  } catch (error) {
    error instanceof Error && toast.error(error.message);
    return false;
  }
}
