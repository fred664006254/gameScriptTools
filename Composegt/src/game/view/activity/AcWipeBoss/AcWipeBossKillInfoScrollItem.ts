/**
 * 击杀流水item
 * author qianjun
 * date 2017/12/07
 * @class AllianceBossRankScrollItem
 */
class AcWipeBossKillInfoScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }
    private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, this._code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_WIPEBOSS, this._code);
    }

    private _code;
    protected initItem(index:number,data:any,itemparam)
    {
        let view = this;
        view._code = itemparam;
		view.width = 510;
		view.height = 136 + 10;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		// let item : RewardItemVo;
		// if(data.effect){
		// 	item = GameData.formatRewardItem('6_1004_1')[0];
		// }
		// else{
		// 	item = GameData.formatRewardItem(data.goods)[0];
		// }
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");  
		bg.width = view.width;
		bg.height = view.height - 5; 
		view.addChild(bg); 
        // this.width = GameConfig.stageWidth;
        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        // let rankImg = BaseBitmap.create("rankinglist_rankbg");
        // rankImg.x = 20;
        // rankImg.y = 15;
        // view.addChild(rankImg);

        let trankTxt1 = ComponentManager.getTextField(String(index+1)+".",20,TextFieldConst.COLOR_BROWN);
        trankTxt1.x = 20;
        trankTxt1.y = 15;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, trankTxt1, rankImg);
        view.addChild(trankTxt1);
    
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        nameTxt.text = data.name;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, trankTxt1, [trankTxt1.width + 15,0]);
        view.addChild(nameTxt);

        let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.time, 2), 20,TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeTxt, bg, [25,15]);
        view.addChild(timeTxt);

        let lineImg = BaseBitmap.create("public_line1");
        lineImg.width = 500;
        lineImg.height = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lineImg, bg, [0,43]);
        view.addChild(lineImg);

        let cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
        let servantcfg = Config.ServantCfg.getServantItemById(data.servantId);
        let str = cfg.type == 1 ? LanguageManager.getlocal('acwipeBossAllKillInfoDesc', [servantcfg.name,cfg.npcName]) : (LanguageManager.getlocal('acwipeBossAllOpenInfoDesc', [cfg.npcName]));
        let tip1Txt = ComponentManager.getTextField(str,18,TextFieldConst.COLOR_BROWN)
        tip1Txt.width = 460;
        tip1Txt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1Txt, lineImg, [0,10]);
        view.addChild(tip1Txt);

        //击杀奖励
        let icon = GameData.formatRewardItem(data.reward);
        let reward_str = '';
        for(let i in icon){
            if(PlatformManager.checkIsViSp()){
                reward_str += (`,${icon[i].name}+${icon[i].num}`)
            } else {
                reward_str += (`、${icon[i].name}+${icon[i].num}`)
            }
            
        }
        if(cfg.type == 2){
            reward_str = reward_str.substring(1,reward_str.length);
        }
        let rewardstr = cfg.type == 1 ? (LanguageManager.getlocal('acwipeBossAllKillReward', [cfg.killScore.toString(),reward_str])) : (LanguageManager.getlocal('acwipeBossAllOpenReward',[reward_str]));
        let killRewardTxt:BaseTextField = ComponentManager.getTextField(rewardstr,18, TextFieldConst.COLOR_WARN_GREEN);
        killRewardTxt.width = 460;
        killRewardTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, tip1Txt, [0,tip1Txt.textHeight + 10]);
        view.addChild(killRewardTxt);

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
    }
}