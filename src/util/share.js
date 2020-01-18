import { front as baseUrl } from '@/api/config'

let shares = null;
//  校验是否存在分享服务
let sharecount = 0;
const $shareMessage = function shareMessage(s, ex, info, func) {
  console.log(ex);
  plus.nativeUI.showWaiting();
  setTimeout(plus.nativeUI.closeWaiting, 5000); //TODO 5秒后自动关闭等待，否则如果用户分享出去后选择‘留在微信’，再手动回到app的时候，waiting无法关闭
  var msg = {
    extra: {
      scene: ex
    }
  }; // "分享的网址"
  msg.href = info.link.indexOf('baseUrl://') !== -1 ? baseUrl.pro+info.link.split('baseUrl://')[1] : info.link;
  msg.title = info.title + info.name;
  msg.content = info.conetnt; //取本地图片
  var img = plus.io.convertAbsoluteFileSystem(info.img.replace("file://", ""));
  console.log(img);
  msg.thumbs = [img];
  console.log(JSON.stringify(msg));
  s.send(
    msg,
    function() {
      plus.nativeUI.closeWaiting();
      var strtmp = '分享到"' + s.description + '"成功！ ';
      console.log(strtmp);
      func(strtmp);
    },
    function(e) {
      plus.nativeUI.closeWaiting();
      if (e.code == -2) {
        plus.nativeUI.toast("已取消分享", {
          verticalAlign: "center"
        });
        sharecount = 0;
      } else if (e.code == -3 || e.code == -8) {
        console.log(e.code);
        if (++sharecount < 2) {
          //TODO 分享失败可能是图片过大的问题，递归取默认图片重新分享
          $shareMessage(s, ex, info, func);
        } else {
          sharecount = 0;
          plus.nativeUI.toast("分享失败", {
            verticalAlign: "center"
          });
        }
      } else {
        console.error("分享失败:" + JSON.stringify(e));
      }
      console.log(
        '分享到"' + s.description + '"失败: ' + e.code + " - " + e.message
      );
    }
  );
};
const $getShareSerivces = function getSerivces() {
  plus.share.getServices(
    function(s) {
      shares = {};
      for (var i in s) {
        var t = s[i];
        shares[t.id] = t;
      }
    },
    function(e) {
      console.log("获取分享服务列表失败：" + e.message);
      plus.nativeUI.alert(e.message);
    }
  );
};
const $shareAction = function shareAction({ info, type, func }) {
  let ex = "WXSceneSession";
  if (type && type === 1) {
    ex = "WXSceneTimeline";
  }
  console.log(type);
  var s = null;
  if (!(s = shares["weixin"])) {
    plus.nativeUI.alert("无效的分享服务！");
    return;
  }
  if (s.authenticated) {
    console.log("---已授权---");
    $shareMessage(s, ex, info, func);
  } else {
    console.log("---未授权---"); //TODO 授权无法回调，有bug
    s.authorize(
      function() {
        console.log("授权成功...");
        $shareMessage(s, ex, info, func);
      },
      function(e) {
        console.log("认证授权失败：" + e.code + " - " + e.message);
        plus.nativeUI.alert("认证授权失败：" + e.code + " - " + e.message);
      }
    );
  }
};

export default {
  shareAction: $shareAction,
  getShareSerivces: () => {
    document.addEventListener("plusready", function() {
      if (window.plus) {
        $getShareSerivces();
      }
    });
  }
};
