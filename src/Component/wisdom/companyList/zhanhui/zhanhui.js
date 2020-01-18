//展览展会
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import Navigation from '@/util/navigation'
import interfaces from '@/api/index'
import { ListView } from 'antd-mobile';
import './zhanhui.less'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class Zhanhui extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            beginPass: [],
            page: 1,
            isMore: true,
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            pageSize:10,
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        if(this.state.isMore){
            interfaces.GetExhibitionList({ pageIndex: this.state.page, pageSize:this.state.pageSize }).then(res => {
                if (res && res.length > 0) {
                    let beginPass = []
                    for (let i = 0; i < res.length; i++) {
                        beginPass.push({
                            id: res[i].ID,
                            title: res[i].Subject,
                            address: res[i].Address,
                            img: res[i].ImgUrl,
                            time: res[i].StartDate.split(' ')[0] + '-' + res[i].EndDate.split(' ')[0],
                        })
                    }
                    this.setState({
                        beginPass: [...this.state.beginPass, ...beginPass],
                        page: this.state.page+1,
                        valType:1,
                        isMore: res.length < this.state.pageSize ? false : true
                    })
                }else if (this.state.valType == 0){
                    this.setState({ valType: 2 });
                  }
            })
            
        }
        
    }
    clickSingle(id) {
        hashHistory.push({ pathname: '/zhanhuiInfor', state: { id: id } })
    }
    onEndReached = () => {
        this.getData()
    }
    renderRow(item) {
        return (
            <div className='zhanhui_list' onClick={() => { this.clickSingle(item.id) }}>
                <div className='zhanhui_list_img'>
                    <img src={ item.img?item.img :require('%/noImg.jpg')} />
                </div>
                <div className='zhanhui_list_text'>
                    <p className='zhanhui_list_company fontBold'>{item.title}</p>
                    <p className='zhanhui_list_number'>展览地点：{item.address}   </p>
                    <p className='zhanhui_list_time'>展览日期：{item.time}</p>
                </div>
            </div>
        )
    }
    render() {
        const {valType} = this.state;
        return (
            <div className='zhanhui'>
                <Navigation title="展览展会" />
                {
                    valType == 1 ?
                    (
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.beginPass)}
                            style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                            pageSize={this.state.pageSize}
                            renderRow={(item) => this.renderRow(item)}
                            onEndReached={this.onEndReached}
                        />
                    ):(
                       <UnData/>
                    )
                    }
            </div>
        )
    }
}

export default Zhanhui;