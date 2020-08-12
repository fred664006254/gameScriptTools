/**
 * author 陈可
 * date 2017/9/18
 * @class MainUI
 */

class MainUI extends BaseLoadDisplayObjectContiner
{
	private _topContiner:BaseDisplayObjectContainer=undefined;
	private _bottomContiner:BaseDisplayObjectContainer=undefined;

	private selecetBg:BaseBitmap;
	private cellWidth = 112;
	private bottomBtns:Array<BaseButton> = [];
	private bottomTexts:Array<BaseBitmap> = [];
	private slipts:Array<BaseBitmap> = [];
	private leftArrow:BaseBitmap;
	private rightArrow:BaseBitmap;
	private selcontiner:BaseDisplayObjectContainer;
	private seizhiTxt: BaseTextField;
	private seziCon: BaseDisplayObjectContainer;
	private seizhigreedBg:BaseBitmap;

	private seleteIndex:number = 2;

	private selTw:egret.Tween = null;
	private btnTws:Array<egret.Tween> = [];
	private sliptTws:Array<egret.Tween> = [];
	private txtTws:Array<egret.Tween> = [];
	private _readyBtn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	/**
	 * 填内容
	 */
	protected init():void
	{
		this.name = `MainUI`;
		this.initButtom();
		this.initTop();
		this.freshDice();

		if(!Api.GameinfoVoApi.getIsFinishNewGuide()){
		}
		else{
			// NOTE: 公告图还没有出，这个先注释
			// this.showAnnoView();
		}
		//this.testHashCount();
	}

	private testHashCount():void{
		let count = egret.$hashCount;
		setInterval(()=>{
			let newcount = egret.$hashCount;
			let diff = newcount - count;
			count = newcount;
			console.log(`hashcount:${diff}`);
		}, 1000);
	}

	protected preInit():void{
		super.preInit();
		if(!Api.GameinfoVoApi.getIsFinishNewGuide()){
			let id = Api.GameinfoVoApi.getCurGudingId();
			if(id < 16){
				App.CommonUtil.sendAnlyId(10);
				Api.GameinfoVoApi.setCurGudingId(1);
				App.CommonUtil.sendAnlyId(20);
				App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
			}
			else if(id == 16){
				Api.GameinfoVoApi.setCurGudingId(16)
				App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
			}
			else if(id > 16 && id < 27){
				Api.GameinfoVoApi.setCurGudingId(25)
				App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
			}
		}
		else{
			// NOTE: 公告图还没有出，这个先注释
			// this.showAnnoView();
		}
	}
	
	private initTop():void
	{	
		this._topContiner=new MainUITop();
		this.addChild(this._topContiner);

		
		//声音区分
		let type = LocalStorageMgr.get(LocalStorageConst.LOCAL_VIOICE_SWITCH);
		if(type=="true")
		{
			SoundMgr.setVoiceOn(true);
		}
		else
		{
			SoundMgr.setVoiceOn(false);
		}
	}

