import { Component, PropTypes } from 'react';
import { Toast, ImagePicker } from "antd-mobile";
import 'antd-mobile/lib/image-picker/style/index.less'

class imagesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app"
    }
  }
  uploadBase64=(dataBase, name) => {
    const files  = this.props.files || [];
    files.push({
      file: {
        name,
        url: dataBase
      },
      url: dataBase
    })
    this.props.onChange(files, 'add', false)
  }
  selectUploadType() {
    if (this.state.platform === "app") {
      let actionbuttons = [{ title: "拍照" }, { title: "相册选取" }];
      let actionstyle = {
        title: "选择照片",
        cancel: "取消",
        buttons: actionbuttons
      };
      plus.nativeUI.actionSheet(actionstyle, e => {
        if (e.index == 1) {
          this.getImage();
        } else if (e.index == 2) {
          this.galleryImg();
        }
      });
    }
  }
  getImage() {
    let camera = plus.camera.getCamera();
    camera.captureImage(
      filePath => {
        this.resolveLocalFileSystemURL(filePath);
      },
      function(e) {},
      {
        filename: "_doc/camera/",
        index: 1
      }
    );
  }
  galleryImg() {
    plus.gallery.pick(
      p => {
        this.resolveLocalFileSystemURL(p);
      },
      function(e) {},
      {
        filename: "_doc/camera/",
        filter: "image"
      }
    );
  }
  resolveLocalFileSystemURL(filePath) {
    plus.io.resolveLocalFileSystemURL(
      filePath,
      entry => {
        entry.file(file => {
          let fileReader = new plus.io.FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onloadend = e => {
            let dataBase = e.target.result;
            this.canvasDataURL(dataBase, {}, base64Codes => {
              this.uploadBase64(base64Codes, file.name);
            });
          };
        });
      },
      e => {
        Toast.info("读取拍照文件错误：" + e.message);
      }
    );
  }

  canvasDataURL(path, obj, callback) {
    let img = new Image();
    img.src = path;
    img.onload = function() {
      let that = this; //默认按比例压缩
      let w = that.width,
        h = that.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || w / scale;
      let quality = 0.7; // 默认图片质量为0.7 //生成canvas
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d"); // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = w;
      let anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h); // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      } // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL("image/jpeg", quality); // 回调函数返回base64的值
      callback(base64);
    };
  }
  remove =(index) =>{
    let files = [];
    if (this.props.files.length > 1) {
       files = this.props.files.splice(index, 1);
    }
    this.props.onChange(files, 'remove', index)
  }
  render() {
    const {platform} = this.state;
    const {files = [], onChange} = this.props;
    return platform === 'app' ? (
      <div className="am-image-picker">
        <div className="am-image-picker-list">
          <div className="am-flexbox am-flexbox-align-center">

            <div className="am-flexbox-item">
              <div className="am-image-picker-item am-image-picker-upload-btn" onClick={() => { this.selectUploadType() }} role="button" aria-label="Choose and add image">
             
              </div>
            </div>
             <div className="am-flexbox-item">
               {files[0] ? (
                 <div className="am-image-picker-item">
                  <img src={files[0].url} style={{width: '3.21rem', height: '3.21rem'}} alt="" />
                  <div onClick={() => {
                    this.remove(0)
                  }} className="am-image-picker-item-remove" role="button" aria-label="Click and Remove this image"></div>
                </div>
               ) : null}
              </div>

              <div className="am-flexbox-item">
               {files[1] ? (
                 <div className="am-image-picker-item">
                  <img src={files[1].url} style={{width: '3.21rem', height: '3.21rem'}} alt="" />
                  <div onClick={() => {
                    this.remove(1)
                  }} className="am-image-picker-item-remove" role="button" aria-label="Click and Remove this image"></div>
                </div>
               ) : null}
              </div>
  
              <div className="am-flexbox-item">
               {files[2] ? (
                 <div className="am-image-picker-item">
                  <img src={files[2].url} style={{width: '3.21rem', height: '3.21rem'}} alt="" />
                  <div onClick={() => {
                    this.remove(2)
                  }} className="am-image-picker-item-remove" role="button" aria-label="Click and Remove this image"></div>
                </div>
               ) : null}
              </div>


          </div>
        </div>
      </div>
    ) : <div>
      <ImagePicker 
        files={files}
        onChange={onChange}
        accept="image/gif,image/jpeg,image/jpg,image/png"
      />
    </div>;
  }
}

imagesView.propTypes = {
  onChange: PropTypes.func,
  files: PropTypes.array
}

export default imagesView;