import { CompanyModel } from './company-model';

export interface UserModel {
  id: number;
  name: string;
  username: string;
  company: CompanyModel;
}
