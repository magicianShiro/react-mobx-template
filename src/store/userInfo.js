import { observable, action } from 'mobx'

class UserInfo {
  @observable isAuthSession = false
  @action changeAuthSession() {
    this.isAuthSession = true
  }
}

export default UserInfo;