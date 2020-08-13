/**
 * author:qianjun
 * desc:阵营排行item
*/
class AcThreeKingdomsActicityItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

    private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_THREEKINGDOMS;
    }

    private get code() : string{
        return this._code;
    }
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
    private _code : string = '';

    protected initItem(index:number,data:any,itemparam:any)
    {   
        let view = this;
        view._code = itemparam;
        view.width = 618
        view._data = data;
        let code = view.getUiCode();
        //	week : i, 第{1}周
        // aid活动aid
        // weekst 周一0点
        // weeket  下周一0点
        // acet活动结束时间,
        // acst活动开始时间
        //start上周日21：30
        //end本周日21：30
        //activity 活动组

        let rankTitle = BaseBitmap.create(`threekingdomspranksupplybg`);
        view.addChild(rankTitle);

        let roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip4`, code), [data.week]), 32, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roundTxt, rankTitle, [16,15]);
        view.addChild(roundTxt);

        let timeparam = `${App.DateUtil.getFormatBySecond(data.weekst,15)}-${App.DateUtil.getFormatBySecond(data.end,15)}`;
        let dateTxt =  ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRank3Tip5`, code), [timeparam]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, roundTxt, [0,roundTxt.textHeight+18]);
        view.addChild(dateTxt);

        let tmpRect =  new egret.Rectangle(0,0,610,Math.max(data.activity.length * 140, 140));
        let scrollList = ComponentManager.getScrollList(AcThreeKingdomsActivityRewardItem, data.activity, tmpRect, view.code);
        scrollList.setEmptyTip(LanguageManager.getlocal(`acGambleNoRewardTip-1`));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, rankTitle, [0, rankTitle.height+6]);
        //scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
        view.addChild(scrollList);
        view.height = tmpRect.height + scrollList.y
    }
    
	public dispose():void{
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}