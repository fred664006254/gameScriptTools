class AcBattlePassViewTab4ScrollItem extends ScrollListItem{
    private _limitTxt : BaseTextField = null;
    private _itemCfg:any = null;
    private _composeBtn:BaseButton;
    private _flag : BaseBitmap = null;
    private _code = '';
    public constructor() 
    {
        super();
    }

    private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
    }

    private get vo() : AcBattlePassVo{
        return <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
	}
	
	private get acTivityId() : string{
        return `${AcConst.AID_BATTLEPASS}-${this._code}`;
	}

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcBattlePassView');
		let code = baseview.getUiCode();
		return code;
	}

    protected initItem(index:number, data:any, item):void{
        let view = this;
        view.width = 205;
        view._code = item;
        let code = view.uiCode;
        let itemCfg = data;
        view._itemCfg = itemCfg;

        let bg:BaseBitmap = BaseBitmap.create("acsingledayitembg");//public_dj_bg01  public_9_probiginnerbg
        bg.setPosition(3,3);
        view.addChild(bg);
        
        let rewardvo = GameData.formatRewardItem(itemCfg.goods)[0];
        let nameTxt : BaseTextField = ComponentManager.getTextField(rewardvo.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.setPosition(bg.x+(bg.width-nameTxt.width)/2,bg.y+30); 
        nameTxt.textColor = TextFieldConst.COLOR_BROWN;
        view.addChild(nameTxt);

        let icon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardvo, true);
        icon.setPosition(bg.x+(bg.width-icon.width)/2,bg.y+nameTxt.y+nameTxt.height+5);
        view.addChild(icon);
        view.width=bg.width+this.getSpaceX();
    
        let limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id);
        let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassShopEchange`, code), [limitNum.toString()]), 18, limitNum > 0 ? 0x3e9b00 : 0xff3c3c);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, icon, [0,icon.height + 3]);
        view._limitTxt = limitTxt;

        //原价
        let goldGemBM = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepassicon2`, code));
        goldGemBM.width = goldGemBM.height = 30;
        view.addChild(goldGemBM);

        let originPriceTxt = ComponentManager.getTextField(itemCfg.cost.toString(), 20, TextFieldConst.COLOR_BLACK);
        view.addChild(originPriceTxt);

        let distance = (bg.width - goldGemBM.width - originPriceTxt.textWidth) / 2; 
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, goldGemBM, bg, [distance, icon.y + icon.height + 20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPriceTxt, goldGemBM, [goldGemBM.width, 0]);

        let composeBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.composeHandler,this);
        composeBtn.setPosition(bg.x+(bg.width-composeBtn.width * composeBtn.scaleX)/2,bg.y+bg.height-composeBtn.height-20);
        view.addChild(composeBtn);
        view._composeBtn = composeBtn;

        let flag = BaseBitmap.create(App.CommonUtil.getResByCode(`battlepasscollect3`, code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, composeBtn);
        view.addChild(flag);
        view._flag = flag;

        composeBtn.visible = limitNum > 0;
        flag.visible = !composeBtn.visible;
    }

    public refreshItem(rewards : string):void{
        let view = this;
        let code = view.uiCode;
        let itemCfg = view._itemCfg;
        if(view._limitTxt){
            let limitNum = itemCfg.limit - view.vo.getLimitBuyNum(itemCfg.id);
            view._limitTxt.text= LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassShopEchange`, code), [limitNum.toString()]);
            view._limitTxt.textColor = limitNum > 0 ? 0x3e9b00 : 0xff3c3c;
            view._composeBtn.visible = limitNum > 0;
            view._flag.visible = !view._composeBtn.visible;
        }
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = view.localToGlobal(view._composeBtn.x + 60, view._composeBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    }

    private composeHandler():void{
        let view = this;
        let itemcfg = this._itemCfg;

        if(view.vo.isEnd){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

        let limitNum = itemcfg.limit - view.vo.getLimitBuyNum(itemcfg.id);
        if(limitNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
            return;
        }
        let cost = view.vo.getMyScore() - Math.ceil(itemcfg.cost);
        if(cost < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acBattlePassNumNotEnough`, view.uiCode)));
            return;
        }
        view.vo.selIdx = view._index;
        NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_SHOPBUY,{
            activeId : view.acTivityId, 
            shopid : itemcfg.id, 
            num : 1
        });
        
       // }
        // else{
           
            //NetManager.request(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP,{activeId : view.acTivityId, itemKey : itemcfg.id + 1, mType : 2});
        // }
    }
    
    /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }
    
	public dispose():void{
		this._itemCfg = null;
        this._composeBtn = null;
        this._flag = null;
        this._limitTxt = null;
		super.dispose();
	}
}