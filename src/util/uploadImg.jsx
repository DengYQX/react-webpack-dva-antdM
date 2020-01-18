import React, { Component } from "react";
import interfaces from "@/api/index";
import { Toast } from "antd-mobile";

class UploadImg extends Component {
  constructor(props) {
    super(props);
    const id = parseInt(Math.random() * 10000);
    this.state = {
      id: id,
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app"
    };
  }
  change(e) {
    const files = [...event.target.files];
    if (files.length === 0) return;
    this.upload(files[0]);
  }
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    interfaces.UploadImages(formData).then(res => {
      this.refs["upload-" + this.state.id].value = "";
      this.props.success(res[0]);
    });
  }
  uploadBase64(dataBase, name) {
    // console.log(JSON.parse(dataBase));
    let _arr = name.split(".");
    let fileext = "." + name.split(".")[_arr.length - 1];
    interfaces
      .UploadBase64Img({ fileext: fileext, Base64Photo: dataBase })
      .then(res => {
        this.props.success(res[0]);
      });
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
  render() {
    const { id } = this.state;
    const inputStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0
    };
    return (
      <div
        className="uploadImg"
        style={{ position: "relative" }}
        onClick={() => {
          this.selectUploadType();
        }}
      >
        {this.props.children}
        {this.state.platform === "h5" ? (
          <input
            type="file"
            accept="image/*"
            ref={"upload-" + id}
            style={inputStyle}
            onChange={e => {
              this.change(e);
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default UploadImg;
