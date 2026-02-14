import { apiSecure } from '@/services/apiSecure'; 
import { CustomerData, CustomerRecord } from '../types';

export class CustomerService {

  /**
   * Create new customer
   */
  async create(customerData: CustomerData): Promise<CustomerRecord> {
    const { data } = await apiSecure.post<CustomerRecord>(
      '/customers', 
      customerData,
    );
    return data;
  }

  /**
   * View customer data
   */
  async view(id: number): Promise<CustomerRecord> {
    const { data } = await apiSecure.get<CustomerRecord>(
      '/customers/' + id,
    );
    return data;
  }

  /**
   * Update customer data
   */
  async update(id: number, customerData: CustomerData): Promise<CustomerRecord> {
    const { data } = await apiSecure.put<CustomerRecord>(
      '/customers/' + id, 
      customerData,
    );
    return data;
  }
  
  /**
   * Delete customer
   */
  async delete(id: number): Promise<void> {
    await apiSecure.delete('/customers/' + id);
  }
}