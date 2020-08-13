/**
 * 20190401
 * 奸臣皮肤兑换
 */
class AcRansackTraitorView extends AcCommonView {

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;
	private _inOrderText2: BaseTextField = null;
	private _progress:ProgressBar;
	private _searchtxt3:BaseTextField = null;
	private _rewardLookBtn:BaseButton;
	private _aniPlaying:boolean = false;
	public constructor() {
		super();
	}
	private decode():string{

		switch(String(this.code)){
			case "1":
				return "1";
			case "2":
				return "2";
			case "3":
				return "3";
			case "4":

				return "4";
			case "5":
			
				return "1";
			case "6":

				return "2";
			case "7":

				return "3";
			case "8":

				return "4";
		}
	}
	protected getBgName():string
	{
		return "ransackTraitor_bg1";
	}

	protected initView(): void {
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH,this.refreshUIInfos,this);

		this.showText();

		//下面属性背景
		let bottomBg:BaseBitmap = BaseBitmap.create("arena_bottom");
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.height = 160;
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
		this.addChildToContainer(bottomBg);

		let searchtxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt1.text  = LanguageManager.getlocal("ransackTraitor_btntoptxt1");
		searchtxt1.y = bottomBg.y + 20;
		searchtxt1.visible = false;
		this.addChildToContainer(searchtxt1);

		let searchBtn1 = ComponentManager.getButton("ransackTraitor_btn","ransackTraitor_btn1",this.searchHandler,this,[1]);
		searchBtn1.x = 50;
		searchBtn1.y = searchtxt1.y + 25;
		searchtxt1.x = searchBtn1.x + searchBtn1.width/2 - searchtxt1.width/2;
		searchBtn1.name = "searchBtn1";
		this.addChildToContainer(searchBtn1);

		let searchtxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		searchtxt2.text  = LanguageManager.getlocal("ransackTraitor_btntoptxt2");
		searchtxt2.x = 430;
		searchtxt2.y = searchtxt1.y;
		this.addChildToContainer(searchtxt2);

		let searchBtn2 = ComponentManager.getButton("ransackTraitor_btn","ransackTraitor_btn2",this.searchHandler,this,[10]);
		searchBtn2.x = GameConfig.stageWidth -searchBtn2.width - searchBtn1.x ;
		searchBtn2.y = searchBtn1.y;
		searchtxt2.x = searchBtn2.x + searchBtn2.width/2 - searchtxt2.width/2;
		this.addChildToContainer(searchBtn2);
		searchBtn2.name = "searchBtn2";

		let searchtxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._searchtxt3 = searchtxt3;
		this._searchtxt3.text  = LanguageManager.getlocal("ransackTraitor_txt3",["0"]);
		searchtxt3.y = searchBtn2.y + searchBtn2.height + 5;
		searchtxt3.x = GameConfig.stageWidth/2 -searchtxt3.width/2 ;
		this.addChildToContainer(searchtxt3);
	   // 兑换
		let rewardLookBtn:BaseButton = ComponentManager.getButton("punish_reward_icon","",this.rewardLookClick,this);
		rewardLookBtn.x = 5;
		rewardLookBtn.y = bottomBg.y - rewardLookBtn.height - 5;
		rewardLookBtn.name = "rewardLookBtn";
		this.addChildToContainer(rewardLookBtn);
		let rewardLookTxt:BaseBitmap=BaseBitmap.create("ransackTraitor_txt2");
		rewardLookTxt.x = rewardLookBtn.x + rewardLookBtn.width/2 - rewardLookTxt.width/2;
		rewardLookTxt.y = rewardLookBtn.y + 50 ;
		this.addChildToContainer(rewardLookTxt);
		this._rewardLookBtn = rewardLookBtn;
 
		// 充值
		let rechargeBtn:BaseButton = ComponentManager.getButton("ac_luckbag-1_icon","",this.rechargeClick,this);
		rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
		rechargeBtn.y = rewardLookBtn.y;
		this.addChildToContainer(rechargeBtn);  
		
		let rechargeTxt = BaseBitmap.create("ransackTraitor_txt1");
		rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
		rechargeTxt.y = rechargeBtn.y + 50;
		this.addChildToContainer(rechargeTxt); 

