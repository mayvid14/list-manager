import { companiesFeatureKey, State } from './company.reducer';
import { Company } from './company.model';
import { ApplicationStatus } from '../../types/ApplicationStatus';

const getReducerFunction = (status: ApplicationStatus) => (companies: Company[]) => companies.reduce((sum, company) => company.status === status ? sum + 1 : sum, 0);

export const selectCompanyState = (state: State) => state[companiesFeatureKey];

export const selectInProgressCompanies = getReducerFunction(ApplicationStatus.InProgress);
export const selectRejectedCompanies = getReducerFunction(ApplicationStatus.Rejected);
export const selectOfferedCompanies = getReducerFunction(ApplicationStatus.Offered);
export const countCities = (companies: Company[]) => companies.reduce((obj, company) => obj[company.city] ? {...obj, [company.city]: (obj[company.city]+1)} : {...obj, [company.city]: 1}, {});
