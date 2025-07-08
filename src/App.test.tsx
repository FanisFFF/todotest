import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect,} from 'vitest';

describe('Todo App', () => {
  it('renders initial tasks', () => {
    render(<App />);
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(input, { target: { value: 'Write tests' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('toggles a task completion', () => {
    render(<App />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('filters tasks correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
  });

  it('clears completed tasks', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Clear Completed'));
    expect(screen.queryByText('Прекрасный код')).not.toBeInTheDocument();
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
  });
});
