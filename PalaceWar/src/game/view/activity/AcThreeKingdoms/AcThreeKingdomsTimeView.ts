/**
 * 三国争霸时间说明表
 * author qianjun
 */
class AcThreeKingdomsTimeView extends PopupView{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
           `public_9_bg62`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        let code = view.getUiCode();
        let vo = view.vo;
        let cfg = view.cfg;
        //总轮数
        let roundnum = cfg.lastTime / 7;
        let temH = 10;
        let group = new BaseDisplayObjectContainer();
        group.width = 530;
        view.addChildToContainer(group);
        let curweek = vo.getCurWeek();
        let arr = [];
        if(curweek > 1){
            let temp = curweek;
            while(temp <= roundnum){
                arr.push(temp);
                ++ temp;
            }
            temp = curweek - 1;
            while(temp > 0){
                arr.push(temp);
                -- temp;
            }
        }
        else{
            let temp = 1;
            while(temp <= roundnum){
                arr.push(temp);
                ++ temp;
            }
        }
        
        for(let t = 1; t <= arr.length; ++ t){
            let week = arr[t - 1];
            let titlebg = BaseBitmap.create(`public_9_bg95`);
            group.addChild(titlebg);

            let isin = false;
            let key = '';
            if(view.vo.getCurPeriod() == 1){
                key = `acThreeKingdomsEnter1`;
            }
            else if(view.vo.getCurPeriod() == 2){
                //本周周一活动开始时间
                let st = vo.activeSt + (week - 1) * (7 * 86400) + this.cfg.activeTime[0].popularityRange[0] * 3600;
                //本周周日活动结束时间
                let et = vo.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + this.cfg.activeTime[4].popularityRange[1] * 3600;
                if(GameData.serverTime < st){
                    key = `acThreeKingdomsEnter1`;
                }
                else if(GameData.serverTime >= st && GameData.serverTime < et){
                    key = `acThreeKingdomsEnter5`;
                    isin = true;
                }
                else{
                    key = `acThreeKingdomsEnter4`;
                }
                
            }
            else{
                key = `acThreeKingdomsEnter4`;
            }
            let str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(key,code))
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRound`, code), [week.toString(), str]), 20, isin ? TextFieldConst.COLOR_WARN_YELLOW : TextFieldConst.COLOR_BROWN);
            titlebg.width = tipTxt.width + 80;
            titlebg.setPosition(group.x + group.width / 2 - titlebg.width / 2,temH);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, titlebg);
            group.addChild(tipTxt);

            let listbg = BaseBitmap.create(`public_9_bg44`);
            listbg.width = 530;
            group.addChild(listbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, titlebg, [0,titlebg.height+10]);

            let topBg = BaseBitmap.create(`public_9_bg33`);
            topBg.width = listbg.width;
            topBg.height = 33;
            group.addChild(topBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, listbg);

            //本周周一0点
            let start = vo.activeSt + (week - 1) * (7 * 86400) + this.cfg.activeTime[0].popularityRange[0] * 3600;;//vo.activeSt + (week - 1) * (7 * 86400);
            //下周一0点
            let end = vo.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + this.cfg.activeTime[4].popularityRange[1] * 3600;//vo.activeSt + week * (7 * 86400)
            let dateTxt =  ComponentManager.getTextField(`${App.DateUtil.getFormatBySecond(start,15)}-${App.DateUtil.getFormatBySecond(end,15)}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dateTxt, topBg);
            group.addChild(dateTxt);

            let height = listbg.y + 42;
            for(let k = 1; k <= 8; ++ k){
                let unit : Config.AcCfg.ThreeKingdomsActiveCfg = cfg.activeTime[(k < 6 ? k : (k - 3)) - 1];
                let key = '';
                let date = ``;
                let st = App.DateUtil.getWeeTs(GameData.serverTime) + unit.popularityRange[0] * 3600;
                let et = App.DateUtil.getWeeTs(GameData.serverTime) + unit.popularityRange[1] * 3600;
                let timeparam = `${App.DateUtil.getFormatBySecond(st,12)}-${App.DateUtil.getFormatBySecond(et,12)}`;
                let isNowRound = false;

                switch(k){
                    case 1:
                        //本周周一-周五 正常任务
                        date = `${App.DateUtil.getFormatBySecond(start,7)}-${App.DateUtil.getFormatBySecond(start+4*86400,7)}`;
                        key = `acThreeKingdomsRoundDesc1`;
                        if(week == vo.getCurWeek() && GameData.serverTime >= start && GameData.serverTime < (start+5*86400)){
                            isNowRound = true;//GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 2:
                        //最后一周神将突袭
                        if(week == roundnum){
                            date = `${App.DateUtil.getFormatBySecond(start,7)}-${App.DateUtil.getFormatBySecond(start+4*86400,7)}`;
                            key = `acThreeKingdomsRoundDesc2`;
                            if(week == vo.getCurWeek() && GameData.serverTime >= start && GameData.serverTime < (start+5*86400)){
                                isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                            }
                        }
                        break;
                    case 3:
                    case 6:
                        //本周六日 第一场攻城
                        date = `${App.DateUtil.getFormatBySecond(start+(k > 3 ? 6 : 5)*86400,7)}`;
                        key = `acThreeKingdomsRoundDesc3`;
                        if(week == vo.getCurWeek() && GameData.serverTime >= (start+(k > 3 ? 6 : 5)*86400) && GameData.serverTime < (start+(k > 3 ? 7 : 6)*86400)){
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 4:
                    case 7:
                        //本周六 第二场攻城
                        date = `${App.DateUtil.getFormatBySecond(start+(k > 4 ? 6 : 5)*86400,7)}`;
                        key = `acThreeKingdomsRoundDesc4`;
                        if(week == vo.getCurWeek() && GameData.serverTime >= (start+(k > 4 ? 6 : 5)*86400) && GameData.serverTime < (start+(k > 4 ? 7 : 6)*86400)){
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                    case 5:
                    case 8:
                        //本周六 激战
                        date = `${App.DateUtil.getFormatBySecond(start+(k > 5 ? 6 : 5)*86400,7)}`;
                        key = `acThreeKingdomsRoundDesc5_${k > 5 ? 2 : 1}`;
                        if(week == vo.getCurWeek() && GameData.serverTime >= (start+(k > 5 ? 6 : 5)*86400) && GameData.serverTime < (start+(k > 5 ? 7 : 6)*86400)){
                            isNowRound = GameData.serverTime >= st && GameData.serverTime < et;
                        }
                        break;
                }
                if(date != ``){
                    let str = `${date}${timeparam}${LanguageManager.getlocal(App.CommonUtil.getCnByCode(key, code))}`;
                    let txt = ComponentManager.getTextField(`${date}${timeparam}`, 20);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, group, [0, height], true);

                    let txt1 = ComponentManager.getTextField(`${date}${timeparam}`, 20);
                    if (PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()){
                        txt1.text = `${date}${" "}${timeparam}`;
                    }
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt1, group, [55, height], true);
                    group.addChild(txt1);

                    let txt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(key, code)), 20);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt2, group, [335, height], true);
                    group.addChild(txt2);

                    let line = BaseBitmap.create(`public_line1`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, txt, [0,txt.height+7]);
                    group.addChild(line);

                    height = line.y + line.height + 10;
                    if(isNowRound){
                        txt1.textColor = txt2.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                        let curTime = BaseBitmap.create(`threekingdomscurtime`);
                        group.addChild(curTime);
                        curTime.y = txt1.y - 5;
                        curTime.x = 1;
                    }
                }
            }
            listbg.height = height- 10 - listbg.y
            temH = listbg.y + listbg.height + 7;
        }

        let scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0,0,530,655));
        scrollview.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollview.width / 2,10);
        view.addChildToContainer(scrollview);
    }

    protected getShowHeight() : number{
        return 760;
    }
	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsTip22`, this.getUiCode());
    }

	public dispose():void{
        let view = this;
		super.dispose();
	}
}