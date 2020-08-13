/**
 * 称帝战商店item
 * author qianjun
 * @class EmperorWarRewardScrollItem
 */
class EmperorWarShopScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    private _data = null;
    private _limitTxt : BaseTextField = null;

    private get api(){
        return Api.emperorwarVoApi;
    }

    protected initItem(index:number,data:any)
    {
        let view = this;
        view._data = data;
        view.width = 161 + this.getSpaceX();
        view.height = 224;
        let rIcons = data.rewardIcons;
        let length = rIcons.length;
        
        let xbg = BaseBitmap.create(`public_9_bg4`);
        xbg.width = 161;
        xbg.height = 224;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, xbg, view);
        view.addChild(xbg);

        let bg = BaseBitmap.create(`public_9_bg_35`);
        bg.width = 161;
        bg.height = view.height;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, view);
        view.addChild(bg);

        let topBg = BaseBitmap.create(`public_9_cell_title`);
        topBg.width = 161;
        topBg.height = 20;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, bg);
        view.addChild(topBg);

        /*
        --sortId  显示顺序 
        --limit  限购次数  活动期间总次数  只有能参战的8人可购买
        --preCost  道具原价
        --buyCost  实际购买的价格
        --discount  折扣
        --content  内容和数量*/
        let item = rIcons[0];
        let bindData : any = item.bindData;
        let nameTxt : BaseTextField = ComponentManager.getTextField(bindData.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, topBg);
        view.addChild(nameTxt);

        view.setLayoutPosition(LayoutConst.horizontalCentertop, item, topBg, [0,topBg.height + 10]);
        view.addChild(item);
        
        //折扣
        if(data.discount){
            let tag = BaseBitmap.create('empshop_tag');
            view.setLayoutPosition(LayoutConst.lefttop, tag, item);
            view.addChild(tag);

            let tagTxtStr = "";
            if(PlatformManager.checkIsTextHorizontal())
            {
                let tagNumber = 100 - Number(data.discount)* 100;
                tagTxtStr = LanguageManager.getlocal('discountTitle',[String(tagNumber)]);
            }
            else
            {
                tagTxtStr = LanguageManager.getlocal('discountTitle',[(data.discount * 10).toString()]);
            }
            let tagTxt = ComponentManager.getTextField(tagTxtStr, 18, TextFieldConst.COLOR_WARN_YELLOW);
            tagTxt.rotation = -45;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10,5]);
            if(PlatformManager.checkIsThSp())
            {
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10,15]);
            }
            if(PlatformManager.checkIsEnSp())
            {
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tagTxt, tag, [-10,11]);
            }
            view.addChild(tagTxt);
        }

        //限购
        if(data.limit){
            let curNum = data.limit - view.api.getBuyLimitnum(data.sortId);
            let limitTxt = ComponentManager.getTextField(LanguageManager.getlocal('shopLimitBuy3',[curNum.toString()]), 20, TextFieldConst.COLOR_WHITE);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, item, [0, item.height]);
            view.addChild(limitTxt);
            view._limitTxt = limitTxt;
        }

        let buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, '', view.buyItem, view, [data.sortId]);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, buyBtn, view, [0,10]);
        view.addChild(buyBtn);

        let ybao = GameData.getRewardItemVoByIdAndType(1);
        let itemicon = BaseLoadBitmap.create(ybao.icon);
        itemicon.setScale(0.4);
        let costTxt = ComponentManager.getTextField(data.buyCost.toString(), 20, TextFieldConst.COLOR_BLACK);
        let space = (buyBtn.width - 40 - costTxt.textWidth) / 2
        
        view.setLayoutPosition(LayoutConst.lefttop, itemicon, buyBtn, [space,3], true);
        buyBtn.addChild(itemicon);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, buyBtn, [itemicon.x+40,0], true);
        buyBtn.addChild(costTxt);
    }

    private buyItem(shopId){
        let view = this;
        if(!view.api.isCanJoinWar()){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarShopNot"));
            return;
        }

        let curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
        if(curNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("DragonBoatShopTip"));
            return;
        }
        
        if(Api.playerVoApi.getPlayerGem() < view._data.buyCost){
            App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY),view.buyCallBack,view);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_BUY, {
            version : view.api.emperorwarActiveVo.version,
            shopId : shopId
        });
    }

    private buyCallBack(evt){
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY),view.buyCallBack,view);
        if(evt.data.ret){
            let data = evt.data;
            if(data.data.ret < 0){
                return;
            }
            if (data.data.data.myemperor)
            {
                Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
            }
            let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
            let pos = view._limitTxt.localToGlobal(view._limitTxt.textWidth + 20,20);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            let curNum = view._data.limit - view.api.getBuyLimitnum(view._data.sortId);
            view._limitTxt.text = LanguageManager.getlocal('shopLimitBuy3',[curNum.toString()]);
        }
    }

    public getSpaceX():number
	{
		return 20;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 15;
	}
    public dispose():void
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BUY),this.buyCallBack,this);
        super.dispose();
    }
}