
import { Component, PropTypes } from 'react';
import { Toast } from 'antd-mobile';


function downloadFunc(filename, filepath) {
    if (window.plus) {
        plus.io.resolveLocalFileSystemURL(
            '_downloads/' + filename,
            function (entry) {//如果已存在文件，则打开文件
                if (entry.isFile) {
                    Toast.info("正在打开文件...");
                    plus.runtime.openFile('_downloads/' + filename, null, function(err) {
                        Toast.info("没有关联offces文档的程序, 尝试用网页打开", 2);
                        plus.runtime.openURL(filepath, function(){
                            Toast.info("链接出错!");
                        });
                    });
                }
            }, function () {//如果未下载文件，则下载后打开文件
                const dtask = plus.downloader.createDownload(filepath, { filename: '_downloads/' + filename }, function (d, status) {
                    if (status !== 200)  {
                        Toast.info("下载失败: " + status);
                    }
                });
                dtask.addEventListener("statechanged", function(download, status) {
                    if(download.state ==4 && status==200) {
                        plus.runtime.openFile(download.getFileName(), null, function(err) {
                            Toast.info("没有关联offces文档的程序, 尝试用网页打开", 2);
                            plus.runtime.openURL(filepath, function(){
                                Toast.info("链接出错!");
                            });
                        });
                    }else {
                        console.log('失败', status)
                    }
                }, false);
                dtask.start();
            }
        );
    }else {
        window.open(filepath);
    }

}

class download extends Component {
    constructor(props) {
      super(props);
      this.state = {
          defaultKey: 0
      }
    }
    openFile =(FileName, url)=> {
        downloadFunc(FileName, url)
    }
    render() {
        const {url, name} = this.props;
        const ENV = navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app";
        const FileName= `${name}.${url.replace(/.+\./,"")}`;
        console.log(FileName, '文件名')
        return <span>
          {ENV === 'h5' ? (
            <a download={FileName} href={url}>{name}</a>
          ): <span onClick={this.openFile.bind(this, FileName, url)}>{name}</span>}
        </span>;
    }
}
download.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string
}
  
export default download;