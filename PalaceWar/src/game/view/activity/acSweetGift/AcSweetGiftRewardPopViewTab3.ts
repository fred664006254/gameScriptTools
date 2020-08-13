/**
 * 兑换商店
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopViewTab3
 */
class AcSweetGiftRewardPopViewTab3 extends AcCommonViewTab{
    public _gemTF:BaseTextField = null;
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, this.requestCallback, this);
        this.height = 670;
        this.width = 520;
        let itembg = BaseBitmap.create("specialview_commoni_namebg");
		this.addChild(itembg);

		let needIconScale = 1;
		let itemGem = BaseBitmap.create("public_icon1");
		// itemGem.width = 100;
		// itemGem.height = 100;
		itemGem.setScale(needIconScale);
		this.addChild(itemGem);

        this._gemTF = ComponentManager.getTextField(String(Api.playerVoApi.getPlayerGem()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        itembg.width = itemGem.width * needIconScale + 20 + this._gemTF.width;
        itembg.setPosition(30+1 + this.width/2 - itembg.width/2 , 70);
        itemGem.setPosition(itembg.x, itembg.y + itembg.height / 2 - itemGem.height / 2 * needIconScale);
		this._gemTF.setPosition(itemGem.x + itemGem.width * needIconScale, itembg.y + itembg.height / 2 - this._gemTF.height / 2)
        this.addChild(this._gemTF);
        
        let dataList = this.vo.getSortShopCfg();
        let rect =  new egret.Rectangle(0, 0, 520, this.height - 35 - itembg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab3ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(30, 75 + itembg.height);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortShopCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});
        this._gemTF.text = String(Api.playerVoApi.getPlayerGem());
    }

	private get cfg():Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETSHOP, this.requestCallback, this);
        this._gemTF = null;
        this._scrollList = null;
        super.dispose();
     }
}