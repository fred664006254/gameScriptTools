/**
 * 公共方法类
 * author dmj
 * date 2017/9/27
 * @class CommonUtil
 */
namespace App
{
 	export class CommonUtil 
	{
		private static _tipContainer:BaseDisplayObjectContainer;
		/**
		 * 背包使用道具后飘字动画
		 * 对icon、文字数组进行缓动，目前是向上移动（可扩展）
		 * @param list icon：图标，message：文字 
		 * @param startPoint 开始位置相对全局坐标，可选，不传的话为屏幕中心
		 */
		public static playRewardFlyAction(list:{icon?:string,tipMessage:string,type?:number}[]|RewardItemVo[],startPoint?:egret.Point,waitTime:number=800,subNodeList?:BaseDisplayObjectContainer[],isHalve?:boolean):void
		{
			for(let i=0;i<list.length;i++)
			{
				let play = function()
				{
					let item = list[i];
					let rewardFly = new RewardFly();
					let subNode = undefined;
					if(subNodeList && subNodeList[i])
					{
						subNode = subNodeList[i]
					}
					rewardFly.init(item.icon,item.tipMessage,item.type);
					if(startPoint)
					{
						rewardFly.setPosition(startPoint.x,startPoint.y);
					}
					else
					{
						rewardFly.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 - 100);
					}
					LayerManager.msgLayer.addChild(rewardFly);
				}
				egret.setTimeout(play,this,waitTime*i);
			}
		}

