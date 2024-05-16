import { ApartmentData } from "./ApartmentData";
import { BuildingData } from "./BuildingData";
import { CompanyData } from "./CompanyData";
import { ContractData } from "./ContractData";
import { PaymentData } from "./PaymentData";
import { PersonData } from "./PersonData";
import { PriceListData } from "./PriceListData";
import { RegistrationData } from "./RegistrationData";
import { RepairData } from "./RepairData";
import { TaskData } from "./TaskData";

export type AnyEntity =
  | ApartmentData
  | BuildingData
  | CompanyData
  | ContractData
  | PaymentData
  | PersonData
  | PriceListData
  | RegistrationData
  | RepairData
  | TaskData;
