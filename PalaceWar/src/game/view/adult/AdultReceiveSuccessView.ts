/**
 * 拜访接受成功
 * author qianjun
 * date 2017/11/1
 * @class AdultMarrySuccessView
 */

class AdultReceiveSuccessView extends BaseView
{

	private _visitGroup : BaseDisplayObjectContainer = null;
	private _visitTxt : BaseTextField = null;
	private _descBg : BaseBitmap = null;
	// id 孩子ID
	private _childId:string = null;
	private _confirmCallback:Function;
	

	public constructor() {
		super();
	}

	// protected getResourceList():string[]
	// {
	// 	let rewardPic:string[] = super.getResourceList();

	// 	return rewardPic.concat(["adultreceivebg","adultvisitbg"
	// 	]);
	// }


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected initView():void
	{

		let view = this;
		view.alpha = 1;
		this._confirmCallback = this.param.data.confirmCallback;
		//this.addTouchTap(this.touchTap,this,null);

		let type = this.param.data.type;
		//拜访成功
		view._visitGroup = new BaseDisplayObjectContainer();
		view.setLayoutPosition(LayoutConst.lefttop, view._visitGroup, view);
		view.addChild(view._visitGroup);
		let group = view._visitGroup;
		group.width = GameConfig.stageWidth;
		group.height = GameConfig.stageHeigth;
		// group.alpha = 0;
		
		let visitbg = BaseBitmap.create( type == 'receiveSuccess' ? 'adultreceivebg' : 'adultvisitbg');
		group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, visitbg, group, [0,0], true);
		group.addChild(visitbg);

		let str = '';
		if(type == 'receiveSuccess'){
			str = LanguageManager.getlocal('adultreceivetxt', [this.param.data.wifename, this.param.data.childname,this.param.data.attr]);
		}
		else{
			str = LanguageManager.getlocal('adultvisittxt', [this.param.data.name]);
		}
		let visitTxt = ComponentManager.getTextField(str, 20);
		visitTxt.lineSpacing = 5;
		group.setLayoutPosition(LayoutConst.horizontalCenterbottom, visitTxt, visitbg, [0,120]);
		group.addChild(visitTxt);
		view._visitTxt = visitTxt;

		let descbg = BaseBitmap.create('public_searchdescbg');
		descbg.height = visitTxt.textHeight + 20;
		group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, visitTxt);
		group.addChild(descbg);
		group.swapChildren(visitTxt, descbg);
		view._descBg = descbg;

		egret.Tween.get(view).wait(2000).to({alpha : 0}, 3000).call(()=>{
			view.hide();
		},view);
	}

    private noBtnClick():void
	{
		this.hide();
		// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
	}

	private touchTap():void
	{
		this.hide();
	}

	public hide()
	{
		super.hide();
		if(this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
		}
		
	}
	public dispose():void
	{
		this._childId = null;
		egret.Tween.removeTweens(this);
		this._visitGroup.dispose();
		this._visitGroup = null;
		this._visitTxt = null;
		this._descBg = null;
		super.dispose();
	}

}