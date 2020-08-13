/**
 * 世界杯投票活动购买积分
 * author 钱竣
 */
class AcWorldCupBuyView  extends PopupView
{
	private _useNum:number = 1;
	private _selectedNumTF:BaseTextField;
	private _maxNumTF:BaseTextField;
	private _maxNum:number = 0;
	private _numBg:BaseBitmap;
	private _ratioTxt : BaseTextField = null;
	private _ratioTxt2 : BaseTextField = null;
	private _kuang : BaseBitmap = null;
	private _socerIcon1 : BaseBitmap = null;
	private _nameTF : BaseTextField = null;
	private _scoreTF : BaseTextField = null;
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
		return 'AcWorldCupVoteText4';
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
		view.viewBg.height = 426;
		
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY), view.buyCallbackHandle, view);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0,12]);

		let data = view.param.data;
		let countryID : number = data.countryID;
		let countryFlag = view.vo.getCountryById(data.countryID);
		// let itemInfoVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		view._maxNum = view.cfg.maxBuy - view.vo.getCurBuyNum();
		
		let effectTitle:string = LanguageManager.getlocal("effectTitle");

		let kuang : BaseBitmap = BaseBitmap.create("public_9_bg4");
		kuang.width = view.viewBg.width - 30;
		kuang.height = 266;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0,view.titleTF.textHeight + 40]);
		view.addChild(kuang);
		view._kuang = kuang;

		let bg : BaseBitmap = BaseBitmap.create("public_9_bg32");
		bg.width = kuang.width - 10;
		bg.height = kuang.height - 8;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
		view.addChild(bg);

		//点击物品增加文字说明 添加物品iconitem
		let bookBg = BaseBitmap.create("itembg_1");
		view.setLayoutPosition(LayoutConst.horizontalCentertop, bookBg, bg, [0,10]);
		view.addChild(bookBg);
		
		let flag = BaseBitmap.create('itemicon1');
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bookBg);
		view.addChild(flag);

		let nameTF : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText1', [view.cfg.cost.toString()]), 20, TextFieldConst.COLOR_BLACK);
		let icon = BaseBitmap.create('worldcupfootball');
		let scoreTF : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText2', [view.cfg.coinNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
		let desc = (view.width - (nameTF.textWidth + 5 + icon.width + scoreTF.textWidth)) / 2;
		view.setLayoutPosition(LayoutConst.lefttop, nameTF, view, [desc, bg.y + 10 + bookBg.height + 20]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, icon, nameTF, [nameTF.textWidth + 5,0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, scoreTF, icon, [icon.width + 5,0]);
		view.addChild(nameTF);
		view.addChild(icon);
		view.addChild(scoreTF);
		view._nameTF = nameTF;
		view._scoreTF = scoreTF;

		let dragProgressBar : DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg",this._maxNum,this.dragCallback,this);
		view.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, view, [100, scoreTF.y + scoreTF.textHeight + 20]);
		view.addChild(dragProgressBar);
		view._dragProgressBar = dragProgressBar;

		view._numBg = BaseBitmap.create("public_9_bg5");
		view._numBg.width = 120;
		view.setLayoutPosition(LayoutConst.lefttop, view._numBg, dragProgressBar, [343 + 10, -4]);
		view.addChild(view._numBg);

		view._useNum = 1 * view.cfg.coinNum;
		view._selectedNumTF = ComponentManager.getTextField(view._useNum + "",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
		view._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);

		view._maxNumTF = ComponentManager.getTextField("/" + (view._maxNum * view.cfg.coinNum).toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		view._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
		
		let numTFW : number = (view._numBg.width - (view._selectedNumTF.textWidth + view._maxNumTF.textWidth)) / 2;
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._selectedNumTF, view._numBg, [numTFW, 0]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._maxNumTF, view._selectedNumTF, [view._selectedNumTF.textWidth, 0]);
		view.addChild(view._selectedNumTF);
		view.addChild(this._maxNumTF);

		let ratioTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText3'), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
		let socerIcon1 = BaseBitmap.create('worldcupfootball');
		let ratioTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupBuyText4', [view.vo.getCurPoints().toString(), (view.cfg.maxBuy - view.vo.getCurBuyNum()).toString()]), 18, TextFieldConst.COLOR_QUALITY_YELLOW);
		
		let widthDesc = ratioTxt.textWidth + 5 + socerIcon1.width + 5 + ratioTxt2.textWidth
		view.setLayoutPosition(LayoutConst.leftbottom, ratioTxt, kuang, [(kuang.width - widthDesc) / 2, 20]);
		view.addChild(ratioTxt);
		view._ratioTxt = ratioTxt;
		
		view.setLayoutPosition(LayoutConst.leftverticalCenter, socerIcon1, ratioTxt, [ratioTxt.textWidth + 5, 0]);
		view.addChild(socerIcon1);
		view._socerIcon1 = socerIcon1;
		
		view.setLayoutPosition(LayoutConst.leftverticalCenter, ratioTxt2, socerIcon1, [socerIcon1.width + 5, 0]);
		view.addChild(ratioTxt2);
		view._ratioTxt2 = ratioTxt2;

		let buyBtn : BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "AcWorldCupVoteText4", view.buyHandler, view);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view.viewBg, [0, 20]);
        view.addChild(buyBtn);
	}

	private dragCallback(curNum:number):void
	{
		let view = this;
		view._useNum = curNum * view.cfg.coinNum;
		view._selectedNumTF.text = view._useNum + "";
		let numTFW:number = view._selectedNumTF.width + view._maxNumTF.width;
		view._selectedNumTF.x = view._numBg.x + (view._numBg.width - numTFW)/2;
		view._maxNumTF.x = view._selectedNumTF.x + view._selectedNumTF.width;

		view._nameTF.text = LanguageManager.getlocal('AcWorldCupBuyText1', [(view.cfg.cost * curNum).toString()]);
		view._scoreTF.text = LanguageManager.getlocal('AcWorldCupBuyText2', [(view.cfg.coinLimit * curNum).toString()]);
		view.fresh_score();
	}
	// protected getContainerY():number
	// {
	// 	return 0;
	// }
	private fresh_score():void{
		let view = this;
		let widthDesc = view._ratioTxt.textWidth + 5 + view._socerIcon1.width + 5 + view._ratioTxt2.textWidth
		view.setLayoutPosition(LayoutConst.leftbottom, view._ratioTxt, view._kuang, [(view._kuang.width - widthDesc) / 2, 20]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._socerIcon1, view._ratioTxt, [view._ratioTxt.textWidth + 5, 0]);
		view._ratioTxt2.text = LanguageManager.getlocal('AcWorldCupBuyText4', [view.vo.getCurPoints().toString(), view._maxNum.toString()]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._ratioTxt2, view._socerIcon1, [view._socerIcon1.width + 5, 0]);
	}

	private buyCallbackHandle(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data.data;
		if(evt.data.data.ret < 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
			return;
		}
		App.CommonUtil.showTip(LanguageManager.getlocal("acTailorbuyTip1"));
		let limit = view.cfg.maxBuy - view.vo.getCurBuyNum();
		view._maxNum = limit;
		view._maxNumTF.text = ("/" + (view._maxNum * view.cfg.coinNum).toString());
		view._dragProgressBar.setDragPercent(1, limit);
		view.fresh_score();
		if(limit == 0){
			view.hide();
		}
	}

	private buyHandler():void{
		let view = this;
		if((view.cfg.maxBuy < view.vo.getCurBuyNum())){
			App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
			return;
		}
		if(Api.playerVoApi.getPlayerGem() < (view._useNum / view.cfg.coinNum * view.cfg.cost)){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
		}
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY, {
            activeId : view.acTivityId,
            num : view._useNum / view.cfg.coinNum
        });	
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"progress2_bg","progress2","itemicon1"
		]);
	}

	public dispose():void
	{
		let view = this;
		this._useNum = 1;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPBUY), view.buyCallbackHandle, view);
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
		if(this._numBg)
		{
			this._numBg.dispose();
			this._numBg = null;
		}
		view._ratioTxt = null;
		view._ratioTxt2 = null;
		view._socerIcon1 = null;
		view._kuang = null;
		view._nameTF = null;
		view._maxNumTF = null;
		view._dragProgressBar = null;
		super.dispose();
	}
}