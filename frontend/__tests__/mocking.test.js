describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn()
    fetchDogs()
    expect(fetchDogs).toHaveBeenCalled()
  })
})
