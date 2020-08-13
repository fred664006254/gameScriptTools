/**
 * 新服庆典 tab2
 * date 2020.6.30
 * author ycg
 */
class AcNewappointViewTab2 extends AcCommonViewTab{
    private _scoreInfo:BaseTextField = null;
    private _scrollList:ScrollList = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, this.exchangeCallback, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 534;
        bg.height = 472;
        bg.setPosition(53, 0);
        this.addChild(bg);

        let topInfoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getTypeCode()));
        topInfoBg.setPosition(bg.x + bg.width/2 - topInfoBg.width/2, bg.y + 10);
        this.addChild(topInfoBg);

        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointScoreInfo", this.getTypeCode()), [""+this.vo.getScore()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.anchorOffsetX = topInfo.width/2;
        topInfo.setPosition(topInfoBg.x + topInfoBg.width/2, topInfoBg.y + topInfoBg.height/2 - topInfo.height/2);
        this.addChild(topInfo);
        this._scoreInfo = topInfo;

        let dataList = this.cfg.getShopListCfg();
        let scrollList = ComponentManager.getScrollList(AcNewappointShopScrollItem, dataList, new egret.Rectangle(0, 0, 526, 417), {aid: this.aid, code: this.code});
        scrollList.setPosition(bg.x + 4, topInfoBg.y + topInfoBg.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private exchangeCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        let rData = evt.data.data.data;
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    }

    private refreshView():void{
        this._scoreInfo.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointScoreInfo", this.getTypeCode()), [""+this.vo.getScore()]);
        this._scoreInfo.anchorOffsetX = this._scoreInfo.width/2;

        let dataList = this.cfg.getShopListCfg();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    private getTypeCode():string{
        return this.code;
    }

    private get cfg():Config.AcCfg.NewappointCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcNewappointVo{
        return <AcNewappointVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, this.exchangeCallback, this);
        this._scoreInfo = null;
        this._scrollList = null;

        super.dispose();
    }
}