	private watchAd(evt){
		if(evt.data && evt.data.ret){
			let adtype = Api.AdvertiseVoApi.getAdtype();
			let rewards = evt.data.data.data.rewards;
			switch (adtype) {
				case AdConst.ADV_5:
						ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
							rewards : rewards,
							title : LangMger.getlocal(`sysGetReward`),
							isBoxBuy : false,//连续购买模式
							specialBoxId : "1007",
							handler : this,
							needCancel : true,
							closecallback : ()=>{
								App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
							},
						});
					break;
			
				default:
					break;
			}
		}
		
	}

	private freshDice(){
		//红点的规则是，当玩家有新获得、尚未点击的色子或战场皮肤时，这个位置将用红点数字标示；同时，对应的色子左上角将标一个【新】的icon，点击后消除，数字-1
		//绿点的规则是，标示玩家有可以升级的色子的数值。优先显示红点，红点消失后才会显示绿点
		if(!this.seizhiTxt || !this.seziCon){
			return;
		}

		let bgres = ``;
		let num = Api.DiceVoApi.getNewGetNum();
		if(num){
			bgres = `task_reward_bg`;
		}
		else{
			bgres = `sezhi_tip`;
			num = Api.DiceVoApi.getDiceCanLevelUpNum();
		}
		this.seizhigreedBg.setRes(bgres);
		if(num > 0){
			this.seizhiTxt.text = String(num);
			this.seziCon.visible = true;
		} else {
			this.seziCon.visible = false;
		}
	}

	private showAnnoView(){
		// let flag = localStorage.getItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW);
		// let ts = localStorage.getItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME);
		// if(!ts || !flag){
		// 	ViewController.getInstance().openView(ViewConst.GAMEANNOUNCEMENTVIEW);
		// 	return;
		// }
		
		// let f = flag == "true";
		
		// let tsnum = parseInt(ts);
		// let dts = Date.parse((new Date()).toString()) / 1000;
		// if(!f && App.DateUtil.isSameDay(dts, tsnum)){
		// 	return;
		// }

		// ViewController.getInstance().openView(ViewConst.GAMEANNOUNCEMENTVIEW);
	}

	private checkRedPointByModel(e:egret.Event|string):void
	{
		if(!this._bottomContiner)
		{
			return;
		}
		let modelName:string=(e instanceof egret.Event)?e.data:e;
		let btn:BaseButton = <BaseButton>this._bottomContiner.getChildByName(modelName);
		if(btn)
		{
			if(Api[modelName+"VoApi"]&&Api[modelName+"VoApi"].checkRedPoint)
			{
				let showRedPoint:boolean=Api[modelName+"VoApi"].checkRedPoint();
				let redSp:BaseBitmap;
				if(showRedPoint)
				{
					App.CommonUtil.addIconToBDOC(btn);
					let redpoint = btn.getChildByName("reddot");
					
				}
				else
				{
					App.CommonUtil.removeIconFromBDOC(btn);
				}
			}
		}
	}

	private tick():void
	{
	}

	private bottomBtnCfg = [
		{
			id:1,
			btnName:"shop",
			btnIconImg:"mainui_shop_btn",
			isOPen:true,
			able:true,
		},
		{
			id:2,
			btnName:"dice",
			btnIconImg:"ab_mainui_shop_icon",
			isOPen:true,
			able:true,
		},
		{
			id:3,
			btnName:"ready",
			btnIconImg:"ab_mainui_fight_btn",
			isOPen:true,
			able:true,
		},
		{
			id:4,
			btnName:"active",
			btnIconImg:"mainui_activity_btn",
			isOPen:false,
			able:false,
		},
		{
			id:5,
			btnName:"team",
			btnIconImg:"mainui_team_btn",
			isOPen:false,
			able:false,
		},
	];
	private initButtom():void
	{
		this._bottomContiner=new BaseDisplayObjectContainer();
		// this._bottomContiner.alpha = 0;
		//填内容
		this._bottomContiner.setPosition(0,GameConfig.stageHeigth-this._bottomContiner.height);
		this.addChild(this._bottomContiner);

		this.bottomBtnCfg[3].isOPen = this.bottomBtnCfg[3].able = Api.SwitchVoApi.getFairarenStatus();

		let bottomBg:BaseBitmap = BaseBitmap.create("ab_mainui_bottom_bg");
		bottomBg.x=0;
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.y=-bottomBg.height;
		this._bottomContiner.addChild(bottomBg);

		let boss = new BaseDisplayObjectContainer();


		this.selcontiner = new BaseDisplayObjectContainer();

		// this.selecetBg = BaseBitmap.create("mainui_bottom_selected");
		this.selecetBg = BaseBitmap.create("ab_mainui_seleceted");
		this.selcontiner.addChild(this.selecetBg);
		this.selecetBg.x = 0;
		this.selecetBg.y = - this.selecetBg.height; 

		this.leftArrow = BaseBitmap.create("mainui_bottom_arrow");
		this.leftArrow.x = this.selecetBg.x + 10;
		this.leftArrow.y = this.selecetBg.y + (this.selecetBg.height - this.leftArrow.width) / 2;
		this.selcontiner.addChild(this.leftArrow);

		this.rightArrow = BaseBitmap.create("mainui_bottom_arrow");
		this.rightArrow.x = this.selecetBg.x + this.selecetBg.width - 10;
		this.rightArrow.y = this.leftArrow.y + this.rightArrow.height;
		this.rightArrow.rotation = 180;
		this.selcontiner.addChild(this.rightArrow);

		this.selcontiner.x = this.cellWidth * 2;

		this._bottomContiner.addChild(this.selcontiner);
		
		let x = -5;
		for (let i = 0; i < this.bottomBtnCfg.length; i++)
		{
			let btncfg = this.bottomBtnCfg[i];
			let res = btncfg.btnIconImg;
			let imgBtn = ComponentMgr.getButton(res,"",this.bottomBtnClickHandler,this,[btncfg]);
			if(i!=2){
				imgBtn.x = x + (this.cellWidth - imgBtn.width) / 2;
				x+=this.cellWidth;
				imgBtn.y = - this.selecetBg.height;
			} else {
				imgBtn.x = x + (this.selecetBg.width - imgBtn.width) / 2
				x += this.selecetBg.width;
				imgBtn.y = - this.selecetBg.height - 20;
				this._readyBtn = imgBtn;
			}
			imgBtn.name = btncfg.btnName;
			this._bottomContiner.addChild(imgBtn);
			// imgBtn.setEnable(btncfg.able);
			imgBtn.setGray(!btncfg.able);
			this.bottomBtns.push(imgBtn);

			//暂时开启未完成的活动与战队功能标签 以接受点击事件弹出提示”正在制作中“标签
			// if(imgBtn.name == "active" || imgBtn.name == "team")
			// {
			// 	imgBtn.setEnable(true);
			// 	imgBtn.setGray(true);
			// }

			let slipt = BaseBitmap.create("ab_mainui_bottom_slipt");
			this.slipts.push(slipt);
			this._bottomContiner.addChild(slipt);
			slipt.y = - this.selecetBg.height;
			slipt.x = x;

			let text = BaseBitmap.create(res+"2");
			text.anchorOffsetX = text.width / 2;
			text.x = imgBtn.x + text.width / 2;
			text.y = i == 2? - text.height - 5: - text.height + 5;
			text.setScale(i == 2? 1: 0.7);
			this._bottomContiner.addChild(text);
			this.bottomTexts.push(text);
		}

		//task_reward_bg
		let con = new BaseDisplayObjectContainer();
		let greedBg = BaseBitmap.create("sezhi_tip");
		con.addChild(greedBg);
		greedBg.x = 0;
		greedBg.y = 0;

		let seizhiTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_18, ColorEnums.white, false);
		con.addChild(seizhiTxt);
		seizhiTxt.textAlign = egret.HorizontalAlign.CENTER;
		seizhiTxt.width = greedBg.width;
		seizhiTxt.text = `99`
		seizhiTxt.x = 0;
		seizhiTxt.y = (greedBg.height - seizhiTxt.height) / 2;
		this.bottomBtns[1].addChild(con);
		con.x = this.bottomBtns[1].width - 30;
		con.y = 0;
		con.scaleX = 1.2;
		con.scaleY = 1.2;
		this.seizhiTxt = seizhiTxt;
		this.seizhigreedBg = greedBg;
		this.seziCon = con;
		this.seziCon.visible = false;
	}

	protected bottomBtnClickHandler(param:any):void
	{
		//提示活动与战队正在制作中
		if(!param.able)
		{
			let point = new egret.Point(this.bottomBtns[param.id-1].localToGlobal().x + this.bottomBtns[param.id-1].width / 2, this.bottomBtns[param.id-1].localToGlobal().y );
			App.CommonUtil.showExtendTipForSecound(LangMger.getlocal(`mainui_inpro_des`),2, point, false);
			return;
		}
		this.updateLocation(param.id - 1, ()=>{
			let btnName = this.getSceneName(param.btnName);
			if(btnName){
				this.jumpSceneByName(btnName);
			}
		});

		if(param.id == 3 && Api.GameinfoVoApi.checlIsInGuideId(24)){
			App.CommonUtil.sendNewGuideId(24);
			Api.GameinfoVoApi.setCurGudingId(25);
			App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
		}
	}

	private getSceneName(btnName:string):string{
		let scene:string = btnName;
		if(btnName === "active"){
			scene = Api.FairArenaVoApi.sceneName;
		}

		return scene;
	}

	/**
	 * 重新计算按钮选定背景位置
	 * @param index 按钮序号
	 */
	private updateLocation(index:number, cb?:Function){
		if(index == this.seleteIndex){
			cb&&cb();
			return;
		}
		let dt = 100;
		egret.Tween.removeTweens(this.selcontiner);
		this.leftArrow.visible = !(index==0);
		this.rightArrow.visible = !(index==4);
		egret.Tween.get(this.selcontiner)
					.to({x:this.cellWidth * index} , dt)
					.call(()=>{
						cb&&cb();
					});
		let x = 0;
		for(let i = 0; i < this.bottomBtns.length; i++){
			let btn = this.bottomBtns[i];
			let slipt = this.slipts[i];
			let txt = this.bottomTexts[i];
			egret.Tween.removeTweens(btn);
			egret.Tween.removeTweens(slipt);
			egret.Tween.removeTweens(txt);
			if(i == index){
				egret.Tween.get(btn).to({x:x + (this.selecetBg.width - btn.width) / 2, y: - this.selecetBg.height - 20}, dt);
				egret.Tween.get(txt).to({x:x + (this.selecetBg.width) / 2}, dt);
				x += this.selecetBg.width;
				// txt.visible = true;
				txt.y = -48;
				txt.setScale(1);
			} else {
				egret.Tween.get(btn).to({x:x + (this.cellWidth - btn.width) / 2, y:- this.selecetBg.height}, dt);
				egret.Tween.get(txt).to({x:x + this.cellWidth / 2}, dt);
				x += this.cellWidth;
				// txt.visible = false;
				txt.y = -38;
				txt.setScale(0.7);
			}
			
			egret.Tween.get(slipt).to({x:x}, dt);
		}
		this.seleteIndex = index;
	}

	private jumpSceneByName(modelName:string,params?:{[key:string]:any}):void
	{
		let sceneName=App.StringUtil.firstCharToUper(modelName)+"Scene";
		SceneController.getInstance().go(sceneName,params);
	}
	
	protected getResourceList():string[]
	{
		return [
		];
	}

	private goShop(event){
		this.updateLocation(0, ()=>{
			this.jumpSceneByName(this.bottomBtnCfg[0].btnName, {index: event.data.index});
			if(event.data.index){
				App.MsgHelper.dispEvt(MsgConst.SCROLLTOINDEX, {index:event.data.index});
				if(!Api.SwitchVoApi.checkWxShenhe()){
					Api.ShopVoApi.setLightType(event.data.type);
					App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, {index:event.data.type});
				}
			}
		});
	}

	private goShopRoyalPass(evt : egret.Event):void{
		let unit = this.bottomBtnCfg[0];
		this.updateLocation(unit.id - 1);
		let btnName = unit.btnName;
		if(btnName){
			this.jumpSceneByName(btnName);
			if(!Api.SwitchVoApi.checkWxShenhe()){
				Api.ShopVoApi.setLightType(ShopConst.SHOP_SPECIALVIP);
				App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, {index:ShopConst.SHOP_SPECIALVIP});
			}
		}
	}

	private goDiceRoyalpass(evt : egret.Event):void{
		let unit = this.bottomBtnCfg[1];
		this.updateLocation(unit.id - 1);
		let btnName = unit.btnName;
		if(btnName){
			this.jumpSceneByName(btnName);
		}
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerMgr.uiLayer;
	}

	protected getMsgConstEventArr():string[]{
		return [
			MsgConst.REFRESH_MODEl, MsgConst.ROYAL_GOSHOP, MsgConst.ROYAL_GODICE, MsgConst.GOSHOP, MsgConst.MODEL_DICE,MsgConst.SHOW_GUIDE,MsgConst.CLOSE_GUIDE
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case MsgConst.REFRESH_MODEl:
				view.checkRedPointByModel(evt.type);
				break;
			case MsgConst.ROYAL_GOSHOP:
				view.goShopRoyalPass(evt);
				break;
			case MsgConst.ROYAL_GODICE:
				view.goDiceRoyalpass(evt);
				break;
			case MsgConst.GOSHOP:
				view.goShop(evt);
				break;
			case MsgConst.MODEL_DICE:
				view.freshDice();
				break;
			case MsgConst.SHOW_GUIDE:
				view.showGuideView(evt);
				break;
			case MsgConst.CLOSE_GUIDE:
				view.closeGuide(evt);
				break;
		}
	}

	private showGuideView(evt:egret.Event):void{
        let cfg = GuideCfg.rookieCfg[Api.GameinfoVoApi.getCurGudingId()];
		let view: any = LayerMgr.guideLayer.getChildByName(ViewConst.GUIDEVIEW);
		if (!view) {//还没有添加，需要添加
			let viewClass = egret.getDefinitionByName(ViewConst.GUIDEVIEW);
			if(viewClass){
				view = new viewClass(cfg);
				LayerMgr.guideLayer.addChild(view);
			}
		} else {
			view.freshView(cfg);
		}
    }

    private closeGuide(evt:egret.Event):void{
		let view: any = LayerMgr.guideLayer.getChildByName(ViewConst.GUIDEVIEW);
		if (view) {//还没有添加，需要添加
            view.dispose();
            view = null;
		} 
    }

	public dispose():void
	{	
		TickMgr.removeTick(this.tick,this);
		//添加需要释放的内容
		this._topContiner = null;
		this._bottomContiner = null;
		this.bottomTexts = [];
		this.seizhigreedBg = null;
		this._readyBtn = null;
		super.dispose();
	}

	private static _instance:MainUI;
	public static getInstance():MainUI
	{
		if(!MainUI._instance)
		{
			MainUI._instance=new MainUI();
		}
		return MainUI._instance;
	}
}