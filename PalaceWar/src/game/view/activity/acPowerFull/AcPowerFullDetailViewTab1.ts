/**
* 商店
* date 2020.6.15
* author ycg
* @name AcPowerFullDetailViewTab1
*/
class AcPowerFullDetailViewTab1 extends CommonViewTab{
    private _scrollList:ScrollList = null;
    private _gemTf:BaseTextField = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, this.requestCallback, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);

        let moneyBg = BaseBitmap.create("specialview_commoni_namebg");
		this.addChild(moneyBg);

		let needIconScale = 1;
		let gemIcon = BaseBitmap.create("public_icon1");
		gemIcon.setScale(needIconScale);
		this.addChild(gemIcon);

        this._gemTf = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        moneyBg.width = gemIcon.width * needIconScale + 40 + this._gemTf.width;
        moneyBg.setPosition(bg.x + bg.width/2 - moneyBg.width/2 , bg.y + 6);
        gemIcon.setPosition(moneyBg.x + 15, moneyBg.y + moneyBg.height / 2 - gemIcon.height / 2 * needIconScale);
		this._gemTf.setPosition(gemIcon.x + gemIcon.width * needIconScale, moneyBg.y + moneyBg.height / 2 - this._gemTf.height / 2)
        this.addChild(this._gemTf);

        let dataList = this.cfg.getShopItemList();
        let rect = new egret.Rectangle(0, 0, 524, 645);
        let scrollList = ComponentManager.getScrollList(AcPowerFullDetailTab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(bg.x + 3, bg.y + 45);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(evt:egret.Event):void{
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
        let dataList = this.cfg.getShopItemList();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
        this._gemTf.text = ""+Api.playerVoApi.getPlayerGem();
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, this.requestCallback, this);
        
        this._scrollList = null;
        this._gemTf = null;

        super.dispose();
    }
}