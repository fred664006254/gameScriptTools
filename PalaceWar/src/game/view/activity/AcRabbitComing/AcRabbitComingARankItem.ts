/**
 * author : qianjun
 * desc : 兔宝活动 帮会排行
 */
class AcRabbitComingARankItem  extends ScrollListItem{
    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.RabbitComingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRabbitComingVo{
        return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return AcConst.AID_RABBITCOMING;
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
	protected initItem(index:number,data:Config.AcCfg.RabbitComingAllirankItemCfg,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 530;
		view.height = 210;
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        let topbg = BaseBitmap.create("rabitcomingranktitle");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0,7])
        view.addChild(topbg);

        let titleStr:string = null; 
		if(data.rank[0] != data.rank[1])
		{
			titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile2",[data.rank[0].toString(),data.rank[1].toString()]);
		}
		else
		{
            titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1",[data.rank[0].toString()]);
            topbg.setRes(`rabitcomingranktitle${data.rank[0]}`);
        }
        
        let Txt1 = ComponentManager.getTextField(titleStr,24,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Txt1, topbg)
        view.addChild(Txt1);

        let allianceboss = ComponentManager.getTextField(LanguageManager.getlocal(`acRank_alliance_masterget1`),22,TextFieldConst.COLOR_BROWN);
        view.addChild(allianceboss);

        let str = data.getReward1;
        let rewardArr =  GameData.formatRewardItem(str);
        let bossgroup = new BaseDisplayObjectContainer();
        bossgroup.width = 400;
        bossgroup.height = Math.ceil(rewardArr.length/4) * 87 + (Math.ceil(rewardArr.length/4) - 1) * 8;
        view.addChild(bossgroup);
       
        let scroStartY = 0;
        let tmpX = 0;
        for(let index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.width = iconItem.height = 108;
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bossgroup.width-8)
            {
                tmpX = 0;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            bossgroup.addChild(iconItem);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bossgroup, bg, [0,45])
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, allianceboss, bossgroup, [-allianceboss.width-15,0]);

        let lineImg = BaseBitmap.create("public_line1");
        lineImg.width = 500;
        lineImg.height = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lineImg, bg, [0,bossgroup.y+bossgroup.height+7])
        view.addChild(lineImg);


        let memberTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acRank_alliance_memberget`),22,TextFieldConst.COLOR_BROWN);
        view.addChild(memberTxt);
        
        let str2 = data.getReward2;
        let rewardArr2 =  GameData.formatRewardItem(str2);
        let memgroup = new BaseDisplayObjectContainer();
        memgroup.width = 400;
        memgroup.height = Math.ceil(rewardArr.length/4) * 87 + (Math.ceil(rewardArr.length/4) - 1) * 8;
        view.addChild(memgroup);

     
        let scroStartY2 = 0;
        let tmpX2 = 0;
        for(let index = 0; index < rewardArr2.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr2[index],true,true);
            iconItem.width = iconItem.height = 108;
            iconItem.setScale(0.8);
            iconItem.x = tmpX2;
            iconItem.y = scroStartY2;
            tmpX2 += (iconItem.width * iconItem.scaleX +7);
            if (tmpX2 > memgroup.width-8)
            {
                tmpX2 = 0;
                scroStartY2 += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX2;
                iconItem.y = scroStartY2;
                tmpX2 += (iconItem.width  * iconItem.scaleX +7);
            }
            memgroup.addChild(iconItem);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, memgroup, bg, [0,lineImg.y+lineImg.height+7])
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, memberTxt, memgroup, [-allianceboss.width-15,0]);

        bg.height = memgroup.y + memgroup.height + 20;
        view.height = bg.height;
    }
    public getSpaceX():number{
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        // this._lastReqIdx = null;
        super.dispose();
    }
}