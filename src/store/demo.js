import { observable, computed, action, } from 'mobx'

class Demo {
  @observable test = 'hello'

  @action.bound changeTest(val) {
    this.test = val
  }

  @computed get comTest() {
    return this.test + ';'
  }
}

export default Demo;