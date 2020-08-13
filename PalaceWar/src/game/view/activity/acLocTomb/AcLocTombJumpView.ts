/**
 * 东海皇陵跳转层数
 * author 钱竣
 */
class AcLocTombJumpView  extends PopupView
{
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _numBg : BaseBitmap = null;
	private _dragProgressBar : DragProgressBar = null;
	
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
        return this.param.data.aid;
	}
	
	private get code() : string{
        return this.param.data.code;
    }
	protected getTitleStr() : string{
		return `loctombjump-${this.code}`;
	}

	protected resetBgSize() : void{
		if(this.getBgName() != "public_rule_bg")
		{
			this.closeBtn.y = this.viewBg.y - 15;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 20);
		}
		else
		{
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn()? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		view.viewBg.width = 590;
		view.viewBg.height = 415;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let data = view.param.data;
		let maxnum = this.vo.getFloorNum() - 1;
		let kuang : BaseBitmap = BaseBitmap.create("public_9_bg4");
		kuang.width = 520;
		kuang.height = 170;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0,120]);
		view.addChild(kuang);

		let tipbg = BaseBitmap.create(`aclotteryview_bar_1`);
		tipbg.width = 565;
		view.addChild(tipbg);
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombjumptip2-${this.code}`),20);
		view.addChild(tipTxt);

		view.setLayoutPosition(LayoutConst.horizontalCentertop, tipbg, view.viewBg, [0,60]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, tipbg, [25,0]);

		view._useNum = data.curFloor;
		let numBg = BaseBitmap.create("public_9_bg5");
		view.addChild(numBg);
		view._numBg = numBg

		let curfloorTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombjumpfloor-${this.code}`,[data.curFloor]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view.addChild(curfloorTxt);
		view._selectedNumTF = curfloorTxt;

		numBg.width = curfloorTxt.textWidth + 25;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, numBg, kuang, [0, 25]);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curfloorTxt, numBg);

		let dragProgressBar : DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",maxnum,this.dragCallback,this,null,1,380);
		view.setLayoutPosition(LayoutConst.leftbottom, dragProgressBar, kuang, [70, 35]);
		view.addChild(dragProgressBar);
		view._dragProgressBar = dragProgressBar;
		dragProgressBar.setDragPercent(view._useNum, maxnum, 1);

		let minTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombfloor-${this.code}`,['1']),20);
		let maxTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombfloor-${this.code}`,[maxnum.toString()]),20);
		view.addChild(minTxt);
		view.addChild(maxTxt);
		view.setLayoutPosition(LayoutConst.lefttop, minTxt, kuang, [20, 55]);
		view.setLayoutPosition(LayoutConst.righttop, maxTxt, kuang, [20, 55]);

		let buyBtn : BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", ()=>{
			this.param.data.callback.apply(this.param.data.callobj, [this._useNum]);
			view.hide();
		}, view);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view.viewBg, [0, 35]);
        view.addChild(buyBtn);
		
	}

	private dragCallback(curNum:number):void
	{
		let view = this;
		view._useNum = Math.max(curNum,1);
		view._selectedNumTF.text = LanguageManager.getlocal(`loctombjumpfloor-${this.code}`,[curNum.toString()]);
		view._numBg.width = view._selectedNumTF.textWidth + 25;
		let maxnum = this.vo.getFloorNum() - 1;
		// view._dragProgressBar.setDragPercent(view._useNum, maxnum, 1);
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2","aclotteryview_bar_1"
		]);
	}

	public dispose():void
	{
		let view = this;
		view._numBg = null;
		view._useNum = 1;
		if(view._selectedNumTF)
		{
			view._selectedNumTF.dispose();
			view._selectedNumTF = null;
		}
		view._dragProgressBar = null;
		super.dispose();
	}
}