/**
 对战信息logitem
 * author qianjun
 */
class AcThreeKingdomsMyBattleLogItem extends ScrollListItem
{
	private _code : string = '';
	public constructor() 
	{
		super();
	}

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
    
	public initItem(index:number,rdata:any,itemparam?):void{
		let view = this;
		view.width = 520;
		view.height = 100;
		this._code = itemparam;
		let code = view.getUiCode();
        //获取最新一条记录
		let str = ``;
		let data = rdata.attacklog;
        if(data){
            //魏 玩家 （15服） （编号：1）成功防御了 吴国 玩家 （17服） 的进攻
            let param = [];
            //胜利方信息data.
            let downinfo = data.pklogs[0][3];
            let upinfo = data.pklogs[0][4];
            let downuid = downinfo.uid;
            let upuid = upinfo.uid;
            let isdownwin = Number(data.winuid) == Number(downuid);
            let winkingdom = LanguageManager.getlocal(`acThreeKingdomsTeam${isdownwin ? data.kingdom1 : data.kingdom2}-${code}`);
            let winname = isdownwin ? downinfo.name : upinfo.name;
            let winzid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? downinfo.uid : upinfo.uid));
            let winuid = isdownwin ? downuid : upuid;
            let fromkid = Math.ceil(data.mainland / 2);
            //1防御成功 2攻城成功
            let attacktype = isdownwin ? 2 : 1;
            let losekingdom = LanguageManager.getlocal(`acThreeKingdomsTeam${isdownwin ? data.kingdom2 : data.kingdom1}-${code}`);
            let losename = isdownwin ? upinfo.name : downinfo.name;
            let losezid = Api.mergeServerVoApi.getSeverName(Api.mergeServerVoApi.getTrueZid(isdownwin ? upinfo.uid : downinfo.uid));
            let loseuid = isdownwin ? upuid : downuid;
            param = [winkingdom,winname,winzid,losekingdom,losename,losezid];
            // pklogs[1]={firstflag,win,reports,ainfo,binfo}
            // ainfo = {uid=uid,name=mUserinfo.name,power=mUserinfo.power} 
            //attacklist[1]={id=id,attacklog=attacklog}
 
            //attacklog = {pklogs=pklogs,winuid=winuid,sidlist1=sidlist1,sidlist2=sidlist2,aBuff=aBuff,bBuff=bBuff,troopNum=troopNum,kingdom1=kingdom1,kingdom2=kingdom2,mainland=mainland,building=building}
            if(data.troopNum){
                attacktype = isdownwin ? 4 : 3;
                param.push(App.StringUtil.changeIntToText(data.troopNum.troopNum));
                if(data.mainland == 7){
                    let time = App.DateUtil.getFormatBySecond(data.time,20);
                    let timearr = time.split(`-`);
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomcenter${Number(timearr[2]) == 6 ? 1 : 2}`, code), [data.building]));
                }
                else{
                    param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdom${fromkid}_${(data.mainland % 2 == 0 ? 2 : 1) + 3}`, code), [data.building]));
                }
                // param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${fromkid}City${(data.mainland % 2 == 0 ? 2 : 1) + 3}Name`, code)));
                // param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdom${fromkid}_${(data.mainland % 2 == 0 ? 2 : 1) + 3}`, code), [data.building]));
            }
            param.push(App.DateUtil.getFormatBySecond(data.time, 2));
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmyPklog${attacktype}`, code), param);
        }

		let logTxt = ComponentManager.getTextField(`${index+1}.${str}`, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		logTxt.width = 440;
		logTxt.lineSpacing = 5;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, logTxt, view, [10,0], true);
        view.addChild(logTxt);
        
        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `allianceBtnCheck`, ()=>{
            this.vo.tmpinfo.cityid = data.mainland;
            this.vo.tmpinfo.kindomid = data.kingdom2
            this.vo.tmpinfo.judianid = data.building;
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GETLISTDETAIL,{
                activeId:view.acTivityId,
                id : rdata.id
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, view, [0,0], true);
        view.addChild(btn);

        let line : BaseBitmap = BaseBitmap.create(`public_line1`);
		line.width = view.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
		this.addChild(line);
    }



	public dispose():void{
		this._code='';
		super.dispose();
	}
}