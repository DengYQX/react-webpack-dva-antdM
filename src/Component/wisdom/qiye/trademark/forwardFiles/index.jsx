import { List, Checkbox, ListView, Toast } from "antd-mobile";
import Navigation from "@/util/navigation.jsx";
import "./style.less";
import { hashHistory } from "react-router";
import share from "@/util/share.js";
import interfaces from "@/api/index";

const Item = List.Item;

class app extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      checkedAll: false, //全选状态
      pageIndex: 1,
      pageSize: 15,
      list: [],
      checkedList: [],
      isMore: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if (this.state.isMore) {
      interfaces
        .GetTemplateFileList({
          pageIndex: this.state.pageIndex,
          pageSize: this.state.pageSize
        })
        .then(res => {
          if (res && res.length > 0) {
            res.forEach(i => {
              i.Checkbox = false;
            });
            this.setState({
              pageIndex: this.state.pageIndex + 1,
              list: [...this.state.list, ...res],
              isMore: res.length < this.state.pageSize ? false : true
            });
          }
        });
    }
  }

  // 单选
  handlerChange = (val, e) => {
    console.log(e.target.id, e.target.checked, val);
    const list = this.state.list;
    const checkedList = this.state.checkedList;
    list.map(function(item, index) {
      if (item.ID === val.ID) {
        return (item.Checkbox = e.target.checked);
      }
    });

    // 取消选择
    if (e.target.checked) {
      checkedList.push(val);
    } else {
      checkedList.forEach((i, index) => {
        if (i.ID == val.ID) {
          checkedList.splice(index, 1);
        }
      });
    }

    // 操作全选按钮
    const checkedAll = list.every(function(item, index) {
      return item.Checkbox;
    });

    this.setState({
      list: list,
      checkedAll: checkedAll,
      checkedList: checkedList
    });
  };

  // 全选事件
  handlerChangeAll = () => {
    const { checkedAll, list } = this.state;

    list.map(function(item, index) {
      return (item.Checkbox = !checkedAll);
    });

    // 全选  全部选
    if (!checkedAll) {
      this.setState({
        checkedList: list
      });
    } else {
      this.setState({
        checkedList: []
      });
    }

    this.setState({
      checkedAll: !checkedAll,
      list: list
    });
  };

  // 转发
  forward() {
    console.log(this.state.checkedList);
    if (this.state.checkedList.length > 1) {
      Toast.info("暂不支持同时转发多个文件");
      return;
    }
    this.state.checkedList.forEach(i => {
      //跳转公共页面的相关参数---失败
      const info = {
        link: i.FullUrl, //链接跳转路径
        title: i.Name, //活动标题名称
        name: "", //标题名称
        img: "", //自定义图片
        conetnt: i.Name //内容
      };
      console.log(info);

      share.shareAction({
        //  type: 1,  朋友圈 默认为 微信
        info,
        func: res => {
          const data = {
            title: "分享",
            btn: "返回", //按钮的字
            img: 1, //1为成功，0为失败
            url: "/campusInfor", //点击按钮跳转的链接
            text: res
          };
          hashHistory.push({ pathname: "/registerOk", state: { data } });
        }
      });
    });
  }

  onEndReached = () => {
    this.getData();
  };

  renderRow(item) {
    return (
      <List>
        <Item
          thumb={
            <Checkbox
              checked={item.Checkbox}
              id={item.ID}
              onChange={this.handlerChange.bind(this, item)}
            />
          }
          arrow="horizontal"
        >
          {" "}
          <div style={{ fontSize: "0.56rem" }}>{item.Name}</div>
        </Item>
      </List>
    );
  }

  render() {
    const { dataSource, pageSize } = this.state;
    return (
      <div style={{ height: " 100%" }} className="forward">
        <Navigation title="相关文件模板" />
        <ListView
          dataSource={dataSource.cloneWithRows(this.state.list)}
          style={{ height: "calc(100vh - 1.92rem)", overflow: "auto" }}
          pageSize={pageSize}
          renderRow={item => this.renderRow(item)}
          onEndReached={this.onEndReached}
        />

        <div className="foodBox">
          <div className="selectd">
            <Checkbox
              style={{ marginRight: "0.6rem" }}
              id="a0"
              onChange={this.handlerChangeAll}
              checked={this.state.checkedAll}
            />{" "}
            全选
          </div>
          <div className="forward" onClick={this.forward.bind(this)}>
            转发
          </div>
        </div>
      </div>
    );
  }
}
export default app;