		/**
		 * 游戏内提示
		 * @param message 需要提示的文字
		 */
		public static showTip(message:string):void
		{
			let tipContainer:BaseDisplayObjectContainer=CommonUtil._tipContainer;
			let txtLine:number=1;
			if(!tipContainer)
			{
				let tipContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				let tipBg:BaseBitmap=BaseBitmap.create("public_tipbg");
				tipBg.width = 634;
				tipBg.setPosition(-tipBg.width/2,-tipBg.height/2);
				tipBg.name="tipBg";
				tipContainer.addChild(tipBg);
				let msgText:BaseTextField=ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_TITLE_SMALL);
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				msgText.textAlign=egret.HorizontalAlign.CENTER;
				msgText.name="msgText";
				msgText.lineSpacing=2;
				txtLine=msgText.numLines;
				tipContainer.addChild(msgText);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				LayerManager.msgLayer.addChild(tipContainer);
				CommonUtil._tipContainer=tipContainer;
			}
			else
			{
				let tipBg:BaseBitmap=<BaseBitmap>tipContainer.getChildByName("tipBg");
				if(!tipBg.texture || !tipBg.texture.bitmapData)
				{
					tipBg.texture=ResourceManager.getRes("public_tipbg");
				}
				let msgText:BaseTextField = <BaseTextField>CommonUtil._tipContainer.getChildByName("msgText");
				msgText.text=message;
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				tipContainer.setScale(1);
				tipContainer.alpha=1;
				egret.Tween.removeTweens(tipContainer);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				txtLine=msgText.numLines;
				if(!LayerManager.msgLayer.contains(tipContainer))
				{
					LayerManager.msgLayer.addChild(tipContainer);
				}
			}
			egret.Tween.get(CommonUtil._tipContainer).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},70).wait(1300*txtLine).to({alpha:0},200).call(function(tipContainer:BaseDisplayObjectContainer){
				if(tipContainer)
				{
					egret.Tween.removeTweens(tipContainer);
					if(LayerManager.msgLayer.contains(tipContainer))
					{
						LayerManager.msgLayer.removeChild(tipContainer);
					}
					tipContainer.setScale(1);
					tipContainer.alpha=1;
				}
			}.bind(this,CommonUtil._tipContainer),this);
		}

		public static showCollectEffect(resKey:string,startPoint:egret.Point,endPoint:egret.Point,callback?:Function,callbackThisObj?:any,callbackParams?:any[]):void
		{
			let collectEffect:CollectEffect=new CollectEffect();
			collectEffect.start(resKey,startPoint,endPoint,callback,callbackThisObj,callbackParams);
		}

		/**
		 * 获取居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterPos(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):{x:number,y:number}
		{
			return {x:CommonUtil.getCenterX(referenceContainer,childDisplayObject,isParent),y:CommonUtil.getCenterY(referenceContainer,childDisplayObject,isParent)};
		}

		/**
		 * 获取X居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterX(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):number
		{
			let x:number=0;
			let scaleX=1;
			if(!isParent)
			{
				x=referenceContainer.x;
				scaleX=referenceContainer.scaleX;
			}
			x+=(referenceContainer.width*scaleX-referenceContainer.anchorOffsetX-childDisplayObject.width*childDisplayObject.scaleX+childDisplayObject.anchorOffsetX)*0.5;
			return x;
		}

		/**
		 * 获取Y居中对齐位置
		 * @param referenceContainer 参考对象，可以为父容器，也可以为同级显示对象，通过第三个参数来判断
		 * @param childDisplayObject 需要布局的对象
		 * @param isParent 是否是父容器，如果不是则为同级参考对象
		 */
		public static getCenterY(referenceContainer:egret.DisplayObject,childDisplayObject:egret.DisplayObject,isParent:boolean):number
		{
			let y:number=0;
			let scaleY=1;
			if(!isParent)
			{
				y=referenceContainer.y;
				scaleY=referenceContainer.scaleY;
			}
			y+=(referenceContainer.height*scaleY-referenceContainer.anchorOffsetY-childDisplayObject.height*childDisplayObject.scaleY+childDisplayObject.anchorOffsetY)*0.5;
			return y;
		}

		public static getContainerByLeftHalfRes(leftRes:string):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			let leftBmp:BaseBitmap=BaseBitmap.create(leftRes);
			container.addChild(leftBmp);
			let rightBmp:BaseBitmap=BaseBitmap.create(leftRes);
			rightBmp.scaleX=-1;
			rightBmp.x=leftBmp.x+leftBmp.width+rightBmp.width;
			container.addChild(rightBmp);
			return container;
		}

		public static  getContainerByLeftTopRes(resUrl:string):BaseDisplayObjectContainer
		{
			let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			for(var i:number=0;i<4;i++)
			{
				let bmp:BaseBitmap=BaseBitmap.create(resUrl);
				let xx:number=0;
				let yy:number=0;
				if(i%2==1)
				{
					bmp.scaleX=-1;
					xx=bmp.width*2;
				}
				if(Math.floor(i/2)>0)
				{
					bmp.scaleY=-1;
					yy=bmp.height*2;
				}
				bmp.setPosition(xx,yy);
				container.addChild(bmp);
			}
			return container;
		}

		public static createMainUIIcon(iconUrl:string,iconNameStr:string,isShow?:boolean,extType?:number|string):BaseDisplayObjectContainer
		{	
			if (iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp()== true)
			{
				iconNameStr = "share_icon_name_aiweiyou";
			}

			let iconContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
			iconContainer.addChild(iconBg);
			iconContainer.width=iconBg.width;
			iconContainer.height=iconBg.height;
			iconContainer.anchorOffsetX=iconBg.width/2;
			iconContainer.anchorOffsetY=iconBg.height/2;
			iconContainer.name = iconNameStr;

			if(extType)
			{
				let iconExtBg:BaseLoadBitmap=BaseLoadBitmap.create("ac_icon_bg"+extType,null,{callback:(...args)=>{
					iconExtBg.setPosition(iconBg.x+(iconBg.width-iconExtBg.width)/2,iconBg.y+(iconBg.height-iconExtBg.height)/2);
					iconContainer.addChildAt(iconExtBg,1);
				},callbackThisObj:CommonUtil});

			}

			if(isShow){
				let iconAni:BaseBitmap = BaseBitmap.create("mainui_iconani");
				iconAni.anchorOffsetX = iconAni.width/2;
				iconAni.anchorOffsetY = iconAni.height/2;
				iconAni.setPosition(iconContainer.width/2 , iconContainer.height/2);
				iconContainer.addChild(iconAni);
			
				egret.Tween.get(iconAni,{loop:true})
					.to({rotation: 360}, 1000)
					
			}

			let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconUrl);
			iconContainer.addChild(icon);

			let iconName:BaseLoadBitmap=BaseLoadBitmap.create(iconNameStr,null,{callback:(container:BaseDisplayObjectContainer)=>{
				if(container)
				{	

					iconName.setPosition(container.width/2 - (iconName.width?iconName.width:88)/2,50);
					if (iconNameStr == "rechargevip_icon_name")
					{
						iconName.setPosition(20,50);
					}
				}
				},callbackThisObj:this,callbackParams:[iconContainer]});

			iconContainer.addChild(iconName);
			// iocnName.setPosition(-8.5,50);
						//加载完图片重新设置尺寸
			

			iconContainer.addTouch((event:egret.TouchEvent,iconContainer:BaseDisplayObjectContainer)=>{
				switch(event.type)
				{
					case egret.TouchEvent.TOUCH_BEGIN:
						iconContainer.setScale(0.95);
					break;
					case egret.TouchEvent.TOUCH_CANCEL:
						iconContainer.setScale(1);
					break;
					case egret.TouchEvent.TOUCH_END:
						iconContainer.setScale(1);
					break;
				}
			},this,[iconContainer]);
			return iconContainer;
		}

		/**
		 * 添加红点提示
		 * @param bdoc 父容器
		 * @param icon 需要在父容器上添加的图片名字，默认是 public_dot2
		 * @param isLeft 父容器上的图片是否是在父容器左上角。默认是在右上角
		 */
		public static addIconToBDOC(bdoc:egret.DisplayObjectContainer,icon?:string,isLeft?:boolean,offX?:number,offY?:number):void
		{
			
			
			if(bdoc && bdoc.getChildByName("reddot"))
			{
				let reddot:BaseBitmap = <BaseBitmap>bdoc.getChildByName("reddot");
				if(reddot)
				{
					reddot.visible = true;
				}
			}
			else
			{
				if(!icon)
				{
					icon = "public_dot2";
					
				}
				let reddot:BaseBitmap = BaseBitmap.create(icon);
				if(!isLeft)
				{
					reddot.x = bdoc.width - reddot.width;	
				}
				else
				{
					reddot.x = 0;
				}
				if(offX)
				{
					reddot.x = reddot.x + offX
				}
				if(offY)
				{
					reddot.y = reddot.y + offY
				}
				
				// reddot.y = 3;
				bdoc.addChild(reddot);
				reddot.name = "reddot";
			}
		}

		/**
		 * 移除红点提示
		 * @param bdoc 父容器
		 */
		public static removeIconFromBDOC(bdoc:BaseDisplayObjectContainer):void
		{
			if(bdoc && bdoc.getChildByName("reddot"))
			{
				let reddot:BaseBitmap = <BaseBitmap>bdoc.getChildByName("reddot");
				if(reddot)
				{
					reddot.visible = false;
				}
			}
		}

		public static createTalkContainer(talkStr:string,isNpcAtLeft:boolean=true,offX?:{lx?:number,rx?:number}):BaseDisplayObjectContainer
		{
			let talkContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			
			//说的话背景
			let talkBg:BaseBitmap = BaseBitmap.create("public_npc_talkbg");
			talkContainer.addChild(talkBg);

			//箭头
			let talkArrow:BaseBitmap = BaseBitmap.create("public_npc_talkarrow");
			if(isNpcAtLeft==false)
			{
				talkArrow.skewY=1;
			}

			//说的话
			let wordsText:BaseTextField = ComponentManager.getTextField(talkStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);

			talkBg.width = wordsText.width+26;
			// talkBg.height = 50;

			if(isNpcAtLeft)
			{
				if(offX)
				{
					if(!isNaN(offX.lx))
					{
						talkBg.setPosition(talkArrow.x-33,talkArrow.y-talkBg.height+2);
					}
					else if(!isNaN(offX.rx))
					{
						talkBg.setPosition(talkArrow.x+talkArrow.width-talkBg.width+33,talkArrow.y-talkBg.height+2);
					}
					else
					{
						talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
					}
				}
				else
				{
					talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
				}
			}
			else
			{
				if(offX)
				{
					if(!isNaN(offX.lx))
					{
						talkBg.setPosition(talkArrow.x-talkArrow.width-33,talkArrow.y-talkBg.height+2);
					}
					else if(!isNaN(offX.rx))
					{
						talkBg.setPosition(talkArrow.x-talkBg.width+33,talkArrow.y-talkBg.height+2);
					}
					else
					{
						talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
					}
				}
				else
				{
					talkBg.setPosition(talkArrow.x-talkBg.width/2,talkArrow.y-talkBg.height+2);
				}
			}
			talkContainer.addChild(talkArrow);

			wordsText.width=talkBg.width-26;
			wordsText.x = talkBg.x+13;
			wordsText.y = talkBg.y+(talkBg.height-wordsText.height)/2;
			talkContainer.addChild(wordsText);

			return talkContainer;
		}
		/**
		 * 播放天恩赐福动画
		 * @param key 名字 
		 */
		public static showGodbless(key:string):void
		{
			let godBless = new GodBless();	
			LayerManager.msgLayer.addChild(godBless);
			godBless.show(key);
		}

		/**
		 * 播放皇帝登录动画
		 */
		public static showGodLoginFlaunt(godName:string)
		{
			let godLogin = new GodLogin();
			LayerManager.msgLayer.addChild(godLogin);
			godLogin.show(godName);
		}

		/**
		 * 添加点击缩小效果
		 * @param obj 对象
		 * @param callback 回调
		 */
		public static addTouchScaleEffect(obj:BaseDisplayObject|BaseBitmap|BaseLoadBitmap|BaseDisplayObjectContainer|BaseLoadDisplayObjectContiner,callback:Function,handler:any):void
		{	
			obj.addTouch(
				(event:egret.TouchEvent,obj:any,callback:Function,handler:any)=>
				{	
					let scale = 0.9;
					 switch(event.type)
					{
						case egret.TouchEvent.TOUCH_BEGIN:
							obj.setScale(0.9);
							obj.x+=(obj.width*(1 - scale))/2;
							obj.y+=(obj.height*(1 - scale))/2;
							break;
						case egret.TouchEvent.TOUCH_END:
							obj.setScale(1);
							obj.x-=(obj.width*(1 - scale))/2;
							obj.y-=(obj.height*(1 - scale))/2;
							callback.apply(handler);
							break;
						case egret.TouchEvent.TOUCH_CANCEL:
							obj.setScale(1);
							obj.x-=(obj.width*(1 - scale))/2;
							obj.y-=(obj.height*(1 - scale))/2;
							// callback.apply(handler);
							break;
					}
				},
				CommonUtil,
				[obj,callback,handler]
			)
		}
		/**
		 * 获取带单位的货币字符串
		 * @param money 钱数，不带单位
		 */
		public static getMoneyString(money:number|string):string
		{
			let moneyKey = "anyMoney";
			if (PlatformManager.checkIsKRSp() && App.DeviceUtil.isIOS()) {
				// moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
			}
			return LanguageManager.getlocal(moneyKey,[money.toString()]);
		}
		/**
		 * 比较两个版本号的大小，1前者大，0相等，-1后者大
		 * 注意，1.0小于1.0.0
		 */
		public static compareVersion(v1:string, v2:string):number {
			let v1Arr = v1.split(".");
			let v2Arr = v2.split(".");
			let maxLen = Math.max(v1Arr.length, v2Arr.length);
			for(let i = 0; i < maxLen; i++) {
				let v1value = v1Arr[i];
				let v2value = v2Arr[i];
				if (v1value === undefined) {
					return -1;
				}
				if (v2value === undefined) {
					return 1;
				}
				if (parseInt(v1value) > parseInt(v2value)) {
					return 1;
				} else if (parseInt(v1value) < parseInt(v2value)) {
					return -1;
				}
			}
			return 0;
		}
		// 获取url参数，对egret.getOption的封装，对于不支持的平台返回空字符串
		public static getOption(keyName):string
		{
			return egret.getOption(keyName)||"";
		}
		// public static formatSeaScreen(target:egret.DisplayObject):void
		// {
		// 	if(App.DeviceUtil.checkIsSeascreen()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
		// 	{
		// 		if (App.DeviceUtil.isWXgame()) {
		// 			target.scaleY=(window.screen.availHeight-GameConfig.seaScreenTopH)/window.screen.availHeight;
		// 		} else {
		// 			target.scaleY=(document.documentElement.clientHeight-GameConfig.seaScreenTopH)/document.documentElement.clientHeight;
		// 		}
		// 		target.y=GameConfig.seaScreenTopH;
		// 	}
		// }

		// /**
		//  * 适配iPhone X 底部栏
		//  */
		// public static formatIphoneXButtom(target:egret.DisplayObject,isSetScaleY?:boolean):boolean
		// {
		// 	if(App.DeviceUtil.checkIsIphoneX()&&GameConfig.stage.stageHeight==GameConfig.stageHeigth)
		// 	{
		// 		if(!isSetScaleY)
		// 		{
		// 			target.y-=GameConfig.iphoneXButtomH;
		// 		}
		// 		else
		// 		{
		// 			target.scaleY=(GameConfig.stageHeigth-GameConfig.iphoneXButtomH)/GameConfig.stageHeigth;
		// 		}
		// 		return true;
		// 	}
		// 	return false;
		// }

		/**
		 * 判断支持龙骨
		 */
		public static check_dragon(): boolean {
			return App.DeviceUtil.CheckWebglRenderMode();
			// return false;
			// if (!!window["WebGLRenderingContext"]) {//支持龙骨
            //     ret = 1;//完全支持
            //     if (egret.Capabilities.renderMode == "canvas") {//canvas 不支持蒙皮
            //         ret = 2;//不支持蒙皮
            //     }
            // }
            // return ret;
        }

		public static formatFullScreenBg():void
		{
			if(!App.DeviceUtil.checkIsFullscreen())
			{
				return;
			}
			let layerY:number=(GameConfig.stage.stageHeight-GameConfig.stageHeigth)*0.5;
			let topBg:BaseBitmap=<BaseBitmap>LayerManager.maskLayer.getChildByName("fill_screen_top");
			if(!topBg)
			{
				topBg=BaseBitmap.create("fill_screen_top");
				LayerManager.msgLayer.addChild(topBg);
				topBg.y=-topBg.height;
			}
			let buttomBg:BaseBitmap=<BaseBitmap>LayerManager.maskLayer.getChildByName("fill_screen_buttom");
			if(!buttomBg)
			{
				buttomBg=BaseBitmap.create("fill_screen_buttom");
				LayerManager.msgLayer.addChild(buttomBg);
				buttomBg.y=GameConfig.stageHeigth;
			}
		}
		public static getAge(identityCard) {
			var len = (identityCard + "").length;
			if (len == 0) {
				return 0;
			} else {
				if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
				{
					return 0;
				}
			}
			var strBirthday = "";
			if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
			{
				strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
			}
			if (len == 15) {
				strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
			}
			//时间字符串里，必须是“/”
			var birthDate = new Date(strBirthday);
			var nowDateTime = new Date();
			var age = nowDateTime.getFullYear() - birthDate.getFullYear();
			//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
			if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
				age--;
			}
			return age;
		}
		/** 是否是有效姓名 */
		public static isTrueName (name)
		{
			var regName =/^[\u4e00-\u9fa5]{2,6}$/;
			if(!regName.test(name)){
				return false;
			}
			return true;
		}
		// 身份证号验证，来源于网络 https://www.jb51.net/article/23651.htm
		public static isCardNo(idcard){
			//验证身份证号方法 
			// var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"); 
			var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"xinjiang",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
			var Y,JYM; 
			var S,M; 
			var idcard_array = new Array(); 
			idcard_array = idcard.split(""); 
			if(area[parseInt(idcard.substr(0,2))]==null) return false; 
			var ereg;
			if (idcard.length === 15){
				if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
				} 
				else{ 
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
				} 
				if(ereg.test(idcard)) 
					return true; 
				else 
					return false; 
			} else if (idcard.length === 18) {
				if( parseInt(idcard.substr(6,4)) % 4 == 0 || ( parseInt(idcard.substr(6,4)) % 100 == 0)){ 
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
				} 
				else{ 
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
				} 
				if(ereg.test(idcard)){ 
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ; 
					Y = S % 11; 
					M = "F"; 
					JYM = "10X98765432"; 
					M = JYM.substr(Y,1); 
					if(M == idcard_array[17]) 
						return true; 
					else 
						return false; 
				} 
				else 
					return false; 
			} else {
				return false; 

			}
		}

		/**
		 * 获取当前渠道测试地址url
		 */
		public static getTestUrl():string
		{
			let testUrl:string="";
			if(App.DeviceUtil.IsHtml5())
			{
				let curl=window.location.href;
				testUrl=curl;
				let pathName:string=window.location.pathname;
				let testpathName:string=pathName;
				if(pathName.indexOf("gt_test")<0&&pathName.indexOf("gt_local")<0&&pathName.indexOf("gt_iosshenhe")<0&&pathName.indexOf("gt_plat")<0)
				{
					if(PlatformManager.checkIsWanbaSp())
					{
						if(pathName.indexOf("home?")>-1)
						{
							testpathName = pathName.replace("home?","gt_testwanba/?");
						}
						else if(pathName.indexOf("home")>-1)
						{
							testpathName = pathName.replace("home","gt_testwanba/");
						}
					}
					else
					{
						testpathName = pathName.replace("gt_","gt_test");
					}
					testUrl=curl.replace(pathName,testpathName);
				}
			}
			return testUrl;
		}

		/**
		 * 检测是否可以切换1000服
		 */
		public static checkAndJumpToTest():void
		{
			if(App.DeviceUtil.IsHtml5()&&LocalStorageManager.get("gametest1000"))
			{
				let curl:string = window.location.href;
				let newUrl:string = App.CommonUtil.getTestUrl();
				if(curl!=newUrl)
				{
					LocalStorageManager.set("gametest1000",curl);
					window.location.href=newUrl;
				}
			}
		}

		/**
		 * 从测试切到正式
		 */
		public static checkAndJumpToBack():void
		{
			if(App.DeviceUtil.IsHtml5())
			{
				let gameUrl:string=LocalStorageManager.get("gametest1000");
				let curl:string=window.location.href;
				LocalStorageManager.remove("gametest1000");
				if(gameUrl&&gameUrl!=curl)
				{
					window.location.href=gameUrl;
				}
			}
			else if(App.DeviceUtil.isRuntime2())
			{
				RSDKHelper.setRuntime2State({game_mark:""});
			}
		}
		public static setImageColor(image: BaseBitmap, color: number) {
		// 将16进制颜色分割成rgb值
		let spliceColor = (color) => {
			let result = {r: -1, g: -1, b: -1};
			result.b = color % 256;
			result.g = Math.floor((color / 256)) % 256;
			result.r = Math.floor((color / 256) / 256);
			return result;
		}
		let result = spliceColor(color);
		let colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		colorMatrix[0] = result.r / 255;
		colorMatrix[6] = result.g / 255;
		colorMatrix[12] = result.b / 255;
		let colorFilter = new egret.ColorMatrixFilter(colorMatrix);

		image.filters = [colorFilter];
		}
		/** 
		 * 获取通用框体□
		 * 请先加载资源:"commonview_border1","commonview_border2","commonview_bottom"
		 * @param height - 可选,默认300
		 * @param width - 可选,默认屏幕宽度
		*/
		public static getCommonBorderFrame(height?:number,width?:number,):BaseDisplayObjectContainer{
			let borderContainer = new BaseDisplayObjectContainer();
			let _width = width || GameConfig.stageWidth;
			let _height = height || 300;

			let bottomBorder = BaseBitmap.create("commonview_border1");
			let bottomTop = BaseBitmap.create("commonview_border2");
			let bottomB = BaseBitmap.create("commonview_bottom");
			//侧
			bottomBorder.width = _width;
			bottomBorder.height = _height;
			bottomBorder.x = 0;
			bottomBorder.y = 15;
			borderContainer.addChild(bottomBorder);
			//顶
			bottomTop.width = _width;
			bottomTop.scaleY = -1;
			bottomTop.x = 0;
			bottomTop.y = bottomBorder.y + 25;
			borderContainer.addChild(bottomTop);
			//底
			bottomB.width = _width;
			bottomB.x = 0;
			bottomB.y = _height - bottomB.height + 15;
			borderContainer.addChild(bottomB);

			return borderContainer;
		}

		public static clearData(data:Object):void
		{
			if(data&&typeof data == "object")
			{
				for(var key in data)
				{
					delete data[key];
				}
			}
		}

		/*
		*根据code获得资源图  资源必须严格命名 以xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
		*prev  资源前缀 分隔符"-"以前的字符串
		*code 传入code
		*/
		public static getResByCode(prev:string, code:string, defaultcode:string=`1`):string{
			let resname = `${prev}-${code}`;
			if(!RES.hasRes(resname)){
				//返回默认code资源
				resname = `${prev}-${defaultcode}`;
				if(!RES.hasRes(resname)){
					resname = `${prev}-1`;
					if(!RES.hasRes(resname)){
						resname = `${prev}`;
					}
				}
			}
			return resname;
		}

		/*
		*根据code获得cnkey  key严格命名以 必须 xxx-code 结尾 如 xxx-1, xxx-2,xxxx-3
		*prev  key前缀 分隔符"-"以前的字符串
		*code 传入code
		*/
		public static getCnByCode(prev:string, code:string, defaultcode:string=`1`):string{
			let newkey = `${prev}-${code}`;
			if(!LanguageManager.checkHasKey(newkey)){
				//返回默认code的cnkey
				newkey = `${prev}-${defaultcode}`;
				if(!LanguageManager.checkHasKey(newkey)){
					newkey = `${prev}-1`;
					if(!LanguageManager.checkHasKey(newkey)){
						newkey = `${prev}`;
					}
				}
			}
			return newkey;
		}
 	}
}