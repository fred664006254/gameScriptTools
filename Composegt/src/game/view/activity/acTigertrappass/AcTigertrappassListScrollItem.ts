/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 七夕活动充值奖励itemrender
 */
class AcTigertrappassListScrollItem  extends ScrollListItem
{    
    private index : number;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.TigertrappassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
    }

    private get vo() : AcTigertrappassVo{
        return <AcTigertrappassVo>Api.acVoApi.getActivityVoByAidAndCode(AcTigertrappassView.AID, AcTigertrappassView.CODE);
    }

    private get acTivityId() : string{
        return `${AcTigertrappassView.AID}-${AcTigertrappassView.CODE}`;
    }
    private get skinHave() : boolean{
        return Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange));
    }
    
    protected initItem(index:number,data:any)
    {
        this.index = index;

		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = 518;
		bg.height = 137;
		this.addChild(bg);

        let name = "";
        let desc = "";
        let needCount = 1;
        if (index === 0) {
            name = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinName();
            desc = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).getSkinDesc();
            needCount = this.cfg.needChipNum;

            let bgItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).iconBg);
            bgItem.x = 17;
            bgItem.y = 12;
            this.addChild(bgItem);
            let iconItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).icon);
            iconItem.x = bgItem.x + 2;
            iconItem.y = bgItem.y + 2;
            iconItem.setScale(0.57);
            this.addChild(iconItem);

        } else if (index === 1) {   
            let rewardInfoVo = new RewardItemVo();
            rewardInfoVo.initData(this.cfg.chipExchangeitem);
            name = rewardInfoVo.name;
            desc = rewardInfoVo.desc;
            needCount = 1;

            let iconItem = GameData.getItemIcon(rewardInfoVo);
            iconItem.x = 17;
            iconItem.y = 12;
            this.addChild(iconItem);
            // iconItem.setScale(84/108);
        }

        //名称
		let nameTxtBg: BaseBitmap = BaseBitmap.create("public_biaoti2");
        nameTxtBg.width = 185
		nameTxtBg.x = 227 - nameTxtBg.width/2;
		nameTxtBg.y = 33 - nameTxtBg.height/2;
		this.addChild(nameTxtBg);
        let nameTxt : BaseTextField = ComponentManager.getTextField(name,TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTxt.x = nameTxtBg.x + nameTxtBg.width/2 - nameTxt.width/2;
        nameTxt.y = nameTxtBg.y + nameTxtBg.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);
        // 描述
        let descTxt : BaseTextField = ComponentManager.getTextField(desc,TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.x = 130;
        descTxt.y = 60; 
        descTxt.width = 220;
        this.addChild(descTxt);

        let costItemId = this.cfg.needChipid;
		let costItemCfg = Config.ItemCfg.getItemCfgById(Number(costItemId));
        let costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
        
        if (index === 1 || !this.skinHave) {
            // 吕布皮肤碎片
            let ownTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_own_item_count",[costItemCfg.name, String(costItemInfo?costItemInfo.num:0), String(needCount)]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON - 2, TextFieldConst.COLOR_BROWN);
            ownTxt.x = Math.min(435 - ownTxt.width/2, 506 - ownTxt.width);
            ownTxt.y = 25 - ownTxt.height/2;
            this.addChild(ownTxt);
        }

        if (index === 0 && this.skinHave) {
            // 已兑换
            let skinHaveSign: BaseBitmap = BaseBitmap.create("tigertrappass_exchanged");
            skinHaveSign.x = 435 - skinHaveSign.width/2;;
            skinHaveSign.y = 70 - skinHaveSign.height/2;
            this.addChild(skinHaveSign);
        } 
        
        if (index === 1 || !this.skinHave) {
            // 兑换按钮
            let exchangeButton =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.exchangeClick,this);
            exchangeButton.x = 435 - exchangeButton.width/2;
            exchangeButton.y = 70 - exchangeButton.height/2;
            this.addChild(exchangeButton);
        }

        if (index === 1 && !this.skinHave) {
            // 需要先兑换皮肤才行
            let skinFirstTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_need_exchange_skin_first2"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_RED);
            skinFirstTxt.x = 435 - skinFirstTxt.width/2;
            skinFirstTxt.y = 112 - skinFirstTxt.height/2;
            this.addChild(skinFirstTxt);
        }

    }

    private exchangeClick():void
    {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.index === 0) { // 兑换皮肤
            let costItemId = this.cfg.needChipid;
            let costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

            if (!costItemInfo || costItemInfo.num < this.cfg.needChipNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
            if (!Api.servantVoApi.getServantObj(String(Math.floor(Number(this.cfg.skinExchange)/10)))) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_need_has_lvbu"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN, {activeId:this.acTivityId, rtype:1});
        } else if (this.index === 1) { // 兑换奸臣令
            if (!this.skinHave) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_need_exchange_skin_first1"));
                return;
            }

            let costItemId = this.cfg.needChipid;
            let costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

            if (!costItemInfo || costItemInfo.num < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_REDEEMSKIN, {activeId:this.acTivityId, rtype:2});
        }
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
    public dispose():void
    {
        super.dispose();
    }
}