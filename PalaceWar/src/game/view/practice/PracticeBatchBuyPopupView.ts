/**
 * 阅历购买弹板
 * author yanyuling
 * date 2018/04/20
 * @class PracticeBatchBuyPopupView
 */
class PracticeBatchBuyPopupView extends PopupView
{ 
	private _cancelBtn:BaseButton;
	private _maxNum:number = 0;
	private _useNum:number = 0;
	private _numBg:BaseBitmap;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _numTF:BaseTextField;
	private _costTxt:BaseTextField;
	private _dragProgressBar:DragProgressBar;
	private _costNum:number = 0;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let iconPic:string = "practice_icon";
		let iconBg:string = "itembg_1";
		this._maxNum = 100;
		this._useNum = 0;
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 240;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let temX = this.viewBg.x + this.viewBg.width/2;
		let temY = 24;

		let itembg:BaseBitmap = BaseBitmap.create(iconBg);
		itembg.x = temX - itembg.width/2;
		itembg.y = temY;
		this.addChildToContainer(itembg);
		itembg.touchEnabled = true;
		itembg.addTouchTap(()=>{
			let rdata={
				dType:"json",
				iconBg:"itembg_1",
				name:LanguageManager.getlocal("practice_name"),
				icon:"practice_icon",
				desc:LanguageManager.getlocal( "itemDesc_6"),
				dropDesc:LanguageManager.getlocal( "itemDropDesc_6"),
			};
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,rdata);
		},this)

		let iconItem = BaseBitmap.create(iconPic);
		iconItem.x =  itembg.x + itembg.width/2 - iconItem.width/2;
		iconItem.y =  itembg.y + itembg.height/2 - iconItem.height/2;
		this.addChildToContainer(iconItem);

		//中间改为消耗数量
		let numTF:BaseTextField = ComponentManager.getTextField("",18);
		this._numTF = numTF;
		this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2",["1"]);
		numTF.anchorOffsetX = numTF.width;
		numTF.x = itembg.x + itembg.width -5;
		numTF.y = temY + 98 - numTF.height;
		this.addChildToContainer(numTF);
		//换行添加当前拥有数目

		let costTxt =  ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt",["",""]);
		costTxt.anchorOffsetX = costTxt.width/2;
		costTxt.x = temX;
		costTxt.y = itembg.y + itembg.height +10;
		this.addChildToContainer(costTxt);
		this._costTxt = costTxt;

		let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		dragProgressBar.x = temX- dragProgressBar.width/2;
		dragProgressBar.y = itembg.y + itembg.height + 50;
		this.addChildToContainer(dragProgressBar);
		this._dragProgressBar = dragProgressBar;

		let numBg = BaseBitmap.create("public_9_bg5");
		numBg.width = 90;
		numBg.x = bg.x + bg.width - 10 - numBg.width;
		numBg.y = dragProgressBar.y + dragProgressBar.height/2 - numBg.height/2;
		this.addChildToContainer(numBg);
		this._numBg = numBg;

		this._selectedNumTF = ComponentManager.getTextField(this._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
		this._selectedNumTF.y =  numBg.y + numBg.height/2 - this._selectedNumTF.height/2;
		this.addChildToContainer(this._selectedNumTF);

		this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		this._maxNumTF.y = numBg.y + numBg.height/2 - this._maxNumTF.height/2;
		this.addChildToContainer(this._maxNumTF);
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x =numBg.x + (numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;

		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.hide,this);
		this._cancelBtn.x = temX - this._cancelBtn.width/2  - 100;
		this._cancelBtn.y = bg.y + bg.height + 15;
		this.addChildToContainer(this._cancelBtn);

		let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.clickOkBtnHandler,this);
		okBtn.x = temX  - okBtn.width/2 + 100;
		okBtn.y = bg.y + bg.height + 15;
		this.addChildToContainer(okBtn);
		this.dragCallback(1);
	}

	protected dragCallback(curNum:number):void
	{
		let costNum = 0;
		if(this._useNum != curNum)
		{
			let alnum:number = Api.practiceVoApi.getbuyNum();
			let getCost = GameConfig.config.practicebaseCfg.getCost;
			let max = getCost[getCost.length -1];
			if( alnum  >= getCost.length- 1 )
			{
				costNum = max*curNum;
			}else{
				let topIdx = alnum + curNum;
				let maxIdx = topIdx < getCost.length ? topIdx : getCost.length ;
				for (var index = alnum; index < maxIdx; index++) {
					costNum = costNum + getCost[index];
				}
				if(maxIdx >= getCost.length)
				{
					costNum += max*(maxIdx - getCost.length +1);
				}
			}
		}
		
		this._useNum = curNum;
		this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2",[""+this._useNum]);
		this._numTF.anchorOffsetX = this._numTF.width;
		this._selectedNumTF.text = this._useNum + "";
		let numTFW:number = this._selectedNumTF.width + this._maxNumTF.width;
		this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW)/2;
		this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
		this._costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt",[""+costNum,""+this._useNum]);
		this._costTxt.anchorOffsetX = this._costTxt.width/2;
		this._costNum = costNum;
	}

	private clickOkBtnHandler(param:any):void
	{
		if(Api.playerVoApi.getPlayerGem() <this._costNum)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
			return;
		}
		NetManager.request(NetRequestConst.REQUEST_REQUEST_BUY,{num:this._useNum});
		this.hide();
	}
	protected getResourceList():string[]
	{
		let list =  super.getResourceList().concat([
			"practice_icon","progress2","progress2_bg",
		]);
		return list;
	}

	// protected getConfirmBtnName():string
	// {
	// 	return ButtonConst.BTN_NORMAL_YELLOW;
	// }
	
	protected getTitleStr():string
	{
		return "itemUseConstPopupViewTitle";
	}
	public dispose():void
	{
		this._cancelBtn = null;
		this._maxNum = 0;
		this._useNum = 0;
		this._numBg = null;
		this._selectedNumTF = null;
		this._maxNumTF = null;
		this._costTxt = null;
		this._numTF = null;
		this._dragProgressBar = null;
		this._costNum = 0;

		super.dispose();
	}
}