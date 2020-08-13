/**
 * 派遣任务奖励item
 * author qianjun
 * date 2017/9/28
 */
class AcThreeKingdomsTaskLevelItem extends ScrollListItem
{
	// 属性文本
    private _code = '';


    public constructor() 
	{
		super();
    }
    
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, this._code);
    }

	protected initItem(index:number,data:any,itemparam:any)
    {
        let view = this;
        view.width = 510;
        view.height = 155 + 10;
        view._code = itemparam.code;
        let cityid = itemparam.cityId;
        let cfg : Config.AcCfg.ThreeKingdomsTaskListCfg = data;
        // --needExp:需要经验值升级至下一级
        // --taskSlotIndiv:任务槽最大数量-个人
        // --taskSlotFid:好友任务，每日刷新数量
        // --ratio:个人任务刷新任务概率，品质由低到高（DCBAS）。
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg94");
		bg.width = view.width;
		bg.height = view.height - 5;
        view.addChild(bg);

        let levelbg = BaseBitmap.create(`common_titlebg`);
        view.addChild(levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, bg, [0,-3]);

        let taskType = BaseBitmap.create(`threekingdomstasktype${cfg.id}`);
        view.addChild(taskType);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, taskType, levelbg, [10,0]);

        let rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip3`,'1')), 22, TextFieldConst.COLOR_LIGHT_YELLOW)
        view.addChild(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardTxt, taskType, [taskType.width, 0]);
        
        //奖励物品
        let rewardstr = `1047_1_${data.addHeroExp}|${data.getReward}`
        let rIcons = GameData.getRewardItemIcons(rewardstr, true);
        let rewardGroup = new BaseDisplayObjectContainer();
        let tmp = Math.min(5,rIcons.length);
        rewardGroup.width = tmp * 88 + (tmp - 1) * 10;
        rewardGroup.x = bg.x + (bg.width - rewardGroup.width) / 2;
        rewardGroup.y = bg.y + 52;
        view.addChild(rewardGroup);
        
        let len = rIcons.length;
        let tmpX = 0;
        let scroStartY = 0;
        for (let innerIdx = 0; innerIdx < len; innerIdx++) {
            var element = rIcons[innerIdx];
            element.x = tmpX;
            element.y = 0;
            element.setScale(0.8);
            tmpX += (element.width*element.scaleX+10);
            if (tmpX >= (rewardGroup.width + 10))
            {
                tmpX = 0;
                scroStartY += element.height + 10;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width*element.scaleX+10);
            }
            element.cacheAsBitmap = true;
            rewardGroup.addChild(element);
        }

        let taskinfo = view.vo.getCityTaskStaus(cityid);
        let curlevel = taskinfo.level;
        if(data.id == curlevel){
            let flag = BaseBitmap.create(`threekingdomstaskflag`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, bg, [-2,-3]);
            view.addChild(flag);

            if(curlevel < 2){
                view.height = 205;
                let line = BaseBitmap.create(`titleupgradearrow`);
                line.anchorOffsetX = line.width / 2;
                line.anchorOffsetY = line.height / 2;
                line.rotation = 90;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height]);
                view.addChild(line);
            }
        }
	}

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }
    
	public dispose():void
    {
        super.dispose();
    }
}