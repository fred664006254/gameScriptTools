/**
 * 宝箱详细信息弹窗
 * author qianjun
 * 
 */
class BoxRewardDetailPopupView extends PopupView{
	
	private _bg1:BaseBitmap = null;
	private _conBtn:BaseButton = null;

	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		let param = view.param.data;
		let boxid = param.boxId;
		//是否是购买模式
		let isbuy = param.isbuy;

		let boxCfg = Config.BoxCfg.getBoxCfgById(boxid);

		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
		bg.width = 500;
		bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width/2 - 2;
		// bg.y = 130;
		view.addChildToContainer(bg);

		//中部奖励
		let rewardGroup = new BaseDisplayObjectContainer();
		rewardGroup.width = bg.width;
		view.addChildToContainer(rewardGroup);

		//筛子卡片物品
		let cardgroup = new BaseDisplayObjectContainer();
		rewardGroup.addChild(cardgroup);
		let count = 1;
		for(let i = 1; i < 5; ++ i){
			let cardnum = boxCfg.getCardNumByType(i);
			if(cardnum){
				let group = new BaseDisplayObjectContainer();
				cardgroup.addChild(group);
				group.name = `card${i}`;
	
				let cardlevel = BaseBitmap.create(`dicecardlevel${i}`);
				group.addChild(cardlevel);
				if(i > 1){
					if(App.CommonUtil.check_dragon() && i === 4){
						let db = App.DragonBonesUtil.getLoadDragonBones("carShow_effect", 0);
						group.addChild(db);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, db, cardlevel, [0,0]);
					} else {
						let stresslight = BaseBitmap.create(`dicestreelight${i}`);
						group.addChild(stresslight);
						stresslight.alpha = 0;
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, stresslight, cardlevel, [-2,0]);
						let dtnum = 30;
						let ft = BattleStatus.timeparam;
						egret.Tween.get(stresslight,{loop:true})
							.to({alpha:1}, dtnum*ft).to({alpha:0}, dtnum*2*ft);
					}
				}

				let random = boxCfg.getCardRatioShow(i);
				let numstr = cardnum.toString();
				if(random){
					numstr = `0~${cardnum}`
				} else {
					numstr = `x${numstr}`
				}
				
				let cardNameTxt = ComponentMgr.getTextField(LangMger.getlocal(`boxcardnum`, [LangMger.getlocal(`boxcardtype${i}`), numstr]), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
				cardNameTxt.textFlow = [
					{text:LangMger.getlocal(`boxcardtype${i}`), style:{"textColor": GameConfig.getQualityColor(i), "strokeColor":0, "stroke": 1},},
					{text:"\n"},
					{text:numstr}
				]
				// cardNameTxt.textColor =GameConfig.getQualityColor(i);
				// cardNameTxt.strokeColor = 0
				// cardNameTxt.stroke = 1;
				cardNameTxt.lineSpacing = 3;
				group.addChild(cardNameTxt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cardNameTxt, cardlevel, [cardlevel.width+3, 0]);

				if(boxCfg.getCardPoolShow(i)){//
					let extBtn = ComponentMgr.getButton(`dicecardext`, ``, ()=>{
						//扩展弹窗
						App.CommonUtil.showBoxExtendTip(boxid, i, extBtn.localToGlobal());
						// let view = this;
						// let exttip = new BoxExtendTip();
						// exttip.init(boxid, i, extBtn.localToGlobal());
						// view.addChild(exttip);
					}, view);
					group.addChild(extBtn);
					extBtn.setScale(0.9);
					App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, extBtn, cardNameTxt, [cardNameTxt.width, 0]);
				}

