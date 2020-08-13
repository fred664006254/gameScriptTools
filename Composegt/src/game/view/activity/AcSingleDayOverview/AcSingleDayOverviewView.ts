/*
 *desc : 双十一 总览
 */

class AcSingleDayOverviewView extends AcCommonView {
    public constructor() {
        super();
    }

    protected initView(): void {
        let titletxt = BaseBitmap.create("singledayoverview_txt");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        this.addChild(titletxt);

        //顶部背景图片
        let topbg = BaseBitmap.create('singledayoverview_topbg2');
        this.addChild(topbg);
        topbg.y = 70;

        let topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayOverviewTopDesc"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(topDesc);
        topDesc.lineSpacing = 5;
        topDesc.setPosition(topbg.x + 210, topbg.y + 30);

        //活动日期        
        let dateText = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeView_acTime-1", [this.vo.acTimeAndHour]), 22 ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(dateText);
        dateText.x = topDesc.x;
        dateText.y = topDesc.y + topDesc.height + 23;

        let Overview = this.cfg.Overview;
        Overview.sort((dataA: any, dataB: any) => {
            return dataA.sortID - dataB.sortID;
        });
        let startY = topbg.y + topbg.height;
        let spaceing = 20;
        let len = Overview.length;
        for (var index = 0; index < len; index++) {
            let accfg = Overview[index];
            let card = new SingleDayOverviewCard();
            card.init(accfg, this.aid, this.code);
            card.x = GameConfig.stageWidth / 2 - card.width / 2;
            if(GameConfig.stageHeigth - startY > 800){
                card.y = startY + 50 + index * (spaceing + card.height);
            }else{
                card.y = startY + 20 + index * (spaceing + card.height);
  
            }

            this.addChild(card);
        }

    }


    private get cfg(): Config.AcCfg.SingleDayOverviewCfg {
        return this.acVo.config;
    }
    private get vo(): AcSingleDayOverviewVo {
        return <AcSingleDayOverviewVo>this.acVo;
    }
    protected getRequestData(): { requestType: string, requestData: any } {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_SINGLEDAYOVERVIEWINFO, requestData: { activeId: this.vo.aidAndCode } };
    }
    protected receiveData(data: { ret: boolean, data: any }): void {
    }
    protected isShowTitleBgShadow() {
        return false;
    }
    protected getBgName(): string {
        return "singledayoverview_bg";
    }

    protected getTitleBgName(): string {
        return "singledayoverview_topbg1";
    }
    protected getTitleStr(): string {
        return null;
    }

    protected getResourceList(): string[] {
        let code = this.code;
        return super.getResourceList().concat([
            "singledayoverview_bg", "singledayoverview_topbg1", "singledayoverview_topbg2",
            "singledayoverview_txt", `singledayoverview_ac1_icon-${code}`, `singledayoverview_ac2_icon-${code}`,
            `singledayoverview_ac3_icon-${code}`,
        ]);
    }

    public dispose(): void {
        super.dispose();
    }
}


class SingleDayOverviewCard extends BaseDisplayObjectContainer {
    constructor() {
        super();
    }
    private aid: string = undefined;
    private code: string = undefined;
    private _vo: AcSingleDayOverviewVo = undefined;
    private _accfg: { aid: string, code: number, sortID: number } = undefined;
    private rewardBg: BaseBitmap = null;
    public init(accfg: { aid: string, code: number, sortID: number }, aid: string, code: string): void {

        this._accfg = accfg
        this.aid = aid;
        this.code = "" + code;
        this._vo = <AcSingleDayOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, "" + this.code);

        let rewardbg = BaseBitmap.create(`singledayoverview_ac${this._accfg.sortID}_icon-${this.code}`);
        let acfvo = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        this.addChild(rewardbg);
        this.width = rewardbg.width;
        this.height = rewardbg.height;
        rewardbg.touchEnabled = true;
        this.rewardBg = rewardbg;
        if (this.isAidShieldByIp()) {
        } else {
            rewardbg.addTouchTap(this.activitydHandler, this);
        }
        TickManager.addTick(this.tick, this);
        this.refreshActiStat();
    }

    private isAidShieldByIp() {
        return this._vo.isAidShieldByIp(this._accfg.aid);
    }
    private refreshActiStat() {
        let acfv = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        App.CommonUtil.removeIconFromBDOC(this);
        if (!acfv) return;
        if (this.isAidShieldByIp()) {
            return;
        }
        let acfvo: any = Api.acVoApi.getActivityVoByAidAndCode(acfv.aid, acfv.code);
        if (acfvo && (acfvo.isInActivity()||acfvo.isInExtra())){
            App.DisplayUtil.changeToNormal(this.rewardBg);
        }else{
            App.DisplayUtil.changeToGray(this.rewardBg);
            return;
        }
        //let tmp_vo = <AcSingleDayOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(this._accfg.aid,""+this._accfg.code);
        if (acfvo.isShowRedDot && acfvo.isInActivity() && !acfvo.isInExtra() && !this.isAidShieldByIp()) {
            App.CommonUtil.addIconToBDOC(this);
        } else {
            App.CommonUtil.removeIconFromBDOC(this);
        }


    }

    public tick(): boolean {
        this.refreshActiStat();
        return false;
    }
    private activitydHandler(event: any, cfg: any) {
        let acfv = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        if (!acfv) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }
        let acfvo: any = Api.acVoApi.getActivityVoByAidAndCode(acfv.aid, acfv.code);
        if (!acfvo) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }
        if (PlatformManager.checkHideIconByIP() && (this._accfg.aid == "gemLottery")) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
            return;
        }
        if (!acfvo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }

        let vo = Api.acVoApi.getActivityVoByAidAndCode(acfvo.aid, "" + acfvo.code);
        let viewClassName: string = "Ac" + App.StringUtil.firstCharToUper(acfvo.aid) + "View";
        if (vo && vo.isStart && viewClassName) {
            ViewController.getInstance().openView(viewClassName, acfvo.code);
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
        }
    }

    public dispose(): void {
        this.aid = null;
        this.code = null;
        this._accfg = null;
        this._vo = null;
        this.rewardBg = null;
        TickManager.removeTick(this.tick, this);

        super.dispose();
    }

}