/**
 * 视频组件
 * @author 赵占涛
 * @class VideoUtil
 */
namespace App {
	export class VideoUtil {
        /**
         * 播放一个url
         */
        public static play(url, endCallback:()=>void):void{
            var body = document.body;
            var video = document.createElement("video");
            video.id = "__VIDEO__PLAYER__ZZT_";
            video.style.position = "absolute";
            video.style.width = "100%";
            video.style.top = "0";
            video.style.height = "100%";
            video.style.left = "0";
            video.style.textAlign="center";
            video.autoplay = true;
            video.controls = true;
            video.volume = SoundManager.getSoundSwitch() ? 1:0;
            video.onended = ()=>{
                video.parentNode.removeChild(video);
                endCallback();
            }
            video.src = url;
            body.appendChild(video);
            
        }
    }
}