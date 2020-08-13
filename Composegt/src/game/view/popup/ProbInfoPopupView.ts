/**
 * 概率说明小弹板
 * author jiangliuyang
 * date 2018/9/13
 * @class ProbInfoPopupView
 */
class ProbInfoPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	public initView():void
	{
		let msg:string = this.param.data;

		let contanier = new BaseDisplayObjectContainer();
		let tf:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		tf.y = 3;
		tf.width = 510;
		tf.lineSpacing = 5;
		contanier.addChild(tf);
		contanier.height = tf.height + 6;
		let offY:number=10;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,tf.width,200+offY+5);
		let scrollList = ComponentManager.getScrollView(contanier,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition((GameConfig.stageWidth-scrollList.width)/2,75-offY);
		// this.viewBg.addTouchTap(this.hide,this);
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}
	// protected getResourceList():string[]
	// {
	// 	return super.getResourceList().concat(["btn_dailyboss_guize"]);
	// }

	protected getBgName():string
	{
		return "public_rule_bg";
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getShowWidth():number
	{
		return 594;
	}

	protected getTitleBgName():string
	{
		return "probinfopopupview_title";
	}
	protected getTitleStr():string
	{
		return "";
	}

	public dispose():void
	{
		super.dispose();
	}
}