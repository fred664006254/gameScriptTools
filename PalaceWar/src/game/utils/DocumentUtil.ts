namespace App
{
    /**
	 * document操作工具类
	 * author 陈可
	 * date 2019/04/24
	 * @class DocumentUtil
	 */
	export namespace DocumentUtil
	{
        let callbackList:{callback:Function,callbackThisObj:any}[]=[];
        /**
         * 创建资源加载失败提示框
         */
        export function showLoadResFailDiv(callback:Function,callbackThisObj:any):void
        {
            let divId:string="gameloadresfaildiv";
            let element:HTMLElement = document.getElementById(divId);
            callbackList.push({callback:callback,callbackThisObj:callbackThisObj});
            if(!window["retryloadgamefailres"])
            {
                window["retryloadgamefailres"]=()=>{
                    loadResFailDivCallback();
                };
            }
            if(!element)
            {
            //     element=document.createElement("div");
            //     element.id=divId;
            //     element.style.border="1px solid";
            //     element.style.width="100%";
            //     element.style.height="100%";
            //     element.style.margin="auto";
            //     element.style.position="fixed";
            //     element.style.left="0px";
            //     element.style.top="0px";
            //     element.style.background="rgb(0,0,0,0.6)";
            //     element.style.overflow="auto";
            //     element.style.textAlign="center";
            //     element.style.display="normal";
            //     document.body.appendChild(element);

            //     let htmlStr:string=`<div style="background: white;width: 250px;height: 150px;margin: auto;margin-top: 48%;border-radius: 5px;">
            //     <div style="height: 110px;border-bottom: 1px solid #CCCCCC;">
            //         <!-- 框内内容 -->
            //         <div style="font-size: 0.9rem;padding-top: 30px;">Network Error</div>
            //         <div style="font-size: 0.8rem;margin-top: 15px;">Please check your connection or switch between wifi and cellular.</div>
            //     </div>
            //     <div style="height: 39px;">
            //         <div onclick="javascript:window.retryloadgamefailres()" style="float: none;height: 39px;line-height: 39px;font-size: 1rem;">Retry</div>
            //     </div>
            // </div>`;
            //     element.innerHTML=htmlStr;
            }
            else
            {
                element.style.display="block";
            }
        }

        export function hideLoadResFailDiv():void
        {
            let divId:string="gameloadresfaildiv";
            let element:HTMLElement = document.getElementById(divId);
            if(element)
            {
                // element.parentNode.removeChild(element);
                element.style.display="none";
            }
        }

        function loadResFailDivCallback():void
        {
            DocumentUtil.hideLoadResFailDiv();
            if(callbackList)
            {
                while(callbackList.length>0)
                {
                    let callbackObj = callbackList.shift();
                    if(callbackObj.callback)
                    {
                        callbackObj.callback.apply(callbackObj.callbackThisObj);
                    }
                }
            }
        }
    }
}