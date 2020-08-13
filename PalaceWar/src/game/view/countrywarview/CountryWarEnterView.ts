/**
 * 门客战入口界面
 * author qianjun
 */
class CountryWarEnterView extends CommonView {

    private _rule:BaseButton = null;
    public constructor() {
		super();
    }

    private _timeDesc : BaseTextField = null;
    private _tipBg : BaseBitmap = null;
    private _tipTxt : BaseTextField = null;
    private _enterBtn : BaseButton = null;
    private _curType : number = 1;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            'forpeople_top','countrywarvsbg','arena_bottom','dailyboss_enter','countrywarlunkong'
        ]);
    }

    private get api(){
        return Api.countryWarVoApi;
    }

    private get cfg(){
        return Config.CountrywarCfg;
    }

    protected getRuleInfo():string{
        return `CountryWarRuleInfo`
    }

   /**
     * 参数
     */
    protected getRuleInfoParam():string[]
	{
        let level = LanguageManager.getlocal("officialTitle" + Config.CountrywarCfg.unlock);
		return [level, this.cfg.loserPointAdd.toString()];
    }
    
    protected getTitleStr():string{
        return `CountryWarTitle`;
    }


	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(0){
			
		}
		else{
			return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,requestData:null};
		}
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL,{
		// 	id:view._data.id
		// });
    }
    
    protected receiveData(rdata:any):void{
        if (!rdata.ret){
            return;
        }
        let view = this;
        if(!rdata.ret){
            return;
        }
        if(rdata.data.data.countrywar){
            view.api.formatData(rdata.data.data.countrywar);
        }
        
        if(rdata.data.data.announce){
            view.api.setAnnouce(rdata.data.data.announce);
        }

        if(rdata.data.data.numpercity){
            view.api.setMyCityInfo(rdata.data.data.numpercity);
        }
        if(rdata.data.data.tnumpercity){
            view.api.setEnermyCityInfo(rdata.data.data.tnumpercity);
        }
        if(rdata.data.data.history){
            view.api.setHistoryInfo(rdata.data.data.history);
        }
    }

    protected initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
        let view = this;

        view._curType = view.api.getCurpeirod();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
       
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_POLICY_INDEX,view.kingCallback,view);
        // NetManager.request(NetRequestConst.REQUEST_POLICY_INDEX, {});

        let topbg = BaseBitmap.create(`forpeople_top`);
        topbg.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(topbg);

        let actimeTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcTurnTableViewTime', [view.api.acTimeAndHour(true)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, actimeTxt, topbg, [10,5]);
        view.addChild(actimeTxt);

        let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarCD`,[view.api.getCountStr(true)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cdTxt, actimeTxt, [0,actimeTxt.textHeight + 7]);
        view.addChild(cdTxt);
        view._timeDesc = cdTxt;

        let joinTxt = ComponentManager.getTextField(LanguageManager.getlocal(view.api.canJoinThisWar() ? 'CountryWarJoin' : 'CountryWarNotJoin',[view.api.getLockedString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, joinTxt, cdTxt, [0,cdTxt.textHeight + 7]);
        view.addChild(joinTxt);

        let enterBtn = ComponentManager.getButton(view.api.getIslunkong() ? 'countrywarlunkong' : 'dailyboss_enter', '', view.enterClick, view, null, 3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterBtn, view);
        view.addChild(enterBtn);
        enterBtn.setGray(view.api.getEnermyZid() == 0);
        view._enterBtn = enterBtn;

        let bottombg = BaseBitmap.create('arena_bottom');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);

        let descBg = BaseBitmap.create('public_9_downbg');
        descBg.width = GameConfig.stageWidth;
        view.addChild(descBg);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarDesc`), 20);
        descTxt.width = descBg.width - 40;
        descTxt.lineSpacing = 5;
        descBg.height = descTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bottombg, [0,-descBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        view.addChild(descTxt);

        let ruleBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'CountryWarRuleBtn', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW);
           // 打开规则奖励弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, ruleBtn, bottombg, [60,0]);
        view.addChild(ruleBtn);

        this._rule = ruleBtn;

        let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'CountryWarRankBtn', ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARREWARDPOPUPVIEW,{type:4});
            // 打开排行弹窗ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARENTERVIEW);
         }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottombg, [60,0]);
        view.addChild(rankBtn);

        view.setChildIndex(view.closeBtn, 9999);
        //
        if(LocalStorageManager.get(`countrywar${Api.playerVoApi.getPlayerID()}`) == '1'){
            
        }
        else{
            LocalStorageManager.set(`countrywar${Api.playerVoApi.getPlayerID()}`, '1')
            ViewController.getInstance().openView(ViewConst.BASE.COUNTRYWAYAVGVIEW);
        }

        //倒计时
        let timeCDbg = BaseBitmap.create(`public_itemtipbg2`);
        view._tipBg = timeCDbg;
        view.addChild(timeCDbg);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""),20);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;
        view.refreashView();
    }
    /**
     * 刷新小红点
     */
    private refreashView()
    {
        let view = this;
        if(Api.countryWarVoApi.isShowRewardRedPoint())
        {
            App.CommonUtil.addIconToBDOC(this._rule);     
        }
        else
        {
            App.CommonUtil.removeIconFromBDOC(this._rule);
        }

        view._enterBtn.setBtnBitMap(view.api.getIslunkong() ? 'countrywarlunkong' : 'dailyboss_enter');
        view.freshText();
    }

    private freshText():void{
        let view = this;
        let str = '';
        let param = [];
        if(view.api.isPlayerSerVantLevel()){
            if(view.api.getIslunkong()){
                str = "CountryWarCityTip9";
            }
            else{
                let period = view.api.getCurpeirod();
                if(period == 1){
                    if(view.api.getEmptyServant()){
                        str = 'CountryWarCityTip8';
                    }
                    else{
                        str = `CountryWarCityTip10`;
                        param.push(view.cfg.cityTotNum);
                    }
                }
                else if(period == 2){
                    str = `CountryWarCityTip5`;
                }
                else{
                    str = `CountryWarCityTip11`;
                }
            }
        }
        else{
            str = `CountryWarCityTip6`;
        }
       
        view._tipTxt.text = LanguageManager.getlocal(str,param);
        view._tipBg.width = view._tipTxt.textWidth + 100;
        view._tipBg.height = view._tipTxt.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipBg, view._enterBtn, [0,-view._tipBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._tipTxt, view._tipBg);
    }

    protected initBg():void{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
		}
    }
    
    private enterClick():void{
        let view = this;
        if(view.api.getEnermyZid() > 0){
            ViewController.getInstance().openView(ViewConst.COMMON.COUNTRYWARVIEW);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip3"));
            return;
        } 
    }

    protected tick():void{
        let view = this;
        let period = view.api.getCurpeirod();
        if(period != view._curType || view.api.getCountEndTime() <= 0){
            //跨阶段 刷新界面
            view.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,null);
        }
        view._curType = period; 
        view.freshText();
        view._timeDesc.text = LanguageManager.getlocal(`CountryWarCD`,[view.api.getCountStr(true)]);
    }

    protected getBgName():string{
        return `countrywarvsbg`;
    }
    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
        view._timeDesc = null;
        this._rule = null;
        super.dispose();
    }
}