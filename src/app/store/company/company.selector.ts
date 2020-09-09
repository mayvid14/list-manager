import { companiesFeatureKey } from './company.reducer';
import { Company } from './company.model';
import { ApplicationStatus } from '../../types/ApplicationStatus';

const getReducerFunction = (status: ApplicationStatus) => (companies: Company[]) => companies.reduce((sum, company) => company.status === status ? sum + 1 : sum, 0);

export const selectCompanyState = state => state[companiesFeatureKey];
export const selectInProgressCompanies = getReducerFunction(ApplicationStatus.InProgress);
export const selectRejectedCompanies = getReducerFunction(ApplicationStatus.Rejected);
export const selectOfferedCompanies = getReducerFunction(ApplicationStatus.Offered);
