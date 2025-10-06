import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Orders from '../pages/Orders'

vi.mock('../api/api', () => ({
  fetchAllOrdersMerged: () => Promise.resolve([
    { id: 1, customerName: 'A', status: 'completed', totalPrice: 10, createdAt: new Date().toISOString() },
    { id: 2, customerName: 'B', status: 'pending', totalPrice: 20, createdAt: new Date().toISOString() },
  ]),
}))

describe('Orders page', () => {
  it('filters by status via query string', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/orders', search: '?status=completed' }] }>
        <Routes>
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument())
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.queryByText('B')).not.toBeInTheDocument()
  })
})

