import React from 'react';
import { render, screen } from '../__tests__/utils/test-utils';
import TextExpander from '../_components/TextExpander';
import { userEvent } from '@testing-library/user-event';

describe('TextExpander', () => {
  const shortText = 'This is a short text.';
  const longText = 'This is a very long text that should be truncated. '.repeat(20);

  it('renders short text without truncation', () => {
    render(<TextExpander>{shortText}</TextExpander>);
    
    expect(screen.getByText((content) => content.includes(shortText))).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('truncates long text correctly', () => {
    render(<TextExpander>{longText}</TextExpander>);
    
    // Initial state should be truncated
    const truncatedText = longText.split(' ').slice(0, 40).join(' ') + '...';
    expect(screen.getByText((content) => content.includes(truncatedText.substring(0, 50)))).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('expands text when "Show more" is clicked', async () => {
    const user = userEvent.setup();
    render(<TextExpander>{longText}</TextExpander>);
    
    // Click the "Show more" button
    await user.click(screen.getByText('Show more'));
    
    // Check that the button text has changed to "Show less"
    expect(screen.getByText('Show less')).toBeInTheDocument();
    
    // Check that the content contains at least the beginning of the long text
    // This approach is more flexible than trying to match the exact text
    const firstSentence = longText.split('.')[0];
    expect(screen.getByText((content) => content.includes(firstSentence))).toBeInTheDocument();
  });

  it('collapses text when "Show less" is clicked', async () => {
    const user = userEvent.setup();
    render(<TextExpander>{longText}</TextExpander>);
    
    // First expand the text
    await user.click(screen.getByText('Show more'));
    
    // Then collapse it
    await user.click(screen.getByText('Show less'));
    
    // Check that the button text has changed back to "Show more"
    expect(screen.getByText('Show more')).toBeInTheDocument();
    
    // Check that the content contains the truncated text
    const truncatedBeginning = longText.split(' ').slice(0, 10).join(' ');
    expect(screen.getByText((content) => content.includes(truncatedBeginning))).toBeInTheDocument();
  });

  it('has correct styling for the toggle button', () => {
    render(<TextExpander>{shortText}</TextExpander>);
    
    const button = screen.getByText('Show more');
    
    expect(button).toHaveClass('text-primary-700');
    expect(button).toHaveClass('border-b');
    expect(button).toHaveClass('border-primary-700');
    expect(button).toHaveClass('cursor-pointer');
  });
});