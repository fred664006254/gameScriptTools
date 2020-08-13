/**
 * 	圣诞活动
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
class AcChristmasTaskView extends CommonView {

    private code: any = null;
    private aid: any = null;
    private _scrollList: ScrollList = null;
    public constructor() {
        super();
    }

    protected getContainerY():number
	{
		return 0;
	}

    public initView() {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD, this.christmasTaskRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;

        if (this.titleTF){
            this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
        }

        let bg = BaseBitmap.create("public_9_bg22");
        this.addChildToContainer(bg);
        bg.width = 640;
        if (this.getTypeCode() == "8"){
            bg.setRes("public_9_probiginnerbg");
            bg.width = 620;
            let lineStr = ResourceManager.hasRes("acchristmas-"+this.getTypeCode()+"_line") ? "acchristmas-"+this.getTypeCode()+"_line" : "acchristmas-_line";
            let line = BaseBitmap.create(lineStr);
            line.setPosition(this.titleBg.x + this.titleBg.width/2 - line.width/2, this.titleBg.y + this.titleBg.height - 1);
            this.addChildToContainer(line);
            bg.height = GameConfig.stageHeigth - line.y - line.height + 5;
            bg.setPosition(10, line.y + line.height - 15);
        }
        else{
            bg.height = GameConfig.stageHeigth - 89;
            bg.setPosition(0, -15);
        }
        let bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        let rect = new egret.Rectangle(0, 0, 608, bg2.height - 15);
        if (this.getTypeCode() == "8"){
            bg2.visible = false;
            rect = new egret.Rectangle(0, 0, 608, bg2.height + 5);
        }
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let taskData = vo.getSortTask();
        taskData.sort((a, b) => { return a.sortId - b.sortId });
       
        this._scrollList = ComponentManager.getScrollList(AcChristmasTaskScrollItem, taskData, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);
        if (this.getTypeCode() == "8"){
            this._scrollList.y = bg2.y - 2;
        }

    }
    /**
     * 领奖回调
     */
    private christmasTaskRewardHandel(event: egret.Event) {
        if (event && event.data && event.data.ret) {
            // taskId
            let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            let list: { icon: string, tipMessage: string, type: number }[] = [];
            let taskData = vo.getSortTask();
            taskData.sort((a, b) => { return a.sortId - b.sortId });
            this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
            let reward = event.data.data.data.rewards;
            let rewardVo = GameData.formatRewardItem(reward);
            for (let key in rewardVo) {
                let item: { icon: string, tipMessage: string, type: number } = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            let taskId = event.data.data.data.taskId;
            let starnum = acCfg.getTaksCfgId(taskId).specialReward;
            let icon = "acchristmasview_itemiconstar";
            if(this.isValentines())
            {
                icon = "acchristmasview_itemiconstar_" + this.isValentines();
            }
            else if(this.getUiCode())
            {
                icon = "acchristmasview_itemiconstar_" + this.getUiCode();
            }
            else if (this.isMagpiesBridge()){
                icon = "acchristmasview_itemiconstar_" + this.isMagpiesBridge();
            }
            else if (this.getTypeCode() == "8"){
                icon = "acchristmasview_itemiconstar_" + this.getTypeCode();
            }
            let starItem: { icon: string, tipMessage: string, type: number } = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
            list.push(starItem);
            App.CommonUtil.playRewardFlyAction(list);
        }
    }
    private refreashView() {
        let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        let taskData = vo.getSortTask();
        taskData.sort((a, b) => { return a.sortId - b.sortId });
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
    }
     /**是否情人节 */
    private isValentines() {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    }
    protected getUiCode(): string {
        if (this.param.data.code == "5") {
            return "5"
        }
        return null;
    }
    protected isMagpiesBridge():string{
        if (this.param.data.code == "6" || this.param.data.code == "7"){
            return "6";
        }
        return null;
    }

    private getTypeCode():string{
        if (this.param.data.code == "9" || this.param.data.code == "10"){
            return "8";
        }
        return this.param.data.code;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleStr(): string {
        if (this.getTypeCode() == "8"){
            return null;
        }
        return super.getTitleStr();
    }
    // 标题背景名称
    protected getTitleBgName(): string {
        if(this.isValentines()||this.getUiCode() || this.isMagpiesBridge())
        {
            return "commonview_titlebg";
        }
        else if (this.getTypeCode() == "8"){
            return "acchristmasview_titlebg_"+this.getTypeCode();
        }
        else
        {
            return "commonview_snowtitlebg";
        }
    }
    protected getRuleInfo(): string {
        return "acChristmasRuleInfo_"+ this.param.data.code;
    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
        ]);
    }

    public dispose(): void {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD, this.christmasTaskRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        super.dispose();
    }

}