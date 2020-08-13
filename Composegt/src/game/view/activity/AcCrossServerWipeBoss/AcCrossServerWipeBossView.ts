/**
 * author:qianjun
 * desc:围剿鳌拜活动首页
*/
class AcCrossServerWipeBossView extends AcCommonView
{
	private _enterBtn : BaseButton = null;
	private _endGroup : BaseDisplayObjectContainer = null;
	private _shopBtn : BaseButton = null;
	private _canJoin : BaseDisplayObjectContainer = null;

	private _myScore: BaseTextField = null;
	private _myRank: BaseTextField = null;

	public constructor() 
	{
		super();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"accrossserverwipeboss_activeshopbtn",
			"accrossserverwipeboss_activeshoptxt",
			"accrossserverwipeboss_enterbtn",
			"accrossserverwipeboss_rankrewardbtn",
			"accrossserverwipeboss_rankrewardtxt"
		
		]);
	}

	protected initTitle() : void{
		return null;
	}

	// protected getBgName():string
	// {
	// 	return "acwipeboss_bg1";
	// }

	protected getCloseBtnName():string
	{
		return ButtonConst.COMMON_CLOSE_1;
	}
	protected initBg(): void {
		this.viewBg = BaseLoadBitmap.create("accrossserverwipeboss_bg1");
		this.viewBg.width = 640;
		this.viewBg.height = 1136;

		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}


	protected getTitleStr():string
	{
		return null;
	}

	private getBossNum(event : egret.Event):void{
		let view = this;
		view.api.setBossNumInfo(event.data.data.data);
	}

	public initView():void
	{	
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;


		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,this.freshView,view);

		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM),view.getBossNum,view);
		// NetManager.request(NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM, {
		// 	activeId : this.vo.aidAndCode,
		// });	




		//NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GERACTIVITYPOWER, {});
		let title = BaseLoadBitmap.create('accrossserverwipeboss_title');
		title.width = 456;
		title.height = 160;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0,25]);
		view.addChild(title);

		let descbg = BaseBitmap.create('public_itemtipbg2');
		descbg.width = 604;
		descbg.height = 106;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, title, [0,title.height]);
		view.addChild(descbg);

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossDesc'), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
		descTxt.width = descbg.width - 20;
		descTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
		view.addChild(descTxt);

		let endGroup = new BaseDisplayObjectContainer();
		endGroup.width = 210;
		endGroup.height = 70;
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endGroup, view, [0,0]);
		view.addChild(endGroup);
		view._endGroup = endGroup;
	
		let endBg = BaseBitmap.create('public_9v_bg05');
		endBg.width = 210;
		endBg.height = 70;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, endBg, endGroup, [0,0], true);
		endGroup.addChild(endBg);

		let endTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossEnd'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		
		endGroup.addChild(endTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, endTxt, endBg,[0,0]);

		endGroup.visible = false;

		let enterbtn = ComponentManager.getButton('accrossserverwipeboss_enterbtn','',view.enterInHandler, view, null, 3);
		enterbtn.anchorOffsetX = enterbtn.width / 2;
		enterbtn.anchorOffsetY = enterbtn.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterbtn, view);
		egret.Tween.get(enterbtn, {loop : true}).to({scaleX : 0.8, scaleY : 0.8},800).to({scaleX : 1, scaleY : 1},800);
		view.addChild(enterbtn);
		view._enterBtn = enterbtn;

		//中部
		// view.freshView();
		//底部
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_bottombg1");
        bottomBg.height = 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);

		this._canJoin = new BaseDisplayObjectContainer();
		this._canJoin.width = 640;
		this._canJoin.height = 80;

		let canJoinBg = BaseBitmap.create("public_lockbg");
		canJoinBg.scaleX = this._canJoin.width / canJoinBg.width;
		canJoinBg.scaleY = this._canJoin.height / canJoinBg.height;
		this._canJoin.addChild(canJoinBg);
		//没有资格 
		if(!this.vo.isCanJoin()){

			let canJoinText = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBoss_cannotjoin"),22,TextFieldConst.COLOR_WHITE);
			canJoinText.textAlign = egret.HorizontalAlign.CENTER;
			
			canJoinText.x = this._canJoin.width/2 - canJoinText.width/2;
			canJoinText.y = this._canJoin.height/2 - canJoinText.height/2;
			this._canJoin.addChild(canJoinText);


			this._canJoin.x = 0;
			this._canJoin.y = bottomBg.y - 150 - this._canJoin.height;
			this.addChild(this._canJoin);
		} else {
			let canJoinText = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBoss_canjoin"),22,TextFieldConst.COLOR_WHITE);
			canJoinText.textAlign = egret.HorizontalAlign.CENTER;
			
			canJoinText.x = this._canJoin.width/2 - canJoinText.width/2;
			canJoinText.y = this._canJoin.height/2 - canJoinText.height/2;
			this._canJoin.addChild(canJoinText);


			this._canJoin.x = 0;
			this._canJoin.y = bottomBg.y - 150 - this._canJoin.height;
			this.addChild(this._canJoin);

		}
		view.freshView();
		//说明文本
		let pkzidsTxt= ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossPkzids', [this.api.getPkzidsStr()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, pkzidsTxt, bottomBg, [30,17]);
		view.addChild(pkzidsTxt);


		let dateTxt= ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossDate', [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		dateTxt.x = pkzidsTxt.x;
		dateTxt.y = pkzidsTxt.y + pkzidsTxt.height + 5;
		view.addChild(dateTxt);

		let timeTxt= ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossTime', [view.cfg.actTime[0].toString(), view.cfg.actTime[1].toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTxt.x = pkzidsTxt.x;
		timeTxt.y = dateTxt.y + dateTxt.height + 5;
		view.addChild(timeTxt);


		//现实个人排名 个人分数
		if(this.vo.isCanJoin()){
			this._myScore =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWipeBoss_myScore", [String(this.api.getMyScore())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			this._myScore.x = GameConfig.stageWidth - 15 - this._myScore.width;
			this._myScore.y = dateTxt.y;
			this.addChild(this._myScore);

			this._myRank =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWipeBoss_myRank", [String(this.api.getMyRank())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			this._myRank.x = GameConfig.stageWidth - 15 - this._myRank.width;
			this._myRank.y = timeTxt.y;
			this.addChild(this._myRank);
		}




		let rankBtn = ComponentManager.getButton("accrossserverwipeboss_rankrewardbtn", "", view.rankClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, rankBtn, bottomBg, [15,bottomBg.height + 5]);
		view.addChild(rankBtn);

		let rankTxt = BaseBitmap.create("accrossserverwipeboss_rankrewardtxt");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankTxt, rankBtn, [0,0]);
		view.addChild(rankTxt);

		//按钮
		let shopBtn = ComponentManager.getButton("accrossserverwipeboss_activeshopbtn", "", view.shopClick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shopBtn, bottomBg, [15,bottomBg.height + 5]);
		view.addChild(shopBtn);
		view._shopBtn = shopBtn;

		let shopTxt = BaseBitmap.create("accrossserverwipeboss_activeshoptxt");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, shopTxt, shopBtn, [0,0]);
		view.addChild(shopTxt);


		if(!PlatformManager.hasSpcialCloseBtn()){
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0,0]);
		}
		else{
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view.closeBtn, view, [0,0]);
		}

		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
		}
		
	}

	private shopClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSSHOPVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_WIPEBOSS_GETRANK,requestData:{
			activeId : view.vo.aidAndCode,
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setRankInfo(data.data.data);
		this.refreshRank();
	}
	private refreshRank(){
			// 		this._myScore =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWipeBoss_myScore", [String(this.api.getMyScore())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			// this._myScore.x = GameConfig.stageWidth - 15 - this._myScore.width;
			// this._myScore.y = dateTxt.y;
			// this.addChild(this._myScore);

			// this._myRank =  ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWipeBoss_myRank", [String(this.api.getMyRank())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			// this._myRank.x = GameConfig.stageWidth - 15 - this._myRank.width;
			// this._myRank.y = timeTxt.y;
			// this.addChild(this._myRank);

			if(this._myScore){
				this._myScore.text = LanguageManager.getlocal("acCrossServerWipeBoss_myScore", [String(this.api.getMyScore())]);
				this._myScore.x = GameConfig.stageWidth - 15 - this._myScore.width;
				this._myRank.text = LanguageManager.getlocal("acCrossServerWipeBoss_myRank", [String(this.api.getMyRank())]);
				this._myRank.x = GameConfig.stageWidth - 15 - this._myRank.width;
			}
	}

	private rankClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIPEBOSSREWARDVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	private freshView():void{
		let view = this;
		if(!view.vo.isInTansuoTime()){
			view._enterBtn.visible = false;
			view._endGroup.visible = true;
			
			if(this._canJoin){
				this._canJoin.visible = false;
			}
		}


		// if(this.vo.isCanJoin()){
		// 	if(this._canJoin){
		// 		this._canJoin.visible = false;
		// 	}
		// }
	}

	protected getRuleInfo():string{
		return 'accrossserverwipeBossRuleInfo';
	}

	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_ALLIANCEBOSSBATTLE;
	}

	public tick():void
	{	
		let view = this;
		if(!view.vo.isInTansuoTime()){
			view._enterBtn.visible = false;
			view._endGroup.visible = true;
			if(this._canJoin){
				this._canJoin.visible = false;
			}
			
		}
		if(view.vo.getpublicRedhot2()){
			App.CommonUtil.addIconToBDOC(view._shopBtn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(view._shopBtn);
		}
		//view.freshView();
	}

	private enterInHandler() : void{
		let view = this;
		if(Api.playerVoApi.getPlayerLevel() >= view.cfg.needLv){
			if(view.vo.isInFightTime()){
				ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSENTERVIEW,{
					aid : this.aid,
					code : this.code
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime0`));
			}
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal(`accrossserverwipeBossOpenTip`, [Api.playerVoApi.getPlayerOfficeByLevel(view.cfg.needLv)]));
		}
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH,this.freshView,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_GETBOSSNUM),view.getBossNum,view);
		if(this._endGroup){
			view._endGroup.dispose();
			view._endGroup = null;
		}
		if(this._enterBtn){
			egret.Tween.removeTweens(view._enterBtn);
			view._enterBtn.removeTouchTap();
			view._enterBtn = null;
		}

		view._shopBtn = null;
		this._canJoin = null;
		this._myScore = null;
		this._myRank = null;
		super.dispose();
	}
}