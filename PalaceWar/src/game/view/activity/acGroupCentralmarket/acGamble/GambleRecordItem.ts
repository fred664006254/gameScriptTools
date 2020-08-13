/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 转盘活动 累计充值itemrender
 */
class GambleRecordItem  extends ScrollListItem
{
    private _code : string = '';
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.GambleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACMAYDAY, this._code);
    }

    private get vo() : AcGambleVo{
        return <AcGambleVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GAMBLE, this._code);
    }

    private get acTivityId() : string{
        return `${AcConst.AID_ACMAYDAY}-${this._code}`;
	}
    
    protected initItem(index:number,data:any,itemParam?:any){
        let view = this;
        view._code = itemParam;
        view.width = 502;
        view.height = 156 + view.getSpaceY();
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 502;
        bg.height = 156;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let tagRedRes = "accarnivalview_tab_red";
        if(PlatformManager.checkIsEnLang())
        {
            tagRedRes = "common_titlebg"
        }
        let tagRed = BaseBitmap.create(tagRedRes);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagRed, bg, [0,10]);
        view.addChild(tagRed);


        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRecordTitle-${view._code}`, [data.gambNum, data.gemNum]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, tagRed, [15,0]);
        view.addChild(titleTxt);
        tagRed.width = titleTxt.width+45;

        let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.st,10), 22, TextFieldConst.COLOR_WARN_GREEN2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeTxt, bg, [20,28]);
        view.addChild(timeTxt);

        let line = BaseBitmap.create("public_line1");
        line.width = view.width = 502;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, line, tagRed, [0,tagRed.height + 7]);
        view.addChild(line);

        let getTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRecord3-${view._code}`, [data.reward.split('_')[2]]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, getTxt, line, [245,37]);
        view.addChild(getTxt);

        //let dis = (92 - (data.ret.length - 1) * 6 - data.ret.length * 20) / (data.ret.length + 1);
        for(let i = 0; i < 3; ++ i){
            let str = 'acGambleRecord0';
            if(data.ret[i]){
                str = `acGambleRecord${data.ret[i]}`;
            }
            let resultTxt = ComponentManager.getTextField(LanguageManager.getlocal(`${str}-${view._code}`, [(Number(i) + 1).toString()]), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, resultTxt, line, [30, 6 + (Number(i) * 26)]);
            view.addChild(resultTxt);
            if(i == data.ret.length - 1){
                getTxt.y = resultTxt.y;
            }
        }
        // for(let i in data.ret){
        //     let unit = data.ret[i];
        //     let resultTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRecord${unit}-${view._code}`, [(Number(i) + 1).toString()]), 20, TextFieldConst.COLOR_BLACK);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, resultTxt, line, [30, dis + (Number(i) * 26)]);
        //     view.addChild(resultTxt);
        // }

       
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