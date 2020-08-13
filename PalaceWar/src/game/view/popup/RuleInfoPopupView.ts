/**
 * 规则说明小弹板
 * author dmj
 * date 2017/9/28
 * @class RuleInfoPopupView
 */
class RuleInfoPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	private _scrollview : ScrollView = null;

	public initView():void
	{
		let msg:string = this.param.data;

		let contanier = new BaseDisplayObjectContainer();
		let tf:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// let param = (new egret.HtmlTextParser).parse(msg);
		// tf.textFlow = param;
		tf.y = 3;
		tf.width = 510;
		tf.lineSpacing = 5;
		contanier.addChild(tf);
		contanier.height = tf.height + 6;
		let offY:number=10;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,tf.width,200+offY+30);
		let scrollList = ComponentManager.getScrollView(contanier,rect);
		// scrollList.bindMoveCompleteCallback(this.refreshChatByScroll,this);
		this._scrollview = scrollList;
		scrollList.setPosition((GameConfig.stageWidth-scrollList.width)/2,75-20);
		this.addChildToContainer(scrollList);
		// this.viewBg.addTouchTap(this.hide,this);

		// let arrow = BaseBitmap.create("popupview_rulearrow");
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, scrollList, [0,scrollList.height + 10]);
		// this.addChildToContainer(arrow);
		// let startY = arrow.y;
		// egret.Tween.get(arrow,{loop : true}).to({y : startY - 10}, 800).to({y : startY}, 800);
		// arrow.visible = scrollList.checkShowArrow();
		// this._arrow = arrow;
	}

	// private refreshChatByScroll():void
	// {
	// 	let view = this;
	// 	view._arrow.visible = view._scrollview.checkShowArrow();
	// }

	protected isTouchMaskClose():boolean
	{
		return true;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["popupview_ruletitle","popupview_rulearrow"]);
	}

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
		return "popupview_ruletitle";
	}
	protected getTitleStr():string
	{
		return "";
	}
	

	public dispose():void
	{
		this._scrollview = null;
		super.dispose();
	}
}