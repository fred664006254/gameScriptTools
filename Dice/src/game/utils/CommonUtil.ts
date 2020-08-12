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
					LayerMgr.msgLayer.addChild(rewardFly);
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
			4038  : 8,
			6006  : 8,
			4033  : 10,
			4016  : 10,
			6007  : 10,
			4040  : 8,
			3151  : 8,
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
				let msgText:BaseTextField=ComponentMgr.getTextField(message,TextFieldConst.SIZE_TITLE_SMALL);
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				msgText.textAlign=egret.HorizontalAlign.CENTER;
				msgText.name="msgText";
				msgText.lineSpacing=2;
				txtLine=msgText.numLines;
				tipContainer.addChild(msgText);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				LayerMgr.msgLayer.addChild(tipContainer);
				CommonUtil._tipContainer=tipContainer;
			}
			else
			{
				let tipBg:BaseBitmap=<BaseBitmap>tipContainer.getChildByName("tipBg");
				if(!tipBg.texture || !tipBg.texture.bitmapData)
				{
					tipBg.texture=ResMgr.getRes("public_tipbg");
				}
				let msgText:BaseTextField = <BaseTextField>CommonUtil._tipContainer.getChildByName("msgText");
				msgText.text=message;
				msgText.setPosition(tipBg.x+(tipBg.width-msgText.width)/2,tipBg.y+(tipBg.height-msgText.height)/2);
				tipContainer.setScale(1);
				tipContainer.alpha=1;
				egret.Tween.removeTweens(tipContainer);
				tipContainer.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
				txtLine=msgText.numLines;
				if(!LayerMgr.msgLayer.contains(tipContainer))
				{
					LayerMgr.msgLayer.addChild(tipContainer);
				}
			}
			egret.Tween.get(CommonUtil._tipContainer).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},70).wait(1300*txtLine).to({alpha:0},200).call(function(tipContainer:BaseDisplayObjectContainer){
				if(tipContainer)
				{
					egret.Tween.removeTweens(tipContainer);
					if(LayerMgr.msgLayer.contains(tipContainer))
					{
						LayerMgr.msgLayer.removeChild(tipContainer);
					}
					tipContainer.setScale(1);
					tipContainer.alpha=1;
				}
			}.bind(this,CommonUtil._tipContainer),this);
		}

		public static showCollectEffect(resKey:string,startPoint:egret.Point,endPoint:egret.Point,callback?:Function,callbackThisObj?:any,callbackParams?:any[]):void
		{
			if(resKey != "task_power")
			{
				SoundMgr.playEffect(SoundConst.EFFECT_MONEY);
			}
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

		public static createMainUIIcon(iconUrl:string,iconNameStr:string,isShow?:boolean,extType?:number|string,BigIcon?:any,timeStr?:string):BaseDisplayObjectContainer
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
			
				let iconAni:CustomMovieClip= ComponentMgr.getCustomMovieClip(`left_iconbg_`,5,100);
				iconAni.playWithTime(-1);
				iconContainer.addChild(iconAni);
				iconAni.width = 129;
				iconAni.height = 130;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);

				let icon:CustomMovieClip= ComponentMgr.getCustomMovieClip(iconmame,5,100);
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
						if(PlatMgr.checkIsEnLang())
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
									timeTF = ComponentMgr.getTextField(timeStr,20)
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

				if(PlatMgr.checkIsRuSp()){
					if(iconUrl == `sevendayssignup1_icon` || iconUrl == `sevendayssignup2_icon` || iconUrl == `sevendayssignup7_icon`){
						iconUrl += `_ru`;
						iconNameStr = `sevendayssignup_name_ru`;
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
						if(PlatMgr.checkIsEnLang())
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
						reddot.x = bdoc.width - reddot.width;	
					}
					else
					{
						reddot.x = 0;
					}
					// reddot.y = 3;
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
			let wordsText:BaseTextField = ComponentMgr.getTextField(talkStr,TextFieldConst.SIZE_CONTENT_COMMON);

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
		 * 播放皇帝登录动画
		 */
		public static showGodLoginFlaunt(godName:string)
		{
			let godLogin = new GodLogin();
			LayerMgr.msgLayer.addChild(godLogin);
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
			if (PlatMgr.checkIsKRSp() && App.DeviceUtil.isIOS()) {
				moneyKey = "anyMoneyDollar"; // 韩国ios显示美元
			}
			return LangMger.getlocal(moneyKey,[money.toString()]);
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
			let layerY:number= GameData.layerPosY || (GameConfig.stage.stageHeight-GameConfig.stageHeigth)*0.5;
			let topBg:BaseLoadBitmap=<BaseLoadBitmap>LayerMgr.maskLayer.getChildByName("fill_screen_top");
			if(!topBg)
			{
				topBg=BaseLoadBitmap.create("fill_screen_top");
				LayerMgr.msgLayer.addChild(topBg);
				// topBg.y=0-topBg.height;
				// 图片在未渲染时无法获取宽高，故此处直接赋值
				topBg.y = -183;
			}
			let buttomBg:BaseLoadBitmap=<BaseLoadBitmap>LayerMgr.maskLayer.getChildByName("fill_screen_buttom");
			if(!buttomBg)
			{
				buttomBg=BaseLoadBitmap.create("fill_screen_buttom");
				LayerMgr.msgLayer.addChild(buttomBg);
				buttomBg.y=GameConfig.stageHeigth;
			}
		}

		public static formatIpadScreenBg () {
			if (App.DeviceUtil.checkIsIpadScreen() || GameConfig.stage.scaleMode == egret.StageScaleMode.FIXED_HEIGHT) {
				let layerX: number = GameData.layerPosX || (GameConfig.stage.stageWidth-GameConfig.stageWidth) / 2;

				let __mask: egret.Shape = new egret.Shape();
				__mask.graphics.beginFill(0x000000, 1);
				__mask.graphics.drawRect(0, 0, layerX, GameConfig.stageHeigth);
				__mask.graphics.drawRect(layerX + GameConfig.stageWidth, 0, layerX, GameConfig.stageHeigth);
				__mask.graphics.endFill();
				LayerMgr.msgLayer.addChild(__mask);
				__mask.x = -layerX;

				// let __leftImg: BaseLoadBitmap = BaseLoadBitmap.create('fill_screen_buttom')
				// __leftImg.width = layerX;
				// __leftImg.height = GameConfig.stageHeigth;
				// __leftImg.x = -layerX;
				// __leftImg.y = 0;
				// LayerMgr.msgLayer.addChild(__leftImg);
				// let __rightImg: BaseLoadBitmap = BaseLoadBitmap.create('fill_screen_buttom')
				// __rightImg.width = layerX;
				// __rightImg.height = GameConfig.stageHeigth;
				// __rightImg.x = GameConfig.stageWidth;
				// __rightImg.y = 0;
				// LayerMgr.msgLayer.addChild(__rightImg);
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
					if(PlatMgr.checkIsWanbaSp())
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
			if(App.DeviceUtil.IsHtml5()&&LocalStorageMgr.get("gametest1000"))
			{
				let curl:string = window.location.href;
				let newUrl:string = App.CommonUtil.getTestUrl();
				if(curl!=newUrl)
				{
					LocalStorageMgr.set("gametest1000",curl);
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
				let gameUrl:string=LocalStorageMgr.get("gametest1000");
				let curl:string=window.location.href;
				LocalStorageMgr.remove("gametest1000");
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
			if(!LangMger.checkHasKey(newkey)){
				//返回默认code的cnkey
				newkey = `${prev}-${defaultcode}`;
				if(!LangMger.checkHasKey(newkey)){
					newkey = `${prev}-1`;
					if(!LangMger.checkHasKey(newkey)){
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

		private static _accountPanel:BaseDisplayObjectContainer;
		private static _maskSp:egret.Shape;
		/**打开输入测试账号面板 */
		public static showAccountPanel():void
		{
			App.LogUtil.log("初始化输入账号界面");
			this._maskSp = new egret.Shape();
			this._maskSp.graphics.beginFill(ColorEnums.black,0.5);
			this._maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
			this._maskSp.graphics.endFill();
			this._maskSp.touchEnabled = true;
			LayerMgr.maskLayer.addChild(this._maskSp);
			this._accountPanel = new BaseDisplayObjectContainer();
			LayerMgr.maskLayer.addChild(this._accountPanel);

			var bg:egret.Shape=new egret.Shape();
			bg.graphics.beginFill(ColorEnums.black,1);
			bg.graphics.drawRect(0,0,400,250);
			bg.graphics.endFill();
			this._accountPanel.addChild(bg);
			this._accountPanel.x = GameConfig.stageWidth/2  - bg.width/2;
			this._accountPanel.y = GameConfig.stageHeigth/2 - bg.height/2;
			var usernameTF:BaseTextField = new BaseTextField();
			usernameTF.x = 20;
			usernameTF.y = 50;
			usernameTF.text = "账号：";
			this._accountPanel.addChild(usernameTF);

			var usernameBg:egret.Shape=new egret.Shape();
			usernameBg.graphics.beginFill(ColorEnums.white,1);
			usernameBg.graphics.drawRect(0,0,250,50);
			usernameBg.graphics.endFill();

			usernameBg.graphics.beginFill(ColorEnums.black,1);
			usernameBg.graphics.drawRect(1,1,248,48);
			usernameBg.graphics.endFill();
			usernameBg.x = 110;
			usernameBg.y = usernameTF.y + usernameTF.height/2 - usernameBg.height/2;
			this._accountPanel.addChild(usernameBg);
			
			var usernameInput:BaseTextField = new BaseTextField();
			usernameInput.type = egret.TextFieldType.INPUT;
			usernameInput.width = 250;
			usernameInput.height = usernameTF.height;
			usernameInput.x = 120;
			usernameInput.y = 50;
			usernameInput.maxChars = 100;
			usernameInput.text=LoginMgr.getLocalUserName();
			let username=usernameInput.text;
			this._accountPanel.addChild(usernameInput);
			usernameInput.addEventListener(egret.TextEvent.CHANGE, (event:egret.TextEvent)=>{
				username = event.target.text;
			}, this, false, 2);

			let btn =new BaseShape();
			btn.graphics.beginFill(0xff0000);
			btn.graphics.drawRoundRect(0,0,100,40,8,8);
			btn.graphics.endFill();
			btn.x = this._accountPanel.width/2 - btn.width/2;
			btn.y = this._accountPanel.height - 70;
			this._accountPanel.addChild(btn);
			btn.addTouchTap(()=>{
				if(username.length > 100)
				{
					App.CommonUtil.showTip("账号不能超过100位字符");
					return;
				}
				else if(username.length < 3)
				{
					App.CommonUtil.showTip("账号最少三个字符");
					return;
				}
				if(this._accountPanel)
				{
					this._accountPanel.dispose();
					this._accountPanel = null;
				}
				if(this._maskSp && LayerMgr.maskLayer.contains(this._maskSp))
				{
					LayerMgr.maskLayer.removeChild(this._maskSp);
					this._maskSp = null;
				}
				PlatMgr.userId = usernameInput.text;
				PlatMgr.isLogin=true;
				LoginMgr.loginGame();
			},this);
			App.LogUtil.log("初始化输入账号界面成功");
		}

		/**
		 * 宝箱类卡片扩展气泡提示
		 * boxid : 宝箱id
		 * cardType : 卡片类型
		 * point : 坐标
		 */
		public static showBoxExtendTip(boxid : string, cardType : number, point? : egret.Point):void{
			let view = this;
			if(!point){
				point = new egret.Point(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
			}
			let exttip = new BoxExtendTip();
			exttip.init(boxid, cardType, point);
			LayerMgr.msgLayer.addChild(exttip);
		}

		/**
		 * 文字扩展气泡提示
		 * str : 文字内容
		 * point : 坐标
		 */
		public static showExtendTip(str : string, point? : egret.Point, top? : boolean, width?:number, textAlign?:string, hideTime?:number):void{
			let view = this;
			if(!point){
				point = new egret.Point(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
			}
			let exttip = new ExtendTip();
			exttip.init(str, point, top, width, textAlign, hideTime);
			LayerMgr.msgLayer.addChild(exttip);
		}

		/**
		 * 文字扩展气泡提示
		 * str : 文字内容
		 * secound : secound秒后销毁
		 * point : 坐标
		 */
		public static showExtendTipForSecound(str : string, secound:number ,point? : egret.Point, top? : boolean):void{
			let view = this;
			if(!point){
				point = new egret.Point(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
			}
			let exttip = new ExtendTip();
			exttip.init(str, point, top);
			LayerMgr.msgLayer.addChild(exttip);

			egret.Tween.get(exttip).wait(secound * 1000).call(()=>{
				exttip.dispose();
			});
		}

		/**
		 * 获取骰子icon以及特效
		 * id : 骰子id
		 */
		public static getDiceIconById(id:string, scale:number, isbig?:boolean, isNewStatus?:boolean):BaseDisplayObjectContainer{
			let container:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			// container.width = BattleStatus.diceSize.width;
			// container.height = BattleStatus.diceSize.height;
			container.setScale(scale);

			let cfg = Config.DiceCfg.getCfgById(id);
			
			let icon = BaseLoadBitmap.create(Config.DiceCfg.getIconById(id, isbig));
			// icon.width = BattleStatus.diceSize.width;
			// icon.height = BattleStatus.diceSize.height;
			icon.name = `diceicon`;
			container.addChild(icon);
			container.width = icon.width;
			container.height = icon.height;

			if(isNewStatus){
				let newState = BaseBitmap.create(`dicenewget`);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, newState, container, [0,0]);
				container.addChild(newState);
			}

			// if(scale == DiceScaleEnum.scale_53){
			// 	let shadow = BaseBitmap.create(`diceshadow${cfg.quality == 4 ? 2 : 1}`);
			// 	shadow.setScale(1/scale);
			// 	shadow.name = `shadow`;
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shadow, icon, [-4,-1]);
			// 	container.addChildAt(shadow,0);
			// }

			// let starres = `dicestar${id}`;
			// if(!RES.hasRes(starres)){
			// 	starres = `dicestar101`;
			// }
			// let star = BaseLoadBitmap.create(starres,null,{
			// 	callback : ()=>{
			// 		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, star, icon);
			// 	},
			// 	callbackThisObj : this
			// });
			// container.addChild(star);
			return container;
		}

		//object深度复制，规避js原有的引用传递
		public static object_clone(source: Object): any {
			let data: Object = {};
			for (let key in source) {
				if (source[key] == null) {
					continue;
				}

				if (this.getType(source[key]) == 'object') {
					data[key] = this.object_clone(source[key]);
				}
				else if (this.getType(source[key]) == "array") {
					data[key] = this.arr_clone(source[key]);
				}
				else {
					data[key] = source[key];
				}
			}

			return data;
		}

		//arr深度复制,对所有复杂arr均有效，规避js原有的引用传递
		public static arr_clone(source) {
			let destination: any = [];
			for (let key in source) {
				let p = parseInt(key);
				if (this.getType(source[p]) == "array") {
					destination[p] = [];
					arguments.callee(destination[p], source[p]);
				}
				else if (this.getType(source[p]) == "object") {
					destination[p] = {};
					destination[p] = this.object_clone(source[p]);
				}
				else {
					destination[p] = source[p];
				}
			}
			return destination;
		}

		public static getType(o) {
			let _t;
			return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
		}

		/**
		 * 
		 * @param id 广告ID
		 * @param obj 回调对象
		 */
		public static watchAd(id:string, obj?:any):boolean{

			if(!Api.SwitchVoApi.getADSwitchStatus()){
				App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip"));
				return false;
			}

			if(Api.AdvertiseVoApi.getAdNumByID(id) <= 0 || Api.AdvertiseVoApi.getAdCurCD(id) > 0 ){
				// App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip3"));
				return false
			} else {
				if(PlatMgr.checkIsUseSDK()){
					obj = obj || this;
					PlatMgr.checkHasAd({
						callbackSucceed:()=>{
							console.log("game:checkHasAd succ callback");
							if(App.DeviceUtil.isRuntime2()){
								SoundMgr.stopBgByName(`music_ready`);
							}
							PlatMgr.showAd(null,{
								callbackSucceed:()=>{
									console.log("game:showAd succ callback");
									// App.CommonUtil.showTip("观看广告");
									if(App.DeviceUtil.isRuntime2()){
										SoundMgr.playBg(`music_ready`);
									}
									Api.AdvertiseVoApi.setAdtype(id);
									NetManager.request(NetConst.ADVERTISE_WATCH, {advType:parseInt(id[id.length - 1])});
								},
								callbackFailure:()=>{
									console.log("game:showAd fail callback");
									if(App.DeviceUtil.isRuntime2()){
										SoundMgr.playBg(`music_ready`);
									}
									// App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip2"));
								},
								callbackError:()=>{
									console.log("game:showAd error callback");
									if(App.DeviceUtil.isRuntime2()){
										SoundMgr.playBg(`music_ready`);
									}
									App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip2"));
								}
							}, obj);
						},
						callbackFailure:()=>{
							console.log("game:checkHasAd fail callback");
							App.CommonUtil.showTip(LangMger.getlocal("watchAdfailuretip"));
						}
					}, obj)
				} else {
					if(DEBUG){
						App.CommonUtil.showTip(`没有 sdk 看广告`);
					}
					Api.AdvertiseVoApi.setAdtype(id);
					NetManager.request(NetConst.ADVERTISE_WATCH, {advType:parseInt(id[id.length - 1])});
				}
			
				return true;
			}
		}


		/**
		 * 数值在一段时间能变化
		 * @param initNum 初始数值
		 * @param endNum 最终数值
		 * @param time 变化事件，单位毫秒
		 */
		public static changeNumTween(initNum:number, endNum:number, time:number, cb:(curNum:number)=>void){
			let d = (endNum - initNum) <= 1 ? 1 : endNum - initNum;
			let dt = time / d;
			dt = (dt > 50) ? 50 : dt;
			let step = 1;
			let curnum = initNum;
            let timer = setInterval(()=>{
				if(curnum > endNum){
					clearInterval(timer);	
				} else {
					cb&&cb(curnum);
				}
				curnum += step;
			}, dt);
		}

		/**
		 * 发送引导步骤
		 */
		public static sendNewGuideId(guideid:number){
			if(!Api.GameinfoVoApi.getIsFinishNewGuide()){
				let id = GuideCfg.anlyizeCfg[guideid];
				if(id){
					if(id == GuideCfg.rookieCfg["guideSteps"]){
						PlatMgr.analyticsCompleteNewGuide();
						NetManager.request(NetConst.REQUEST_USER_NEWERGUILD, {step:id});
					}
					else{
						PlatMgr.analyticsNewGuide(id);
						NetManager.request(NetConst.REQUEST_USER_NEWERGUILD, {step:Number(guideid)});
					}
				}
			}
		}

		public static sendAnlyId(id:number){
			if(!Api.GameinfoVoApi.getIsFinishNewGuide()){
				PlatMgr.analyticsNewGuide(id);
			}
		}

		/**
		 * 钻石不足时的通用逻辑
		 */
		public static gemNotEnough(type:number){
			switch (type) {
				case 1:
					ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
						title : LangMger.getlocal("sysTip"),
						msg : LangMger.getlocal(`sysgemNotEnough`),
						needCancel : false,
					});
					break;
				case 2:
					App.CommonUtil.showTip(LangMger.getlocal("sysgemNotEnough"));
					break
			
				default:
					break;
			}
			
		}

		

		public playEffect(target:any,options:any){
            options = options || {}; 
            if(options.initNum==options.num)return;        
            var time = options.time,//总时间--毫秒为单位 
                finalNum = options.num, //要显示的真实数值
                regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度          
                step = (finalNum-options.initNum) / (time / regulator),/*每30ms增加的数值--*/       
                count =  options.initNum, //计数器       
                initial = options.initNum;
            var timer = setInterval(()=> {          
				count = count + step;          
				if(count >= finalNum&&options.initNum<finalNum) {        
						clearInterval(timer);        
						count = finalNum;       
						}

				if(count <= finalNum&&options.initNum>finalNum) {        
					clearInterval(timer);        
					count = finalNum;       
					} 
					//t未发生改变的话就直接返回         
					var t = Math.floor(count);       
					if(t == initial) return;          
					initial = t;          
					target.text = initial+"";
				}, 
			30);     
		}

		/**
		 * 设置localstorage，并在key上拼接UID
		 * 注意：请确保能取到UID，否则不会存储并return false
		 * @param key localstorage_key
		 * @param data localstorage_key对应value
		 */
		public static setLocalStorageWithUid(key: string, data: string): boolean {
			const __uid: number = Api.UserinfoVoApi.getUid();
			if (!__uid) return false;
			localStorage.setItem(`${key}_${__uid}`, data);
			return true;
		}

		/**
		 * 以拼接UID的key读取localstorage
		 * 注意：请确保能取到UID，否则直接按读取不到处理
		 * @param key localstorage_key
		 */
		public static getLocalStorageWithUid(key: string): string {
			const __uid: number = Api.UserinfoVoApi.getUid();
			if (!__uid) {return null;}
			return localStorage.getItem(`${key}_${__uid}`);
		}

		/**
		 * 以拼接UID的key移除localstorage
		 * 注意：请确保能取到UID，否则不做任何处理
		 * @param key localstorage_key
		 */
		public static removeLocalStorageWithUid(key: string) {
			const __uid: number = Api.UserinfoVoApi.getUid();
			if (!__uid) return false;
			localStorage.removeItem(`${key}_${__uid}`);
		}
		
	}
}