		this.refreshUIInfos();
		ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITORSTORYVIEW,{aid:this.aid,code:this.code});
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
		this._inOrderText.text = LanguageManager.getlocal("ransackTraitor_txt1",[this.acVo["attacknum"]]);
		this._inOrderText2.text = LanguageManager.getlocal("ransackTraitor_txt2",[this.acVo["chipnum"] + "/"+this.acVo.config.RansackItemNum]);
		this._searchtxt3.text  = LanguageManager.getlocal("ransackTraitor_txt3",[this.acVo["attacknum"]]);
		let perc = this.acVo["chipnum"] / this.acVo.config.RansackItemNum
		this._progress.setPercentage(perc);
		if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
		{
			App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn1"));
			App.DisplayUtil.changeToGray(this.container.getChildByName("searchBtn2"));
			this._searchtxt3.visible = this._inOrderText.visible = false;
			this._inOrderText2.x = this._inOrderText.x;
			// ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});

		}
		let idfall = (this.acVo as AcRansackTraitorVo ).isExchangeEnable();
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
        ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
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
		if(this.acVo["chipnum"] >= this.acVo.config.RansackItemNum)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITOREXCHANGEPOPUPVIEW,{"aid":this.aid,"code":this.code});
			// App.CommonUtil.showTip(LanguageManager.getlocal('acRansackTraitor_nettip4'));
            return;
		}
		if(this.acVo["attacknum"] < param){
			let rewardStr = LanguageManager.getlocal("acRansackTraitor_nettip6",[this.acVo["attacknum"]]);
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:rewardStr,
				callback:this.rechargeClick,
				handler:this,
				needCancel:true
			});
			return;
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK,this.searchHandlerNetBack,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK,{activeId:this.acVo.aidAndCode,attack:param})
	}

	private searchHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK,this.searchHandlerNetBack,this);
		 if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;
			let idFind = false;
			let RansackItem = this.acVo.config.RansackItem;
			if(rewards.indexOf(RansackItem) > -1)
			{
				idFind = true;
			}

				//序列帧
			let skinClip = ComponentManager.getCustomMovieClip("ac_ransackTraitor_ani",17,100);
			let deltaS2 = 1.0;
			skinClip.width = 400*deltaS2;
			skinClip.height = 400*deltaS2;
			skinClip.anchorOffsetY = skinClip.height ;
			skinClip.anchorOffsetX = skinClip.width/2 ;
			// skinClip.blendMode = egret.BlendMode.ADD;
			skinClip.x = GameConfig.stageWidth/2;
			skinClip.y = GameConfig.stageHeigth - 300;
			this.addChildToContainer(skinClip);
			
			let tmpthis = this;
			tmpthis._aniPlaying = true;
			egret.Tween.get(skinClip,{loop:false}).call(()=>{
				skinClip.playWithTime(1);
				//  SoundManager.playBg("music_ransackTraitor");
				 SoundManager.playEffect("music_ransackTraitor");
			},this).wait(1800).call(()=>{
				tmpthis._aniPlaying = false;
				this.container.removeChild(skinClip);
				skinClip = null;
				let chipnum = this.acVo["chipnum"];
				this.refreshUIInfos();
				let findAll = false;
				if(chipnum == this.acVo.config.RansackItemNum ){
					findAll = true;
				}
				let popdata = {findAll:findAll,aid:this.aid,code:this.code,rewards:rewards,idFind:idFind};
				ViewController.getInstance().openView(ViewConst.POPUP.ACRANKSACKTRAITORPOPUPVIEW,popdata);
				
				if(idFind && chipnum%6 == 0 && chipnum > 0){
					ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
				}
				if(!idFind){
					ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
				}
				//最后一个
				if(findAll){
					ViewController.getInstance().openView(ViewConst.POPUP.ACRANSACKTRAITORGUIDSTORYVIEW,{aid:this.aid,code:this.code,idFind:idFind});
				}
				

			},this);
		}
	}

	private showText(): void {
		//顶部背景图片
		let forpeople_top = BaseBitmap.create("ransackTraitor_bg6");
		forpeople_top.y = -15;
		this.addChildToContainer(forpeople_top);
		
		let skinid = (this.acVo.config as Config.AcCfg.RansackTraitorCfg).getRewardSkinId();
		let sicon = Config.ServantskinCfg.getServantSkinItemById(skinid).body;
		let serIcon = BaseLoadBitmap.create(sicon);
		serIcon.width = 640;
		serIcon.height = 482;
		serIcon.setScale(0.5);
		let widthN:number =282-8;
        let heightN:number =335;
        let mask = new egret.Rectangle(172, 0, widthN , heightN);   
        serIcon.mask =mask;
		serIcon.x = -80;
		serIcon.y = forpeople_top.y +15;
		this.addChildToContainer(serIcon);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 160;
		this._activityTimerText.y = forpeople_top.y + 16;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true,"0x00ff00");
		this.addChildToContainer(this._activityTimerText);

		let deltaY = 3;
		if(PlatformManager.checkIsViSp()){
			deltaY = 5;
		}

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("ransackTraitor_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//谋士令
		this._inOrderText = ComponentManager.getTextField("", 19, 0xfedb39);
		this._inOrderText.text = LanguageManager.getlocal("ransackTraitor_txt1")
		this._inOrderText.x = this._activityTimerText.x;
		this._inOrderText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY; 
		this.addChildToContainer(this._inOrderText);

		this._inOrderText2 = ComponentManager.getTextField("", 19, 0xfedb39);
		this._inOrderText2.text = LanguageManager.getlocal("ransackTraitor_txt2")
		this._inOrderText2.x = forpeople_top.x + forpeople_top.width - 170;
		this._inOrderText2.y = this._inOrderText.y ; 
		this.addChildToContainer(this._inOrderText2);

		let cfg = this.acVo.config;
		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), 19, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ruleText.multiline = true;
		this._ruleText.width = GameConfig.stageWidth - this._activityTimerText.x - 10;
		this._ruleText.lineSpacing = 2;
		this._ruleText.x = this._activityTimerText.x;
		this._ruleText.y = this._inOrderText.y + this._inOrderText.height + deltaY;
		this._ruleText.text = LanguageManager.getlocal("ransackTraitor_Rule"+this.decode(),[cfg.cost,cfg.RansackItemNum,cfg.RansackItemNum]);
		this.addChildToContainer(this._ruleText);

		// _progress
		this._progress = ComponentManager.getProgressBar("ransackTraitor_progress","ransackTraitor_progressbg",540);
		this._progress.x = GameConfig.stageWidth/2 - this._progress.width/2 ;
		this._progress.y = forpeople_top.y+ forpeople_top.height + 40;
		this._progress.setTextSize(18);
		this.addChildToContainer(this._progress);

		let box = BaseLoadBitmap.create("ransackTraitor_box" + this.decode());
		box.width = 82;box.height = 78;
		box.y = this._progress.y + this._progress.height/2 - box.height/2;
		box.x = this._progress.x  - box.width/2;
		this.addChildToContainer(box);
		box.addTouchTap(this.rewardBoxHandler,this);

		let numbg = BaseBitmap.create("ransackTraitor_numbg2");
		numbg.y = box.y  + box.height - numbg.height;
		numbg.x = numbg.x  + box.width/2 - numbg.width/2;
		this.addChildToContainer(numbg);
		
		let txt2 = ComponentManager.getTextField("", 19);
		txt2.text = LanguageManager.getlocal("ransackTraitor_txt4")
		txt2.x = numbg.x + numbg.width/2 - txt2.width/2+5;
		txt2.y = numbg.y + numbg.height/2 - txt2.height/2+2;
		this.addChildToContainer(txt2);

		let sepNum = this.acVo.config.RansackItemNum/4;
		for (var index = 1; index <= 4; index++) {
			let numbg = BaseBitmap.create("ransackTraitor_numbg");
			numbg.y = this._progress.y + this._progress.height/2 - numbg.height/2;
			numbg.x = this._progress.x + this._progress.width*index/4 - numbg.width/2;
			this.addChildToContainer(numbg);

			let numTxt  = ComponentManager.getTextField("", 20);
			numTxt.text = sepNum*index + "";
			numTxt.x = numbg.x + numbg.width/2 - numTxt.width/2;
			numTxt.y = numbg.y +numbg.height/2 - numTxt.height/2; 
			this.addChildToContainer(numTxt);
		}
	}

	private rewardBoxHandler()
	{

	}
	public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "ransackTraitor_acCD";
		if(this.decode() == "4"){
			cdStrK = "ransackTraitor_acCD2";
		}
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}
		return false;
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"ransackTraitor_numbg2",
			"arena_bottom","punish_reward_icon","ac_luckbag-1_icon",
			"ransackTraitor_btn","ransackTraitor_2003","ransackTraitor_txt4","ransackTraitor_bg3","ransackTraitor_2001","ransackTraitor_2004","ransackTraitor_2002",
			"ransackTraitor_txt1","ransackTraitor_bg1","ransackTraitor_txt2","ransackTraitor_txt3",
			"ransackTraitor_bg2","ransackTraitor_leftimg","ransackTraitor_bg6","ransackTraitor_bg4","ransackTraitor_namebg2","ransackTraitor_numbg",
			"ransackTraitor_progressbg","ransackTraitor_progress","ransackTraitor_bg5","ransackTraitor_namebg","ransackTraitor_flag",

			"ac_ransackTraitor_ani",
		]);
	}
	// 
	// protected getSoundBgName():string
	// {
	// 	return "music_ransackTraitor";
	// }
	protected getRuleInfo():string
	{
		return "ransackTraitorRuleInfo" + this.code;
	}
	protected getRuleParam():string[]{
		let cfg = this.acVo.config;
		return [cfg.cost,cfg.RansackItemNum,cfg.RansackItemNum];
	}
	public dispose(): void {
		// App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN,this.refreshUIInfos,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH,this.refreshUIInfos,this);

		this._activityTimerText = null;
		this._acCDTxt = null;
		this._inOrderText = null;
		this._ruleText = null;
		this._inOrderText2 = null;
		this._progress = null;
		this._searchtxt3 = null;
		this._rewardLookBtn = null;
		this._aniPlaying = false;
		super.dispose();
	}

}