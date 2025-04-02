// Define a local category interface for the static data
interface LocalCategory {
  name: string;
  subCategories: string[];
}

// Local categories data
export const categories: LocalCategory[] = [
  {
    name: 'Fans',
    subCategories: ['Ceiling Fans', 'Table Fans']
  },
  {
    name: 'Lighting',
    subCategories: ['Bulbs', 'LED Strips']
  },
  {
    name: 'Electrical Supplies',
    subCategories: ['Switches', 'Sockets', 'Extension Cords']
  },
  {
    name: 'Tools',
    subCategories: ['Screwdrivers', 'Insulation Tapes', 'Basic Testing Equipment']
  }
]; 