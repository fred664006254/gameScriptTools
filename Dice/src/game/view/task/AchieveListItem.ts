/*
 *@description: 成就列表 item
 *@author: hwc 
 *@date: 2020-06-09 10:25:14
 *@version 1.0.0
 */

class AchieveListItem extends ScrollListItem {
    private _bg:BaseBitmap = null;
    private _title: BaseTextField;
    private randomProgress: ProgressBar;
    private _rewardBtn:BaseButton = null;
    private _rewardBg:BaseBitmap = null;
    private _type:number = 0;

    /**成就id */
    private _achid = null;

    public dispose():void
    {
        this._bg = null;
        this._rewardBtn = null;
        this._title = null;
        this.randomProgress = null;
        this._rewardBtn = null;
        this._type = 0;
        super.dispose();
    }

    constructor(){
        super()
     }
    protected initItem(index:number,data:any,itemParam?:any):void {
        this._achid = data;
        let stage = Api.AchievementVoApi.getStageByID(data);
        let achcfg = Config.AchievementCfg.getAchItemCfgByID(data, stage);
        let achvo = Api.AchievementVoApi.getAchinfoByID(data);

        this._bg = BaseBitmap.create("taskachievement");
        this._bg.width = 495;
        this._bg.y = 10;
        this.addChild(this._bg);

        this._title = ComponentMgr.getTextField('1', TextFieldConst.SIZE_28, ColorEnums.white);
        this.addChild(this._title);
        this._title.x = 14;
        this._title.y = this._bg.y + 15;
        this._title.text = Config.AchievementCfg.getAchieveTitle(data);
        this._title.strokeColor = 0x08131A;

        this.randomProgress = ComponentMgr.getProgressBar("ab_task_view_progress", "ab_task_progress_bg", 471);
        this.addChild(this.randomProgress); 
        this.randomProgress.x = 13;
        this.randomProgress.y =this._bg.y + this._bg.height - this.randomProgress.height - 10;
        this.randomProgress.setPercentage(achvo.v/achcfg.value, `${achvo.v}/${achcfg.value}`);

        

        let status = achvo.f;
        switch (status) {
            case 0:
                let notreward = BaseBitmap.create("taskviewnotachieve");
                this.addChild(notreward);
                notreward.x = 350;
                notreward.y = this._bg.y + 75;
                break;
            case 1:
                let rewardBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("taskviewreward"), this.bgOnclick, this);
                this.addChild(rewardBtn);
                rewardBtn.x = 327;
                rewardBtn.y = this._bg.y + 75;
                this._rewardBtn = rewardBtn;
                // this._rewardBtn.visible = achvo.v >= achcfg.value;
                // this._rewardBtn.setEnable(achvo.v >= achcfg.value);
                break;
            case 2:
                let done = BaseBitmap.create("taskviewachieve");
                this.addChild(done);
                done.x = 350;
                done.y = this._bg.y + 75;
                break;
            default:
                break;
        }

        let startX = 13;
        let startY = this._bg.y + 65;
        
        let rewardvo = GameData.formatRewardItem(achcfg.getReward);
        for (let index = 0; index < rewardvo.length; index++) {
            let rewardBg = BaseBitmap.create("ab_task_xuxian_bg");
            this.addChild(rewardBg);
            rewardBg.x = startX + 100 * index;
            rewardBg.y = startY;
            rewardBg.touchEnabled = true;
            if(index == 0){
                this._rewardBg = rewardBg;
                this._type = rewardvo[index].type;
            }
            const item = rewardvo[index];
            let rewarditem = null;
            if(item.type == 1 || item.type == 2){
                rewarditem = GameData.getItemIcon(item, item.num, false);
                rewarditem.setScale(0.8);
                let num = rewarditem.getChildByName("numTxt");
                num.y = 90;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewarditem, rewardBg, [0,0]);   
            } else {
                rewarditem = GameData.getItemIcon(item, item.num, false);
                rewarditem.setScale(0.6);
                let num = <BaseTextField>rewarditem.getChildByName("numTxt");
                num.y = 110;
                num.size = 30;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewarditem, rewardBg, [0,0]);   

            }
            this.addChild(rewarditem);
            rewardBg.addTouchTap(()=>{
                if(item.type === 100){
                    let dicecfg = Config.DiceCfg.getCfgById(item.id);
                    ViewController.getInstance().openView(ViewConst.BUYDICECONFIRMPOPUPVIEW, {
						title : dicecfg.name,
						handler : null,
						needCancel : false,
						needClose : 1,
						id : `100_${dicecfg.id}_${item.num}`,
						costnum :LangMger.getlocal("sysconfirm"),
						// costIcon : `ab_mainui_gem`,
						touchMaskClose:true
					});
                } else if (item.type == 1 || item.type == 2) {
                    ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                        title : item.name,
                        handler : null,
                        needCancel : false,
                        needClose : 1,
                        param : item,
                        costnum :LangMger.getlocal("sysconfirm"),
                        // costIcon : `ab_mainui_gem`
                    });
                }
            }, this);
        }
        
    }

    private bgOnclick(event){
        let status = Api.AchievementVoApi.getAchinfoByID(this._achid).f;

        switch (status) {
            case 0:
            case 2:
                // NetManager.request(NetConst.TASK_GET_REWARDS, {taskId:taskId});
                break;
            case 1:
                Api.AchievementVoApi.rewardType = this._type;
                let x = GameConfig.stageWidth / 2;
                let y = GameConfig.stageHeigth / 2;
                if(this._rewardBg){
                    x = this._rewardBg.localToGlobal(this._rewardBg.width/2, this._rewardBg.height / 2).x;
                    y = this._rewardBg.localToGlobal(this._rewardBg.width/2, this._rewardBg.height / 2).y;
                }
                Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(x, y));
                NetManager.request(NetConst.TASK_GETACHIEVEMENT, {rkey: this._achid});
                break;
            default:
                break;
        }
    }

    /**
     * 不同格子X间距
     */
     public getSpaceX():number
    {
        return super.getSpaceX();
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return super.getSpaceY();
    }
 
}