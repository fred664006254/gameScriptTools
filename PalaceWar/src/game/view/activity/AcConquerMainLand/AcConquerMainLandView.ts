/**
 * author:qianjun
 * desc:定军中原入口
*/
class AcConquerMainLandView extends AcCommonView{
    private _timeCDTxt : BaseTextField = null;
    private _enterBtn : BaseButton = null;
    private _descTxt : BaseTextField = null;
    private _descBg : BaseBitmap = null;
    private _list : ScrollList = null;
    private _curPeriod : number = 1;
    private _detailBtn : BaseButton = null;
    private _titele1Txt : BaseTextField = null;
    private _titele2Txt : BaseTextField = null;
    private _titele3Txt : BaseTextField = null;
    private _day : number = 0;

	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `forpeople_top`, `dailyboss_enter`, `wifestatus_namebg`, `mainland${code}`
		]);
    }
    
    protected getTitleStr():string{
        return `acConquerMainLand-1_Title`;
    }

	protected getBgName():string{
		return `mlenterbg-${this.getUiCode()}`;
    }
    
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	protected initBg():void{
		let bgName:string=this.getBgName();
		if(bgName){
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
		}
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_MAINLAND_ZRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setZrankinfo(data.data.data);
        } 
    }
    
    // protected getRequestData():{requestType:string,requestData:any}{	
	// 	return {
    //         requestType:NetRequestConst.REQUEST_MAINLAND_GETINFO,
    //         requestData:{
    //             activeId : this.acTivityId
    //         }
    //     };
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void{
    //     if(data.data.data){ 
           
    //     } 
    // }
    

	public initView():void{	
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETINFO),view.getinfo,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO), view.armyinfo, view);

        view._day = view.vo.getNowDay();
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETINFO,{
            activeId : view.acTivityId, 
        });

        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO,{
            activeId : view.acTivityId, 
        });
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.freshView,view)
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG),view.getKilllog,view);
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK),view.freshBottom,view);
        let topBg = BaseBitmap.create(`forpeople_top`);
        view.addChild(topBg);

        view._curPeriod = view.vo.getCurPeriod();
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandActTime-${code}`, [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        let str = '';
        if(view._curPeriod == 1){
            str = LanguageManager.getlocal(`acBattleRoundNotStart-1`);
        }
        else{
            if(view.vo.isInActivity()){
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else{
                str = `<font color=0xff3c3c>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
            }
        }
        view.addChild(dateTxt);

        let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandActCD-${code}`, [String(view.vo.isInActivity() ? 0x21eb39 : 0xff3c3c), str]), 20);
        view.addChild(cdTxt);
        view._timeCDTxt = cdTxt;

        topBg.height = dateTxt.textHeight + cdTxt.textHeight + 10 + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, topBg, [13, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cdTxt, dateTxt, [0, dateTxt.textHeight + 10]);

        let enterBtn = ComponentManager.getButton(`mlenterinflag${view._curPeriod}-${code}`, ``, ()=>{
            if(view.vo.getCurPeriod() == 2){
                //
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW,{
                    aid : view.aid,
                    code : view.code
                });
            }
        }, view)
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enterBtn, view);
        view.addChild(enterBtn);
        view._enterBtn = enterBtn;

        let descbg = BaseBitmap.create(`wifestatus_namebg`);
        let attend = view.vo.isCanJoin();
        let param = ``;
        if(view._curPeriod == 3){
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if(view._curPeriod == 4){
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        let descstr = ``;
        if(view._curPeriod == 1){
            descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
        }
        else{
            descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${attend ? view._curPeriod : 0}-${code}`, [param])
        }
        let descTxt = ComponentManager.getTextField(descstr, 22);
        descbg.width = descTxt.textWidth + 100;
        descbg.height = descTxt.textHeight + 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, enterBtn, [0,enterBtn.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        view.addChild(descbg);
        view.addChild(descTxt);
        view._descTxt = descTxt;
        view._descBg = descbg;

        let rankbg = BaseBitmap.create(`public_9_downbg`);
        rankbg.width = GameConfig.stageWidth;
        rankbg.height = 160;
        view.addChild(rankbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankbg, view);
        
        let titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal(`rankorder`), 22);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titele1Txt, rankbg, [50,25]);
        view._titele1Txt = titele1Txt;
        
        let titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`rankServer`), 22);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titele2Txt, rankbg, [0,25]);
        view._titele2Txt = titele2Txt;

        let titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScore-${code}`), 22);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, titele3Txt, rankbg, [65,25]);
        view._titele3Txt = titele3Txt;

        let ranklist = view.vo.getZrankList();
        let scroRect = new egret.Rectangle(0, 0, rankbg.width, 80);
        let arr = [];
        if(view._curPeriod > 1 && !view.vo.isInJudge()){
            for(let i in ranklist){
                let unit = ranklist[i];
                unit.pos = [{width : titele1Txt.textWidth, x : titele1Txt.x}, {width : titele2Txt.textWidth, x : titele2Txt.x}, {width : titele3Txt.textWidth, x : titele3Txt.x}];
                arr.push(unit);
            }
        }
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandRankItem, arr, scroRect);
        view.addChild(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, rankbg, [0,60]);
        view._list = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal(view.vo.isInJudge() ? `acBattleGroundTip11-1` : `acBattleRoundNotStart-1`, [param]));

        let detailBtn = ComponentManager.getButton(`mldetailbtn-${code}`, ``, ()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILVIEW,{
                aid : view.aid,
			    code : view.code
            });
        }, view);
        view.addChild(detailBtn);
        view._detailBtn = detailBtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, detailBtn, rankbg, [20, rankbg.height + 10]);
        if(view.vo.isShowRedDot){
            App.CommonUtil.addIconToBDOC(detailBtn);
            let red = <BaseBitmap>view._detailBtn.getChildByName("reddot");
            if (red)
            {
                red.setPosition(60, 0);
            }             
        }
        else{
            App.CommonUtil.removeIconFromBDOC(detailBtn);
        }
    }

	private infoClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW,{
			aid : view.aid,
			code : view.code
		});
	}

	protected getRuleInfo():string{
		return this.vo.getThisCn("AcConquerMainLandRule");
    }


	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
        let view = this;
        let day = Math.ceil((GameData.serverTime - view.vo.st) / 86400);
        let key = `ConquerMainLand-${view.getUiCode()}report-${Api.playerVoApi.getPlayerID()}-${view.vo.st}-${day}`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, `1`);
            return {title:{key:`acConquerMainLandreporttitle-${view.getUiCode()}`},msg:{key:`acConquerMainLandreportmsg-${view.getUiCode()}`}};
        }
        else{
            return null;
        }
	}

	public tick():void{	
        let view = this;
        let code = view.getUiCode();
        let str = '';
        let period = view.vo.getCurPeriod();
        let attend = view.vo.isCanJoin();
        if(period != view._curPeriod){
            view._enterBtn.setBtnBitMap(`mlenterinflag${period}-${code}`);
        }

        if(view.vo.isShowRedDot){
            App.CommonUtil.addIconToBDOC(view._detailBtn);
            let red = <BaseBitmap>view._detailBtn.getChildByName("reddot");
            if (red)
            {
                red.setPosition(60, 0);
            }             
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._detailBtn);
        }

        if(period == 1){
            str = LanguageManager.getlocal(`acBattleRoundNotStart-1`);
        }
        else{
            if(view.vo.isInActivity()){
                str = App.DateUtil.getFormatBySecond(view.vo.getCountDown());
            }
            else{
                str = `<font color=0xff3c3c>${LanguageManager.getlocal(`acPunishEnd`)}</font>`;
            }
        }
        view._timeCDTxt.text = LanguageManager.getlocal(`acConquerMainLandActCD-${code}`, [String(view.vo.isInActivity() ? 0x21eb39 : 0xff3c3c), str]);
        
        let param = ``;
        if(period == 3){
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if(period== 4){
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        if(view._descTxt){
            let descstr = ``;
            if(period == 1){
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
            }
            else{
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${attend ? period : 0}-${code}`, [param])
            }
            view._descTxt.text = descstr;
            view._descBg.width = view._descTxt.textWidth + 100;
            view._descBg.height = view._descTxt.textHeight + 30;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._descBg, view._enterBtn, [0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
        }
        view._curPeriod = period;
        view._day = view.vo.getNowDay();
	}

	private enterInHandler() : void{
		let view = this;
    }
    
    private update():void{
        let view = this;
        let code = view.getUiCode();
        let str = '';
        let period = view.vo.getCurPeriod();
        let attend = view.vo.isCanJoin();
        if(period != view._curPeriod){
            // view._enterBtn.setRes(`mlenterinflag${period}-${code}`);
            let param = ``;
            if(period == 3){
                param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
            }
            else if(period== 4){
                param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
            }
            if(view._descTxt){
                let descstr = ``;
                if(period == 1){
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
                }
                else{
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${attend ? view._curPeriod : 0}-${code}`, [param])
                }
                view._descTxt.text = descstr;
                view._descBg.width = view._descTxt.textWidth + 100;
                view._descBg.height = view._descTxt.textHeight + 30;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._descBg, view._enterBtn, [0,view._enterBtn.height]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
            }

            let ranklist = view.vo.getZrankList();
            let arr = [];
            if(period > 1){
                for(let i in ranklist){
                    let unit = ranklist[i];
                    unit.pos = [{width : view._titele1Txt.textWidth, x : view._titele1Txt.x}, {width : view._titele2Txt.textWidth, x : view._titele2Txt.x}, {width : view._titele3Txt.textWidth, x : view._titele3Txt.x}];
                    arr.push(unit);
                }
            }
            view._list.refreshData(arr, view.code);
        }
    }

    private getinfo(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if( evt.data.ret && data){
            view.vo.setZidInfo(data.zidgroup);
        }
    }

    private armyinfo(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if( evt.data.ret && data){
            view.vo.setMyTeamInfo(data.allteam);
            let score = 0;
            if(data.myscore && data.myscore.score){
                score = data.myscore.score;
            }
            this.vo.setMyScore(score);
        }
    }

	public dispose():void{
        let view = this;
        view._timeCDTxt = null;
        view._enterBtn = null;
        view._list = null;
        view._curPeriod = 1;
        view._descTxt = null;
        view._detailBtn = null;
        view._titele1Txt = null;
        view._titele2Txt = null;
        view._titele3Txt = null;
        view._day = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view)
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETINFO),view.getinfo,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO), view.armyinfo, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIPEBOSS_REFRESH,view.freshView,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH),view.searchCallback,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSKILLLOG),view.getKilllog,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK),view.freshBottom,view);
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM),view.getBossNum,view);
		super.dispose();
	}
}