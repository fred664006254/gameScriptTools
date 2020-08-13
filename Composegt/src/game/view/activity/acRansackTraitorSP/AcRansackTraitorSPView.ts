/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcRansackTraitorSPView extends AcCommonView {

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;


	private _inOrderText1: BaseTextField = null;
	private _inOrderText2: BaseTextField = null;
	private _inOrderText3: BaseTextField = null;
	private _inOrderText4: BaseTextField = null;


	private _searchtxt3:BaseTextField = null;
	private _rewardLookBtn:BaseButton;
	private _aniPlaying:boolean = false;

	private _acvo:AcRansackTraitorSPVo = undefined;
	private _rechargeBg:BaseBitmap = null;
	private _rewardLookBg:BaseBitmap = null;


	private _pos:any[] = [
		{x:11, y:620},
		{x:133, y:569},

		// {x:180, y:544},
		{x:123, y:620},
		{x:270, y:539},
		// {x:360, y:544},
		{x:406, y:620},
		{x:407, y:569},
		{x:529, y:620},

	];
	private _namePos:any[] = [
		{x:66, y:628},
		{x:192, y:592},
		{x:234, y:648},
		{x:317, y:530},
		{x:403, y:648},
		{x:443, y:592},
		{x:573, y:628},

	];
	public constructor() {
		super();
	}

	protected getBgName():string
	{
		return "ransackTraitorSP_bg1";
	}
	protected initBg():void{

		let bgName:string=this.getBgName();
        this.viewBg = BaseBitmap.create(bgName);
		this.viewBg.y = GameConfig.stageHeigth - 1136;
		this.addChild(this.viewBg);



	}

	protected initView(): void {
	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH,this.refreshUIInfos,this);
		this._acvo = <AcRansackTraitorSPVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);

		let titleFont = BaseBitmap.create(this.getDefaultRes("ransackTraitorSP_titletxt"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 0;
		this.addChild(titleFont);
		this.showText();

		//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = 160;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		this.addChildToContainer(bottomBg);

 		let flag = BaseBitmap.create("oneyear_flag");
        flag.x = GameConfig.stageWidth - flag.width-60;
        flag.y =  35;
        this.addChild(flag);

		let searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt1.text  = LanguageManager.getlocal("ransackTraitorSP_btntoptxt1");
		searchtxt1.y = bottomBg.y + 20;
		searchtxt1.visible = false;
		this.addChildToContainer(searchtxt1);

		let searchBtn1 = ComponentManager.getButton("ransackTraitor_btn","ransackTraitorSP_btn1",this.searchHandler,this,[1]);
		searchBtn1.x = 50;
		searchBtn1.y = searchtxt1.y + 25;
		searchtxt1.x = searchBtn1.x + searchBtn1.width/2 - searchtxt1.width/2;
		searchBtn1.name = "searchBtn1";
		this.addChildToContainer(searchBtn1);

		let searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt2.text  = LanguageManager.getlocal("ransackTraitorSP_btntoptxt2");
		searchtxt2.x = 430;
		searchtxt2.y = searchtxt1.y;
		this.addChildToContainer(searchtxt2);

		let searchBtn2 = ComponentManager.getButton("ransackTraitor_btn","ransackTraitorSP_btn2",this.searchHandler,this,[10]);
		searchBtn2.x = GameConfig.stageWidth -searchBtn2.width - searchBtn1.x ;
		searchBtn2.y = searchBtn1.y;
		searchtxt2.x = searchBtn2.x + searchBtn2.width/2 - searchtxt2.width/2;
		this.addChildToContainer(searchBtn2);
		searchBtn2.name = "searchBtn2";

		let searchtxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._searchtxt3 = searchtxt3;
		this._searchtxt3.text  = LanguageManager.getlocal("ransackTraitorSP_txt3",["0"]);
		searchtxt3.y = searchBtn2.y + searchBtn2.height + 5;
		searchtxt3.x = GameConfig.stageWidth/2 -searchtxt3.width/2 ;
		this.addChildToContainer(searchtxt3);


		let rewardLookBg:BaseBitmap = BaseBitmap.create("ransackTraitorSP_leftmask");
		rewardLookBg.x = this.viewBg.x + 0 ;
		rewardLookBg.y = this.viewBg.y + 758+16;
		rewardLookBg.scaleX = 4;
		rewardLookBg.scaleY = 4;
		this._rewardLookBg = rewardLookBg;
		this._rewardLookBg.alpha = 0;
		rewardLookBg.addTouch(this.rewardLookBgClick,this);
		this.addChildToContainer(rewardLookBg);

	   // 兑换
		let rewardLookBtn:BaseButton = ComponentManager.getButton("ransackTraitorSP_btnbg","",this.rewardLookClick,this);
		rewardLookBtn.x = this.viewBg.x + 76 - rewardLookBtn.width/2;
		rewardLookBtn.y = this.viewBg.y + 847 - rewardLookBtn.height/2+10;
		rewardLookBtn.name = "rewardLookBtn";
		this.addChildToContainer(rewardLookBtn);



		let rewardLookTxt:BaseBitmap=BaseBitmap.create("ransackTraitorSP_exchangetxt");
		rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width/2 - rewardLookTxt.width/2;
		rewardLookTxt.y = rewardLookBtn.y + rewardLookBtn.height/2 - rewardLookTxt.height/2-4;
		this.addChildToContainer(rewardLookTxt);
		this._rewardLookBtn = rewardLookBtn;

		
		let rechargeBg:BaseBitmap = BaseBitmap.create("ransackTraitorSP_rightmask");
		rechargeBg.x = this.viewBg.x + 489 ;
		rechargeBg.y = this.viewBg.y + 758+16;
		rechargeBg.scaleX = 4;
		rechargeBg.scaleY = 4;
		this._rechargeBg = rechargeBg;
		this._rechargeBg.alpha = 0;
		rechargeBg.addTouch(this.rechargeBgClick,this);
		this.addChildToContainer(rechargeBg);

		// 充值
		let rechargeBtn:BaseButton = ComponentManager.getButton("ransackTraitorSP_btnbg","",this.rechargeClick,this);
		rechargeBtn.x = this.viewBg.x + 564 - rewardLookBtn.width/2;
		rechargeBtn.y = this.viewBg.y + 847 - rewardLookBtn.height/2 +10;
		this.addChildToContainer(rechargeBtn);  

		
		let rechargeTxt = BaseBitmap.create("ransackTraitorSP_rechargetxt");
		rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
		rechargeTxt.y = rechargeBtn.y + rechargeBtn.height/2 - rechargeTxt.height/2 -4;
		this.addChildToContainer(rechargeTxt); 


		for(let i = 0 ; i < this._namePos.length; i ++){
			let pos = this._namePos[i];
			let txt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acRansackTraitorSP_buildname"+(i+1))),16,0xcdcdcd);
			txt.x = this.viewBg.x + pos.x - txt.width/2;
			txt.y = this.viewBg.y + pos.y - txt.height/2 -3;

			let txtbg = BaseBitmap.create("ransackTraitorSP_buildnamebg");
			txtbg.width = txt.width + 30;
			txtbg.x = this.viewBg.x + pos.x - txtbg.width/2;
			txtbg.y = this.viewBg.y + pos.y - txtbg.height/2 -3;
			this.addChildToContainer(txtbg); 
			this.addChildToContainer(txt); 
		}


		this.refreshUIInfos();
		ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPSTORYVIEW,{aid:this.aid,code:this.code});
	}
	private rechargeBgClick(e:egret.TouchEvent):void{
		
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			this._rechargeBg.alpha = 0.5;
			
		}
		else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
			this._rechargeBg.alpha = 0;
			this.rechargeClick();
		}
		if(e.type==egret.TouchEvent.TOUCH_END)
		{
			this._rechargeBg.alpha = 0;
			this.rechargeClick();
		}
	}
	private rewardLookBgClick(e:egret.TouchEvent):void{
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
			this._rewardLookBg.alpha = 0.5;
			
		}
		else if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
			this._rewardLookBg.alpha = 0;
			this.rewardLookClick();
		}
		if(e.type==egret.TouchEvent.TOUCH_END)
		{
			this._rewardLookBg.alpha = 0;
			this.rewardLookClick();
		}
	}
   	private rechargeClick():void{
		if(!this.acVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

	private refreshUIInfos()
	{
	
		this._searchtxt3.text  = LanguageManager.getlocal("ransackTraitorSP_txt3",[this.acVo["cannum"]]);
		let cfg = this.acVo.config;
		let exchangeShop = cfg.exchangeShop;

		let deltaY = 3;
		if(PlatformManager.checkIsViSp()){
			deltaY = 5;
		}
		for(let i = 0; i < exchangeShop.length; i++){
			let shopItem = exchangeShop[i];
			let skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);
			let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
			let txt = null;//ransackTraitorSP_txt6
			if(isOwn){
				txt = LanguageManager.getlocal("ransackTraitorSP_txt6",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
			} else {
				txt = LanguageManager.getlocal("ransackTraitorSP_txt2",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(shopItem.itemID)),shopItem["proofNum"]]);
			}
			
			//罪证
			// this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
			// this["_inOrderText"+(i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
			if(!this["_inOrderText"+(i + 1)]){
				break;
			}
			this["_inOrderText"+(i + 1)].text = txt;
			if(i == 0){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
			} else if(i == 1){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
			} else if(i == 2){
				this["_inOrderText"+(i + 1)].x = this._activityTimerText.x;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
			} else if(i == 3){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
			}

			this.addChildToContainer(this._inOrderText1);
		}


		let idfall = (this.acVo as AcRansackTraitorSPVo ).isExchangeEnable();
		let searchAll = this._acvo.checkSearchAll();
		if(searchAll)
		{
			App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn1"));
			App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn2"));
			if(this._searchtxt3){
				this._searchtxt3.visible = false;
			}

		}
		
		if(idfall){
			App.CommonUtil.addIconToBDOC(this._rewardLookBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._rewardLookBtn);
		}
	}
	
  	 private rewardLookClick() {
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
    }
	private searchHandler(param:any)
	{
		if(this._aniPlaying){
			return;
		}
		if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		// if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
		// 	// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
        //     return;
		// }
		
		if(this._acvo.checkSearchAll()){
			// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitorSP_nettip7'));
			  ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPEXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
			return;
		}
		if(this.acVo["cannum"] < param){
			let rewardStr = LanguageManager.getlocal("acRansackTraitorSP_nettip6",[this.acVo["cannum"]]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:rewardStr,
				callback:this.rechargeClick,
				handler:this,
				needCancel:true
			});
			return;
		}
		let isbatch = 0;
		if(param > 1){
			isbatch = 1
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH,this.searchHandlerNetBack,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH,{activeId:this.acVo.aidAndCode,isbatch:isbatch})
	}

	private searchHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPSEARCH,this.searchHandlerNetBack,this);
		 if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;

			
				//序列帧
			let skinClip = ComponentManager.getCustomMovieClip("ac_ransackTraitor_ani",17,100);
			let deltaS2 = 0.3;
			skinClip.width = 400*deltaS2;
			skinClip.height = 400*deltaS2;
			// skinClip.anchorOffsetY = skinClip.height ;
			// skinClip.anchorOffsetX = skinClip.width ;
			// skinClip.blendMode = egret.BlendMode.ADD;

			let posIndex = Math.floor(Math.random() * this._pos.length); 

			skinClip.x = this.viewBg.x + this._pos[posIndex].x - 10;//GameConfig.stageWidth/2;
			skinClip.y = this.viewBg.y + this._pos[posIndex].y-15;//GameConfig.stageHeigth - 300;
			this.addChild(skinClip);
			
			let tmpthis = this;
			tmpthis._aniPlaying = true;
			egret.Tween.get(skinClip,{loop:false}).call(()=>{
				skinClip.playWithTime(1);
				//  SoundManager.playBg("music_ransackTraitor");
				 SoundManager.playEffect("music_ransackTraitor");
			},this).wait(1800).call(()=>{
				tmpthis._aniPlaying = false;
				this.removeChild(skinClip);
				skinClip = null;



				let isFind = false;
				let RansackItemID = this.acVo.config.RansackItemID;


				let findItemIndex = -1;
				for(let i = 0;i<RansackItemID.length;i++){
					let id = RansackItemID[i];
					let itemStr = "6_"+id+"_1";
					if(rewards.indexOf(itemStr) > -1)
					{
						findItemIndex = i;
						// findItemIndex = i;
						isFind = true;
					}
				}

				let popdata = {aid:this.aid,code:this.code,rewards:rewards,isFind:isFind,findItemIndex:findItemIndex};
				ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPPOPUPVIEW,popdata);

				if(findItemIndex > -1){
					let itemId = RansackItemID[findItemIndex];
					let zzNum = this._acvo.getItemNumByIndex(String(itemId));
					if(zzNum == this._acvo.config.RansackItemNum || zzNum % 3 == 0){
						ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,zzNum:zzNum,findItemIndex:findItemIndex});
					}


				}
				// let itemId = RansackItemID[findItemIndex];

				// // let chipnum = this.acVo["chipnum"];
				// this.refreshUIInfos();
				// // let findAll = false;
				// // if(chipnum == this.acVo.config.RansackItemNum ){
				// // 	findAll = true;
				// // }

				// if(isFind==true && findItemIndex >=0){
				// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,isFind:isFind,findItemIndex:findItemIndex});
				// }
				
				// if(idFind && chipnum%6 == 0 && chipnum > 0){
				// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind,findItem:findItem});
				// }
				// if(!idFind){
				// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
				// }
				// //最后一个
				// if(findAll){
				// 	ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORSPGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
				// }
				

			},this);
		}
	}

	private showText(): void {
		//顶部背景图片
		let forpeople_top = BaseBitmap.create("ransackTraitor_bg6");
		forpeople_top.y = 69;
		this.addChildToContainer(forpeople_top);
		


		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 20;
		this._activityTimerText.y = forpeople_top.y + 12;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true,"0x00ff00");
		this.addChildToContainer(this._activityTimerText);

		let deltaY = 3;
		// if(PlatformManager.checkIsViSp()){
		// 	deltaY = 5;
		// }

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("ransackTraitorSP_acCD", [""]);
		
		acCDTxt.x = this._activityTimerText.y;//forpeople_top.x + forpeople_top.width - 20 - acCDTxt.width;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		let cfg = this.acVo.config;
		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ruleText.multiline = true;
		this._ruleText.width = 608;//GameConfig.stageWidth - this._activityTimerText.x - 10;
		this._ruleText.lineSpacing = 2;
		this._ruleText.x = this._activityTimerText.x;
		this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + deltaY;
		this._ruleText.text = LanguageManager.getlocal("ransackTraitorSP_Rule"+this.code,[cfg.cost,cfg.RansackItemNum,cfg.RansackItemNum]);
		this.addChildToContainer(this._ruleText);

		if(PlatformManager.checkIsJPSp()){
			let offImg = BaseBitmap.create("ransackTraitorSP_off");
			offImg.x = this._ruleText.x + 114;
			offImg.y = this._ruleText.y + 19 - offImg.height;
			this.addChildToContainer(offImg);
		}


		let exchangeShop = cfg.exchangeShop;
		for(let i = 0; i < exchangeShop.length; i++){
			let shopItem = exchangeShop[i];
			let skincfg = Config.ServantskinCfg.getServantSkinItemById(shopItem.skinID);

			let isOwn = Api.servantVoApi.isOwnSkinOfSkinId(String(shopItem.skinID));
			let txt = null;//ransackTraitorSP_txt6
			if(isOwn){
				txt = LanguageManager.getlocal("ransackTraitorSP_txt6",[LanguageManager.getlocal("servant_name"+ skincfg.servantId)]);
			} else {
				txt = LanguageManager.getlocal("ransackTraitorSP_txt2",[LanguageManager.getlocal("servant_name"+ skincfg.servantId),this._acvo.getItemNumByIndex(String(shopItem.itemID)),shopItem["proofNum"]]);
			}
			
			//罪证
			// this._inOrderText1 = ComponentManager.getTextField("", 19, 0xfedb39);
			this["_inOrderText"+(i + 1)] = ComponentManager.getTextField("", 19, 0xfedb39);
			this["_inOrderText"+(i + 1)].text = txt;
			if(i == 0){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
			} else if(i == 1){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY; 
			} else if(i == 2){
				this["_inOrderText"+(i + 1)].x = this._activityTimerText.x;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
			} else if(i == 3){
				this["_inOrderText"+(i + 1)].x = this._ruleText.x + 400;//this._ruleText.width - this["_inOrderText"+(i + 1)].width;
				this["_inOrderText"+(i + 1)].y = this._ruleText.y + this._ruleText.height + deltaY + this["_inOrderText"+(i + 1)].height + deltaY; 
			}

			this.addChildToContainer(this["_inOrderText"+(i + 1)]);
		}


	}


	public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "ransackTraitorSP_acCD";
		if(this.code == "4"){
			cdStrK = "ransackTraitorSP_acCD2";
		}
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			this._acCDTxt.x = this._activityTimerText.x;
			this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}
		this._acCDTxt.x = this._activityTimerText.x;
		this._acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + 3;
		return false;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"ransackTraitor_numbg2",
			"arena_bottom","punish_reward_icon","ac_luckbag-1_icon",
			"ransackTraitor_btn","ransackTraitor_2003","ransackTraitor_txt4","ransackTraitor_bg3","ransackTraitor_2001","ransackTraitor_2004","ransackTraitor_2002",
			"ransackTraitor_txt1","ransackTraitorSP_bg1","ransackTraitor_txt2","ransackTraitor_txt3",
			"ransackTraitor_bg2","ransackTraitor_leftimg","ransackTraitor_bg6","ransackTraitor_bg4","ransackTraitor_namebg2","ransackTraitor_numbg",
			"ransackTraitor_progressbg","ransackTraitor_progress","ransackTraitor_bg5","ransackTraitor_namebg","ransackTraitor_flag",
			"ransackTraitor_box1",
			"ransackTraitor_box2",
			"ransackTraitor_box3",
			"ransackTraitorSP_namebg",
			"ransackTraitorSP_leftbtn",
			"ransackTraitorSP_buildnamebg",
			"ransackTraitorSP_btnbg",
			"ransackTraitorSP_rechargetxt",
			"ransackTraitorSP_exchangetxt",
			"ransackTraitorSP_leftmask",
			"ransackTraitorSP_rightmask",
			"oneyear_flag",
			"ransackTraitorSP_off",
			
			this.getDefaultRes("ransackTraitorSP_titletxt"),
			this.getDefaultRes("ransackTraitorSP_titlebg")
			// "ac_ransackTraitor_ani",
		]);
	}
	// 
	// protected getSoundBgName():string
	// {
	// 	return "music_ransackTraitor";
	// }
	protected getRuleInfo():string
	{
		return "ransackTraitorSPRuleInfo" + this.code;
	}
	protected getTitleStr():string
	{
        return  null;
    }
	protected getTitleBgName():string
	{
		return this.getDefaultRes("ransackTraitorSP_titlebg");
    }
	protected getRuleParam():string[]{
		let cfg = this.acVo.config;
		return [cfg.cost,cfg.RansackItemNum,cfg.RansackItemNum];
	}
	public dispose(): void {
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH,this.refreshUIInfos,this);

		this._activityTimerText = null;
		this._acCDTxt = null;
		this._ruleText = null;


		this._inOrderText1 = null;
		this._inOrderText2 = null;
		this._inOrderText3 = null;
		this._inOrderText4 = null;


		this._searchtxt3 = null;
		this._rewardLookBtn = null;
		this._aniPlaying = false;

		this._acvo = undefined;
		super.dispose();
	}

}