//共享中心 --新增
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, List, InputItem, Button, Modal, Picker,Toast } from 'antd-mobile';
import './addSharingInfo.less' //样式文件
import { createForm } from 'rc-form';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import ImagesView from '@/util/imagesView.jsx';
import interfaces from "@/api/index";
//AddSharingCenter

class AddSharingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getFieldProps: {
        Position:'',       //1-场地
        PositionMoney:'',  //1-场地价格
        PositionArea:'',   //1-场地面积
        PositionAddress:'',  //1-场地地址
        Machine:'',   //2-设备名称
        MachineMoney:'',  //2-设备价格
        MachineAddress:'',  //2-设备所在地
        Work:'',  //3-职位
        WorkMoney:'',  //3-工时费
        Name:'',  //联系人
        Phone:'',  //联系人号码
        Company:'',  //发布企业
      },

      files: [],
      uploadFiles:[],
      multiple: true,
      peopleNumb: [{ label: '50人以下', value: '50人以下' }, { label: '50-100人', value: '50-100人' }, { label: '100-200人', value: '100-200人' },
               { label: '200-500人', value: '200-500人' }, { label: '500-1000人', value: '500-1000人' }],
      number: [],
      
      typeList: [
        { label: '空间共享', value: '1' },
        { label: '设备共享', value: '2' },
        { label: '人才共享', value: '3' },
      ],
      typeId:'',

    }
  }

  // 提交
  submit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      console.log(values)
      if (!error && loginType) {
        var ImgList=[];
        if(this.state.uploadFiles.length>0){
          this.state.uploadFiles.forEach(item=>{
            var text={
              Name:item.Name,
              Url:item.URL,
              ThumbUrl:item.smallPhotoURL,
              Ext:item.Type,
            }
            ImgList.push(text)
          })
        }
        if(this.state.typeId==1){
          var number=this.state.number.length==0?'':this.state.number[0];
          var post={
            UserId:localStorage.getItem('userId'),
            Type:this.state.typeId[0],
            EnterpriseName:values.Company,
            ContactsName:values.Name,
            ContactsTel:values.Phone,
            Name:values.Position,
            Price:values.PositionMoney,
            Area:values.PositionArea,
            ActivitieScale:number,
            Address:values.PositionAddress,
            Remakes:'',
            FileManagelist:ImgList,
          }
        }else if(this.state.typeId==2){
          var post={
            UserId:localStorage.getItem('userId'),
            Type:this.state.typeId[0],
            EnterpriseName:values.Company,
            ContactsName:values.Name,
            ContactsTel:values.Phone,
            Name:values.Work,
            Price:values.MachineMoney,
            Area: values.PositionArea,
            ActivitieScale:'',
            Address:values.MachineAddress,
            Remakes:'',
            FileManagelist:ImgList,
          }
        }else if(this.state.typeId==3){
          var post={
            UserId:localStorage.getItem('userId'),
            Type:this.state.typeId[0],
            EnterpriseName:values.Company,
            ContactsName:values.Name,
            ContactsTel:values.Phone,
            Name: values.Work,
            Price:values.WorkMoney,
            Area:'',
            ActivitieScale:'',
            Address:'',
            Remakes:'',
            FileManagelist:ImgList,
          }
        }
        console.log(post)
        interfaces.AddSharingCenter(post).then(res=>{
          console.log(res)
          const data={
            title:'新增',
            btn:'确定',         //按钮的字
            img:1,              //1为成功，0为失败
            url:'/',    //按钮跳转的链接
            text:`新增成功`
          }
          hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
        })
      }else if ( !loginType ){
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
    })
  }

  validatePosition = (rule, value, callback) => {
    if(this.state.typeId==1){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入场地名称！"));
      }
    }else{
      callback();
    }
  };
  validatePositionMoney = (rule, value, callback) => {
    if(this.state.typeId==1){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入场地价格！"));
      }
    }else{
      callback();
    }
  };
  validatePositionArea= (rule, value, callback) => {
    if(this.state.typeId==1){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入场地面积！"));
      }
    }else{
      callback();
    }
  };
  validatePositionAddress= (rule, value, callback) => {
    if(this.state.typeId==1){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入场地地址！"));
      }
    }else{
      callback();
    }
  };
  validateMachine=(rule, value, callback) => {
    if(this.state.typeId==2){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入设备名称！"));
      }
    }else{
      callback();
    }
  };
  validateMachineMoney=(rule, value, callback) => {
    if(this.state.typeId==2){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入设备价格！"));
      }
    }else{
      callback();
    }
  };
  validateMachineAddress=(rule, value, callback) => {
    if(this.state.typeId==2){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入设备所在地！"));
      }
    }else{
      callback();
    }
  };
  validateWork=(rule, value, callback) => {
    if(this.state.typeId==3){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入职位名称！"));
      }
    }else{
      callback();
    }
  };
  validateWorkMoney=(rule, value, callback) => {
    if(this.state.typeId==3){
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入工时费！"));
      }
    }else{
      callback();
    }
  };
  validateName=(rule, value, callback) => {
      if (value && value !== "") {
        callback();
      } else {
        callback(new Error("请输入联系人！"));
      } 
  };
  validatePhone=(rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  }
  validateCompany=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入发布公司！"));
    }
  };



  // 图片上传
  changeImg = (files, type, index) => {
    console.log(files, type, index);
    //files[0].file.name  img.jpg  12313.png
    if(type=='add'){
      files.forEach(item=>{
        interfaces.UploadBase64Img({fileext:'.jpg',Base64Photo:item.url}).then(res=>{
          this.setState({
            uploadFiles:[...this.state.uploadFiles,...res]
          })
        })
      })
    }else{
      //删除图片的时候
      const arrs= this.state.uploadFiles;
      arrs.splice(index,1)
      this.setState({
        uploadFiles:arrs
      })
    }
   
    this.setState({
      files:files,
    },()=>{
      console.log(this.state.files)
    });
    
    
  }
  
  render() {
    const { getFieldProps,getFieldError } = this.props.form;
    const { files} = this.state;
    return (
      <div className='add_sharing_info'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_report_title"
        >新增</NavBar>

        <List className="my_report_list">
         
          <Picker
            data={this.state.typeList}
            cols={1}
            value={this.state.typeId}
            onChange={v =>   this.setState({ typeId: v },()=>{console.log(this.state.typeId)})}
            onOk={v => this.setState({ typeId: v })}
          >
            <List.Item arrow="horizontal">类型:</List.Item>
          </Picker>
          
          {
            this.state.typeId == '1' ? 
            <div>
              <InputItem
                {...getFieldProps('Position', {
                  initialValue: this.state.getFieldProps.Position,
                  rules: [{ validator: this.validatePosition }]
                })}
                placeholder="请输入场地名称"
                error={!!getFieldError("Position")}
                onErrorClick={() => {
                  Toast.info(getFieldError("Position"));
                }}
              >场地名称：</InputItem>
              <InputItem
                {...getFieldProps('PositionMoney', {
                  initialValue: this.state.getFieldProps.PositionMoney,
                  rules: [{ validator: this.validatePositionMoney }]
                })}
                placeholder="请输入价格"
                error={!!getFieldError("PositionMoney")}
                onErrorClick={() => {
                  Toast.info(getFieldError("PositionMoney"));
                }}
              >场地价格：</InputItem>
              <InputItem
                {...getFieldProps('PositionArea', {
                  initialValue: this.state.getFieldProps.PositionArea,
                  rules: [{ validator: this.validatePositionArea }]
                })}
                placeholder="请输入场地面积"
                error={!!getFieldError("PositionArea")}
                onErrorClick={() => {
                  Toast.info(getFieldError("PositionArea"));
                }}
              >场地面积：</InputItem>
              <Picker
                data={this.state.peopleNumb}
                cols={1}
                value={this.state.number}
                onChange={v => this.setState({ number: v })}
                onOk={v => this.setState({ number: v })}
              >
                <List.Item arrow="horizontal">容纳人数:</List.Item>
              </Picker>
              <InputItem
                {...getFieldProps('PositionAddress', {
                  initialValue: this.state.getFieldProps.PositionAddress,
                  rules: [{ validator: this.validatePositionAddress }]
                })}
                placeholder="请输入地点"
                error={!!getFieldError("PositionAddress")}
                onErrorClick={() => {
                  Toast.info(getFieldError("PositionAddress"));
                }}
              >场地地点：</InputItem>
            </div> : 
            this.state.typeId == '2' ? 
            <div>
              <InputItem
                {...getFieldProps('Machine', {
                  initialValue: this.state.getFieldProps.Machine,
                  rules: [{ validator: this.validateMachine }]
                })}
                placeholder="请输入设备名称"
                error={!!getFieldError("Machine")}
                onErrorClick={() => {
                  Toast.info(getFieldError("Machine"));
                }}
              >设备名称：</InputItem>
              <InputItem
                {...getFieldProps('MachineMoney', {
                  initialValue: this.state.getFieldProps.MachineMoney,
                  rules: [{ validator: this.validateMachineMoney }]
                })}
                placeholder="请输入价格"
                error={!!getFieldError("MachineMoney")}
                onErrorClick={() => {
                  Toast.info(getFieldError("MachineMoney"));
                }}
              >设备价格：</InputItem>
              <InputItem
                {...getFieldProps('MachineAddress', {
                  initialValue: this.state.getFieldProps.MachineAddress,
                  rules: [{ validator: this.validateMachineAddress }]
                })}
                placeholder="请输入地点"
                error={!!getFieldError("MachineAddress")}
                onErrorClick={() => {
                  Toast.info(getFieldError("MachineAddress"));
                }}
              >设备所在地点：</InputItem>
            </div> : (

            <div>
              <InputItem
                {...getFieldProps('Work', {
                  initialValue: this.state.getFieldProps.Work,
                  rules: [{ validator: this.validateWork }]
                })}
                placeholder="请输入职位名称"
                error={!!getFieldError("Work")}
                onErrorClick={() => {
                  Toast.info(getFieldError("Work"));
                }}
              >职位名称：</InputItem>
              <InputItem
                {...getFieldProps('WorkMoney', {
                  initialValue: this.state.getFieldProps.WorkMoney,
                  rules: [{ validator: this.validateWorkMoney }]
                })}
                placeholder="请输入价格"
                error={!!getFieldError("WorkMoney")}
                onErrorClick={() => {
                  Toast.info(getFieldError("WorkMoney"));
                }}
              >工时费：</InputItem>
            </div>
            ) 
          }
       
          {/* 公共的模块 */}
          <InputItem
            {...getFieldProps('Name', {
              initialValue: this.state.getFieldProps.Name,
              rules: [{ validator: this.validateName }]
            })}
            placeholder="请输入联系人姓名"
            error={!!getFieldError("Name")}
            onErrorClick={() => {
              Toast.info(getFieldError("Name"));
            }}
          >联系人：</InputItem>
          <InputItem
             {...getFieldProps('Phone', {
              initialValue: this.state.getFieldProps.Phone,
              rules: [{ validator: this.validatePhone }]
            })}
            type="number"
            placeholder="请输入联系电话"
            error={!!getFieldError("Phone")}
            onErrorClick={() => {
              Toast.info(getFieldError("Phone"));
            }}
          >联系电话：</InputItem>
          <InputItem
           {...getFieldProps('Company', {
            initialValue: this.state.getFieldProps.Company,
            rules: [{ validator: this.validateCompany }]
          })}
          placeholder="请输入发布企业"
          error={!!getFieldError("Company")}
          onErrorClick={() => {
            Toast.info(getFieldError("Company"));
          }}
          >发布企业：</InputItem>

          
       
        </List>

        <div className="upload_pictures">
          <p>图片上传：</p>
          <ImagesView
            files={files}
            onChange={this.changeImg}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 3} 
            multiple={this.state.multiple}
          />
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
        </div>
      </div>
    )
  }

}

AddSharingInfo.defaultProps = {
  token: '',
};
AddSharingInfo.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(AddSharingInfo));