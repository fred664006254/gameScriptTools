/**
 * author : qianjun
 * desc : 礼包item
 */
class AcSingleDay2019GiftItem  extends ScrollListItem
{
    private _limitTxt : BaseTextField = null;
    private _btn : BaseButton = null;
    private _data : Config.AcCfg.SingleDayNewShop2Item = null;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_SINGLEDAY2019;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.SingleDayNewShop2Item,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 640;
		view.height = 215;
        view._data = data;
        //创建ui
        //背景图片
        let code = view.getUiCode();
        let giftid = data.id;
        let bg = BaseBitmap.create(`newsingledaytab4gift${giftid}bg-${code}`);
        this.addChild(bg);

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acSingleDay2019gift${giftid}-${code}`), 20, TextFieldConst.COLOR_BLACK);
        this.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,13]);
    
        let iconbg =  BaseBitmap.create(`newsingledaytab4gift${giftid}iconbg-${code}`);
        this.addChild(iconbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, iconbg, bg, [45,40]);

        let icon =  BaseBitmap.create(`newsingledaytab4gift${giftid}icon-${code}`);
        this.addChild(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);
        icon.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAY2019ITEMSPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
                titleName : `acSingleDay2019gift${data.id}-${code}`,
                reward : data.item,
                id : data.id
            });
        }, view);

        let discountgroup = new BaseDisplayObjectContainer();
        discountgroup.x = iconbg.x + 5;
        discountgroup.y = iconbg.y + 10;
        this.addChild(discountgroup);
        
        let mark:BaseBitmap=BaseBitmap.create("common_shopmark");
        discountgroup.addChild(mark);

        let markNum = data.rebate*10;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
            markNum = (10 - data.rebate*10)*10;
        }
        let markTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`acYiyibusheDiscount`, [""+markNum]),12,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, markTxt, mark);
        discountgroup.addChild(markTxt);
        markTxt.anchorOffsetX = markTxt.width / 2;
        markTxt.anchorOffsetY = markTxt.height / 2;
        markTxt.x = 25;
        markTxt.y = 20;
        markTxt.rotation = -45;

        discountgroup.setScale(1.3);

        let descbg = BaseBitmap.create(`newsingledaytab4descbg-${code}`);
        this.addChild(descbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descbg, iconbg, [iconbg.width-10,0]);

        let descText = ComponentManager.getTextField(LanguageManager.getlocal(`acSingleDay2019gift${giftid}desc-${code}`), 18, TextFieldConst.COLOR_BLACK);
        descText.width = 200;
        descText.lineSpacing = 5;
        this.addChild(descText);
        descText.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descText, descbg, [10,0]);
        
        let originTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBeautyVoteViewTab3OldProce-1`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        let gemicon = BaseBitmap.create(`public_icon1`);
        let originPrice = ComponentManager.getTextField(`x${data.price}`,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        let line = BaseBitmap.create(`shopview_line`);
        line.width = 150;
        this.addChild(originTxt);
        this.addChild(gemicon);
        this.addChild(originPrice);
        this.addChild(line);

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, line, bg, [440,80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originTxt, line, [7,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemicon, originTxt, [originTxt.textWidth,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, originPrice, gemicon, [gemicon.width,0]);

        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, ``, ()=>{
            //
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
    
            let limitNum = data.limit - view.vo.getBuyShopList2(data.id);
            if(limitNum <= 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("acSingleDaybuyTips"));
                return;
            }
            if(Api.playerVoApi.getPlayerGem() < (data.price * data.rebate)){
                App.CommonUtil.showTip(LanguageManager.getlocal(`practice_batchBuyNotenoughdes`));
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(`acSingleDay2019Tip6-${code}`, [`${(data.price * data.rebate).toFixed(0)}`, LanguageManager.getlocal(`acSingleDay2019gift${giftid}-${code}`)]),
                    title : `itemUseConstPopupViewTitle`,
                    touchMaskClose : false,
                    callback : ()=>{
                        this.vo.lastidx = this._index;
                        this.vo.lasttype = 2;
                        this.vo.buytype = data.type;
                        this.vo.lastpos =  btn.localToGlobal(btn.width/2 + 50,20);
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWBUY,{
                            mType:2,
                            itemKey:data.id,
                            activeId:this.aid + "-" + this._code
                        })
                    },
                    handler : this,
                    needClose : 1,
                    needCancel : true,
                    bgRes : `newsingledaytab4gift${giftid}showbg-${this.getUiCode()}`,
                    height : 80,
                    titleTfColor: TextFieldConst.COLOR_BLACK,
                    titleTfOffY : 14
                }); 
               
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, line, [0,line.height + 20]);
        this.addChild(btn);
        btn.setText(`x${(data.price * data.rebate).toFixed(0)}`,false)
        btn.addTextIcon(`public_icon1`);
        view._btn = btn;

        let limitNum = data.limit - view.vo.getBuyShopList2(data.id);
        let limitTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]),18,0x21eb39);
        view.addChild(limitTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, limitTxt, descbg, [0,-limitTxt.height-3]);
        view._limitTxt = limitTxt;
        limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;

        this.refresh();
    }

    public refresh():void{
        let view = this;
        let data = view._data;
        let limitNum = data.limit - view.vo.getBuyShopList2(data.id);
        view._limitTxt.text = LanguageManager.getlocal("acSingleDayLimitBuy", [limitNum.toString()]);
        view._limitTxt.textColor = limitNum > 0 ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2;
        view._btn.setGray(limitNum == 0);
    }

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
    public dispose():void
    {
        super.dispose();
        this._limitTxt = null;
        this._btn = null;
        this._data = null;
    }
}