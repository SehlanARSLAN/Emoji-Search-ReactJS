import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("Emoji Search App", () => {
  
    test("Başlık kısmının başarılı bir şekilde render edildiğini kontrol et", () => {
      render(<App />);
      const titleElement = screen.getByText(/Emoji Search/i);
      expect(titleElement).toBeInTheDocument();
    });
  
    test("Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol et", () => {
      render(<App />);
      const emojiList = screen.getAllByText(/Click to copy emoji/i);
      expect(emojiList.length).toBeGreaterThan(0);
    });
  
    test("Bir filtreleme işlemi yapıldığında, emoji listesinin bu filtreye uygun şekilde yeniden render edildiğini kontrol et", () => {
      render(<App />);
      const searchInput = screen.getByPlaceholderText(/Search/i);
      fireEvent.change(searchInput, { target: { value: 'Grinning' } });
  
      const filteredEmoji = screen.getByText('Grinning');
      expect(filteredEmoji).toBeInTheDocument();
    });
  
    test("Liste üzerinden herhangi bir emojiye tıklandığında, ilgili emojinin kopyalandığını kontrol et", () => {
      render(<App />);
      const emojiItem = screen.getByText('100'); 
      
     
      document.execCommand = jest.fn();
      fireEvent.click(emojiItem); 
  
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
  });