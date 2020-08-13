/**
 * author:qianjun
 * desc:日期轮数item
*/
class AcConquerMainLandTimebuffItem extends ScrollListItem{

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

	protected initItem(index:number, data:any, itemparam:any){	
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        let view = this;
        view._code = itemparam;
        view.width = 605;
		let count = 0;
		for(let i in data){
            let unit = data[i];
            if(unit.buff == 0){
                continue;
            }
            ++ count;
        }

        view.height = 89 + 24 * (count + 1) + 15 + 10 - 24;

        let code = view.getUiCode();
       
        let bgres = ``;
        switch(index){
            case 0:
                bgres = `public_9_bg70`
                break;
            case 1:
                bgres = `public_9_bg14`
                break;
            case 2:
                bgres = `public_9_bg66`
                break;

        }
        let bg = BaseBitmap.create(bgres);
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);

        let roundbg = BaseBitmap.create(`public_9_managebg`);
        roundbg.width = 580;
        roundbg.height = bg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roundbg, bg, [0, 25]);
        view.addChild(roundbg);
        
        let titlebg = BaseBitmap.create(`mainlanddetailtitlebg${index + 1}-${code}`);
        view.addChild(titlebg);

        let titleTxt = BaseBitmap.create(`mainlanddetailtitle${index + 1}-${code}`);
        view.addChild(titleTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, bg, [0, 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titlebg, [0,2]);

        let titleroundbg = BaseBitmap.create(`accrackerpopbg-1`);
		titleroundbg.width = roundbg.width;
		titleroundbg.height = 35;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleroundbg, titlebg, [0, titlebg.height]);
        view.addChild(titleroundbg);
        
        let titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleRotation`), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele1Txt, titleroundbg, [30,0]);
        
        let titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`palace_history_title3`), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele2Txt, titleroundbg, [210,0]);
        
        let titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandratio-${code}`), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, titele3Txt, titleroundbg, [45,0]);

        let ranklist = data;
		let arr = [];
		for(let i in ranklist){
            let unit = ranklist[i];
            if(unit.buff == 0){
                continue;
            }
			unit.pos = [{width : titele1Txt.textWidth, x : titele1Txt.x}, {width : titele2Txt.textWidth, x : titele2Txt.x}, {width : titele3Txt.textWidth, x : titele3Txt.x}];
            unit.day = index + 1;
            arr.push(unit);
        }
        let scroRect = new egret.Rectangle(0, 0, titleroundbg.width, arr.length * 24 + 5);
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandRoundItem, arr, scroRect, view.code);
        view.addChild(scrollList);
        scrollList.setContentPosY(10);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleroundbg, [0,titleroundbg.height - 3]);
    }

	public dispose():void{
        let view = this;
        super.dispose();
    }
}