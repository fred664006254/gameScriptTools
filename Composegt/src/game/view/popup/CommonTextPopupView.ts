/**
 * 通用文字展示面板
 * author hyd
 * date 2019/10/15
 * @class CommonTextPopupView
 * 参数 ：title  msg
 * 
 */
class CommonTextPopupView extends PopupView
{
	private _bgHeight:number = 0
	public constructor() 
	{
		super();
	}

	// 打开该面板时，需要传参数msg
	public initView():void
	{
		let textRectWidth = 500;
		let textRectHeight = 500;

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = textRectWidth + 30;
		bg.height = textRectHeight + 45;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);


		let topBg = BaseBitmap.create("public_tc_bg03");
		topBg.width = textRectWidth + 20;
		topBg.height = textRectHeight + 20;
		topBg.x = this.viewBg.x + this.viewBg.width/2 - topBg.width/2;
		topBg.y = bg.y + 13;
		this.addChildToContainer(topBg);

		let cor1 = BaseBitmap.create("public_tcdw_bg01");
		// cor1.skewX = 180;
		cor1.x = topBg.x;
		cor1.y = topBg.y ;
		this.addChildToContainer(cor1);

		let cor2 = BaseBitmap.create("public_tcdw_bg02");
		cor2.x = topBg.x + topBg.width-cor2.width;
		cor2.y = topBg.y;
		this.addChildToContainer(cor2);

		this._bgHeight = bg.height;

		let messageStr:string = this.param.data.msg;

		let contanier = new BaseDisplayObjectContainer();

		let msgTF:BaseTextField = ComponentManager.getTextField(messageStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgTF.width = textRectWidth;
		msgTF.setColor(TextFieldConst.COLOR_BROWN);
		msgTF.textAlign = TextFieldConst.ALIGH_LEFT;
		msgTF.y = 5;
		// msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		// msgTF.y = bg.y + bg.height/2 - msgTF.height/2;
		msgTF.lineSpacing = 8;

		contanier.addChild(msgTF);
		contanier.height = msgTF.height + 6;

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,msgTF.width,textRectHeight);
		//this.addChildToContainer(msgTF);

		let scrollList = ComponentManager.getScrollView(contanier,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition(topBg.x + 10 , topBg.y + 10);


	}

	// protected getConfirmBtnStr():string
	// {

	// 	return "confirmBtn";
	// }

	protected resetBgSize():void
	{
		// this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,this._bgHeight + 30);
		super.resetBgSize();
		
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

    protected getTitleStr(){
        
        return this.param.data.title;
    }

	public hide()
	{

		super.hide()
	}
	protected getParent():egret.DisplayObjectContainer
	{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}
	protected getTitleBgName():string{
		return '';
	}
	public dispose():void
	{
		super.dispose();
	}
}