/**
 * author:qianjun
 * desc:定军中原入口
*/
class AcConquerMainLandView extends AcCommonView {
    private _timeCDTxt: BaseTextField = null;
    private _enterBtnBg: BaseBitmap = null;
    private _enterBtn: BaseBitmap = null;
    private _descTxt: BaseTextField = null;
    private _descBg: BaseBitmap = null;
    private _list: ScrollList = null;
    private _curPeriod: number = 1;
    private _titele1Txt: BaseTextField = null;
    private _titele2Txt: BaseTextField = null;
    private _titele3Txt: BaseTextField = null;
    private _day: number = 0;

    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.ConquerMainLandCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcConquerMainLandVo {
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
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

    protected getResourceList(): string[] {
        let code = this.getUiCode();
        return super.getResourceList().concat([
            `dailyboss_enter`, `mainland${code}`,
            `mldetailbtn-${code}_down`, `mldetailbtn-${code}`,
            `mldetailtarbar1-${code}_down`,`mldetailtarbar1-${code}`,`mldetailtarbar2-${code}_down`,
            `mldetailtarbar2-${code}`,`mldetailtarbar3-${code}_down`,`mldetailtarbar3-${code}`,
            `mldetailtarbar4-${code}_down`,`mldetailtarbar4-${code}`,`mlenterinflag1-${code}`,
            `mlenterinflag2-${code}`,`mlenterinflag3-${code}`,`mlenterinflag4-${code}`,
            `mlinfight-${code}`,`mlservantinfight-${code}`,`mainland_enterflag-${code}`,
            "battleground_detailtxt","battleground_detailbtn",`rank_1`,`rank_2`,`rank_3`,
            `commonview_border2`, `commonview_bottom`,`commonview_border1`
        ]);
    }

    protected getTitleStr(): string {
        return `acConquerMainLand-1_Title`;
    }

    protected getBgName(): string {
        return `mlenterbg-${this.getUiCode()}`;
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    protected initBg(): void {
        let bgName: string = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.y = GameConfig.stageHeigth - 1136;
        }
    }

    protected getRequestData(): { requestType: string, requestData: any } {
        return {
            requestType: NetRequestConst.REQUEST_MAINLAND_ZRANK,
            requestData: {
                activeId: this.acTivityId
            }
        };
    }

    protected receiveData(data: { ret: boolean, data: any }): void {
        if (data.data.data) {
            this.vo.setZrankinfo(data.data.data);
        }
    }



    public initView(): void {
        let view = this;
        let code = view.getUiCode();
        if(!this.vo.firstflag){
            this.openShowView();
        }
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAINLAND_GETINFO, view.getinfo, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, view.armyinfo, view);

        view._day = view.vo.getNowDay();
        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETINFO, {
            activeId: view.acTivityId,
        });

        NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, {
            activeId: view.acTivityId,
        });
        let topBg = BaseBitmap.create(`public_9v_bg10`);
        topBg.width = GameConfig.stageWidth;
        view.addChild(topBg);

        view._curPeriod = view.vo.getCurPeriod();
        let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandActTime-${code}`, [view.vo.acTimeAndHour]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        let str = '';
        if (view._curPeriod == 1) {
            str = LanguageManager.getlocal(`acBattleRoundNotStart-1`);
        }
        else {
            str = this.vo.acCountDown;
        }
        view.addChild(dateTxt);

        let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandActCD-${code}`, [str]), 18 ,TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(cdTxt);
        view._timeCDTxt = cdTxt;

        topBg.height = dateTxt.textHeight + cdTxt.textHeight + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.titleBg, [0, view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, topBg, [13, 15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdTxt, topBg, [13, 15]);


        let rankbg = App.CommonUtil.getCommonBorderFrame(240);
        view.addChild(rankbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rankbg, view);

        let listBg = BaseBitmap.create('public_listbg3');
        listBg.width = 620;
        listBg.height = rankbg.height - 40;
        listBg.setPosition(10,rankbg.y + 20);
        view.addChild(listBg);

        let innerKuang = BaseBitmap.create("public_9v_bg12"); 
        innerKuang.width = listBg.width - 30;
        innerKuang.height = listBg.height - 30;
        innerKuang.setPosition(listBg.x + 15,listBg.y +15);
        this.addChild(innerKuang);

        let listTitle = BaseBitmap.create("public_ts_bg01");
        listTitle.width = 570;
        listTitle.setPosition(35,listBg.y + 15)
        this.addChild(listTitle);
        

        let enterBtnBg = BaseBitmap.create(`mainland_enterflag-${code}`);
        enterBtnBg.setPosition(GameConfig.stageWidth/2 - enterBtnBg.width/2 , topBg.y + (rankbg.y - topBg.y)/2 - enterBtnBg.height/2 - 50);
        view.addChild(enterBtnBg);
        enterBtnBg.addTouchTap(() => {
            if (view.vo.getCurPeriod() == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDWARVIEW, {
                    aid: view.aid,
                    code: view.code
                });
            }
        }, view);
        view._enterBtnBg = enterBtnBg;
        if(this._curPeriod == 2){
            App.DisplayUtil.changeToNormal(view._enterBtnBg);
        }else{
            App.DisplayUtil.changeToGray(view._enterBtnBg);
        }

        let enterBtn = BaseBitmap.create(`mlenterinflag${this._curPeriod}-${code}`);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,enterBtn,enterBtnBg,[0,0]);
        view.addChild(enterBtn);
        view._enterBtn = enterBtn;

        let descbg = BaseBitmap.create(`mainland_entertip-${code}`);
        let attend = view.vo.isCanJoin();
        let param = ``;
        if (view._curPeriod == 3) {
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if (view._curPeriod == 4) {
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        let descstr = ``;
        if(attend){
            if (view._curPeriod == 1) {
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
            }
            else {
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${view._curPeriod}-${code}`, [param])
            }
            if(this.vo.isLastPeriod()){
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip5-${code}`)
  
            }
        }else{
            descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip0-${code}`, [param])
   
        }

        let descTxt = ComponentManager.getTextField(descstr, 22);
        descTxt.width = descbg.width - 20;
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, enterBtn, [0, enterBtn.height+80]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);
        view.addChild(descbg);
        view.addChild(descTxt);
        view._descTxt = descTxt;
        view._descBg = descbg;



        let titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal(`rankorder`), 22,TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titele1Txt, rankbg, [80, 40]);
        view._titele1Txt = titele1Txt;

        let titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`rankServer`), 22,TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titele2Txt, rankbg, [-5, 40]);
        view._titele2Txt = titele2Txt;

        let titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScore-${code}`), 22,TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, titele3Txt, rankbg, [80, 40]);
        view._titele3Txt = titele3Txt;

        let ranklist = view.vo.getZrankList();
        let scroRect = new egret.Rectangle(0, 0, rankbg.width, 140);
        let arr = [];
        if (view._curPeriod > 1 && !view.vo.isInJudge()) {
            for (let i in ranklist) {
                let unit = ranklist[i];
                unit.pos = [{ width: titele1Txt.textWidth, x: titele1Txt.x }, { width: titele2Txt.textWidth, x: titele2Txt.x }, { width: titele3Txt.textWidth, x: titele3Txt.x }];
                arr.push(unit);
            }
        }
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandRankItem, arr, scroRect);
        view.addChild(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, rankbg, [0, 70]);
        view._list = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal(view.vo.isInJudge() ? `acBattleGroundTip11-1` : `acBattleRoundNotStart-1`, [param]),TextFieldConst.COLOR_BROWN_NEW);

        let detailBtnBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, detailBtnBg, rankbg, [25, rankbg.height + 20]);
        this.addChild(detailBtnBg);

        let detailBtn:BaseButton = ComponentManager.getButton("battleground_detailbtn","", () => {
            ViewController.getInstance().openView(ViewConst.COMMON.ACCONQUERMAINLANDDETAILVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        detailBtn.x = detailBtnBg.x+detailBtnBg.width/2 - detailBtn.width/2;
        detailBtn.y = detailBtnBg.y+detailBtnBg.height/2 - detailBtn.height/2;
        this.addChild(detailBtn);
        let detailStr:BaseBitmap=BaseBitmap.create("battleground_detailtxt");
        detailStr.x = detailBtnBg.x + detailBtnBg.width/2 - detailStr.width /2;
        detailStr.y = detailBtnBg.y + detailBtnBg.height - detailStr.height/2;
        this.addChild(detailStr);

    }

    private openShowView(){
        ViewController.getInstance().openView('AcConquerMainLandFirstShowView', {
            code: this.code
        });
    }
    private infoClick(): void {
        let view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW, {
            aid: view.aid,
            code: view.code
        });
    }

    protected getRuleInfo(): string {
        return `AcConquerMainLandRule-${this.getUiCode()}`;
    }


	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    // protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
    //     let view = this;
    //     let day = Math.ceil((GameData.serverTime - view.vo.st) / 86400);
    //     let key = `ConquerMainLand-${view.getUiCode()}report-${Api.playerVoApi.getPlayerID()}-${view.vo.st}-${day}`;
    //     let storage = LocalStorageManager.get(key);
    //     if (!storage) {
    //         LocalStorageManager.set(key, `1`);
    //         return { title: { key: `acConquerMainLandreporttitle-${view.getUiCode()}` }, msg: { key: `acConquerMainLandreportmsg-${view.getUiCode()}` } };
    //     }
    //     else {
    //         return null;
    //     }
    // }

    public tick(): void {
        let view = this;
        let code = view.getUiCode();
        let str = '';
        let period = view.vo.getCurPeriod();
        let attend = view.vo.isCanJoin();
        if (period != view._curPeriod) {
            view._enterBtn.setRes(`mlenterinflag${period}-${code}`);
            if(period == 2){
                App.DisplayUtil.changeToNormal(view._enterBtnBg);
            }else{
                App.DisplayUtil.changeToGray(view._enterBtnBg);

            }
        }

        if (period == 1) {
            str = LanguageManager.getlocal(`acBattleRoundNotStart-1`);
        }
        else {
            str = this.vo.acCountDown;
   
        }
        view._timeCDTxt.text = LanguageManager.getlocal(`acConquerMainLandActCD-${code}`, [str]);
        this._timeCDTxt.x = GameConfig.stageWidth - this._timeCDTxt.width - 13;

        let param = ``;
        if (period == 3) {
            param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
        }
        else if (period == 4) {
            param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
        }
        if (view._descTxt) {
            let descstr = ``;
            if(attend){
                if (view._curPeriod == 1) {
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
                }
                else {
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${view._curPeriod}-${code}`, [param])
                }
                if(this.vo.isLastPeriod()){
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip5-${code}`)
      
                }
            }else{
                descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip0-${code}`, [param])
       
            }
            view._descTxt.text = descstr;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._descBg, view._enterBtn, [0, view._enterBtn.height+80]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
        }
        view._curPeriod = period;
        view._day = view.vo.getNowDay();
    }

    private enterInHandler(): void {
        let view = this;
    }

    private update(): void {
        let view = this;
        let code = view.getUiCode();
        let str = '';
        let period = view.vo.getCurPeriod();
        let attend = view.vo.isCanJoin();
        if (period != view._curPeriod) {
            let param = ``;
            if (period == 3) {
                param = App.DateUtil.getFormatBySecond(view.vo.getPeriodTime());
            }
            else if (period == 4) {
                param = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, view.vo.getWinServer());
            }
            if (view._descTxt) {
                let descstr = ``;
                if(attend){
                    if (view._curPeriod == 1) {
                        descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip1-${code}`, [param]);
                    }
                    else {
                        descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip${view._curPeriod}-${code}`, [param])
                    }
                    if(this.vo.isLastPeriod()){
                        descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip5-${code}`)
          
                    }
                }else{
                    descstr = LanguageManager.getlocal(`acConquerMainLandAttendTip0-${code}`, [param])
           
                }
                view._descTxt.text = descstr;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._descBg, view._enterBtn, [0, view._enterBtn.height+80]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._descTxt, view._descBg);
            }

            let ranklist = view.vo.getZrankList();
            let arr = [];
            if (period > 1) {
                for (let i in ranklist) {
                    let unit = ranklist[i];
                    unit.pos = [{ width: view._titele1Txt.textWidth, x: view._titele1Txt.x }, { width: view._titele2Txt.textWidth, x: view._titele2Txt.x }, { width: view._titele3Txt.textWidth, x: view._titele3Txt.x }];
                    arr.push(unit);
                }
            }
            view._list.refreshData(arr, view.code);
        }
    }

    private getinfo(evt: egret.Event): void {
        let view = this;
        let data = evt.data.data.data;
        if (data) {
            view.vo.setZidInfo(data.zidgroup);
            view.vo.setBuff(data.buff);
        }
    }

    private armyinfo(evt: egret.Event): void {
        let view = this;
        let data = evt.data.data.data;
        if (data) {
            view.vo.setMyTeamInfo(data.allteam);
            let score = 0;
            if (data.myscore && data.myscore.score) {
                score = data.myscore.score;
            }
            this.vo.setMyScore(score);
        }
    }

    public dispose(): void {
        let view = this;
        view._timeCDTxt = null;
        view._enterBtn = null;
        view._enterBtnBg = null;
        view._list = null;
        view._curPeriod = 1;
        view._descTxt = null;
        view._titele1Txt = null;
        view._titele2Txt = null;
        view._titele3Txt = null;
        view._day = 0;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view)
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAINLAND_GETINFO, view.getinfo, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAINLAND_GETMYTEAMINFO, view.armyinfo, view);
        super.dispose();
    }
}