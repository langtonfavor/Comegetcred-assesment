import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

const mockItem = {
  id: 1,
  title: 'Test Item',
  body: 'This is a test item for modal testing.',
};

describe('Modal Component', () => {
  test('Modal shows item title and body when opened', () => {
    render(<Modal item={mockItem} showModal={true} onClose={() => {}} />);

    const modalTitle = screen.getByText('Test Item');
    const modalBody = screen.getByText('This is a test item for modal testing.');

    expect(modalTitle).toBeInTheDocument();
    expect(modalBody).toBeInTheDocument();
  });

  test('Modal closes when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Modal item={mockItem} showModal={true} onClose={handleClose} />);
  
    const closeButton = screen.getByText('Close'); // Update the query to use getByText
    userEvent.click(closeButton);
  
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
});
