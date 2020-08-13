var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 视频组件
 * @author 赵占涛
 * @class VideoUtil
 */
var App;
(function (App) {
    var VideoUtil = (function () {
        function VideoUtil() {
        }
        /**
         * 播放一个url
         */
        VideoUtil.play = function (url, endCallback) {
            var body = document.body;
            var video = document.createElement("video");
            video.id = "__VIDEO__PLAYER__ZZT_";
            video.style.position = "absolute";
            video.style.width = "100%";
            video.style.top = "0";
            video.style.height = "100%";
            video.style.left = "0";
            video.style.textAlign = "center";
            video.autoplay = true;
            video.controls = true;
            video.volume = SoundManager.getSoundSwitch() ? 1 : 0;
            video.onended = function () {
                video.parentNode.removeChild(video);
                endCallback();
            };
            video.src = url;
            body.appendChild(video);
        };
        return VideoUtil;
    }());
    App.VideoUtil = VideoUtil;
    __reflect(VideoUtil.prototype, "App.VideoUtil");
})(App || (App = {}));
