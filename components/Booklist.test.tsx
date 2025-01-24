import { render, screen } from '@testing-library/react';
import {BookList} from './BookList';

const mockBook = [
    { id: 1, title: 'Livro 1', author: 'Autor 1', price: 9.99 },
    { id: 2, title: 'Livro 2', author: 'Autor 2', price: 10.00 }
];

describe('BookList', () => {
    it('renders without error when there is no book', () => {
        render(<BookList books={[]} />);
        expect(screen.getByText('Não há livros disponíveis...')).toBeInTheDocument();
    });

    it('renders without error when there is books', () => {
        render(<BookList books={mockBook} />);
        expect(screen.getByText('Livro 1')).toBeInTheDocument();
        expect(screen.getByText('Livro 2')).toBeInTheDocument();
        expect(screen.getByText('Autor 1')).toBeInTheDocument();
        expect(screen.getByText('Autor 2')).toBeInTheDocument();
        expect(screen.getByText('9.99')).toBeInTheDocument();
        expect(screen.getByText('10.00')).toBeInTheDocument();
    });

    it("renders the correct number of books", () => {
        render(<BookList books={mockBook} />)
    
        const bookItems = screen.getAllByRole("listitem")
        expect(bookItems).toHaveLength(2)
      })
});