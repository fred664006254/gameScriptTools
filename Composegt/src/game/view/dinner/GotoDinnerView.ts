/**
 *  前往宴会途中
 * date 2017/11/6
 * @class GotoDinnerView
 */

class GotoDinnerView extends CommonView
{	
	private _netInfo:any = null;
	private _isWaiting:boolean = false;

	private _isDinnerEnd:boolean = false;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return ["goto_dinner_bg","dinner_jz_01"];
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{	
		ViewController.getInstance().hideView(ViewConst.COMMON.DINNERDETAILVIEW);

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL),this.requiestCallback,this);

		let gotoBg:BaseBitmap = BaseBitmap.create("goto_dinner_bg");
		this.addChildToContainer(gotoBg);

		let nameBg:BaseBitmap = BaseBitmap.create("dinner_jz_01");
		// nameBg.width = 422;
		// nameBg.height = 85;
		nameBg.x = this.viewBg.width/2 - nameBg.width/2;
		nameBg.y = this.viewBg.height/2 - nameBg.height/2;
		this.addChildToContainer(nameBg);

		let info:any = this.param.data.info;
	



		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("gotoDinner",[info.name]),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameText.setPosition(nameBg.x + nameBg.width/2 - nameText.width/2, nameBg.y + nameBg.height/2 - nameText.height/2);
		this.addChildToContainer(nameText);

		this._isWaiting = true;

		NetManager.request(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL,{"getuid":Number(info.uid)});

		this.container.alpha = 0;
		egret.Tween.get(this.container).to({alpha:1},300).wait(500).call(this.showView,this);
	}

	private showView():void
	{
		this._isWaiting = false;

		if (this._isDinnerEnd == true) {
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_is_over"));
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DINNER);
			this.hide();
		}
		else if (this._netInfo) {
			egret.Tween.get(this.container).to({alpha:1},300).call(this.realShowView,this);
		}
	}

	private realShowView():void
	{	
		let info:any = this.param.data.info;
		ViewController.getInstance().openView(ViewConst.COMMON.DINNERDETAILVIEW, {"info":this._netInfo,"uid":info.uid,"zid":this.param.data.info.zid});
		this.hide();
	}

	private requiestCallback(p:any):void
	{
		let checkChatTime:any = this.param.data.info.checkChatTime;

		if (p.data.ret == true && (p.data.data.data.dinnerdetail.dtype >0) &&((!checkChatTime) ||  p.data.data.data.dinnerdetail.end_time - Config.DinnerCfg.getFeastItemCfg(p.data.data.data.dinnerdetail.dtype).lastTime <= checkChatTime)) {
			this._netInfo = p.data.data.data;
			if (this._isWaiting == false) {
				this.showView();
			} 
		}
		else {
			this._isDinnerEnd = true;
			if (this._isWaiting == false) {
				this.showView();
			} 
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DINNER_GETDINNERDETAIL),this.requiestCallback,this);
		this._netInfo = null;
		this._isWaiting = false;
		this._isDinnerEnd = false;

		super.dispose();
	}
}