				group.x = count & 1 ? 0 : 170;
				group.y = (Math.ceil(count / 2) - 1) * (50 + 10);
				++ count;
			}
		}

		//金币、钻石
		let goldgroup = null;
		let tmpH = 0;
		let tmpX = 0;
		if(boxCfg.goldNum){
			goldgroup = new BaseDisplayObjectContainer();
			rewardGroup.addChild(goldgroup);
			let icon = BaseBitmap.create(`ab_mainui_gold`);
			goldgroup.addChild(icon);

			let numTxt = ComponentMgr.getTextField(boxCfg.goldNum.toString(), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
			goldgroup.addChild(numTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 6,0]);

			goldgroup.x = (rewardGroup.width - (cardgroup.width+goldgroup.width+35)) / 2;
			tmpX = goldgroup.x;
			tmpH += goldgroup.height;
		}

		let gemgroup = null;
		if(boxCfg.gemNum){
			gemgroup = new BaseDisplayObjectContainer();
			rewardGroup.addChild(gemgroup);
			let icon = BaseBitmap.create(`ab_mainui_gem`);
			gemgroup.addChild(icon);

			let numTxt = ComponentMgr.getTextField(boxCfg.gemNum.toString(), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
			gemgroup.addChild(numTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numTxt, icon, [icon.width + 6,0]);

			gemgroup.x = goldgroup ? goldgroup.x : ((rewardGroup.width - (cardgroup.width+gemgroup.width+35)) / 2);
			tmpX = gemgroup.x;
			tmpH += gemgroup.height;
		}
		rewardGroup.height = Math.max(52,cardgroup.height);

		if(tmpX){
			cardgroup.x = rewardGroup.width - cardgroup.width - tmpX;
		}
		else{
			cardgroup.x = (rewardGroup.width - cardgroup.width) / 2;
		}
		
		cardgroup.y = (rewardGroup.height - cardgroup.height)/2;

		if(goldgroup && gemgroup){
			goldgroup.y = (rewardGroup.height - tmpH - 10) / 2;
			gemgroup.y = goldgroup.y + goldgroup.height + 10;
		}
		else{
			if(goldgroup){
				goldgroup.y = (rewardGroup.height - tmpH) / 2;
			}
			if(gemgroup){
				gemgroup.y = (rewardGroup.height - tmpH) / 2;
			}
		}

		bg.height = rewardGroup.height + 70;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardGroup, bg);
		

		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,isbuy ? param.costNum : LangMger.getlocal(`confirmBtn`), view.clickConHandler,view);
		if(isbuy){
			conBtn.addTextIcon(param.costIcon);
		}
		
		conBtn.setColor(ColorEnums.white);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
		view.addChild(conBtn);
		this._conBtn = conBtn;
	}

	// 获取container初始y坐标 		
	// protected getContainerY():number{
	// 	return 30-this._titleBg.height;
	// }

	// 重新实现背景图
	protected initBg():void
	{
		// let bg1 = BaseBitmap.create(`boxrewarddetailpopupview1`);
		// this.addChild(bg1);
		// this._bg1 = bg1;

		let bg2 = BaseBitmap.create(`boxrewarddetailpopupviewbg`);
		this.addChild(bg2);
		this.viewBg = bg2;
		this.viewBg.touchEnabled = true;
	}

	// 不要标题
	protected initTitle(){

	}

	protected resetBgSize():void{
		super.resetBgSize();
		let view = this;
		this.container.y = view.viewBg.y + 198;

		let title = ComponentMgr.getTextField('11', TextFieldConst.SIZE_40, 0xC5D4F7);
		this.addChild(title);
		title.width = 571;
		title.textAlign = egret.HorizontalAlign.CENTER;
		title.x = this.viewBg.x;
		title.y = this.viewBg.y + 142;
		title.text = this.param.data.title;
		title.stroke = 1.5;
		title.strokeColor = 0x0C2C77;
		title.y = this.viewBg.y + 140;
		
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this.viewBg, [29,32]);

		let param = view.param.data;
		let boxid = param.boxId;
		let boxCfg = Config.BoxCfg.getBoxCfgById(boxid);
		let boxicon = BaseLoadBitmap.create(boxCfg.icon, null, {
			callbackThisObj : view,
			callback : ()=>{
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boxicon, view.viewBg, [0, -177]);
			},
		});

		if(App.CommonUtil.check_dragon()){
			let db1 = App.DragonBonesUtil.getLoadDragonBones(`boxShow_2_effect`, 0);
			view.addChild(db1);
			db1.setPosition(320, this.viewBg.y + 257);
			view.setChildIndex(db1, view.getChildIndex(view.viewBg));
		}

		view.addChild(boxicon);
		boxicon.touchEnabled = true;

		if(App.CommonUtil.check_dragon()){
			let db1 = App.DragonBonesUtil.getLoadDragonBones(`boxShow_1_effect`, 0);
			view.addChild(db1);
			db1.setPosition(320, this.viewBg.y + 257);
		}
		// let timeparam = BattleStatus.timeparam;
		// let fg = BaseLoadBitmap.create(`itembox${boxid}g`, null, {
		// 	callback:()=>{
		// 		if(fg){
		// 			fg.blendMode = egret.BlendMode.ADD;
		// 			fg.alpha = 0;
		// 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fg, view.viewBg, [-10, - boxicon.height / 2 -14]);
		// 			egret.Tween.get(fg, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
		// 		}
		// 	},
		// 	callbackThisObj: view
		// });
		// this.addChild(fg);

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._conBtn, this.viewBg, [0,20]);

		if(param.boxId == "1007"){
			// 支援宝箱要有取消按钮
			this._conBtn.setBtnBitMap(ButtonConst.BTN_CONFIRM);
			this._conBtn.setText(LangMger.getlocal("watchAd1"));
			
			let adIcon = BaseBitmap.create("watching_ad_icon2");
			this._conBtn.addChild(adIcon);
			adIcon.anchorOffsetX = adIcon.width / 2;
			adIcon.anchorOffsetY = adIcon.height / 2;
			// adIcon.rotation = -25; 
			adIcon.y = 10;
			adIcon.x = 5;

			// // 取消按钮
			// let cntBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal("canelStr"), this.closeHandler, this);
			// this.addChild(cntBtn);
			// cntBtn.y = this._conBtn.y;
			// App.DisplayUtil.setLayoutPosition(LayoutConst.left, cntBtn, this.viewBg, [30,0]);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.right, this._conBtn, this.viewBg, [30,0]);
		}
		if(param.boxId == "1006"){
			this._conBtn.setBtnBitMap(ButtonConst.BTN_CONFIRM);
			this._conBtn.setText(LangMger.getlocal("sysopen"));
		}
	}

	// protected isTouchMaskClose():boolean{
	// 	return false;
	// }

	protected clickConHandler(data:any):void{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

    // protected getTitleStr(){
    //     return this.param.data.title;
	// }
	
	protected getCloseBtnName():string{
		return this.param.data.needClose === 1 ? super.getCloseBtnName():null;
	}

	protected closeHandler(){

		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}
	
	public hide(){		
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
			`boxrewardpopupview`
		]);
	}

	protected getParent():egret.DisplayObjectContainer{
		if(this.param.data.inLayer){
			return this.param.data.inLayer;
		} 
		else{
			return super.getParent();
		}
	}

	public dispose():void{
		this._bg1 = null;
		this._conBtn = null;
		super.dispose();
	}
}