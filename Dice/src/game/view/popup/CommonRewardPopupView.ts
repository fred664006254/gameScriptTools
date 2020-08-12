/**
 * 获得物品通用弹窗 一般是宝箱类
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class CommonRewardPopupView extends PopupView{
	private _conBtn: BaseButton;
	private _cancelBtn: BaseButton;
	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		view.name = `CommonRewardPopupView`;
		let param = view.param.data;

		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
		bg.width = 500;
		bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width/2;
		bg.y = 0;
		view.addChildToContainer(bg);

		let rewards = GameData.formatRewardItem(param.rewards);
		let len = Math.min(4,rewards.length);
		let itemGroup = new BaseDisplayObjectContainer();
		itemGroup.width = (len * 108 + (len - 1) * 10);
		view.addChildToContainer(itemGroup);
		let tmpX = (bg.width - len * 108 - (len - 1) * 10) / 2;
		for(let i = 0; i < rewards.length; ++ i){
			let rewardVo = rewards[i];
			let icon = GameData.getItemIcon(rewardVo,rewardVo.num, null, Api.DiceVoApi.notOld(rewardVo.id.toString()));
			itemGroup.addChild(icon);
			icon.setScale(108/icon.width);
			
			icon.x = i % 4 * (icon.width * icon.scaleX + 10);
			icon.y = Math.floor(i / 4) * (icon.height * icon.scaleY + 10);

			// let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
			// itemGroup.addChild(numTxt)
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, icon, [0,icon.height*icon.scaleY+10]);
		}

		bg.width = itemGroup.width + 40;
		bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width/2;

		bg.height = itemGroup.height+40;

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg);

		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,LangMger.getlocal(`confirmBtn`),view.clickConHandler,view);
		conBtn.setColor(ColorEnums.white);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, bg, [0,bg.height+20]);
		this.addChild(conBtn);
		conBtn.x = 245;
		this._conBtn = conBtn;
		// conBtn.y = 330;

		if(this.param.data.needCancel){
			let canelStr = "canelStr";
			if(this.param.data.canelTxt){
				canelStr = this.param.data.canelTxt;
			}
			let cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL,LangMger.getlocal(canelStr),view.clickCancelHandler,view);	
			cancelBtn.setColor(ColorEnums.white);
			this.addChild(cancelBtn);
			this._cancelBtn = cancelBtn;

			cancelBtn.x = 130;
			cancelBtn.y = conBtn.y;
			conBtn.x = 350;
			// "2_1_2500|100_107_100|100_103_51|100_203_40|100_308_17|100_401_1"
			// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelBtn, bg, [10,bg.height+40]);
			// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, conBtn, bg, [10,bg.height+40]);
		}

		//宝箱连续购买
		if(param.isBoxBuy){
			let specialBoxId = param.specialBoxId;
			let specialBoxCfg = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId));
			conBtn.setText(specialBoxCfg.costGem1.toString());
			conBtn.addTextIcon(`public_icon1`);

			let costGroup = new BaseDisplayObjectContainer();
			view.addChildToContainer(costGroup);

			let costicon = BaseBitmap.create(`ab_mainui_gem`);
			costGroup.addChild(costicon);
			// costicon.setScale(0.64);
	
			let costTxt = ComponentMgr.getTextField(`${specialBoxCfg.costGem}`, TextFieldConst.SIZE_CONTENT_COMMON);
			costGroup.addChild(costTxt);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX,2]);

			let shopline = BaseBitmap.create(`shopview_line`);
			shopline.width = costTxt.width + 20;
			costGroup.addChild(shopline);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, shopline, costTxt);

			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, conBtn, [0,-costGroup.height]);

		}
	}

	protected resetBgSize():void{
		super.resetBgSize();
		let th = this.container.height + 165 + this._titleBg.height;
		this.viewBg.height = (th > this.viewBg.height) ? th : this.viewBg.height;
		if(this._conBtn){
			if(Api.GameinfoVoApi.checlIsInGuideId(18)){
				this._conBtn.setText(LangMger.getlocal(`guideWarDesc22`));
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._conBtn, this.viewBg, [0,17]);
		}
		if(this._cancelBtn){
			App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._cancelBtn, this.viewBg, [0,17]);
		}
	}

	protected preInit():void{
		super.preInit();
		if(Api.GameinfoVoApi.checlIsInGuideId(18)){
			App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
		}
	}

	protected isTouchMaskClose():boolean{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

	protected clickCancelHandler(data:any):void{
		let param = this.param;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		this.hide();
	}

	// protected getShowHeight(){
	// 	return 500;
	// }

    protected getTitleStr(){
        return this.param.data.title;
	}
	
	protected getCloseBtnName():string{
		return super.getCloseBtnName();//this.param.data.needClose === 1 ? 
	}

	protected closeHandler(){
		if(Api.GameinfoVoApi.checlIsInGuideId(18)){
			return;
		}
		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}

	public hide(){		
		super.hide()
	}

	protected getParent():egret.DisplayObjectContainer{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `shopview_line`,
		]);
	}

	public dispose():void{
		super.dispose();
	}
}