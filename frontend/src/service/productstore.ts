import { create } from 'zustand';
import { Pagination } from '@/networks/productnetworks';

export interface Product {
  _id: string;
  name: string;
  category: string;
  sale_price?: number;
  original_price?: number;
  cover_image: string;
  colors?: string[];
  average_rating?: number;
  brief_description?: string;
}

interface PaginationResponse {
  success: boolean;
  data: Product[];
  totalPages: number;
}

type ProductStore = {
  products: Product[];
  currentPage: number;
  quantity: number;
  totalPages: number;
  loading: boolean;

  filterByCategory: string;
  filterByPrice: number;
  searchTerm: string;

  fetchProducts: (page?: number) => Promise<void>;
  setFilterByCategory: (category: string) => void;
  setFilterByPrice: (price: number) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  currentPage: 1,
  quantity: 8,
  totalPages: 1,
  loading: false,

  filterByCategory: 'All',
  filterByPrice: 2000,
  searchTerm: '',

  fetchProducts: async (page = get().currentPage) => {
    set({ loading: true });
    try {
      const category = get().filterByCategory;
      const price = get().filterByPrice;
      const search = get().searchTerm;
      const response: PaginationResponse = await Pagination(page, get().quantity, category, price, search);

      if (response.success) {
        set({
          products: response.data,
          totalPages: response.totalPages,
          currentPage: page,
        });
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      set({ loading: false });
    }
  },

  setFilterByCategory: (category: string) => set({ filterByCategory: category, currentPage: 1 }),
  setFilterByPrice: (price: number) => set({ filterByPrice: price, currentPage: 1 }),
  setSearchTerm: (term: string) => set({ searchTerm: term, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));
