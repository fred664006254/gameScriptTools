/**
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
class MailDetailPopupView extends PopupView
{
	private _mailInfoVo:MailInfoVo;
	// 领取按钮
	private _collectFlag:BaseBitmap = null;
	private _bg:BaseBitmap;
	private _scrollList:ScrollList;
	private _index:number = 0;
	// private _contentTF:BaseTextField = null;
	private _txtCountainer:BaseDisplayObjectContainer =null;

	/**存储门口的奖励信息 */
	private _rewardItemVoList : RewardItemVo[];
	/**是否拥有了这个门客 */
	private _isHavehero:boolean[] = [];
	/**
	 * 是否拥有这个红颜
	 */
	private _isHaveWife:boolean = false;
	/**是否有红颜皮肤 */
	private _isNotHaveWifeSkin:number[] = [];
	/**是否有门客皮肤 */
	private _isHaveServantSkin:boolean = false;
	/**是否有这个称号 */
	private _isHaveTitle:boolean = false;
	/**是否有这个表情 */
	private _isHaveEmoticon:boolean[] = [];

	private _isHasScence:boolean = false;
	private _strTotch:string = "";
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		
		
		this._txtCountainer=new BaseDisplayObjectContainer();
		this.addChildToContainer(this._txtCountainer);

		this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);
		this._index = Number(this.param.data.index);
		let temX = 40;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg93");
		bg.width = 520;
		bg.height = 600;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);
		this._bg = bg;

		let titleBg = BaseBitmap.create("public_9_bg95");
		this.addChildToContainer(titleBg);
		// let titleTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("title")+"："+this._mailInfoVo.title,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		let titleTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.title, TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		// titleTF.x = temX;
		// titleTF.y = 30;
		titleBg.width = titleTF.width + 60;
		titleBg.setPosition(this.viewBg.x + this.viewBg.width/2 - titleBg.width/2, bg.y + 10);
		titleTF.setPosition(titleBg.x + titleBg.width/2 - titleTF.width/2, titleBg.y + titleBg.height/2 - titleTF.height/2 + 2);
		this.addChildToContainer(titleTF);

		let timeTitle:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("time")+"：",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		timeTitle.x = bg.x + 20;
		timeTitle.y = 65;
		this.addChildToContainer(timeTitle);
		let timeTF:BaseTextField = ComponentManager.getTextField(this._mailInfoVo.timeStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,0x635346);
		timeTF.x = timeTitle.x + timeTitle.width;
		timeTF.y = timeTitle.y;
		this.addChildToContainer(timeTF);

		let temH = 410;
		let touch = this._mailInfoVo.touch;
		if(touch == "")
		{
			bg.height = 660;
			temH = 508 + 60;
		}
		let bg2:BaseBitmap = BaseBitmap.create("public_9_bg94");
		bg2.width = 496;
		bg2.height = temH;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = timeTF.y + timeTF.height + 5;
		this.addChildToContainer(bg2);
		let contentTF:BaseTextField;
		var	scrollView:ScrollView;
		var  scrollRect = new egret.Rectangle(0,0,bg2.width - 20,390);
		if(this._mailInfoVo.content)
		{
			contentTF = ComponentManager.getTextField((App.DeviceUtil.isWyw()?"\n":"") + this._mailInfoVo.content,TextFieldConst.FONTSIZE_CONTENT_SMALL-2, 0x635346);
			contentTF.x = 0;
			contentTF.y = App.DeviceUtil.isWyw()?-13:8;
			contentTF.width = bg2.width - 20;
			contentTF.lineSpacing = 5;
			contentTF.cacheAsBitmap = true;
			contentTF.touchEnabled = true;
			// this.addChildToContainer(contentTF);
			this._txtCountainer.addChild(contentTF);
			// this.addChild(contentTF);
			
			contentTF.height+=10;

			scrollView =ComponentManager.getScrollView(this._txtCountainer,scrollRect);
			// scrollView.x=50;
			// scrollView.y=100;//250;
			scrollView.x=bg2.x + 10;
			scrollView.y=bg2.y + 7;
			this.addChildToContainer(scrollView);
			// this.addChild(scrollView);
			scrollView.height =temH-20;
			
	
		}
		
		if(touch != "")
		{
			let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(this._mailInfoVo.touch);
			this._rewardItemVoList = GameData.formatRewardItem(this._mailInfoVo.touch);
			for(var i = 0;i < this._rewardItemVoList.length;i++)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				if(rewardItemvo.type == 8 &&Api.servantVoApi.getServantObj(String(rewardItemvo.id)) != null)
				{
					this._isHavehero.push(true);
				}
				else{
					this._isHavehero.push(false);
				}
				if(rewardItemvo.type == 10&&Api.wifeVoApi.getWifeInfoVoById(String(rewardItemvo.id)) != null)
				{
					this._isHaveWife = true;
				}
				if(rewardItemvo.type == 16)
				{	
					if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(String(rewardItemvo.id)))
					{
						this._isNotHaveWifeSkin.push(0);
					}
					else
					{
						let nid = Number(rewardItemvo.id);
						if (GameData.isInArray(nid,this._isNotHaveWifeSkin))
						{
							this._isNotHaveWifeSkin.push(0);
						}
						else
						{
							this._isNotHaveWifeSkin.push(nid);
						}
					}
				}
				else{
					this._isNotHaveWifeSkin.push(1);
				}
				if(rewardItemvo.type == 19&&Api.servantVoApi.isOwnSkinOfSkinId(String(rewardItemvo.id)))
				{
					this._isHaveServantSkin = true;
				}
				if(rewardItemvo.type == 11 && Api.itemVoApi.isHasTitle(rewardItemvo.id))
				{
					this._isHaveTitle = true;
				}
				if(rewardItemvo.type == 20) //场景
				{
					let senceid = String(rewardItemvo.id);
					let sceneName:string = null;
					if(senceid[0] == "1")
					{
						sceneName = "homeScene";
					}
					else if(senceid[0] == "2")
					{
						sceneName = "cityScene";
					}
					else if(senceid[0] == "3")
					{
						sceneName = "searchScene";
					}
					if(Api.otherInfoVoApi.isHasSceneNotAboutUnlock(senceid,sceneName))
					{
						this._isHasScence = true;
					}
				}
				if(rewardItemvo.type == 24 && Api.emoticonVoApi.isEmoticonUnlock(String(rewardItemvo.id)))
				{
					this._isHaveEmoticon.push(true);
				}
				else{
					this._isHaveEmoticon.push(false);
				}
				
			}
			

			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS),this.useCallback,this);


			let rect = egret.Rectangle.create();
			if(rewardVoList.length > 5)
			{
				bg2.height -= 100;
				// if(contentTF)
				// {
				// 	let scrollRect:egret.Rectangle = new egret.Rectangle(contentTF.x,contentTF.y,contentTF.width,bg2.height - 20);
				// 	contentTF.scrollRect = scrollRect;
				// }
				rect.setTo(0,0,bg2.width,200);

				
				if (scrollView)
				{	
					scrollView.height -=100;
				}
			}
			else
			{
				rect.setTo(0,0,bg2.width,110);
			}
			
			
			let scrollListContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			scrollListContainer.width = rect.width;
			scrollListContainer.height = rect.height;
			scrollListContainer.x = bg2.x + 2;
			scrollListContainer.y = bg2.y + bg2.height + 5;
			this.addChildToContainer(scrollListContainer);

			this._scrollList = ComponentManager.getScrollList(MailRewardScrollItem,rewardVoList,rect);
			scrollListContainer.addChild(this._scrollList);
		}
		if(this._mailInfoVo.istouch == 1)
		{
			if(this._mailInfoVo.hadget == 0)
			{
				// this._getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.getRewardHanlder,this)
				// this._getBtn.x = this.viewBg.x + this.viewBg.width/2 - this._getBtn.width/2;
				// this._getBtn.y = bg.x + bg.height - this._getBtn.height - 20;
				// this.addChildToContainer(this._getBtn);
			}
			else
			{
				// let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
				let hasGetSp:BaseBitmap = BaseBitmap.create("collectflag");
				hasGetSp.setScale(0.6);
				hasGetSp.x = this.width/2 - hasGetSp.width/2*0.6;
				hasGetSp.y = GameConfig.stageHeigth/2 + this.getShowHeight()/2 - hasGetSp.height*0.6 - 10;
				this.addChild(hasGetSp);
			}
			
		}
	}

	protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	protected clickConfirmHandler(data:any):void
	{
		NetManager.request(NetRequestConst.REQUEST_MAIL_GET_REWARDS,{"mailId":this.param.data.mid});
	}

	protected resetBgSize(): void {
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width / 2 - 84, this._bg.y + this._bg.height + 5);
	}

	protected getShowHeight():number
	{
		return 760;
	}

	protected getBgExtraHeight():number
	{
		if(this._mailInfoVo.touch == "")
		{
			return 30;
		}
		return 86;
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN2_NORMAL_YELLOW;
	}

	protected getConfirmBtnStr():string
	{
		if(this._mailInfoVo.istouch == 1)
		{
			if(this._mailInfoVo.hadget == 0)
			{
				return "taskCollect"
			}
		}
		return "";
	}
	private useCallback(event:egret.Event):void
	{
		let rData = event.data;
        if(!rData.ret){
            return;
        }

		this._mailInfoVo = Api.mailVoApi.getMailInfoVoById(this.param.data.mid);

		this.openRewardView();

		if(this._mailInfoVo && this._mailInfoVo.hadget == 1)
		{
			this.playGetRewardAni();
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
		
		if (rData.data.data.rewards)
		{
			Api.biographyVoApi.checkShowBiographyRewars(rData.data.data.rewards);
		}
	}

	private openRewardView()
	{
		var touch:string = null;
		var servantName:string = "";
		var servantList:string[] = [];
		let rewardsArr:Array<string> = this._mailInfoVo.touch.split("|");
		let touchNum:number = 0;
		let wifeTouch:string = null;
		let wifeName:string = null;
		let wifeSkinTouch:string = null;
		let wifeSkinName:string = null;
		let wifeSkinList:string[] = [];
		let wifeSkinTouchNum:number=0;
		let servantSkinTouch:string = null;
		let servantSkinName:string = null;
		let titleTouch:string = null;
		let titleName:string = null;
		let sceneTouch:string = null;
		let sceneName:string = null;
		let emoticonName:string = null;
		let emoticonTouch:string = null;
		let emoticonTouchNum:number=0;
		let emoticonList:string[] = [];
		this._strTotch = "";
		for(var i = 0;i < this._rewardItemVoList.length;i++)
		{
			if (this._rewardItemVoList[i].type == 8 && this._isHavehero[i])
			{

				let rewardItemvo = this._rewardItemVoList[i];
				let servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
				if(servantReward.exchange != null)
				{
					
					servantName = servantName + servantReward.name + ",";
					servantList.push(servantReward.id);
					touch = servantReward.exchange;
					let rewardsVo = GameData.formatRewardItem(servantReward.exchange)[0];
					touchNum += rewardsVo.num;
					// rewardsArr[i] = servantReward.exchange;
					rewardsArr[i] = servantReward.exchange;
				}

			}
			if(this._rewardItemVoList[i].type == 10 && this._isHaveWife)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				let wife = Config.WifeCfg.getWifeCfgById(rewardItemvo.id);
				if(wife.exchange != null)
				{
					wifeName = wife.name;
					wifeTouch = wife.exchange;
					rewardsArr[i] = wife.exchange;
				}
			}
			if(this._rewardItemVoList[i].type == 16 && !this._isNotHaveWifeSkin[i])
			{
				let rewardItemvo = this._rewardItemVoList[i];
				let wifeSkin = Config.WifeskinCfg.getWifeCfgById(rewardItemvo.id);
				if(wifeSkin.itemNum != null)
				{
					if(wifeSkinName&&wifeSkinName.indexOf(wifeSkin.name)<0)
					{
						wifeSkinName = wifeSkinName + wifeSkin.name + ",";
					}
					else
					{
						wifeSkinName = wifeSkin.name + ",";
					}
					wifeSkinList.push(wifeSkin.id);
					let exchange = wifeSkin.exchange;
					let rewardsVo = GameData.formatRewardItem(exchange)[0];
					wifeSkinTouchNum += rewardsVo.num;

					

					wifeSkinTouch = exchange;//"6_2101_" + wifeSkin.itemNum;
					rewardsArr[i] = exchange;//"6_2101_" + wifeSkin.itemNum;
				}
			}
			if(this._rewardItemVoList[i].type == 19 && this._isHaveServantSkin)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				let servantSkin = Config.ServantskinCfg.getServantSkinItemById(String(rewardItemvo.id));
				if(servantSkin.returnItem != null)
				{
					servantSkinName = servantSkin.getSkinName();
					servantSkinTouch = servantSkin.returnItem;
					rewardsArr[i] = servantSkin.returnItem;
				}
			}
			if(this._rewardItemVoList[i].type == 11 && this._isHaveTitle)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				let titelCfg = Config.TitleCfg.getTitleCfgById(rewardItemvo.id);
				if(titelCfg.exchange != null)
				{
					titleName= titelCfg.name;
					titleTouch = titelCfg.exchange;
					rewardsArr[i] = titelCfg.exchange;
				}
			}
			if(this._rewardItemVoList[i].type == 20 && this._isHasScence)
			{
				let rewardItemvo = this._rewardItemVoList[i];
				let senceid = String(rewardItemvo.id);
				let sceneType: string = null;
				if (senceid[0] == "1") {
					sceneType = "homeScene";
				}
				else if (senceid[0] == "2") {
					sceneType = "cityScene";
				}
				else if (senceid[0] == "3") {
					sceneType = "searchScene";
				}
				let sceneCfg = Config.SceneCfg.getSceneCfgBySceneName(sceneType,senceid).personalityCfg;
				if(sceneCfg.exchange)
				{
					sceneTouch = sceneCfg.exchange;
					sceneName = LanguageManager.getlocal("changebg_name_" + senceid);
					rewardsArr[i] = sceneCfg.exchange;
				}
				
			}
			if(this._rewardItemVoList[i].type == 24 && this._isHaveEmoticon[i]){
				let rewardItemvo = this._rewardItemVoList[i];
				let emoticonCfg = Config.EmoticonCfg.getEmoticonCfgById(String(rewardItemvo.id));
				if(emoticonCfg.exchange != null)
				{	
					emoticonList.push(String(rewardItemvo.id));
					emoticonName = LanguageManager.getlocal("emoticonName");
					emoticonTouch = emoticonCfg.exchange;
					rewardsArr[i] = emoticonCfg.exchange;
					let rewardsVo = GameData.formatRewardItem(emoticonCfg.exchange)[0];
					emoticonTouchNum += (rewardsVo.num * rewardItemvo.num);
				}
			}
			// if(rewardsArr[i] != "")
			this._strTotch = this._strTotch + rewardsArr[i] + "|";
		}
		let allName:string = null;
		let alltouch:string = null;
		if(servantList.length > 0)
		{
			// touch = touch.substr(0,7) + String(servantList.length * 10);
			touch = touch.substr(0,7) + String(touchNum);
			// ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantName.substring(0,servantName.length - 1),"touch":touch,"message":"servantChangeOtherRewardTip"})
			// this._mailInfoVo.touch = touch;
			// this._strTotch = this._strTotch + touch;
		}
		if(wifeSkinList.length>0)
		{
			wifeSkinTouch = wifeSkinTouch.substr(0,wifeSkinTouch.length-1) + String(wifeSkinTouchNum);
			wifeSkinName = wifeSkinName.substr(0,wifeSkinName.length-1);
		}
		if(emoticonList.length>0)
		{
			emoticonTouch = emoticonTouch.substr(0,emoticonTouch.length-1) + String(emoticonTouchNum);
			if (emoticonList.length == 1){
				emoticonName = LanguageManager.getlocal("emoticonName_"+emoticonList[0]);
			}
		}

		if(servantList.length > 0 || wifeName || wifeSkinName || servantSkinName || titleName || sceneName || emoticonName)
		{
			if(touch)
			{
				if(wifeName)
				{
					alltouch = touch + "|" + wifeTouch;
					allName = servantName + wifeName;
					if(wifeSkinName)
					{
						allName += "," + wifeSkinName;
						alltouch += "|" + wifeSkinTouch;
					}
					if(servantSkinName)
					{
						allName += "," + servantSkinName;
						alltouch += "|" + servantSkinTouch;
					}
					if(titleName)
					{
						allName += "," + titleName;
						alltouch += "|" + titleTouch;
					}
					if(sceneName)
					{
						allName += "," + sceneName;
						alltouch += "|" + sceneTouch;
					}
					if(emoticonName)
					{
						allName += "," + emoticonName;
						alltouch += "|" + emoticonTouch;
					}
				}
				else
				{
					alltouch = touch;
					allName = servantName.substring(0,servantName.length - 1);
					if(wifeSkinName)
					{
						allName += "," + wifeSkinName;
						alltouch += "|" + wifeSkinTouch;
					}
					if(servantSkinName)
					{
						allName += "," + servantSkinName;
						alltouch += "|" + servantSkinTouch;
					}
					if(titleName)
					{
						allName += "," + titleName;
						alltouch += "|" + titleTouch;
					}
					if(sceneName)
					{
						allName += "," + sceneName;
						alltouch += "|" + sceneTouch;
					}
					if(emoticonName)
					{
						allName += "," + emoticonName;
						alltouch += "|" + emoticonTouch;
					}
				}
			}
			else
			{
				if(wifeName)
				{
					alltouch = wifeTouch;
					allName = wifeName;
					if(wifeSkinName)
					{
						allName += "," + wifeSkinName;
						alltouch += "|" + wifeSkinTouch;
					}
					if(servantSkinName)
					{
						allName += "," + servantSkinName;
						alltouch += "|" + servantSkinTouch;
					}
					if(titleName)
					{
						allName += "," + titleName;
						alltouch += "|" + titleTouch;
					}
					if(sceneName)
					{
						allName += "," + sceneName;
						alltouch += "|" + sceneTouch;
					}
					if(emoticonName)
					{
						allName += "," + emoticonName;
						alltouch += "|" + emoticonTouch;
					}
				}
				else
				{
					if(wifeSkinName)
					{
						allName = wifeSkinName;
						alltouch = wifeSkinTouch;
						if(servantSkinName)
						{
							allName += "," + servantSkinName;
							alltouch += "|" + servantSkinTouch;
						}
						if(titleName)
						{
							allName += "," + titleName;
							alltouch += "|" + titleTouch;
						}
						if(sceneName)
						{
							allName += "," + sceneName;
							alltouch += "|" + sceneTouch;
						}
						if(emoticonName)
						{
							allName += "," + emoticonName;
							alltouch += "|" + emoticonTouch;
						}
					}
					else
					{
						if(servantSkinName)
						{
							allName = servantSkinName;
							alltouch =servantSkinTouch;
							if(titleName)
							{
								allName += "," + titleName;
								alltouch += "|" + titleTouch;
							}
							if(emoticonName)
							{
								allName += "," + emoticonName;
								alltouch += "|" + emoticonTouch;
							}
						}
						else
						{
							if(titleName)
							{
								allName = titleName;
								alltouch =titleTouch;
								if(sceneName)
								{
									allName += "," + sceneName;
									alltouch += "|" + sceneTouch;
								}
								if(emoticonName)
								{
									allName += "," + emoticonName;
									alltouch += "|" + emoticonTouch;
								}
							}
							else
							{
								if(sceneName)
								{
									allName = sceneName;
									alltouch = sceneTouch;
									if(emoticonName)
									{
										allName += "," + emoticonName;
										alltouch += "|" + emoticonTouch;
									}
								}
								else{
									if(emoticonName)
									{
										allName = emoticonName;
										alltouch = emoticonTouch;
									}
								}
							}
						}
					}
				}
				
			}
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":allName,"touch":alltouch,"message":"changeOtherRewardTip"})
		}
		// else{
			this._strTotch = this._strTotch.substring(0,this._strTotch.length - 1);
		// }
		
		
	}
	private playGetRewardAni():void
	{
		this.setConfirmBtnVisible(false);
		if(this._collectFlag == null)
		{
			// let pt = this.container.localToGlobal(this._bg.x,this._bg.y);
			this._collectFlag = BaseBitmap.create("collectflag")
			this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
			this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
			this._collectFlag.x = this.width/2;
			// this._collectFlag.y = pt.y + this._bg.height + 105 - 63;
			this._collectFlag.y = GameConfig.stageHeigth/2 + this.getShowHeight()/2 - this._collectFlag.height*0.6*0.5 - 10;
			this.addChild(this._collectFlag);
		}
		
		this._collectFlag.setScale(1.2);
		egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.6,scaleY:0.6},400).wait(600);
		let rewardVoList:Array<RewardItemVo> = GameData.formatRewardItem(this._strTotch);
		
		if(rewardVoList)
		{
			// this._scrollList.refreshData(rewardVoList);
			let runPos =  new egret.Point(this._collectFlag.x,this._collectFlag.y - 40) ;
			App.CommonUtil.playRewardFlyAction(rewardVoList,runPos);
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,null);
	}

	public dispose():void
	{
		if(this._mailInfoVo.touch == ''){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,null);
		}
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_REWARDS),this.useCallback,this);
		this._collectFlag = null;
		this._mailInfoVo = null;
		this._bg = null;
		this._scrollList = null;
		this._index = 0;
		this._txtCountainer=null;
		this._isHavehero = [];
		this._rewardItemVoList = null;
		this._strTotch ="";
		this._isHaveWife = false;
		this._isNotHaveWifeSkin.length = 0;
		this._isHaveServantSkin = false;
		this._isHaveTitle = false;
		this._isHasScence = false;
		super.dispose();
	}

}