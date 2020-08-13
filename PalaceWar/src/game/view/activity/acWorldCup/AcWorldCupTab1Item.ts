/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcWorldCupTab1Item extends ScrollListItem
{
    private _data : any = null;
    private _champHead : BaseBitmap = null;
    private _champBg : BaseBitmap = null;
    private _endTxt : BaseTextField = null;
    private _curPointsTxt : BaseTextField = null;
    private _btn : BaseButton = null;
	public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get acTivityId() : string{
        return `${AcConst.AID_ACWORLDCUP}-${this._code}`;
    }

    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
        view._data = data;
        view.width = 570;
        view.height = 125 + 10;
        
        let bg = BaseBitmap.create('public_9_managebg');
        bg.width = 538;
        bg.height = 108;
        view.setLayoutPosition(LayoutConst.righttop, bg, view, [0,10]);
        view.addChild(bg);

        let champbg = BaseBitmap.create('worldcupchampbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, champbg, bg);
        view.addChild(champbg);
        champbg.visible = false;
        view._champBg = champbg;

        let country = view.vo.getCountryById(data.country);
        let flag = BaseBitmap.create(country);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, flag, bg, [-30,0]);
        view.addChild(flag);

        let champhead = BaseBitmap.create('worldcupchamphead');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, champhead, flag);
        view.addChild(champhead);
        champhead.visible = false;
        view._champHead = champhead;

        let cty = LanguageManager.getlocal(`AcWorldCupCountry${data.country}`);
        let nameTxt = ComponentManager.getTextField(cty, 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, flag, [flag.width + 20,30]);
        view.addChild(nameTxt);

        let totalPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDTotalPoints'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, totalPointsTxt, nameTxt, [0, nameTxt.textHeight + 15]);
        view.addChild(totalPointsTxt);

        let flower = BaseBitmap.create('worldcupfootball');
		view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, totalPointsTxt, [totalPointsTxt.textWidth, 0]);
        view.addChild(flower);

        let curPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDTotalPoints'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, curPointsTxt, flower, [flower.width + 5, 0]);
        view.addChild(curPointsTxt);
        view._curPointsTxt = curPointsTxt;

        let endTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDEnd'), 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, endTxt, bg, [20, 0]);
        view.addChild(endTxt);
        view._endTxt = endTxt;
        view._endTxt.visible = false;

        let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'AcWorldCupDGuess', view.guessClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [20,0]);
        view.addChild(btn);
        view._btn = btn;
        btn.visible = false;
        
        view.fresh_period();
        let curPoints = view._data.points;
        view._curPointsTxt.text = curPoints.toString();
    }

    private guessClick():void{
        let view = this;
        // let country = view.vo.getCountryById(data.country);
        if(view.vo.getCurPeriod() > 1){
            App.CommonUtil.showTip(LanguageManager.getlocal('AcWorldCupShopTimePass'));
            return;
        }
        if(view.vo.getCurPoints() <= 0){
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:LanguageManager.getlocal('AcWorldCupVoteText7'),
                callback : ()=>{
                    if(view.vo.getCurBuyNum() >= view.cfg.maxBuy){
                        App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
			            return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPBUYVIEW,{
                        countryID : view._data.country,
                        aid : AcConst.AID_ACWORLDCUP,
                        code : view._code
                    });
                },
                handler : view,
                needCancel : true
            });
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPVOTEVIEW,{
            countryID : view._data.country,
            aid : AcConst.AID_ACWORLDCUP,
            code : view._code
        });
    }

    private fresh_points():void{
        let view = this;
        let curPoints = view._data.points;
        view._curPointsTxt.text = curPoints.toString();
    }
    
    private fresh_period() : void{
        let view = this;
        let curPeriod = view.vo.getCurPeriod();
        let champCountry = view._data.champ;
        switch(curPeriod){
            case 1:
                view._btn.visible = true;
                view._endTxt.visible = false;
                break;
            case 2:
            case 3:
                view._btn.visible = false;
                view._champBg.visible = view._champHead.visible = Number(view._data.country) == Number(champCountry);
                view._endTxt.visible = !view._champBg.visible;
                break;
        }
    }

	public dispose():void
    {
        let view = this;
        view._champBg = null;
        view._champHead = null;
        view._endTxt = null;
        view._curPointsTxt = null;
        view._btn = null;
        super.dispose();
    }
}