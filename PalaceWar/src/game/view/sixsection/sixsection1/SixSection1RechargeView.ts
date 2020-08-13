/**
* 物资供应
* date 2020.5.27
* author ycg
* @name SixSection1RechargeView
*/
class SixSection1RechargeView extends CommonView{
    private _topBg:BaseBitmap = null;
    private _timeDown:BaseTextField = null;
    private _scrollList:ScrollList = null;
    private _timeNum:number = 0;
    private _isCross:boolean = false;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "sixsection1_rechargetitlebg";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "";
    }

    // protected getRuleBtnName():string
	// {	
	// 	return ButtonConst.BTN2_RULE;
    // }
    
    protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "progress3", "progress3_bg", "public_scrollitembg", "public_line3", "public_scrolllistbg", "collectflag",
        ).concat(list);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_SIXSECTION1_SHOW, requestData:{
			show: 0
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (data.ret){
            // this.refreshView();
        }
	}

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH, this.refreshView, this);

        let topBg = BaseBitmap.create("sixsection1_rechargetopbg");
        topBg.setPosition(this.titleBg.x + this.titleBg.width/2 - topBg.width/2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(topBg);
        this._topBg = topBg;

        let info = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        info.setPosition(topBg.x + 222, topBg.y + 44);
        this.addChildToContainer(info);
        info.width = 400;
        info.lineSpacing = 7;

        this._timeNum = App.DateUtil.getWeeTs(GameData.serverTime);

        let timeDown = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1RechargeTimeDown", [""+this.getDayTimeDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        timeDown.setPosition(topBg.x + topBg.width - 20 - timeDown.width, topBg.y + 182);
        this.addChildToContainer(timeDown);
        this._timeDown = timeDown;

        this.setBigFameY(topBg.y + topBg.height);
        this.setBigFameCorner(2);

        let dataList = Api.sixsection1VoApi.getSortRechargeCfg();
        let scrollList = ComponentManager.getScrollList(SixSection1RechargeScrollItem, dataList, new egret.Rectangle(0, 0, GameConfig.stageWidth - 20, GameConfig.stageHeigth - topBg.y - topBg.height - 20), {});
        scrollList.setPosition(10, topBg.y + topBg.height + 10);
        this.addChildToContainer(scrollList);
        scrollList.horizontalScrollPolicy = "off";
        this._scrollList = scrollList;
        this._isCross = false;
    }

    public getDayTimeDown():string{
        let et = this._timeNum + 86400;
        if (GameData.serverTime >= et){
            this._timeNum = App.DateUtil.getWeeTs(GameData.serverTime);
            this.resetList();
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    }

    public tick():void{
        if (!Api.sixsection1VoApi.isInPeriousTime()){
            this._timeDown.text = LanguageManager.getlocal("sixSection1EndTip");
            this._timeDown.x = this._topBg.x + this._topBg.width - 20 - this._timeDown.width;
            return;
        }
        this._timeDown.text = LanguageManager.getlocal("sixSection1RechargeTimeDown", [""+this.getDayTimeDown()]);
        this._timeDown.x = this._topBg.x + this._topBg.width - 20 - this._timeDown.width;
    }

    private getRewardCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        // this.refreshView();
    }

    private refreshView():void{
        if (this._scrollList){
            let data = Api.sixsection1VoApi.getSortRechargeCfg();
            this._scrollList.refreshData(data);
        }
    }

    //重置list
    private resetList():void{
        // let data = Config.Sixsection1Cfg.getRechargeList();
        // this._scrollList.refreshData(data);
        this._isCross = true;
        if (this._isCross){
            this._isCross = false;
            if (Api.sixsection1VoApi.isInPeriousTime()){
                this.request(NetRequestConst.REQUEST_SIXSECTION1_SHOW, {show: 0});
            }
        }
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_GETRECHARGE, this.getRewardCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_MODEL_REFRESH, this.refreshView, this);
        this._timeDown = null;
        this._scrollList = null;
        this._timeNum = 0;
        this._isCross = false;

        super.dispose();
    }
}