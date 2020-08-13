/**
 * 加入成功
 * author qianjun
 * date 2017/11/24
 * @class ConfirmPopupView
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class AcThreeKingdomsSelectSuccessView extends PopupView
{
	public constructor() 
	{
		super();
    }
    
    protected getBgName():string{
		return App.CommonUtil.getResByCode(`threekingdomselectsuccessbg`,`1`);
	}

	protected getCloseBtnName():string{
		return App.CommonUtil.getResByCode(`threekingdomsclose`,`1`);
	}

	protected getTitleBgName():string{
		return null;
	}

	private _callback = null;
	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let view = this;
		let title = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomselectsuccess${view.param.data.team}`, `1`));
		view.addChildToContainer(title);
		title.x = this.viewBg.x + this.viewBg.width/2 - title.width/2;
		title.y = -40;
		
		let msgTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip21`, `1`), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${view.param.data.team}`, `1`))]) ,18, TextFieldConst.COLOR_BROWN);
		msgTF.width = 350;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.lineSpacing = 5;
		msgTF.y = 170;
        this.addChildToContainer(msgTF);
	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }
	protected resetBgSize():void
	{
		super.resetBgSize();
		let pen = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdompen`, `1`));
		this.addChild(pen);
		pen.setPosition(this.viewBg.x + this.viewBg.width - 90, this.viewBg.y + 160);

		let conBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,this.param.data.confirmTxt?this.param.data.confirmTxt:"confirmBtn",this.clickConHandler,this);
		conBtn.setColor(TextFieldConst.COLOR_BROWN);
		conBtn.x = this.viewBg.x + this.viewBg.width - conBtn.width - 80;
		conBtn.y = this.viewBg.y + this.viewBg.height + 40;
		this.addChild(conBtn);

		let cancelBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode(`acThreeKingdomsTip20`, `1`), this.clickCancelHandler,this);
		cancelBtn.setColor(TextFieldConst.COLOR_BROWN);
		cancelBtn.x = this.viewBg.x + 80;
		cancelBtn.y = this.viewBg.y + this.viewBg.height + 40;
		this.addChild(cancelBtn);

		let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomselectsuccessflag`, `1`));
		this.addChild(flag);
		flag.alpha = 0;
		flag.anchorOffsetX = flag.width / 2;
		flag.anchorOffsetY = flag.height / 2;
		flag.setPosition(this.viewBg.x + this.viewBg.width - flag.width/2, this.viewBg.y + 45 + flag.height/2);
		flag.setScale(1.5);
		egret.Tween.get(flag).wait(600).to({alpha : 1, scaleX:1,scaleY:1},300).call(()=>{
			egret.Tween.removeTweens(flag);
		}, this);
	}

	protected isTouchMaskClose():boolean
	{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void
	{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
        }
        this.hide();
	}

	protected clickCancelHandler(data:any):void
	{
		let param = this.param;
		//关闭到预热
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_RULEOUT);
		this.hide();
	}

    protected getTitleStr(){
        
        return null;
    }

	protected closeHandler()
	{

		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}
	public hide()
	{		
		super.hide()
	}

	public dispose():void
	{
		super.dispose();
	}
}