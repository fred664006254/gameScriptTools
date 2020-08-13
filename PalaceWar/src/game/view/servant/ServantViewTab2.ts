/**
 * 出海门客Tab2
 * @author 张朝阳
 * date 2019/2/18
 * @class ServantViewTab2
 */

class ServantViewTab2 extends CommonViewTab {
	private _txtBg: BaseBitmap = null;
	private _txtTF: BaseTextField = null;

	private _tip2TF: BaseTextField = null;

	private _boatContainerList: ServantViewExileBoatContainer[] = [];

	private _svContainer: BaseDisplayObjectContainer = null;

	private _sceneTopBg: BaseLoadBitmap = null;

	private _flagPosId: number = 0;

	private _addBtn: BaseButton = null;

	private _seatCount:number = 0;
	private _fleetBuffBtn: BaseButton = null;
	private _fleetBuffBtn2: BaseButton = null;

	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}

	private retBuffBtnRed():void
	{
		if (this._fleetBuffBtn)
		{
			if (Api.servantExileVoApi.getExileBuffRed())
			{
				App.CommonUtil.addIconToBDOC(this._fleetBuffBtn);
				let reddot = this._fleetBuffBtn.getChildByName("reddot");
				reddot.x = 65;
				reddot.y = 5;
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._fleetBuffBtn);
			}
		}
		
	}

	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, this.addSeatHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.servantBackHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreashView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.retBuffBtnRed, this);
		let topbg = BaseLoadBitmap.create("servantexileview_toptitlebg");
		topbg.width = 640;
		topbg.height = 70;
		topbg.y = 3+5;
		this.addChild(topbg);

		this._txtBg = BaseBitmap.create("public_9_bg59");
		this._txtBg.width = 157;
		this._txtBg.setPosition(topbg.x + 15, topbg.y + topbg.height / 2 - this._txtBg.height / 2);
		this.addChild(this._txtBg);

		this._txtTF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2ServantExileNum_exile"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._txtBg.width = this._txtTF.width + 20;
		this._txtTF.setPosition(this._txtBg.x + this._txtBg.width / 2 - this._txtTF.width / 2, this._txtBg.y + this._txtBg.height / 2 - this._txtTF.height / 2);
		this.addChild(this._txtTF);

		this._addBtn = ComponentManager.getButton("btn_common_add", null, this.addSeatClick, this)
		this._addBtn.setPosition(this._txtBg.x + this._txtBg.width + 3, this._txtBg.y + this._txtBg.height / 2 - this._addBtn.height / 2);
		this.addChild(this._addBtn);

		let tip1TF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2Tip1_exile", [String(Config.ExileCfg.servantNeed)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		tip1TF.setPosition(GameConfig.stageWidth - tip1TF.width - 30, topbg.y + 13);
		this.addChild(tip1TF);

		this._tip2TF = ComponentManager.getTextField(LanguageManager.getlocal("servantViewTab2Tip2_exile"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this._tip2TF.setPosition(GameConfig.stageWidth - this._tip2TF.width - 30, tip1TF.y + tip1TF.height + 5);
		this.addChild(this._tip2TF);

		this._svContainer = new BaseDisplayObjectContainer();
		this._svContainer.x = GameConfig.stageWidth / 2;
		this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
		this._sceneTopBg.width = 640;
		this._sceneTopBg.height = 191;
		this._svContainer.addChild(this._sceneTopBg);

		

		let num = Config.ExileCfg.exileSeatItemCfgList.length;
		num += Api.servantExileVoApi.getTotalSeatNumber();
		let l =  num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
		for (let i = 0; i < l; i++) {
			let sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
			sceneBg.width = 640;
			sceneBg.height = 199;
			sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
			this._svContainer.addChild(sceneBg);
		}

		let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
		let scrollView = ComponentManager.getScrollView(this._svContainer, rect);
		scrollView.x = -GameConfig.stageWidth / 2
		scrollView.y = 70;
		scrollView.bounces = false;
		this.addChild(scrollView);
		scrollView.name = `scrollView`;

		this.playAni();
		this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
		this.refreashView();

		if (Api.switchVoApi.checkOpenExileBuff())
		{
			let fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, ()=>{
				
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
			}, this);
			fleetBuffBtn.setPosition(15,64);
			this.addChild(fleetBuffBtn);
			this._fleetBuffBtn2 = fleetBuffBtn;
			

			let chooseServantBtn = ComponentManager.getButton("exile_servant_buff", null, ()=>{
				
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEBUFFSERVANTVIEW);
			}, this);
			chooseServantBtn.setPosition(fleetBuffBtn.x+fleetBuffBtn.width+15,fleetBuffBtn.y);
			this.addChild(chooseServantBtn);
			this._fleetBuffBtn = chooseServantBtn;
			this.retBuffBtnRed();
		}

		this.request(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, {});
	}
	private initBoat(boatNum: number) {
		this._seatCount = boatNum;
		for (let i = 0; i < boatNum; i++) {
			this.addBoatPos(i);
		}
	}
	private addSeatClick() {
		if (Api.servantExileVoApi.getSeatNumber() < Config.ExileCfg.exileSeatItemCfgList.length) {
			// this.request(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, {});
			// this.addBoatPos(this._boatContainerList.length);
			let needNum = Config.ExileCfg.exileSeatItemCfgList[Api.servantExileVoApi.getSeatNumber()].unlockGem;
			let message = LanguageManager.getlocal("servantViewTab2buySeat_exile", [String(needNum)]);
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
				confirmCallback: this.buySeatClick,
				handler: this,
				icon: "itemicon1",
				iconBg: "itembg_1",
				num: Api.playerVoApi.getPlayerGem(),
				useNum: needNum,
				msg: message,
				id: 1,
			});
		}
		else {
			App.CommonUtil.showTip(LanguageManager.getlocal("servantViewShowTip2_exile"));
		}

	}
	private buySeatClick() {
		this.request(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, {});
	}
	private addBoatPos(index: number) {
		this._flagPosId++;
		let boat = new ServantViewExileBoatContainer();
		if (index % 2 == 0) {
			boat.init(this._flagPosId, false);
			boat.setPosition(0, this._sceneTopBg.y + 108 + (Math.floor(index / 2) * 199))
		}
		else {
			boat.init(this._flagPosId, true);
			boat.setPosition(GameConfig.stageWidth - boat.width+2, this._sceneTopBg.y + 108 + (Math.floor(index / 2) * 199))
		}
		this._svContainer.addChild(boat);
		this._boatContainerList.push(boat);
	}
	private refreashView() {
		this._txtTF.text = LanguageManager.getlocal("servantViewTab2ServantExileNum_exile", [String(Api.servantExileVoApi.getUseSeatNumber()), String(Api.servantExileVoApi.getTotalSeatNumber())]);
		this._txtBg.width = this._txtTF.width + 20;
		this._txtTF.setPosition(this._txtBg.x + this._txtBg.width / 2 - this._txtTF.width / 2, this._txtBg.y + this._txtBg.height / 2 - this._txtTF.height / 2);
		this._addBtn.setPosition(this._txtBg.x + this._txtBg.width + 3, this._txtBg.y + this._txtBg.height / 2 - this._addBtn.height / 2);

		this._tip2TF.text = LanguageManager.getlocal("servantViewTab2Tip2_exile", [String(Api.servantExileVoApi.getRemainSeatNumber())]);
		this._tip2TF.x = GameConfig.stageWidth - this._tip2TF.width - 30;

		if (Api.servantExileVoApi.getSeatNumber() >= Config.ExileCfg.exileSeatItemCfgList.length) {
			this._addBtn.setVisible(false);
		}
		else {
			this._addBtn.setVisible(true);
		}

		this.retBuffBtnRed();
	}
	private addSeatHandle(event: any) {
		if (event.data.ret) {
			if(this._svContainer){
				this._svContainer.dispose();
				this._svContainer = null;
			}

			this._svContainer = new BaseDisplayObjectContainer();
			this._svContainer.x = GameConfig.stageWidth / 2;
			this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
			this._sceneTopBg.width = 640;
			this._sceneTopBg.height = 191;
			this._svContainer.addChild(this._sceneTopBg);

			this._boatContainerList = [];
	
			let num = Config.ExileCfg.exileSeatItemCfgList.length;
			num += Api.servantExileVoApi.getTotalSeatNumber();
			let l =  num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
			for (let i = 0; i < l; i++) {
				let sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
				sceneBg.width = 640;
				sceneBg.height = 199;
				sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
				this._svContainer.addChild(sceneBg);
			}
	
			let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
			let tmp = <BaseDisplayObjectContainer>this.getChildByName(`scrollView`);
			if(tmp){
				tmp.dispose();
				tmp = null;
			}
			let scrollView = ComponentManager.getScrollView(this._svContainer, rect);
			scrollView.x = -GameConfig.stageWidth / 2
			scrollView.y = 70;
			scrollView.bounces = false;
			scrollView.name = `scrollView`;
			this.addChild(scrollView);
	
			// if (Api.switchVoApi.checkOpenExileBuff())
			// {
			// 	let fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, ()=>{
					
			// 		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
			// 	}, this);
			// 	fleetBuffBtn.setPosition(15,10);
			// 	this._svContainer.addChild(fleetBuffBtn);
			// }


			this._flagPosId = 0;
			this.playAni();
			this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
			this.refreashView();
			// this.addBoatPos((Api.servantExileVoApi.getSeatNumber() - 1));
			// this.refreashView();
			App.CommonUtil.showTip(LanguageManager.getlocal("servantViewShowTip3_exile"));


			if (this._fleetBuffBtn)
			{
				this.removeChild(this._fleetBuffBtn);
				this.addChild(this._fleetBuffBtn);
				this.removeChild(this._fleetBuffBtn2);
				this.addChild(this._fleetBuffBtn2);
			}

			this.retBuffBtnRed();
		}
	}

	private resetSeatHandle() {
		if (1) {
			if(this._svContainer){
				this._svContainer.dispose();
				this._svContainer = null;
			}

			this._svContainer = new BaseDisplayObjectContainer();
			this._svContainer.x = GameConfig.stageWidth / 2;
			this._sceneTopBg = BaseLoadBitmap.create("servantexileview_scenetopbg");
			this._sceneTopBg.width = 640;
			this._sceneTopBg.height = 191;
			this._svContainer.addChild(this._sceneTopBg);

			this._boatContainerList = [];
	
			let num = Config.ExileCfg.exileSeatItemCfgList.length;
			num += Api.servantExileVoApi.getTotalSeatNumber();
			let l =  num % 2 == 0 ? num / 2 : Math.floor(num / 2) + 1;
			for (let i = 0; i < l; i++) {
				let sceneBg = BaseLoadBitmap.create("servantexileview_scenebg");
				sceneBg.width = 640;
				sceneBg.height = 199;
				sceneBg.setPosition(this._sceneTopBg.x, this._sceneTopBg.y + this._sceneTopBg.height + (i * sceneBg.height));
				this._svContainer.addChild(sceneBg);
			}
	
			let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth * 2, GameConfig.stageHeigth - this.getViewTitleButtomY() - 60);
			let tmp = <BaseDisplayObjectContainer>this.getChildByName(`scrollView`);
			if(tmp){
				tmp.dispose();
				tmp = null;
			}
			let scrollView = ComponentManager.getScrollView(this._svContainer, rect);
			scrollView.x = -GameConfig.stageWidth / 2
			scrollView.y = 70;
			scrollView.bounces = false;
			scrollView.name = `scrollView`;
			this.addChild(scrollView);
	
			// if (Api.switchVoApi.checkOpenExileBuff())
			// {
			// 	let fleetBuffBtn = ComponentManager.getButton("exile_fleet_buff", null, ()=>{
					
			// 		ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILEFLEETBUFFVIEW);
			// 	}, this);
			// 	fleetBuffBtn.setPosition(15,10);
			// 	this._svContainer.addChild(fleetBuffBtn);
			// }

			this._flagPosId = 0;
			this.initBoat(Api.servantExileVoApi.getTotalSeatNumber());
			this.refreashView();
			if (this._fleetBuffBtn)
			{
				this.removeChild(this._fleetBuffBtn);
				this.addChild(this._fleetBuffBtn);
				this.removeChild(this._fleetBuffBtn2);
				this.addChild(this._fleetBuffBtn2);
			}
		}
	}

	/**门客召回的回调 */
	private servantBackHandle(event: egret.Event) {
		if (event.data.ret) {
			for (let key in this._boatContainerList) {
				this._boatContainerList[key].playServantExileBackAni(event.data.data.data.servantId);
			}
			this.refreashView();

			if (event.data.data.data.servantId) {
				let servantInfo = Api.servantVoApi.getServantObj(event.data.data.data.servantId);
				let message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage", [servantInfo.servantName]);
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW, { message: message });
			}
		}
		this.retBuffBtnRed();
	}
	/**门客出海的modle */
	private getmodleHandle(event: egret.Event) {
		if (event.data.ret) {
			let servantIds = event.data.data.data.servantIds;
			if (servantIds && Object.keys(servantIds).length > 0) {
				let servantNames: string = "";
				for (let key in servantIds) {
					let servantName = Api.servantVoApi.getServantObj(servantIds[key]).servantName;
					servantNames += "," + servantName;
					// for (let key in this._boatContainerList) {
					// 	this._boatContainerList[key].playServantExileBackAni(servantIds[key]);
					// }
				}
				// let servantInfo = Api.servantVoApi.getServantObj(event.data.data.data.servantId);
				let message:string = null;
				if (Object.keys(servantIds).length > 1) {
					message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage2", [servantNames.substr(1), String(Object.keys(servantIds).length)]);

				}
				else {
					message = LanguageManager.getlocal("servantExileServantBackPopupViewMessage", [servantNames.substr(1)]);
				}
				 
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTEXILESERVANTBACKPOPUPVIEW, { message: message });
			}
			if (this._seatCount != Api.servantExileVoApi.getTotalSeatNumber())
			{
				this.resetSeatHandle();
			}
			this.refreashView();
		}
		this.retBuffBtnRed();
	}
	/**动画播放 */
	private playAni() {
		let num = Config.ExileCfg.exileSeatItemCfgList.length;
		num += Api.servantExileVoApi.getTotalSeatNumber();
		let l = num % 2 == 0 ? num / 2 : Math.floor(num/ 2) + 1;

		let walkTime = 20000;
		// let waitTime = 20000;

		let movieClip = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_walk", 8, 100);
		let movieClipBM = BaseBitmap.create("servantexileview_frameanimation_walk1");
		// movieClip.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
		this._svContainer.addChild(movieClip);
		movieClip.playWithTime(-1);

		egret.Tween.get(movieClip, { loop: true }).to({
			x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
			y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		}, 0).to({
			y: this._sceneTopBg.y
		}, walkTime * (l + 1)).to({
			x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width - movieClipBM.width / 2,
			y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		}, 0).to({
			y: this._sceneTopBg.y
		}, walkTime * (l + 1));

		// let movieClip2 = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_walk", 8, 150);
		// // movieClip2.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
		// this._svContainer.addChild(movieClip2);
		// movieClip2.playWithTime(-1);
		// movieClip2.setVisible(false);

		let movieClipBack = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_back", 8, 100);
		this._svContainer.addChild(movieClipBack);
		movieClipBack.playWithTime(-1);

		egret.Tween.get(movieClipBack, { loop: true }).to({
			x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width - movieClipBM.width / 2,
			y: this._sceneTopBg.y,
		}, 0).to({
			y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		}, walkTime * (l + 1)).to({
			x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
			y: this._sceneTopBg.y,
		}, 0).to({
			y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height
		}, walkTime * (l + 1));

		// let movieClipBack2 = ComponentManager.getCustomMovieClip("servantexileview_frameanimation_back", 8, 150);
		// // movieClip2.setPosition(this._sceneTopBg.x + this._sceneTopBg.width / 2, this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height);
		// this._svContainer.addChild(movieClipBack2);
		// movieClipBack2.playWithTime(-1);
		// movieClipBack2.setVisible(false);

		// egret.Tween.get(this._sceneTopBg).wait(waitTime).call(() => {
		// 	movieClip2.setVisible(true);
		// 	movieClipBack2.setVisible(true);
		// 	egret.Tween.removeTweens(this._sceneTopBg);

		// 	egret.Tween.get(movieClip2, { loop: true }).to({
		// 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
		// 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		// 	}, 0).to({
		// 		y: this._sceneTopBg.y
		// 	}, walkTime * (l + 1)).to({
		// 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width,
		// 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		// 	}, 0).to({
		// 		y: this._sceneTopBg.y
		// 	}, walkTime * (l + 1));


		// 	egret.Tween.get(movieClipBack2, { loop: true }).to({
		// 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2 - movieClipBM.width,
		// 		y: this._sceneTopBg.y,
		// 	}, 0).to({
		// 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		// 	}, walkTime * (l + 1)).to({
		// 		x: this._sceneTopBg.x + this._sceneTopBg.width / 2,
		// 		y: this._sceneTopBg.y,
		// 	}, 0).to({
		// 		y: this._sceneTopBg.y + this._sceneTopBg.height + (l * 199) - movieClipBM.height,
		// 	}, walkTime * (l + 1));
		// }, this)
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BUYBANISHPOS, this.addSeatHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FINISH, this.servantBackHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISH, this.refreashView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_GETSERVANTBANISHMODEL, this.getmodleHandle, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_BANISHBUFF, this.retBuffBtnRed, this);

		egret.Tween.removeTweens(this._sceneTopBg);
		this._txtBg = null;
		this._txtTF = null;
		this._tip2TF = null;
		this._boatContainerList.length = 0;
		this._svContainer = null;
		this._sceneTopBg = null;
		this._flagPosId = 0;
		this._addBtn = null;
		this._seatCount = 0;
		this._fleetBuffBtn = null;
		this._fleetBuffBtn2 = null;

		super.dispose();
	}
}