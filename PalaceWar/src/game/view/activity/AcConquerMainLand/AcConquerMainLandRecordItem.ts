/**
 * author:qianjun
 * desc:战功记录Item
*/
class AcConquerMainLandRecordItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
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

	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        /**参数 
        *   time 时间戳 
            type 1 开战提示 2倍率变动 3今日战斗结束 4我方成功占领 5敌方攻占 6我方撤出 7npc战斗 11使用嘉奖令
            cityId 地点
            uid 敌方uid
            army 军队 123
            lasttime 占领时长
            score 总获取战功
            buff 倍率
        */
        view._code = itemparam;
        view.width = 606;
        let code = view.getUiCode();

        let tipTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 480;
        tipTxt.lineSpacing = 5;

        let cityName = ``;
        if(data.cityId){
           cityName = view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`);
        }
        let param = new Array<egret.ITextElement>();
        switch(data.type){
            case 1:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [App.DateUtil.getFormatBySecond(data.time, 13), LanguageManager.getlocal(`acmainlandwar${data.army}-${code}`)]);
                break;
            case 2:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [App.DateUtil.getFormatBySecond(data.time, 13), data.buff]);
                break;
            case 3:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [App.DateUtil.getFormatBySecond(data.time, 13), LanguageManager.getlocal(`acmainlandwar${data.army}-${code}`)]);
                break;
            case 4:
            case 7:
                param.push({
                    text : `${App.DateUtil.getFormatBySecond(data.time, 13)}\n`,
                    style : {textColor : 0x3e9b00},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord4-${code}`)
                },
                {
                    text : cityName, 
                    style : {"underline": true },
                });
                break;
            case 5:
                param.push({
                    text : `${App.DateUtil.getFormatBySecond(data.time, 13)}\n`,
                    style : {textColor : 0x3e9b00},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_1-${code}`, [`${data.fname}${LanguageManager.getlocal(`atkraceyamenid`, [data.fuid])}`]),
                },
                {
                    text : cityName + "\n", 
                    style: {"underline": true },
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_2-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data.army}-${code}`)]), 
                },
                {
                    text : cityName, 
                    style: {"underline": true },
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_3-${code}`, [App.DateUtil.getFormatBySecond(data.lasttime, 14)]), 
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_4-${code}`, [data.score]), 
                    style : {textColor : 0xbb2800},
                },
                );
                break;
            case 6:
                param.push({
                    text : `${App.DateUtil.getFormatBySecond(data.time, 13)}\n`,
                    style : {textColor : 0x3e9b00},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_1-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data.army}-${code}`)]),
                },
                {
                    text :cityName, 
                    style: {"underline": true },
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_2-${code}`), 
                },
                {
                    text : cityName,
                    style: {"underline": true },
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_3-${code}`, [App.DateUtil.getFormatBySecond(data.lasttime, 14)]), 
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_4-${code}`, [data.score]), 
                    style : {textColor : 0xbb2800},
                },
                );
                break;
            case 11:
                param.push({
                    text : `${App.DateUtil.getFormatBySecond(data.time, 13)}\n`,
                    style : {textColor : 0x3e9b00},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_1-${code}`), 
                },    
                {
                    text :cityName, 
                    style: {"underline": true },
                },                            
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_2-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data.army}-${code}`)]),
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_3-${code}`, [data.usenum]),
                },                
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_4-${code}`, [data.score]), 
                    style : {textColor : 0xbb2800},
                },
                );
                break;                
        }
        if(param.length){
            tipTxt.textFlow = param;
        }
        view.height = Math.max(tipTxt.textHeight, 50) + 50 + 5;

        if(data.cityId){
            tipTxt.addTouchTap(()=>{
                if(!view.vo.isInActivity()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattlePassTimeEnd`));
                    return;
                }
                //跳转前往战场
                let period = view.vo.getCurPeriod();
                if(period == 2){
                    let warview : any = ViewController.getInstance().getView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW);
                    let baseview : any = ViewController.getInstance().getView('AcConquerMainLandDetailView');
                    if(warview){
                        baseview.hide();
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDCITYINFOVIEW,{
                            aid : view.aid,
                            code : view.code,
                            cityLevel : data.citylevel,
                            cityNum : data.cityNum
                        });
                    }
                    else{
                        ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW,{
                            aid : view.aid,
                            code : view.code,
                            change : {
                                level : data.citylevel,
                                num : data.cityNum
                            }
                        });
                        baseview.hide();
                    }
                }
                else if(period == 3){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acConquerMainLandTip25-${code}`));
                }
            }, view, null);
        }
       
        let bg = BaseBitmap.create(data.type == 5 ? "public_9_bg66" : "public_9_bg14");  
        bg.width  = view.width;
        bg.height = view.height; 
        view.addChild(bg); 

        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bg, [20,0]);

        if(data.cityId && data.type != 6 && data.type != 11){
            let hfBtn = ComponentManager.getButton(`dinner_detail`, ``, ()=>{
                if(data.type == 7){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acmainlandrecordtip1-${code}`));
                    return;
                }
                let wardata = {
                    info : {
                        team : data.fightteam.mteam,
                        titleId : data.title,
                        zid : Api.mergeServerVoApi.getTrueZid(data.uid),
                        name : data.name,
                    },
                    tinfo : {
                        team : data.fightteam.fteam,
                        titleId : data.ftitle,
                        zid : Api.mergeServerVoApi.getTrueZid(data.fuid),
                        name : data.fname,
                    },
                }
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARSHOWVIEW,{
                    aid : this.aid,
                    code : this.code,
                    wardata : wardata,
                    result : data.type == 4 ? `win` : `fail`,
                    cityName : view.vo.getCityName(`${data.citylevel}_${data.cityNum}`),
				    cityName2 : view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`),
                });
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, bg, [40,0]);
            view.addChild(hfBtn);
        }

        view.addChild(tipTxt);
    }
    
    public getSpaceY(){
        return 0;
    }
    
	public dispose():void{
        let view = this;
        super.dispose();
    }
}