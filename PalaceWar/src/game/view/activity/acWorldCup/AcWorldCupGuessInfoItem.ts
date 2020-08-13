/**
 * author:qianjun
 * desc:区服排行榜单item
*/
class AcWorldCupGuessInfoItem extends ScrollListItem
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
        view.width = 606;
        
        let height = 52;
        //view.height = 125 + 10;
        view.height = height;
        let pos_arr = data.pos_arr;

        let cty = LanguageManager.getlocal(`AcWorldCupCountry${data.country}`);
        let countryTxt = ComponentManager.getTextField(cty, 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, countryTxt, view, [pos_arr[0] + (96 - countryTxt.textWidth) / 2,0]);
        view.addChild(countryTxt);
        
        let icon1 = BaseBitmap.create('worldcupfootball');
        let pointsTxt = ComponentManager.getTextField((data.points * view.cfg.coinLimit).toFixed(0), 22, TextFieldConst.COLOR_BLACK);
        
        let desc = pos_arr[1] + (96 - pointsTxt.textWidth - icon1.width) / 2;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon1, view, [desc ,0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, pointsTxt, icon1, [icon1.width,0]);
        view.addChild(icon1);
        view.addChild(pointsTxt);

        let str = '';
        let resultTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        if(view.vo.getCurPeriod() < 3){
            str = LanguageManager.getlocal('AcWorldCupGuessUnknow');
        }
        else{
            str = LanguageManager.getlocal(Number(data.country) == view.vo.getChampid() ? 'AcWorldCupGuessRight' : 'AcWorldCupGuessWrong');
            resultTxt.textColor = Number(data.country) == view.vo.getChampid() ? TextFieldConst.COLOR_QUALITY_GREEN : TextFieldConst.COLOR_QUALITY_RED;
        }
        resultTxt.text = str;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, resultTxt, view, [pos_arr[2] + (96 - resultTxt.textWidth) / 2,0]);
        view.addChild(resultTxt);

        let icon2 = BaseBitmap.create('worldcupfootball');
        let str2 = '';
        let getPointsTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        if(view.vo.getCurPeriod() < 3){
            str2 = LanguageManager.getlocal('AcWorldCupGuessUnknow');
        }
        else{
            str2 = Number(data.country) == view.vo.getChampid() ? (data.points * data.ratio * view.cfg.coinLimit).toFixed(0) : (data.points * view.cfg.ratio1 * view.cfg.coinLimit).toFixed(0);
        }
        getPointsTxt.text = str2;

        let desc2 = pos_arr[3] + (96 - getPointsTxt.textWidth - icon2.width) / 2;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, view, [desc2 ,0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, getPointsTxt, icon2, [icon2.width,0]);
        view.addChild(icon2);
        view.addChild(getPointsTxt);

        let line = BaseBitmap.create('public_line1');
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
    }

	public dispose():void
    {
        let view = this;
        super.dispose();
    }
}