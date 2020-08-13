/**
 * 世界杯投票活动
 * author 钱竣
 */
class AcWorldCupVoteView  extends PopupView
{
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	private _guessRightTxt : BaseTextField = null;
	private _guessWrongTxt : BaseTextField = null;
	private _ratioTxt2 : BaseTextField = null;
	private _socerIcon2 : BaseBitmap = null;
	private _curPointsTxt : BaseTextField = null;
	private _dragProgressBar : DragProgressBar = null;
	
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}
	
	protected getTitleStr() : string{
		return 'AcWorldCupVoteText3';
	}

	protected resetBgSize() : void{
		if (this.getBgName() != "public_rule_bg") {
			this.closeBtn.y = this.viewBg.y - 15;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
		}
		else {
			this.closeBtn.y = this.viewBg.y - 18;
			this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
		}
	}

	protected initView():void
	{
		let view = this;
		view.viewBg.width = 600;
		view.viewBg.height = 518;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this); 
		
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let data = view.param.data;
		let countryID : number = data.countryID;
		let countryFlag = view.vo.getCountryById(data.countryID);
		// let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		view._maxNum = Math.floor(view.vo.getCurPoints() / view.cfg.coinLimit);
		
		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let kuang : BaseBitmap = BaseBitmap.create("public_9_bg4");
		kuang.width = view.viewBg.width - 30;
		kuang.height = 306;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0,view.titleTF.textHeight + 40]);
		view.addChild(kuang);

		let bg : BaseBitmap = BaseBitmap.create("public_9_bg32");
		bg.width = kuang.width - 10;
		bg.height = kuang.height - 8;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
		view.addChild(bg);

		//点击物品增加文字说明 添加物品iconitem
		let flag = BaseBitmap.create(countryFlag);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, flag, bg, [0,10]);
		view.addChild(flag);

		let cty = LanguageManager.getlocal(`AcWorldCupCountry${data.countryID}`);
		let nameTF : BaseTextField = ComponentManager.getTextField(cty, 20, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, nameTF, flag, [0, flag.height + 8]);
		view.addChild(nameTF);

		let effectDescTF : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText1'), 20, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, effectDescTF, nameTF, [0, nameTF.textHeight + 20]);
		view.addChild(effectDescTF);

		let dragProgressBar : DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view, [100, effectDescTF.y + effectDescTF.textHeight + 20]);
		view.addChild(dragProgressBar);
		view._dragProgressBar = dragProgressBar;

		view._numBg = BaseBitmap.create("public_9_bg5");
		view._numBg.width = 120;
		view.setLayoutPosition(LayoutConst.lefttop, view._numBg, dragProgressBar, [343 + 10, -4]);
		view.addChild(view._numBg);

		view._useNum = 1 * view.cfg.coinLimit;
		view._selectedNumTF = ComponentManager.getTextField(view._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		view._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);

		view._maxNumTF = ComponentManager.getTextField("/" + (this._maxNum * view.cfg.coinLimit).toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		
		let numTFW : number = (view._numBg.width - (view._selectedNumTF.textWidth + view._maxNumTF.textWidth)) / 2;
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._selectedNumTF, view._numBg, [numTFW, 0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._maxNumTF, view._selectedNumTF, [view._selectedNumTF.textWidth, 0]);
		view.addChild(view._selectedNumTF);
		view.addChild(this._maxNumTF);

		let ratioTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText5', [view.vo.getCurRatio().toString()]), 18, TextFieldConst.COLOR_BLACK);
		let socerIcon1 = BaseBitmap.create('worldcupfootball');
		let guessRightGet = ComponentManager.getTextField((view._useNum * view.vo.getCurRatio()).toFixed(0), 18, 0x51ea4d);
		let socerIcon2 = BaseBitmap.create('worldcupfootball');
		let ratioTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText6'), 18, TextFieldConst.COLOR_BLACK);
		let guessWrongGet =  ComponentManager.getTextField((view._useNum * view.cfg.ratio1).toString(), 18, 0x51ea4d);
		let widthDesc = ratioTxt.textWidth + socerIcon1.width + guessRightGet.textWidth + ratioTxt2.textWidth + socerIcon2.width + guessWrongGet.textWidth + 30;
		
		view.setLayoutPosition(LayoutConst.leftbottom, ratioTxt, kuang, [(kuang.width - widthDesc) / 2, 20]);
		view.addChild(ratioTxt);
		
		view.setLayoutPosition(LayoutConst.leftverticalCenter, socerIcon1, ratioTxt, [ratioTxt.textWidth + 5, 0]);
		view.addChild(socerIcon1);

		view.setLayoutPosition(LayoutConst.leftverticalCenter, guessRightGet, socerIcon1, [socerIcon1.width + 5, 0]);
		view.addChild(guessRightGet);
		view._guessRightTxt = guessRightGet;
		
		view.setLayoutPosition(LayoutConst.leftverticalCenter, ratioTxt2, guessRightGet, [guessRightGet.textWidth, 0]);
		view.addChild(ratioTxt2);
		view._ratioTxt2 = ratioTxt2;

		view.setLayoutPosition(LayoutConst.leftverticalCenter, socerIcon2, ratioTxt2, [ratioTxt2.textWidth + 5, 0]);
		view.addChild(socerIcon2);
		view._socerIcon2 = socerIcon2;

		view.setLayoutPosition(LayoutConst.leftverticalCenter, guessWrongGet, socerIcon2, [socerIcon2.width + 5, 0]);
		view.addChild(guessWrongGet);
		view._guessWrongTxt = guessWrongGet;
		
		let totalPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupVoteText2'), 22, TextFieldConst.COLOR_BLACK);
		let flower = BaseBitmap.create('worldcupfootball');
		let curPointsTxt = ComponentManager.getTextField(view.vo.getCurPoints().toString(), 22, TextFieldConst.COLOR_WARN_YELLOW);
		let textWidth = totalPointsTxt.textWidth + flower.width + 5 + curPointsTxt.textWidth;
		
		view.setLayoutPosition(LayoutConst.lefttop, totalPointsTxt, kuang, [(bg.width - textWidth) /2, kuang.height + 25]);
		view.addChild(totalPointsTxt);
		
		view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, totalPointsTxt, [totalPointsTxt.textWidth, 0]);
		view.addChild(flower);

		view.setLayoutPosition(LayoutConst.leftverticalCenter, curPointsTxt, flower, [flower.width + 5, 0]);
		view.addChild(curPointsTxt);
		view._curPointsTxt = curPointsTxt
       
		let guessBtn : BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "AcWorldCupVoteText3", view.voteHandle, view);
		view.setLayoutPosition(LayoutConst.rightbottom, guessBtn, view.viewBg, [60, 20]);
		view.addChild(guessBtn);
		
		let buyBtn : BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "AcWorldCupVoteText4", view.buyHandler, view);
		view.setLayoutPosition(LayoutConst.leftbottom, buyBtn, view.viewBg, [60, 20]);
        view.addChild(buyBtn);
		
	}

	private update() : void{
		let view = this;
		view._maxNum = Math.floor(view.vo.getCurPoints() / view.cfg.coinLimit);
		view._dragProgressBar.setDragPercent(1, view._maxNum);
		
		view._maxNumTF.text = "/" + (view._maxNum * view.cfg.coinLimit).toString();
		let numTFW:number = view._selectedNumTF.width + view._maxNumTF.width;
		view._selectedNumTF.x = view._numBg.x + (view._numBg.width - numTFW)/2;
		view._maxNumTF.x = view._selectedNumTF.x + view._selectedNumTF.width;

		view._curPointsTxt.text = view.vo.getCurPoints().toString();
	}

	private dragCallback(curNum:number):void
	{
		let view = this;
		view._useNum = curNum * view.cfg.coinLimit;
		view._selectedNumTF.text = view._useNum + "";
		let numTFW:number = view._selectedNumTF.width + view._maxNumTF.width;
		view._selectedNumTF.x = view._numBg.x + (view._numBg.width - numTFW)/2;
		view._maxNumTF.x = view._selectedNumTF.x + view._selectedNumTF.width;
		view._guessRightTxt.text = (view._useNum * view.vo.getCurRatio()).toFixed(0).toString();
		view._guessWrongTxt.text = (view._useNum * view.cfg.ratio1).toString();
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._ratioTxt2, view._guessRightTxt, [view._guessRightTxt.textWidth, 0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._socerIcon2, view._ratioTxt2, [view._ratioTxt2.textWidth + 5, 0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._guessWrongTxt, view._socerIcon2, [view._socerIcon2.width + 5, 0]);
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }
	private voteHandle():void{
		let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE, {
            countryId : view.param.data.countryID,
			num : view._useNum / view.cfg.coinLimit,
			activeId : view.acTivityId
        });	
	}

	private buyHandler():void{
		let view = this;
		if(view.vo.getCurBuyNum() >= view.cfg.maxBuy){
			App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPBUYVIEW,{
			countryID : view.param.data.countryID,
			code : view.param.data.code,
			aid : view.param.data.aid
		});
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2"
		]);
	}

	public dispose():void
	{
		let view = this;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM,this.update,this); 
		this._useNum = 1;
		if(this._selectedNumTF)
		{
			this._selectedNumTF.dispose();
			this._selectedNumTF = null;
		}
		if(this._maxNumTF)
		{
			this._maxNumTF.dispose();
			this._maxNumTF = null;
		}
		this._maxNum = 0;
		if(this._numBg){
			this._numBg.dispose();
			this._numBg = null;
		}
		view._guessRightTxt = null;
		view._guessWrongTxt = null;
		view._ratioTxt2 = null;
		view._socerIcon2 = null;
		view._curPointsTxt = null;
		view._dragProgressBar = null;
		super.dispose();
	}
}