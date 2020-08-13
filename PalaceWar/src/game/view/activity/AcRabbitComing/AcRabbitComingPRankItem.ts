/**
 * author : qianjun
 * desc : 兔宝活动 个人排行
 */
class AcRabbitComingPRankItem  extends ScrollListItem{
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
	protected initItem(index:number,data:Config.AcCfg.RabbitComingPrankItemCfg,itemparam:any)
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

        let str = data.getReward;
        let rewardArr =  GameData.formatRewardItem(str);
        let scroStartY = 50;
        let len = Math.min(5, rewardArr.length)
        let tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (let index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            this.addChild(iconItem);
        }
        scroStartY += (108 * 0.8 + 22);
        bg.height = scroStartY;
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