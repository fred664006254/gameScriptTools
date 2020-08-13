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

	protected initItem(index:number,data:any,itemparam:any){	
        let view = this;
        /**参数 
        *   time 时间戳 
            type 1 开战提示 2倍率变动 3今日战斗结束 4我方成功占领 5敌方攻占 6我方撤出 7npc战斗
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

        let timeBgStr = "mainland_recorditem_timebg1";
        if(data.type == 5){
            timeBgStr = "mainland_recorditem_timebg2";
        }
        let timeBg = BaseBitmap.create(timeBgStr);
        timeBg.setPosition(this.x + 20 ,this.y + 12);
        this.addChild(timeBg);

        let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.time, 13),20,TextFieldConst.COLOR_BROWN_NEW)
        timeTxt.setPosition(timeBg.x + 10 , timeBg.y +8);
        this.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.width = 460;
        tipTxt.lineSpacing = 5;
        tipTxt.x = timeTxt.x;
        tipTxt.y = timeBg.y + timeBg.height + 10;

        let cityName = ``;
        if(data.cityId){
           cityName = view.vo.getCityName(`${data.citylevel}_${data.cityNum}_${data.cityIdx}`);
        }
        let param = new Array<egret.ITextElement>();
        switch(data.type){
            case 1:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [LanguageManager.getlocal(`acmainlandwar${data.army}-${code}`)]);
                break;
            case 2:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [data.buff]);
                break;
            case 3:
                tipTxt.text = LanguageManager.getlocal(`acmainlandrecord${data.type}-${code}`, [LanguageManager.getlocal(`acmainlandwar${data.army}-${code}`)]);
                break;
            case 4:
            case 7:
                param.push(
                {
                    text : LanguageManager.getlocal(`acmainlandrecord4-${code}`)
                },
                {
                    text : cityName, 
                    style : {"underline": true ,textColor : 0x11a972 },
                });
                break;
            case 5:
                param.push(
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_1-${code}`, [data.fname]),
                },
                {
                    text : cityName + "\n", 
                    style: {"underline": true ,textColor : 0x11a972},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_2-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data.army}-${code}`)]), 
                },
                {
                    text : cityName, 
                    style: {"underline": true ,textColor : 0x11a972},
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
                param.push(
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_1-${code}`, [LanguageManager.getlocal(`acmainlandarmy${data.army}-${code}`)]),
                },
                {
                    text :cityName, 
                    style: {"underline": true ,textColor : 0x11a972},
                },
                {
                    text : LanguageManager.getlocal(`acmainlandrecord${data.type}_2-${code}`), 
                },
                {
                    text : cityName,
                    style: {"underline": true ,textColor : 0x11a972},
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
        }
        if(param.length){
            tipTxt.textFlow = param;
        }
        view.height = Math.max(tipTxt.height + timeBg.height + 5, 50) + 50 + 5;

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
        

        if(data.cityId && data.type != 6){
            let hfBtn = ComponentManager.getButton(`mainland_recorditem_review`, ``, ()=>{
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
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, hfBtn, this, [35,0]);
            view.addChild(hfBtn);
        }

        view.addChild(tipTxt);

        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y  = this.height - line.height;
    }
    
    public getSpaceY(){
        return 0;
    }
    
	public dispose():void{
        let view = this;
        super.dispose();
    }
}