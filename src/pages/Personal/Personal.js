import React, { Component } from 'react'
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo'
import CommentList from '../../components/CommentList/CommentList'
import store from '../../store'
import { updateInfo } from '../../store/actionCreators'
import { Tabs } from 'antd'

const { TabPane } = Tabs;
class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleStoreChange = this.handleStoreChange.bind(this)
  }
  componentDidMount() {
    store.subscribe(this.handleStoreChange)
  }
  render () {
    let { username, avatar, id} = this.state
    return (
      <div className="personal-wrapper">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="个人资料" key="1">
            <PersonalInfo username={username} avatar={avatar} id={id} updateInfo={this.updateInfo.bind(this)}/>
          </TabPane>
          <TabPane tab="评论列表" key="2">
            <CommentList username={username} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
  handleStoreChange () {
    this.setState(store.getState())
  }
  updateInfo (url, name) {
    store.dispatch(updateInfo(url, name))
  }
}

export default Personal