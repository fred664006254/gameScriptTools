/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 七夕活动充值奖励itemrender
 */
class AcHuLaoListScrollItem  extends ScrollListItem
{    
    private index : number;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.HuLaoCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
    }

    private get vo() : AcHuLaoVo{
        return <AcHuLaoVo>Api.acVoApi.getActivityVoByAidAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
    }

    private get acTivityId() : string{
        return `${AcHuLaoView.AID}-${AcHuLaoView.CODE}`;
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
            needCount = this.cfg.skinActiveNum;

            let bgItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).iconBg);
            bgItem.x = 17;
            bgItem.y = 12;
            this.addChild(bgItem);
            let iconItem = BaseBitmap.create(Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).icon);
            iconItem.x = bgItem.x + 2;
            iconItem.y = bgItem.y + 2;
            iconItem.setScale(0.57);
            this.addChild(iconItem);

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

        // 门客id
        let servantId = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).servantId;
        if (index === 1 || !this.skinHave) {
            // 吕布皮肤碎片
            let ownTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_own_item_count",[
                LanguageManager.getlocal("servant_amuletAura_" + this.cfg.skinActiveId), 
                String(Api.amuletVoApi.getAmuletNum(servantId,String(this.cfg.skinActiveId))), 
                String(needCount)
            ]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON - 2, TextFieldConst.COLOR_BROWN);
            ownTxt.x = Math.min(435 - ownTxt.width/2, 506 - ownTxt.width);
            ownTxt.y = 25 - ownTxt.height/2;
            this.addChild(ownTxt);
        }

        if (this.skinHave) {
            // 已兑换
            let skinHaveSign: BaseBitmap = BaseBitmap.create("tigertrappass_exchanged");
            skinHaveSign.x = 435 - skinHaveSign.width/2;;
            skinHaveSign.y = 70 - skinHaveSign.height/2;
            this.addChild(skinHaveSign);
        } else {       
            // 兑换按钮
            let exchangeButton =  ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.exchangeClick,this);
            exchangeButton.x = 435 - exchangeButton.width/2;
            exchangeButton.y = 70 - exchangeButton.height/2;
            this.addChild(exchangeButton);
        }
    }

    private exchangeClick():void
    {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.index === 0) { // 兑换皮肤
            
            // 门客id
            let servantId = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).servantId;
            let amuletNum = Api.amuletVoApi.getAmuletNum(servantId,String(this.cfg.skinActiveId));
            if (amuletNum < this.cfg.skinActiveNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                return;
            }
            if (!Api.servantVoApi.getServantObj(String(Math.floor(Number(this.cfg.skinExchange)/10)))) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acTigertrappass_need_has_lvbu"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN, {activeId:this.acTivityId, rtype:1});
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