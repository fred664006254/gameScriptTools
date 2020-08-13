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
		 *计时器缓存
		 *
		 * @static
		 * @type {number[]}
		 * @memberof CommonUtil
		 */
		public static timeOutArr:number[]=[];
		/**
		 * 背包使用道具后飘字动画
		 * 对icon、文字数组进行缓动，目前是向上移动（可扩展）
		 * @param list icon：图标，message：文字 
		 * @param startPoint 开始位置相对全局坐标，可选，不传的话为屏幕中心
		 */
		public static playRewardFlyAction(list:{icon?:string,tipMessage:string,type?:number}[]|RewardItemVo[],startPoint?:egret.Point,waitTime:number=800,subNodeList?:BaseDisplayObjectContainer[],isHalve?:boolean):number[]
		{
			let timeOutArray:number[] = [];
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
					rewardFly.init(item.icon,item.tipMessage,item.type,subNode,isHalve,item);
					if(startPoint)
					{
						rewardFly.setPosition(startPoint.x,startPoint.y);
					}
					else
					{
						rewardFly.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2 - 100);
					}
					LayerManager.msgLayer.addChild(rewardFly);
					// if(CommonUtil.timeOutArr&&CommonUtil.timeOutArr.length>0)
					// {
						// egret.clearTimeout(CommonUtil.timeOutArr.shift());
					// }
				}
				let timeoutCount:number = egret.setTimeout(play,this,waitTime*i);
				// CommonUtil.timeOutArr.push(timeoutCount);
				timeOutArray.push(timeoutCount);
			}
			return timeOutArray;
		}

		public static titleframecfg = {
			4038 : 8,
			6006 : 8,
			4033 : 10,
			4016 : 10,
			6007 : 10,
			4040 : 8,
			3151 : 8,
			4026 : 10,
			4044 : 10,
		};
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

		public static createMainUIIcon(iconUrl:string,iconNameStr:string,isShow?:boolean,extType?:number|string,BigIcon?:any,timeStr?:string,aid?:string):BaseDisplayObjectContainer
		{	
			if(BigIcon){
				let iconContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				iconContainer.width=129;
				iconContainer.height=130;
				iconContainer.anchorOffsetX=iconContainer.width/2;
				iconContainer.anchorOffsetY=iconContainer.height/2;
				iconContainer.name = iconNameStr;
				
				let aid = BigIcon.aid;
				let iconbg = BaseBitmap.create(`public_lefticon_bg`);
				iconContainer.addChild(iconbg);

				let iconmame = `left_${aid}_`;
			
				let iconAni:CustomMovieClip= ComponentManager.getCustomMovieClip(`left_iconbg_`,5,100);
				iconAni.playWithTime(-1);
				iconContainer.addChild(iconAni);
				iconAni.width = 129;
				iconAni.height = 130;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);

				let icon:CustomMovieClip= ComponentManager.getCustomMovieClip(iconmame,5,100);
				icon.playWithTime(-1);
				iconContainer.addChild(icon);
				icon.width = 129;
				icon.height = 130;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);

				//加载完图片重新设置尺寸
				let icontext = `left_${aid}_txt`;
				let iconName:BaseLoadBitmap=BaseLoadBitmap.create(icontext,null,{callback:(container:BaseDisplayObjectContainer)=>{
					if(container)
					{
						let defaultW:number=105;
						if(PlatformManager.checkIsEnLang())
						{
							defaultW=110;
						}
						iconName.setPosition(container.width/2 - (iconName.width?iconName.width:defaultW)/2,90);

						if(timeStr)
						{
								let timeTF =  <BaseTextField>iconContainer.getChildByName(aid + "_TF");
								let timeBg =  <BaseBitmap>iconContainer.getChildByName(aid + "_Bg");
								if((!timeTF)&&(!timeBg))
								{
									timeBg = BaseBitmap.create("public_9_bg89");
									timeBg.name = aid + "_Bg";
									timeTF = ComponentManager.getTextField(timeStr,20,TextFieldConst.COLOR_WARN_RED3)
									timeTF.name = aid + "_TF";
									timeBg.width = timeTF.width + 30;
									timeBg.height = 25;
									timeBg.setPosition(iconName.x + iconName.width / 2 - timeBg.width / 2,iconName.y + iconName.height);
									timeTF.setPosition(timeBg.x + timeBg.width / 2 - timeTF.width / 2,timeBg.y + timeBg.height / 2 - timeTF.height / 2);
									iconContainer.addChild(timeBg);
									iconContainer.addChild(timeTF);
								}
						}
					}
					},callbackThisObj:this,callbackParams:[iconContainer]});

				iconContainer.addChild(iconName);

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
			else{
				if(iconNameStr == "share_icon_name" && PlatformManager.checkIsAiweiyouSp()== true)
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

				if(PlatformManager.checkIsRuSp()){
					if(iconUrl == `sevendayssignup1_icon` || iconUrl == `sevendayssignup2_icon` || iconUrl == `sevendayssignup7_icon`){
						iconUrl += `_ru`;
						iconNameStr = `sevendayssignup_name_ru`;
					}
				}
				if(PlatformManager.checkIsEnSp()){
					if(iconUrl == `sevendayssignup1_icon` || iconUrl == `sevendayssignup2_icon` || iconUrl == `sevendayssignup7_icon`){
						iconUrl += `_en`;
						iconNameStr = `sevendayssignup_name_en`;
					}
				}

				// let aid = iconUrl.split(`_`)[1];

				let vo : any = Api.acVoApi.getActivityVoByAidAndCode(aid);
				if(vo && vo.zids && vo.isCrossLeague()){//
					if(RES.hasRes(`${iconUrl}_crossleague`)){
						iconUrl += `_crossleague`; 
					}
				}

				let icon:BaseLoadBitmap=BaseLoadBitmap.create(iconUrl);
				icon.name = 'icon';
				iconContainer.addChild(icon);




				//加载完图片重新设置尺寸
				let iconName:BaseLoadBitmap=BaseLoadBitmap.create(iconNameStr,null,{callback:(container:BaseDisplayObjectContainer)=>{
					if(container)
					{
						let defaultW:number=88;
						if(PlatformManager.checkIsEnLang())
						{
							defaultW=110;
						}
						iconName.setPosition(container.width/2 - (iconName.width?iconName.width:defaultW)/2,50);
					}
					},callbackThisObj:this,callbackParams:[iconContainer]});

				iconContainer.addChild(iconName);
				// iocnName.setPosition(-8.5,50);

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
		}

		/**
		 * 添加红点提示
		 * @param bdoc 父容器
		 * @param icon 需要在父容器上添加的图片名字，默认是 public_dot2
		 * @param isLeft 父容器上的图片是否是在父容器左上角。默认是在右上角
		 */
		public static addIconToBDOC(bdoc:egret.DisplayObjectContainer,icon?:string,isLeft?:boolean):void
		{
			if(bdoc)
			{
				if (bdoc.getChildByName("reddot"))
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
						if(bdoc["_buttonName"]&&(bdoc["_buttonName"] == "btn2_normal_yellow" || bdoc["_buttonName"] == "btn2_normal_red" || bdoc["_buttonName"] == "btn2_normal_blue")){
							reddot.x = 145;
						} else if (bdoc["_buttonName"]&&(bdoc["_buttonName"] == "btn2_small_yellow" || bdoc["_buttonName"] == "btn2_small_red" || bdoc["_buttonName"] == "btn2_small_blue")) {
							reddot.x = 117;
						} else if (bdoc["_buttonName"]&&(bdoc["_buttonName"] == "btn2_big_yellow" || bdoc["_buttonName"] == "btn2_big_red" || bdoc["_buttonName"] == "btn2_big_blue")) {
							reddot.x = 163;
						} else if (bdoc && bdoc["name"] == "ChangebgIcon") {
							reddot.x = bdoc.width - reddot.width - 15;
						} else {
							reddot.x = bdoc.width - reddot.width + 5;	
						}
					}
					else
					{
						reddot.x = 0;
					}
					reddot.y = -5;
					bdoc.addChild(reddot);
					reddot.name = "reddot";
				}
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
				moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
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
		 * 判断是否支持网格动画龙骨
		 */
		public static check_dragon(): boolean {
			return App.DeviceUtil.CheckWebglRenderMode();
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
			var regName =/^[\u4e00-\u9fa5,·]{2,15}$/;
			if(!regName.test(name)){
				return false;
			}
			return true;
		}

		/** 是否是有效手机 */
		public static isPhoneNum (num)
		{
			var regName =/^1[34578]\d{9}$/;
			if(!regName.test(num)){
				return false;
			}
			return true;
		}

		/** 是否是有效验证码 */
		public static isCerCode (num)
		{
			var regName =/^[0-9]{4,6}$/;
			if(!regName.test(num)){
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

		// public static getLanguageResKey():string
		// {
		// 	let languageResKey:string=PlatformManager.getSpid();
		// 	if(PlatformManager.checkIsLocal()||PlatformManager.checkIsIOSShenheSp())
		// 	{
		// 		let tmpcnName:string=App.CommonUtil.getOption("language");
		// 		if(tmpcnName&&RES.hasRes(tmpcnName))
		// 		{
		// 			languageResKey=tmpcnName;
		// 		}
		// 		else
		// 		{
		// 			if(PlatformManager.checkIOSShenheOtherLanguage())
		// 			{
		// 				languageResKey=PlatformManager.checkIOSShenheOtherLanguage();
		// 			}
		// 		}
		// 	}
		// 	else if (PlatformManager.checkIsZjlySp())
		// 	{
		// 		languageResKey="zjly";
		// 	}
		// 	return languageResKey;
		// }

		public static overwriteAlert():void
		{
			let tmpAlert=window.alert;
			window.alert=function(message?:any)
			{
				if(message&&String(message).indexOf("sound decode error:")==0&&String(message).indexOf("http://edn.egret.com/cn/docs/page/156")>-1)
				{
					console.log("sound decode error");
				}
				else
				{
					tmpAlert(message);
				}
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

		/**
		 * 清理timeout计时器
		 */
		public static clear():void
		{
			while(CommonUtil.timeOutArr.length>0)
			{
				egret.clearTimeout(CommonUtil.timeOutArr.shift());
			}
		}

		/**
		 * 退帮、踢人、解散帮会前检验
		 */
		public static canNotQuitAlliance():boolean{
			let arr = [AcConst.AID_BATTLEGROUND,AcConst.AID_TOMB,AcConst.AID_RANKACTIVE,AcConst.AID_CROSSSERVERHEGEMONY,AcConst.AID_GROUPWIFEBATTLE];
			for(let i in arr){
				let aid = arr[i];
				let notQuit = false;
				let vo = null;
				switch(aid){
					case AcConst.AID_BATTLEGROUND:
						vo = <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(aid);
						notQuit = vo && vo.isInActy();
						break;
					case AcConst.AID_TOMB:
						vo = <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(aid);
						notQuit = vo && vo.isInActy();
						break;
					case AcConst.AID_RANKACTIVE:
						vo = <AcRankActiveVo>Api.acVoApi.checkActivityStartByAidAndType(aid, `14`);
						if(vo && vo.et && vo.config.extraTime && (GameData.serverTime < (vo.et - vo.config.extraTime * 86400))){
							notQuit = true;
						}
						break;
					case AcConst.AID_CROSSSERVERHEGEMONY:
						vo = <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(aid);
						notQuit = vo && vo.isNotQuitAlliance();
						break;
					case AcConst.AID_GROUPWIFEBATTLE:
						vo = <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(aid);
						notQuit = vo && vo.isInActy();
						break;						
					default:
						vo = Api.acVoApi.getActivityVoByAidAndCode(aid);
						notQuit = vo && !vo.isEnd;
						break;
				}
				if(notQuit){
					return notQuit;
				}
			}
			return false;
		}

		/** 
		 * title转换
		*/
		public static getTitleData(info : any):{clothes : string, title : string, clv : number, tlv : number}{
			let clothes = ``;
			let titleid = ``;
			let clv = 0;
			let tlv = 0;
			if(info){
				if((typeof info == `number` && info != 0)){
					titleid = info.toString();
				}
				else if((typeof info == `string` && info != ``)){
					if(info.split(`_`)[1]){
						clothes = info.split(`_`)[0];
						titleid = info.split(`_`)[1];
					}
					else{
						titleid = info.split(`_`)[0];
					}
				}
				else if(typeof info == `object`){
					if(info.clothes){
						clothes = info.clothes;
					}
					if(info.title){
						titleid = info.title;
					}
					if(info.clv){
						clv = info.clv;
					}
					if(info.tlv){
						tlv = info.tlv;
					}
				}
			}
			let obj = {
				clothes : clothes,
				title : titleid,
				clv : clv,
				tlv : tlv,
			}
			return obj;
		}

		/*
		*统一获取称号图片和特效
		*/
		public static getTitlePic(title : any, level = 0):BaseDisplayObjectContainer{
			let titleinfo = this.getTitleData(title);
			let group = null;
			if(titleinfo.title != ``){
				group = new BaseDisplayObjectContainer();
				let titleimg = BaseLoadBitmap.create("user_title_" + titleinfo.title + "_3");
				titleimg.width = 155;
				titleimg.height = 59;
				group.addChild(titleimg);
				titleimg.name = `titleimg`;

				if(!level || level == 0){
					level = titleinfo.tlv;
				}

				let titleconfig = Config.TitleCfg.getTitleCfgById(titleinfo.title);
				if(Api.switchVoApi.checkTitleUpgrade()){
					//添加特效
					if(level && titleconfig){
						let isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
						let iswang = titleconfig.isTitle == 1 && titleconfig.titleType == 2;
						let ishuang = titleconfig.isTitle == 1 && titleconfig.titleType == 7;
						let cfg = null;
						if(isdi){
							cfg = Config.TitleupgradeCfg.diList[level - 1];
						}
						if(iswang){
							cfg = Config.TitleupgradeCfg.wangList[level - 1];
						}
						if(ishuang){
							cfg = Config.TitleupgradeCfg.huangList[level - 1];
						}
						if(cfg){
							if(cfg.title1){
								if(RES.hasRes(`user_title_${titleinfo.title}_3_${cfg.title1}`)){
									let txt1 = BaseLoadBitmap.create(`user_title_${titleinfo.title}_txt`);
									txt1.width = 155;
									txt1.height = 59;
									txt1.anchorOffsetX = txt1.width / 2;
									txt1.anchorOffsetY = txt1.height / 2;
									txt1.x = txt1.width / 2;
									txt1.y = txt1.height / 2;
									group.addChild(txt1);
									titleimg.setload(`user_title_${titleinfo.title}_3_${cfg.title1}`);
								}
							}
							if(cfg.title2){
								if(cfg.title2 > 1){
									let txt2 = BaseLoadBitmap.create(`user_title_${titleinfo.title}_txt`);
									txt2.width = 155;
									txt2.height = 59;
									txt2.anchorOffsetX = txt2.width / 2;
									txt2.anchorOffsetY = txt2.height / 2;
									txt2.x = txt2.width / 2;
									txt2.y = txt2.height / 2;
									group.addChild(txt2);
									txt2.blendMode = egret.BlendMode.ADD;
									txt2.alpha = 0;
									egret.Tween.get(txt2, {loop: true}).to({alpha: 0.7}, 400).to({alpha: 0}, 400);
								}

								let effName = `${titleinfo.title}titleeff${cfg.title2}`;
								let num = 0;
								if(App.CommonUtil.titleframecfg[title]){
									num = App.CommonUtil.titleframecfg[title];
								}
								if(RES.hasRes(effName+"1")){
									let clip = ComponentManager.getCustomMovieClip(effName, num?num:10, 130);
									let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
										callback:()=>{
											clip.width = skinTxtEffectBM.width;
											clip.height = skinTxtEffectBM.height;
											clip.playWithTime(-1);
											App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, titleimg);
											group.addChildAt(clip,0);
											// clip.blendMode = egret.BlendMode.ADD;
										},
										callbackThisObj : this
									});
								}
							}
						}
						else{
						}
					}
				}else
				{
				}

				if(titleconfig && titleconfig.changePic && RES.hasRes(`user_title_${titleinfo.title}_3_1`)){
					let tmp = 1;
					for(let i in titleconfig.changePic){
						let tmplv = Number(titleconfig.changePic[i]);
						if(level >= tmplv){
							tmp = Number(i) + 1;
						}
					}
					let piclv = 1;
					let efflv = 1;
					if(tmp == 3 || tmp == 4){
						piclv = 2;
						efflv = 3;
					}
					else if(tmp == 5){
						piclv = 3;
						efflv = 5;
					}
					titleimg.setload(`user_title_${titleinfo.title}_3_${piclv}`);

					if(tmp >= 4){
						let txt2 = BaseLoadBitmap.create(`user_title_${titleinfo.title}_3_${piclv}`);
						txt2.width = 155;
						txt2.height = 59;
						txt2.anchorOffsetX = txt2.width / 2;
						txt2.anchorOffsetY = txt2.height / 2;
						txt2.x = txt2.width / 2;
						txt2.y = txt2.height / 2;
						group.addChild(txt2);
						txt2.blendMode = egret.BlendMode.ADD;
						txt2.alpha = 0;
						egret.Tween.get(txt2, {loop: true}).to({alpha: 0.7}, 400).to({alpha: 0}, 400);
					}

					let effName = `${titleinfo.title}titleeff${efflv}`;
					let num = 0;
					if(App.CommonUtil.titleframecfg[title]){
						num = App.CommonUtil.titleframecfg[title];
					}
					if(RES.hasRes(effName)){
						let clip = ComponentManager.getCustomMovieClip(effName, num ? num : 10, 130);
						let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
							callback:()=>{
								clip.width = skinTxtEffectBM.width;
								clip.height = skinTxtEffectBM.height;
								clip.playWithTime(-1);
								App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, titleimg, [-2,-3]);
								group.addChildAt(clip,0);
								// clip.blendMode = egret.BlendMode.ADD;
							},
							callbackThisObj : this
						});
					}
				}
				else{
					// if(titleinfo.title == "6011")  //人中吕布称号不需升级，有特效
					// {
						let effName = `${titleinfo.title}titleeff`;
						let num = 0;
						if(App.CommonUtil.titleframecfg[titleinfo.title]){
							num = App.CommonUtil.titleframecfg[titleinfo.title];
						}
						if(RES.hasRes(effName) && RES.hasRes(effName+"1")){
							let clip = ComponentManager.getCustomMovieClip(effName, num?num:10, 130);
							let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
								callback:()=>{
									clip.width = skinTxtEffectBM.width;
									clip.height = skinTxtEffectBM.height;
									clip.playWithTime(-1);
									App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, titleimg);
									group.addChildAt(clip,0);
									// clip.blendMode = egret.BlendMode.ADD;
								},
								callbackThisObj : this
							});
						}						
					// }
				}					
			}
			return group;
		}

		/*
		*统一获取称号图片和特效
		*/
		public static getPtitleInfo(ptitleinfo:any):{ptitle : string, plv : number}{
			//let ptitleinfo = this.playerVo.ptitle;
			let pid = ``;
			let plv = 1;
			if(ptitleinfo){
				if(typeof ptitleinfo == `string` || typeof ptitleinfo == `number`){
					pid = String(ptitleinfo);
				}
				if(typeof ptitleinfo == `object`){
					if(ptitleinfo.ptitle){
						pid = ptitleinfo.ptitle;
					}
					if(ptitleinfo.plv){
						plv = ptitleinfo.plv;
					}
				}
			}
			return {
				ptitle : String(pid), plv : plv
			}
		}

		public static getHeadEffect(titleid:string):CustomMovieClip{
			let loop = 1;
			let effname = `head_${titleid}_effect`;
			if(!RES.hasRes(effname)){
				return null;
			}
			while(RES.hasRes(`${effname}${loop}`)){
				++ loop;
			}
			let eff = ComponentManager.getCustomMovieClip(effname,loop - 1,100);
			eff.blendMode = egret.BlendMode.ADD;
			eff.playWithTime(-1);
			let img = BaseLoadBitmap.create(`${effname}1`,null,{
				callback : ()=>{
					eff.width = img.width;
					eff.height = img.height;
					eff.anchorOffsetX = eff.width / 2;
					eff.anchorOffsetY = eff.height / 2;
				},
				callbackThisObj : this,
			});
			return eff;
		}

		public static getHeadPic(ptitle : any, level = 0, isitem:TitleInfoVo=null, showTitleEff : boolean = false, showTitleEffNum : number = 0):BaseDisplayObjectContainer{
			let titleinfo = this.getPtitleInfo(ptitle);
			let title = titleinfo.ptitle;
			if(!level){
				level = titleinfo.plv;
			}
			
			let group = null;
			group = new BaseDisplayObjectContainer();
			//道具界面专用
			if(isitem){ 
				group.width = 100;
				group.height = 100;

				let itemicon = BaseLoadBitmap.create(isitem.icon);
				itemicon.width = 100;
				itemicon.height = 100;
				group.addChild(itemicon);

				let titleconfig = Config.TitleCfg.getTitleCfgById(title);
				if(titleconfig && titleconfig.changePic){
					let tmp = 1;
					for(let i in titleconfig.changePic){
						let tmplv = Number(titleconfig.changePic[i]);
						if(level >= tmplv){
							tmp = Number(i) + 1;
						}
					}
					if(RES.hasRes(`itemicon${title}_${tmp}`)){
						itemicon.setload(`itemicon${title}_${tmp}`);
					}

					let effName = `head_${title}_${tmp}effect`;
					let num = 0;
					if(App.CommonUtil.titleframecfg[title]){
						num = App.CommonUtil.titleframecfg[title];
					}
					//titleconfig.changePicFlame;
					if(RES.hasRes(effName)){
						let clip = ComponentManager.getCustomMovieClip(effName, num?num:10, 130);
						clip.blendMode = egret.BlendMode.ADD;
						let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
							callback:()=>{
								clip.width = skinTxtEffectBM.width;
								clip.height = skinTxtEffectBM.height;
								clip.setScale(0.77);
								clip.playWithTime(-1);
								if(num){
									// clip.y = -3;
									clip.anchorOffsetX = clip.width / 2;
									clip.anchorOffsetY = clip.height / 2;
									clip.setScale(0.78);
									clip.x = 50 + 4;
									clip.y = 50 - 1; 
								}
								else{
									App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, itemicon, [-2,0]);
								}
								// if(Number(title) == 4033){
								// 	clip.x = tmp == 3 ? -4 : 10;
								// 	clip.y =tmp == 3 ? 2 : 0;
								// }

								group.addChild(clip);
							},
							callbackThisObj : this
						});
					}
				}

			}
			else{
				let titleimg = BaseLoadBitmap.create("head_circle_bg_" + title);
				titleimg.width = 103;
				titleimg.height = 100;
				group.addChild(titleimg);
				titleimg.name = `titleimg`;
				
				if(title.indexOf(`head_circle_bg`) > -1){
					titleimg.setload(title);
				}
				else if(title != `` && title != `-1`){
					if(!level || level == 0){
						level = 1;
					}
					let titleconfig = Config.TitleCfg.getTitleCfgById(title);
					if(titleconfig && titleconfig.changePic){
						let tmp = 1;
						for(let i in titleconfig.changePic){
							let tmplv = Number(titleconfig.changePic[i]);
							if(level >= tmplv){
								tmp = Number(i) + 1;
							}
						}
						titleimg.setload(`head_circle_bg_${title}_${tmp}`);

						let effName = `head_${title}_${tmp}effect`;
						let num = 0;
						if(App.CommonUtil.titleframecfg[title]){
							num = App.CommonUtil.titleframecfg[title];
						}
						if(RES.hasRes(effName)){
							let clip = ComponentManager.getCustomMovieClip(effName, num?num:10, 130);
							clip.blendMode = egret.BlendMode.ADD;
							let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
								callback:()=>{
									clip.width = skinTxtEffectBM.width;
									clip.height = skinTxtEffectBM.height;
									clip.playWithTime(-1);
									if(num){
										App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, titleimg);
									}
									else{
										App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, titleimg, [-5,0]);
									}
									
									group.addChild(clip);
								},
								callbackThisObj : this
							});
						}
					}
					if(showTitleEff){
						let effName = `head_${title}_effect`;
						let num = showTitleEffNum;
						if(RES.hasRes(`${effName}1`)){
							let clip = ComponentManager.getCustomMovieClip(effName, num, 130);
							clip.blendMode = egret.BlendMode.ADD;
							let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
								callback:()=>{
									clip.width = skinTxtEffectBM.width;
									clip.height = skinTxtEffectBM.height;
									clip.playWithTime(-1);
									clip.y = -3;
									group.addChild(clip);
								},
								callbackThisObj : this
							});
						}
					}
				}
				else{
					let headBg = "head_circle_bg";
					titleimg.setload(headBg);
				}
			}
			return group;
		}

		/*
		*统一获取皇特效
		*/
		public static getHuangEffect(titleid:string,level:number) : any{
			let view = this;
			let obj = {};
			let cfg = Config.TitleupgradeCfg.huangList[level - 1];;
			let titleconfig = Config.TitleCfg.getTitleCfgById(titleid);
			let xialevel = 0;
			//下面特效
			if(cfg){
				if(cfg.shoulder){
					xialevel = cfg.shoulder;
					let group = new BaseDisplayObjectContainer();
					let clip = ComponentManager.getCustomMovieClip(`titlehuangeffxia_${xialevel}_eff`, 15, 100);
					clip.blendMode = egret.BlendMode.NORMAL;
					clip.width = 72;
					clip.height = 72;
					clip.setScale(9);
					clip.playWithTime(-1);
					group.name = `xia`;
					obj[`xia`] = group;
					group.addChild(clip);
					group.anchorOffsetX = group.width / 2;
					group.anchorOffsetY = group.height / 2;
				}
				//背部特效
				if(cfg.head){
					let group = new BaseDisplayObjectContainer();
					let clip = ComponentManager.getCustomMovieClip(`titlehuangeffhou_${cfg.head}_eff`, 15, 100);
					clip.blendMode = egret.BlendMode.ADD;
					clip.width = 318;
					clip.height = 359;
					clip.setScale(3);
					clip.playWithTime(-1);
					group.name = `hou`;
					obj[`hou`] = group;
					group.addChild(clip);
					group.anchorOffsetX = group.width / 2;
					group.anchorOffsetY = group.height / 2;

					let leftguanggroup = new BaseDisplayObjectContainer();
					let guang = BaseLoadBitmap.create(`titlehuangeffshoulderlight`);
					guang.width = guang.height = 72;
					guang.setScale(2);
					leftguanggroup.addChild(guang);
					leftguanggroup.anchorOffsetX = leftguanggroup.width / 2;
					leftguanggroup.anchorOffsetY = leftguanggroup.height / 2;
					egret.Tween.get(guang, {loop : true}).to({alpha : 0}, 750).to({alpha : 1}, 750);

					leftguanggroup.name = `leftlight`;
					obj[`leftlight`] = leftguanggroup;

					let rightguanggroup = new BaseDisplayObjectContainer();
					let guang2 = BaseLoadBitmap.create(`titlehuangeffshoulderlight`);
					guang2.width = guang2.height = 72;
					guang2.setScale(2);
					rightguanggroup.addChild(guang2);
					rightguanggroup.anchorOffsetX = rightguanggroup.width / 2;
					rightguanggroup.anchorOffsetY = rightguanggroup.height / 2;
					guang2.alpha = 0.2;
					egret.Tween.get(guang2, {loop : true}).to({alpha : 0}, 100).to({alpha : 1}, 800).to({alpha : 0.2}, 600);
				

					rightguanggroup.name = `rightlight`;
					obj[`rightlight`] = rightguanggroup;
				}
				//地面特效
				if(cfg.body){
					let group = new BaseDisplayObjectContainer();
					let clip = ComponentManager.getCustomMovieClip(`titlehuangeffdimian_${cfg.body}_eff`, 15, 100);
					clip.blendMode = egret.BlendMode.NORMAL;
					clip.width = 72;
					clip.height = 72;
					clip.setScale(9);
					clip.playWithTime(-1);
					group.name = `dimian`;
					obj[`dimian`] = group;
					group.addChild(clip);
					group.anchorOffsetX = group.width / 2;
					group.anchorOffsetY = group.height / 2;

				}
				//龙特效
				if(cfg.dragon){
					if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && RES.hasRes(`huangdi_dragon_3151_part1_ske`)){
						let group = new BaseDisplayObjectContainer();
						let db1 = App.DragonBonesUtil.getLoadDragonBones(`huangdi_dragon_3151_part1`);
						group.addChild(db1);
						group.name = `db1`;
						obj[`db1`] = group;
						group.anchorOffsetX = group.width / 2;
						group.anchorOffsetY = group.height / 2;

						let group2 = new BaseDisplayObjectContainer();
						let db2 = App.DragonBonesUtil.getLoadDragonBones(`huangdi_dragon_3151_part2`);
						group2.addChild(db2);
						group2.name = `db2`;
						obj[`db2`] = group2;
						group2.anchorOffsetX = group2.width / 2;
						group2.anchorOffsetY = group2.height / 2;
					}
					
				}
			}
			return obj;
		}

		/**
		 *获取人物龙骨
		 titleid 穿着服装
		 pic 头像
		 level 服装等级
		*/
		public static getPlayerDragonRole(titleid : string, pic : number, level : number, isHideEffect?:boolean):any{
			if (!level){
				level = 1;
			}
			let group = new BaseDisplayObjectContainer();
			let loadIdx:number=0;
			let dbNode1 =  new BaseDisplayObjectContainer(); //下层可变特效
			dbNode1.name = `dbNode1`;
        	group.addChild(dbNode1);
			let dbNode2 =  new BaseDisplayObjectContainer();  //上层可变
			dbNode2.name = `dbNode2`;
			let dbNode3 =  new BaseDisplayObjectContainer();  //上层不可变
			dbNode3.name = `dbNode3`;
			group.addChild(dbNode3);
        	let myHair = null;
        	let tcfg = Config.TitleCfg.getTitleCfgById(titleid);
        	let resPath = "palace_db_" + titleid + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(pic)}` : ``);
            let role = App.DragonBonesUtil.getLoadDragonBones(resPath,0,"idle",()=>{
				group.width = role.width;
				group.height = role.height;
                if(tcfg.titleType != 7){
                    loadIdx++;
                    if(loadIdx>=3)
                    {
                        if(role)
                        {
                            role.visible=true;
                        }
                        if(myHead)
                        {
                            myHead.visible=true;
                        }
                        if(myHair)
                        {
                            myHair.visible=true;
                        }
                    }
				}
				//添加特效
				//皇位特效
				let cfg = null;
				if (!isHideEffect){
					if(tcfg.titleType == 7){
						let effobj = App.CommonUtil.getHuangEffect(titleid, level);
						if(effobj[`xia`]){
							group.addChild(effobj[`xia`]);
							effobj[`xia`].setPosition(role.x,role.y+role.height-effobj[`xia`].anchorOffsetY);
						}
						if(effobj[`hou`]){
							group.addChildAt(effobj[`hou`], group.getChildIndex(role) - 1);
							effobj[`hou`].setPosition(role.x,role.y+250);
						}
						if(effobj[`leftlight`]){
							group.addChild(effobj[`leftlight`]);
							effobj[`leftlight`].setPosition(role.x-80,role.y+160);
						}
						if(effobj[`rightlight`]){
							group.addChild(effobj[`rightlight`]);
							effobj[`rightlight`].setPosition(role.x+80,role.y+160);
						}
						if(effobj[`dimian`]){
							group.addChildAt(effobj[`dimian`], group.getChildIndex(role) - 1);
							effobj[`dimian`].setPosition(role.x,role.y+effobj[`dimian`].height);
						}
						if(effobj[`db1`]){
							group.addChild(effobj[`db1`]);
							effobj[`db1`].setPosition(role.x,role.y);
						}
						if(effobj[`db2`]){
							group.addChildAt(effobj[`db2`], group.getChildIndex(role) - 1);
							effobj[`db2`].setPosition(role.x,role.y);
						}
					}
					else{
						let roleNode1 = dbNode1.getChildByName("roleNode1");
						let roleNode2 = dbNode2.getChildByName("roleNode2");
						if(roleNode1 && roleNode1 instanceof  BaseLoadDragonBones){
							roleNode1.stop();
							roleNode1.dispose();
						}
						if(roleNode2 && roleNode2 instanceof  BaseLoadDragonBones){
							roleNode2.stop();
							roleNode2.dispose();
						}
						dbNode1.removeChildren(); //下层可变特效
						dbNode2.removeChildren(); //上层可变
						dbNode3.removeChildren(); //上层不可变
						let isdi = tcfg.isTitle == 1 && tcfg.titleType == 1;
						let iswang = tcfg.isTitle == 1 && tcfg.titleType == 2;
						let ishuang = tcfg.isTitle == 1 && tcfg.titleType == 7;
						if(isdi){
							cfg = Config.TitleupgradeCfg.diList[level - 1];
						}
						if(iswang){
							cfg = Config.TitleupgradeCfg.wangList[level - 1];
						}
						if(ishuang){
							cfg = Config.TitleupgradeCfg.huangList[level - 1];
						}
				
						let xialevel = 0;
						if(cfg && cfg.shoulder){
							xialevel = 1;
						}
				
						if(cfg && cfg.head){
							xialevel = 2;
						}
					
						if(cfg && cfg.body){
							xialevel = 3;
						}
					
						if(cfg && cfg.dragon){
							xialevel = 4;
						}
					
						if(xialevel >= 1){
							if(xialevel > 1){
								let xiapath = "huangdi_" + xialevel + "xia";
								let roleNode1 = App.DragonBonesUtil.getLoadDragonBones(xiapath);
								if(xialevel == 2){
									roleNode1.y = 160;
								}else if(xialevel == 3){
									roleNode1.y = 160;
								}else if(xialevel == 4){
									roleNode1.y = 180;
								} 
								dbNode1.addChild(roleNode1);
								roleNode1.name = "roleNode1";
								roleNode1.x = 0;
							}
							
							let shangpath = "huangdi_" + (xialevel>=3 ? 3 : xialevel ) + "shang";
							if(xialevel == 1){
								shangpath = "huangdi_1";
							}
							let roleNode2 = App.DragonBonesUtil.getLoadDragonBones( shangpath);
							roleNode2.name = "roleNode2";
							roleNode2.y = 200;
							dbNode2.addChild(roleNode2);
						
							
							roleNode2.x = 0;
						}
					}
				}
            },this);
			group.addChild(role);
			group.addChild(dbNode2);
            if(loadIdx==0){
                role.visible=false;
            }
            if(tcfg.titleType == 7){
                role.visible=true;
            }
            let hairPic = "user_hair" + pic;
            if(pic <= 5 || (!ResourceManager.hasRes(hairPic))){
                hairPic = "user_hair" + 7;
            }
            let rect12:egret.Rectangle=egret.Rectangle.create();
            rect12.setTo(0,0,85,140);
            myHair= BaseLoadBitmap.create(hairPic,rect12,{callback:()=>{
                loadIdx++;
                if(loadIdx>=3)
                {
                    if(role)
                    {
                        role.visible=true;
                    }
                    if(myHead)
                    {
                        myHead.visible=true;
                    }
                    if(myHair)
                    {
                        myHair.visible=true;
                    }
                }
            },callbackThisObj:this});
            myHair.visible=false;
            myHair.name = "myHair";
            group.addChild(myHair);
			myHair.anchorOffsetX = myHair.width / 2;

            // roleNode.width = 470;
            // roleNode.height = 429;
            role.setScale(tcfg.titleType == 7 ? 1 : 1.4);
            let rect1:egret.Rectangle=egret.Rectangle.create();
            rect1.setTo(0,0,136,143);
            let myHead = BaseLoadBitmap.create("user_head" + pic,rect1,{callback:()=>{
                loadIdx++;
                if(loadIdx>=3)
                {
                    if(role)
                    {
                        role.visible=true;
                    }
                    if(myHead)
                    {
                        myHead.visible=true;
                    }
                    if(myHair)
                    {
                        myHair.visible=true;
                    }
                }
            },callbackThisObj:this});
            if(loadIdx==0)
            {
                myHead.visible=false;
            }
            myHead.width = 136;
			myHead.height = 143;
			myHead.anchorOffsetX = myHead.width / 2;
			group.addChild(myHead);

			myHead.setPosition(role.x, role.y-35);
			myHair.setPosition(role.x, role.y-35);

			return group;
		}

		/*
		* 跳转界面 适用于最新任务 taskdesc+taskid
		**/
		public static goTaskView(type : string):void
		{
			let openType = type.split('|')[0];
			let openTypeTab = type.split('|')[1];
			let viewName = App.StringUtil.firstCharToUper(openType);
			let str = '';
			if(openType == ""){
				PlayerBottomUI.getInstance().show();
			} 
			else
			{
				if(openType == "acBattlePass" && Number(openTypeTab) == 4){
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEPASS_JUMP, Number(openTypeTab));
					return;
				}
				if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc){
					let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
					if(!isShowNpc){
						let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
						App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
						return;
					}
				}
				if(egret.getDefinitionByName(viewName + "View")){
					let aid = '';
					let isActy = false;
					switch(openType){
						case `acRankActive`:
							aid = `rankActive`;
							isActy = true;
							break;
						default:
							break;
					}
					if(openType == 'alliance'){
						let allid = Api.playerVoApi.getPlayerAllianceId();
						if(!allid || allid <= 0){
							str = `AllianceCreateView`;
						}
					}
					else{
						str = viewName + "View";
					}
					if(isActy){
						if(!Api.acVoApi.checkActivityStartByAid(aid)){
							App.CommonUtil.showTip(LanguageManager.getlocal(`battlepassquesttip1`));
							return;
						}
						else{
							str = `RankActiveView`;
						}
					}
				}else if (egret.getDefinitionByName(viewName + "PopupView")){//可以跳转
					str = viewName + "PopupView"; 
				}
				else{
					if(openType=="recharge"){
						str = viewName +"VipView";
					}
				}
				if(openTypeTab && Number(openTypeTab)){
					str += `|${openTypeTab}`;
				}
				ViewController.getInstance().openView(str);  
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
		*
		*prev  资源前缀 分隔符"-"以前的字符串
		*iscross 是否是跨服
		*/
		public static getCrossLeagueRes(prev:string, iscross:boolean):string{
			let resname = `${prev}${iscross?`_multicross`:``}`;
			if(!RES.hasRes(resname)){
				//返回默认code资源
				resname = `${prev}`;
			}
			return resname;
		}

			/*
		*
		*prev  资源前缀 分隔符"-"以前的字符串
		*iscross 是否是跨服
		*/
		public static getCrossLeagueCn(prev:string, iscross:boolean):string{
			let newkey = `${prev}${iscross?`_crossleague`:``}`;
			if(!LanguageManager.checkHasKey(newkey)){
				//返回默认code的cnkey
				newkey = `${prev}`;
			}
			return newkey;
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

		/** 
		 * 获取节日专属标记
		*/
		public static getSkinFromType(skinId):BaseLoadBitmap{
			let flag = '';
			let res = null;
			let w = 0;
			let h = 0;
			switch(Number(skinId)){
				case 10334:
				case 10561:
					flag = `lanternzshuflag`;
					w = 129;
					h = 45;
					break;
				case 10344:
					flag = "acrecover_skintitle";
					w = 162;
					h = 62;
					break;
			}
			if(flag != ``){
				res = BaseLoadBitmap.create(flag);
				res.width = w;
				res.height = h;
			}
			return res;
		}

		/**
		 * 获取门客衣装标签  type  门客皮肤标签  1：无标签 2：王爷标签 3：帝王标签 4：流芳百世  5：名传千古  6：独断万载    7：元宵（活动专属） 8：春季专属 9：泼水节专属
		 */
		public static getServantSkinFlagById(skinId:string|number):BaseDisplayObjectContainer{
			if (!skinId){
				return null;
			}
			let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
			let bgName = "";
			if (skinCfg && skinCfg.type != 1){
				bgName = "servant_skin_title_"+skinCfg.type;
				if (ResourceManager.hasRes(bgName)){
					let container = new BaseDisplayObjectContainer();
					container.width = 162;
					container.height = 62;
					let flag = BaseLoadBitmap.create(bgName);
					flag.width = 162;
					flag.height = 62;
					container.addChild(flag);

					let titleEffStr = "servant_skin_titleeffect"+skinCfg.type;
					if (ResourceManager.hasRes(titleEffStr)){
						let frames = 10;
						let effW = 280;
						let effH = 103;
						if (skinCfg.type == 2){ // 147 64
							frames = 13;
							effW = 147;
							effH = 64;
						}
						else if (skinCfg.type == 3){
							frames = 16; // 167, 65
							effW = 167;
							effH = 65;
						}
						else if (skinCfg.type == 13){
							frames = 15; // 167, 65
							effW = 250;
							effH = 200;
						}
						let titleEffect = ComponentManager.getCustomMovieClip(titleEffStr+"_", frames, 70);
						titleEffect.setPosition(flag.x + flag.width/2 - effW/2, flag.y + flag.height/2 - effH/2);
						titleEffect.playWithTime(0);
						container.addChild(titleEffect);
						titleEffect.blendMode = egret.BlendMode.ADD;
					}
					return container;
				}
			}
			return null;
		}

		/**
		 * 获取红颜衣装标签 type  红颜标签  1：无标签 2：初级标签 3：中级标签 4：高级标签  8：春季专属 9：泼水节专属
		 */
		public static getWifeSkinFlagById(skinId:string|number):BaseDisplayObjectContainer{
			if (!skinId){
				return null;
			}
			let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
			let bgName = "";
			if (skinCfg && skinCfg.type != 1){
				bgName = "wife_skin_title"+skinCfg.type;
				if (ResourceManager.hasRes(bgName)){
					let container = new BaseDisplayObjectContainer();
					container.width = 162;
					container.height = 62;
					let flag = BaseLoadBitmap.create(bgName);
					flag.width = 162;
					flag.height = 62;
					container.addChild(flag);

					let titleEffStr = "wifeskin_titleeff"+skinCfg.type;
					if (ResourceManager.hasRes(titleEffStr)){
						let frames = 10;
						let effW = 280;
						let effH = 103;
						if (skinCfg.type == 2){ // 147 64
							effW = 280;
							effH = 107;
						}
						else if (skinCfg.type == 3){
							effW = 250;
							effH = 96;
						}
						else if (skinCfg.type == 4){
							effW = 280;
							effH = 103;
						}
						else if (skinCfg.type == 13){
							frames = 15;
							effW = 250;
							effH = 200;
						}
						let titleEffect = ComponentManager.getCustomMovieClip(titleEffStr+"_", frames, 70);
						titleEffect.setPosition(flag.x + flag.width/2 - effW/2, flag.y + flag.height/2 - effH/2);
						titleEffect.playWithTime(0);
						container.addChild(titleEffect);
						titleEffect.blendMode = egret.BlendMode.ADD;
					}
					return container;
				}
			}
			return null;
		}

		/**
		 * 门客衣装光环
		 */
		public static getServantSkinAuraById(skinId:string|number):BaseDisplayObjectContainer{
			if (!skinId){
				return null;
			}
			let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
			if (skinCfg && skinCfg.specialAuraCfg){
				let auraId = skinCfg.specialAuraCfg.auraIcon
				let iconImg = "servant_aura_Icon"+auraId;
				if (ResourceManager.hasRes(iconImg)){
					let container = new BaseDisplayObjectContainer();
					container.width = 107;
					container.height = 106;
					let auraIcon = BaseLoadBitmap.create(iconImg);
					container.addChild(auraIcon);
					auraIcon.width = 107;
					auraIcon.height = 106;

					let effect = ComponentManager.getCustomMovieClip(`acskyarmor_titleeff`, 10, 150);
					effect.width = 257;
					effect.height = 257;
					effect.x = container.width/2 - effect.width/2;
					effect.y = container.height/2 - effect.height/2;
					effect.playWithTime(-1);
					container.addChild(effect);
					effect.blendMode = egret.BlendMode.ADD;

					if (ResourceManager.hasRes("servant_aura_attrbg"+auraId)){
						let attrBg = BaseLoadBitmap.create("servant_aura_attrbg"+auraId);
						attrBg.width = 98;
						attrBg.height = 59;
						attrBg.setPosition(auraIcon.x + auraIcon.width /2 - attrBg.width/2, auraIcon.y + auraIcon.height + 3);
						container.addChild(attrBg);
					}
					container.addTouchTap(()=>{
						ViewController.getInstance().openView(ViewConst.POPUP.SKINAURAINFOPOPUPVIEW, skinId);
					}, this);

					return container;
				}
			}
			return null;       
		}

		/** 
		 * 获取双子类型的龙骨
		*/
		public static getDoubleGragon(wifeid):BaseDisplayObjectContainer{
			let group = null;
			let flag = false;
			switch(Number(wifeid)){
				case 236:
					flag = true;
					break;
			}
			if(flag){
				group = new BaseDisplayObjectContainer();

				let wife1 = App.DragonBonesUtil.getLoadDragonBones(`wife_full_${wifeid}_1`);
				let wife2 = App.DragonBonesUtil.getLoadDragonBones(`wife_full_${wifeid}_2`);
				
				group.addChild(wife2);
				group.addChild(wife1);				
			}
			return group;
		}
 	}
}