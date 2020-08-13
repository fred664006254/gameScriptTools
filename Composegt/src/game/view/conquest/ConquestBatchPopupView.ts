/**
 * 一键征伐选择波数
 * author dky
 * date 2017/1/3
 * @class ConquestBatchPopupView
 */
class ConquestBatchPopupView  extends PopupView
{
	private _useCallback:Function;
	private _handler:any;
	private _useNum:number = 1;
	// private _selectedNumTF:BaseTextField;
	private _carNumTF:BaseTextField;
	private _costNumTF:BaseTextField;
	// private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	// private _numBg:BaseBitmap;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		this._useCallback = this.param.data.callback;
		this._handler = this.param.data.handler;

		let conVo = Api.conquestVoApi.getConquestVo();
		let maxNum = Api.conquestVoApi.getAttNum(conVo.info.cid);
		this._maxNum = maxNum;

		if(this._maxNum >200)
		{
			this._maxNum = 200;
		}
		// this._maxNum = 200;
		let iconBg3:BaseBitmap=BaseBitmap.create("public_hb_bg01");
		iconBg3.setPosition(60,20);
		this.addChildToContainer(iconBg3);
		
		let resImg3 = BaseBitmap.create("public_icon4");
		resImg3.setPosition(iconBg3.x-resImg3.width/2,iconBg3.y+iconBg3.height-resImg3.height+5);
		this.addChildToContainer(resImg3);

		let soldierNum = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
		let attText =ComponentManager.getTextField(soldierNum ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		attText.setPosition(80,iconBg3.y + iconBg3.height/2 - attText.height/2);
		this.addChildToContainer(attText);

		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 220;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 70;
		this.addChildToContainer(bg);


		let tip =ComponentManager.getTextField(LanguageManager.getlocal("conquestChooseAtt") ,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		tip.setPosition(70,bg.y + 15);
		this.addChildToContainer(tip);

		let bottomBg = BaseBitmap.create("public_tc_bg03");
		bottomBg.width = 500;
		bottomBg.height = 150;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = bg.y + 50;
		bottomBg.visible = false;
		this.addChildToContainer(bottomBg);

		let car1 = conVo.info.cid ;
		let car2 = conVo.info.cid + Api.conquestVoApi.getAttNum(conVo.info.cid) -1;
		let catNumStr = LanguageManager.getlocal("conquestChooseNum",[car1.toString(),car2.toString()]);
		// let catNumStr = LanguageManager.getlocal("conquestChooseNum",[conVo.info.cid,conVo.info.cid + Api.conquestVoApi.getAttNum(conVo.info.cid)]);
		this._carNumTF = ComponentManager.getTextField(catNumStr ,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._carNumTF.setPosition(70,bottomBg.y + 15);
		this.addChildToContainer(this._carNumTF);

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = 165;
		dragProgressBar.y = 170;
		this.addChildToContainer(dragProgressBar);


		let cost1 = App.StringUtil.changeIntToText(Api.conquestVoApi.getAttCostNum(conVo.info.cid,1));
		let cost2 =  App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
		let costNumStr = LanguageManager.getlocal("conquestCostNum",[cost1.toString(),cost2.toString()]);
		this._costNumTF =ComponentManager.getTextField(costNumStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._costNumTF.setPosition(this.viewBg.width/2 - this._costNumTF.width/2,dragProgressBar.y + dragProgressBar.height + 10);
		this.addChildToContainer(this._costNumTF);


		let useBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.useHandler,this);
		useBtn.x = bg.x + bg.width/2 - useBtn.width/2;
		useBtn.y = bg.y + bg.height + 15;
		// useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(useBtn);
	}

	private dragCallback(curNum:number):void
	{
		// if(){

		// }
		this._useNum = curNum;

		// egret.log("curNum"+curNum)
		let conVo = Api.conquestVoApi.getConquestVo();
		let car1 = conVo.info.cid -1 + curNum;
		let car2 = conVo.info.cid -1 + Api.conquestVoApi.getAttNum(conVo.info.cid);
		let catNumStr = LanguageManager.getlocal("conquestChooseNum",[car1.toString(),car2.toString()]);
		this._carNumTF.text = catNumStr;

		let cost1 = App.StringUtil.changeIntToText(Api.conquestVoApi.getAttCostNum(conVo.info.cid,curNum));
		let cost2 =  App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
		let costNumStr = LanguageManager.getlocal("conquestCostNum",[cost1.toString(),cost2.toString()]);
		this._costNumTF.text = costNumStr;
}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }
	public getTitleStr():string
	{
		return "conquestAll";
	}
	private useHandler(param:any):void
	{
		this._useCallback.apply(this._handler,[this._useNum - 1]);
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2"
		]);
	}

	public dispose():void
	{
		this._useCallback = null;
		this._useNum = 1;
		this._carNumTF = null;
		this._costNumTF = null;

		this._maxNum = 0;

		this._handler = null;
		super.dispose();
	}
}