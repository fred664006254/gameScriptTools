/**
 * author : qianjun
 * desc : 排行榜
 */
class AcSingleDay2019RankItem  extends ScrollListItem
{
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
	protected initItem(index:number,data:Config.AcCfg.SingleDayNewGemRankItem,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 627;
		view.height = 237;
        //创建ui
        //背景图片
        let code = view.getUiCode();
        let bg = BaseBitmap.create(`newsingledaytab2bottombg-${code}`);
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        let detailBgImg = BaseBitmap.create("acmidautumnview_titlebg");
        detailBgImg.width = 607;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailBgImg, bg, [0,5]);
        this.addChild(detailBgImg);

        let line = BaseBitmap.create(`public_line3`);
		view.addChild(line);

        let rankstr = ``;
        if (Number(index) < 3){
            rankstr = LanguageManager.getlocal("acRank_rank6",[String(index + 1)]);
        }else{
            if(data.minRank < data.maxRank){
                rankstr = LanguageManager.getlocal("acRank_rank4",[String(data.minRank),String(data.maxRank)]);
            }
            else{
                rankstr = LanguageManager.getlocal("acRank_rank6", [data.minRank.toString()]);
            }
        }

		let roundTxt = ComponentManager.getTextField(rankstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        line.width = 550;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, detailBgImg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
        view.addChild(roundTxt);

        let str = data.getReward;
        let rewardArr =  GameData.formatRewardItem(str);
		let row = Math.ceil(rewardArr.length / 5);//行数
       
        let len = Math.min(5, rewardArr.length);
        let scroStartY = rewardArr.length > 5 ? 55 : 80;
        let tmpX = (view.width - len * 108 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = (view.width - len * 108- (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            this.addChild(iconItem);
        }
        scroStartY += 135;
        bg.height = scroStartY;
        this.height = bg.height;
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