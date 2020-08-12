/**
 * 每日签到确认面板 金币和钻石
 * author yangtao
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class SignShowPopView extends PopupView{
	
	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		let param = view.param.data;

		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
		bg.width = 110;
		bg.height = 110;
		bg.x = view.viewBg.x + 67;
		bg.y = 30;
		// view.addChildToContainer(bg);

		let itemGroup = GameData.getItemIcon(param.param);//, rewardVo.num);
		itemGroup.setScale(1.5);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg, [-5, 0]);
		view.addChildToContainer(itemGroup);

		let iconTxt = ComponentMgr.getTextField(`11`, TextFieldConst.SIZE_28);
		iconTxt.text = "x"+param.param.num;
		view.addChildToContainer(iconTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconTxt, bg, [-5, 90]);

		let txtBg = BaseBitmap.create('bird_des_shop_bg');
		this.addChildToContainer(txtBg);
		txtBg.y = 0;
		txtBg.x = 203;

		let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
		this.addChildToContainer(txt);
		txt.stroke = 2;
		txt.strokeColor = 0x0C2C77;
		txt.width = 240;
		txt.wordWrap = true;
		txt.lineSpacing = 10;
		txt.text =LangMger.getlocal(param.param.type == 1?"sign_diamond_introduce":"sign_gold_introduce") ;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, txtBg, [38,35]);

		// let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,param.costnum,view.clickConHandler,view);
		// view.addChildToContainer(conBtn);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, bg, [0,15]);
		
	 }

	protected resetBgSize():void{
		super.resetBgSize();
		let view = this;
		let param = view.param.data;
		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,param.costnum,view.clickConHandler,view);
		// if(param.costIcon){
		// 	conBtn.addTextIcon(param.costIcon);
		// 	conBtn.setColor(ColorEnums.white);
		// }
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, view.viewBg, [0,0]);
		view.addChild(conBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, view.viewBg, [0,15]);
		
	}
	protected getBgExtraHeight():number
	{
		return 150;
	}

	protected isTouchMaskClose():boolean{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose == false)?false:true;
	}

	protected clickConHandler(data:any):void{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
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

	protected getParent():egret.DisplayObjectContainer{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}


	public dispose():void{
		super.dispose();
	}
}