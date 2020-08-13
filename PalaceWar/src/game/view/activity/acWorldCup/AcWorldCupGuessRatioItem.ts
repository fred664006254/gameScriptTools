/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcWorldCupGuessRatioItem extends ScrollListItem
{
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
        let info = data.info;
        view.width = 430;
        
        let height = 54;
        //view.height = 125 + 10;
        view.height = height;
        let pos_arr = data.pos_arr;

        let cty = App.DateUtil.getFormatBySecond(view.vo.st + (data.day - 1)  * 86400,6);
        let dateTxt = ComponentManager.getTextField(cty, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, dateTxt, view, [pos_arr[0] + (48 - dateTxt.textWidth - 205) / 2,0]);
        view.addChild(dateTxt);

        let ratioTxt = ComponentManager.getTextField(data.ratio, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ratioTxt, view, [pos_arr[1] + (48 - ratioTxt.textWidth - 205) / 2,0]);
        view.addChild(ratioTxt);

        let line = BaseBitmap.create('public_line1');
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);

        if(data.day == view.vo.getCurDay()){
            dateTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            ratioTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
    }

	public dispose():void
    {
        let view = this;
        super.dispose();
    }
}