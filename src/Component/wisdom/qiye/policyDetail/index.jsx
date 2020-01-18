import { List, Button } from "antd-mobile";
import zhuanfa0 from "%/wisdom/zhuanfa0.png";
import Navigation from "@/util/navigation.jsx";
const Item = List.Item;
import "./style.less";
import { hashHistory } from "react-router";
import DownloadFlle from "@/util/download.js";
import interfaces from "@/api/index";

class app extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;

    this.state = {
      data: data /** 组件传过来的值 */,
      disabled: false /** 是否显示 */,
      all: {} /** 接口传进来的数组 */,
      files: [] /** 接口传进来的文件 */,
      image: "" /** 接口传进来的图片 */
    };
  }

  /**
   * GetParkPolicyDetails 企业服务-政策服务--园区政策详情
   * @author xiaoDai
   * @param {int} ID [政策ID]
   * @return [企业服务-政策服务--园区政策详情]
   */
  componentDidMount() {
    interfaces.GetParkPolicyDetails({ ID: this.state.data.ID }).then(res => {
      this.setState({
        all: res[0].Detail,
        image: res[0].Imagelist[0],
        files: res[0].Filelist
      });
      console.log(this.state.files[0]);
    });
  }

  /** 跳转 */
  applyClick() {
    hashHistory.push({
      pathname: "/wisdom/qiye/policy/applyOnline",
      state: { data: this.state.data }
    });
  }

  /** 组件挂载 */
  render() {
    const html = this.state.all.ContactInfor;
    return (
      <div className="policy">
        <Navigation title="详情政策" />
        {this.state.image !== "" ? (
          <img src={this.state.image.FullUrl} className="policy_img" />
        ) : null}
        <div className="contentItem">
          <div className="title">{this.state.all.Title}</div>
          <div className="content">{this.state.all.PolicyClause}</div>
        </div>
        <div className="contentItem">
          <div className="title">申报条件</div>
          <div className="content">{this.state.all.DeclarationConditions}</div>
        </div>
        <div className="contentItem">
          <div className="title">申诉流程</div>
          <div className="content">{this.state.all.AppealProcess}</div>
        </div>
        <div className="contentItem">
          <div className="title">申报时间</div>
          <div className="content">
            {this.state.all.ApplyStartTime}至{this.state.all.ApplyEndTime}
          </div>
        </div>
        <div className="contentItem">
          <div className="title">联系方式</div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
        <List>
          <Item>
            {" "}
            <span style={{ fontSize: "0.56rem" }}>政策相关附件</span>
          </Item>
        </List>
        <List>
          <Item
            extra={
              <span style={{ color: "#00A1E9", fontSize: "0.56rem" }}>
                {this.state.files.length > 0
                  ? this.state.files.map(item => {
                      if (item.iCreator === 1) {
                        return (
                          <DownloadFlle
                            url={item.FullUrl}
                            name={item.Name}
                            key={item.ID}
                          />
                        );
                      }
                    })
                  : ""}
                <img style={{ width: 20, height: 20 }} src={zhuanfa0} />
              </span>
            }
          >
            <span style={{ fontSize: "0.56rem" }}>相关附件</span>
          </Item>
        </List>
        {this.state.all && this.state.all.Statusstr == "已公示" ? (
          <div>
            <div className="contentItem">
              <div className="title">公示内容</div>
              <div className="content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.all.ShowContent
                  }}
                ></div>
              </div>
            </div>
            <List>
              <Item>
                {" "}
                <span style={{ fontSize: "0.56rem" }}>公示相关附件</span>
              </Item>
            </List>
            <List>
              <Item
                extra={
                  <span style={{ color: "#00A1E9", fontSize: "0.56rem" }}>
                    {this.state.files.length > 0
                      ? this.state.files.map(item => {
                          if (item.iCreator === 2) {
                            return (
                              <DownloadFlle
                                url={item.FullUrl}
                                name={item.Name}
                                key={item.ID}
                              />
                            );
                          }
                        })
                      : ""}
                    <img style={{ width: 20, height: 20 }} src={zhuanfa0} />
                  </span>
                }
              >
                <span style={{ fontSize: "0.56rem" }}>相关附件</span>
              </Item>
            </List>
          </div>
        ) : null}
        {this.state.all.Statusstr == "未公示" ? (
          <Button
            onClick={this.applyClick.bind(this)}
            className="bottomMax"
            style={{ margin: "2rem auto", color: "#fff", borderRadius: "20px" }}
          >
            {"线上申请"}
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default app;
