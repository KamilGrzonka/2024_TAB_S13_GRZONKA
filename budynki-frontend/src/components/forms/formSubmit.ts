import { toast } from "sonner";
import { toastEntity } from "../toastEntity";
import { AnyEntity } from "@/types/AnyEntity";

export async function formSubmit(
  fn: (endpoint: string, body?: unknown) => Promise<AnyEntity>,
  endpoint: string,
  body?: unknown,
) {
  try {
    const newEntity: AnyEntity = await fn(endpoint, body);
    toastEntity(newEntity, "Dodano wpis");
    return true;
  } catch (error) {
    error instanceof Error && toast.error(error.message);
    return false;
  }
}
