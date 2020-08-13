/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcWorldCupTab2Item extends ScrollListItem
{
    private _data : any = null;
    private _posArr : any[] = [];
	public constructor() {
		super();
    }
    private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
    }

    private get acTivityId() : string{
        return `${AcConst.AID_ACWORLDCUP}-${this._code}`;
    }

    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
        view._data = data;
        let info = data.info;
        view.width = 606;
        
        let height = Object.keys(info).length * 52 + 55;
        //view.height = 125 + 10;
        view.height = height + 50;

        let line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, line1, view, [0,10]);
        view.addChild(line1);

        let day = view.vo.judgeTime(Number(data.time) + 1);
        let timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupGuessInfoTime', [App.DateUtil.getFormatBySecond(data.time,7), view.vo.getCurRatio(day).toString()]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, line1);
        view.addChild(timeTxt);

        let bg = BaseBitmap.create('public_9_bg32');
        bg.width = view.width;
        bg.height = height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, timeTxt, [0,timeTxt.textHeight + 5]);
        view.addChild(bg);

        let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
        titleBg.width = bg.width;
        titleBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titleBg, bg);
        view.addChild(titleBg);

        let desc = (titleBg.width - 4 * 24 * 4) / 5;
        for(let i = 1; i < 5; ++i){
            var guessTxtTitle = ComponentManager.getTextField(LanguageManager.getlocal(`AcWorldCupGuessTitle${i}`), 24, TextFieldConst.COLOR_WARN_YELLOW);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, guessTxtTitle, titleBg, [desc * i + 96 * (i - 1),0]);
            view._posArr.push(guessTxtTitle.x);
            view.addChild(guessTxtTitle);
        }

        let arr = [];
        for(let i in data.info){
            let unit = data.info[i];
            arr.push({
                'country' : i,
                'points' : unit,
                'ratio' : view.vo.getCurRatio(day),
                'pos_arr' : view._posArr
            });
        }
        let tmpRect =  new egret.Rectangle(0,30,606, Object.keys(info).length * 52);
		let scrollList = ComponentManager.getScrollList(AcWorldCupGuessInfoItem, arr, tmpRect, view._code);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleBg, [0, titleBg.height]);
        view.addChild(scrollList); 
        if(arr.length == 0){
            scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
        }
    }

    public getSpaceY():number{
        return 50;
    }

	public dispose():void
    {
        let view = this;
        super.dispose();
    }
}