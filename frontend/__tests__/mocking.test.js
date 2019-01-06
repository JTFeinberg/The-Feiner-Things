function Person(name, foods) {
  this.name = name
  this.foods = foods
}

Person.prototype.fetchFavFoods = () => {
  return new Promise((resolve, reject) => {
    //   simulate an API
    setTimeout(() => resolve(this.foods), 2000)
  })
}

describe('mocking learning', () => {
  it('mocks a reg function', () => {
    const fetchDogs = jest.fn()
    fetchDogs('snickers')
    expect(fetchDogs).toHaveBeenCalled()
    expect(fetchDogs).toHaveBeenCalledWith('snickers')
    fetchDogs('hugo')
    expect(fetchDogs).toHaveBeenCalledTimes(2)
  })

  it('can create a person', () => {
    const me = new Person('Jacob', ['pizza', 'pho', 'enchiladas'])
    expect(me.name).toBe('Jacob')
  })
})
