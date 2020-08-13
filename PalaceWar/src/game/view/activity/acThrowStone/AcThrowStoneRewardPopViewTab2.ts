/**
 * 投石奖励
 * author yangchengguo
 * date 2019.8.28
 * @class AcThrowStoneRewardTab2
 */
class AcThrowStoneRewardPopViewTab2 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);

        let listbg = BaseBitmap.create("public_9_bg14");
        listbg.width = 530;
        listbg.height = 670;
        listbg.setPosition(25, 65);
        this.addChild(listbg);

        let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 540;
		titleBg.height = 35;
		titleBg.setPosition(listbg.x + listbg.width / 2 - titleBg.width / 2, listbg.y + 8);
        this.addChild(titleBg);
        
        let titleInfo = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneStoneRewardTitle-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleInfo.setPosition(titleBg.x + titleBg.width/2 - titleInfo.width/2 , titleBg.y + titleBg.height/2 - titleInfo.height/2);
        this.addChild(titleInfo);

        App.LogUtil.log("rewardarr: "+this.cfg.getPoolRewards());
        let rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
		let rewardScale = 0.83;
        let scrolNode:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		
		// scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
		scrolNode.width = listbg.width - 20;
		let rect = new egret.Rectangle(listbg.x + 10, titleBg.y + titleBg.height + 5 , listbg.width - 20, listbg.height - 10);
        let scrollview : ScrollView = ComponentManager.getScrollView(scrolNode, rect);
		scrollview.bounces = false;
		scrollview.x = listbg.x + 10;
		scrollview.y = titleBg.y + titleBg.height + 5;
		scrollview.horizontalScrollPolicy = 'off';
        this.addChild(scrollview);
        for(let i in rewardArr){
			let icon = rewardArr[i];
			let idx = Number(i);
			icon.x = 9 + (idx % 4) * (icon.width + 20);
			icon.y = 5 + Math.floor(idx / 4) * (icon.width + 8);
			scrolNode.addChild(icon);
		}
    }

    public getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }


	private get cfg():Config.AcCfg.ThrowStoneCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcThrowStoneVo{
        return <AcThrowStoneVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public dispose(){
        super.dispose();
    }
}