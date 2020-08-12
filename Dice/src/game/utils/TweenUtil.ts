
namespace App
{
	export class TweenUtil
	{
        /**
		 * 数字变化缓动动画
		 * @param textFiled 文本
		 * @param startNum 起始数字
		 * @param endNum 终点数字
         * @param time 时间
		 */
        public static numTween(textFiled:BaseTextField|TextureText, startNum:number, endNum:number, time?:number):void
		{
            let obj = {num : startNum};
            if(!time){
                time = 500;
            }
            egret.Tween.get(obj,{onChange : ()=>{
                if(textFiled && obj && obj.num){
                    if(textFiled instanceof BaseTextField){
                        textFiled.text = `+${obj.num.toFixed(0)}`;
                    }
                    else if(textFiled instanceof TextureText){
                        textFiled.setString(obj.num.toFixed(0));
                        textFiled.anchorOffsetX=textFiled.width*0.5+0.5;
                    }
                    
                }
                if(obj.num == endNum){
                    egret.Tween.removeTweens(obj);
                    obj = null;
                }
            }, onChangeObj : this}).to({num : endNum}, 500);
		}
    }
}