/**
 * 购买资源通用确认面板 金币和钻石
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class BuyResConfirmPopupView extends PopupView{
	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		let param = view.param.data;

		let bg:BaseBitmap = null;
		if(param.id && param.id != ""){
			bg = BaseBitmap.create("popupview_content1");
			bg.width = 160;
			bg.height = 160;
			bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width*bg.scaleX/2;
			bg.y = 20;
			view.addChildToContainer(bg);

			let rewardVo = GameData.formatRewardItem(param.id)[0];
			let itemGroup = GameData.getItemIcon(rewardVo, rewardVo.num);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg);
			view.addChildToContainer(itemGroup);
			let iconbg = itemGroup.getChildByName(`iconBg`);
			iconbg.visible = false;
		}


		// let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
		// view.addChildToContainer(numTxt)
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, itemGroup, [0,itemGroup.height]);

		let messageStr:string = view.param.data.msg;
		let msgTF:BaseTextField = ComponentMgr.getTextField(messageStr,TextFieldConst.SIZE_CONTENT_COMMON);
		msgTF.setColor(view.param.data.txtcolor ? view.param.data.txtcolor : ColorEnums.black);
		view.addChildToContainer(msgTF);
		if(bg){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, msgTF, bg, [0,bg.height + 20]);
		} else {
			msgTF.textAlign = egret.HorizontalAlign.CENTER;
			msgTF.width = this.getShowWidth() - 20;
			msgTF.x = 10;
			msgTF.y = 50;
		}

		// let line = BaseBitmap.create(`public_line1`);
		// line.width = 506;
		// view.addChildToContainer(line);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, msgTF, [0,msgTF.height+20]);
		
		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,param.costnum,view.clickConHandler,view);
		conBtn.addTextIcon(param.costIcon);
		conBtn.setColor(ColorEnums.white);
		this.addChildToContainer(conBtn);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, line, [0,line.height+25]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, conBtn, view.viewBg, [0,0]);
		if(bg){
			conBtn.y = 330;
		} else {
			let temY = Math.max(140, msgTF.y + msgTF.height + 30);
			conBtn.y = temY;
		}
		if(view.param.data.needCancel){
			let canelStr = "canelStr";
			if(this.param.data.canelTxt){
				canelStr = this.param.data.canelTxt;
			}
			let cancelBtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL,LangMger.getlocal(canelStr),this.clickCancelHandler,this);	
			cancelBtn.setColor(ColorEnums.white);
			cancelBtn.x = 80;
			// cancelBtn.y = line.y + line.height + 25;
			this.addChildToContainer(cancelBtn);
			conBtn.x = 330;
		}
	}

	protected resetBgSize():void{
		super.resetBgSize();
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