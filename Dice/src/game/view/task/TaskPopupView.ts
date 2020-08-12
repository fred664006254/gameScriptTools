/*
 *@description: 任务弹版
 *@author: hwc 
 *@date: 2020-04-11 13:44:26
 *@version 
 */
class TaskPopupView extends PopupView{
    

    // protected getEventArr():string[]{
	// 	return [
    //         MsgConst.MODEL_DAILYTASK, NetConst.TASK_GET_REWARDS, MsgConst.REWARD_RANDOM_TASK,
	// 	];
	// }

	// protected eventCallBack(evt : egret.Event):void{
	// 	let view = this;
	// 	switch(evt.type){
    //         case MsgConst.MODEL_DAILYTASK:
    //             // view.refreshList();
    //             break;
    //         case NetConst.TASK_GET_REWARDS:
    //             view.openRewardPopupview(evt);
    //             break;
    //         case MsgConst.REWARD_RANDOM_TASK:
    //             view.rewardRandomTask(evt);
    //             break;
    //     }
    // }
    
    protected initView(): void {

    }

    protected initTabbarGroup():void{
        let tabs:string[] = this.getTabbarTextArr();
        if(tabs && tabs.length > 0){
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), 
                tabs, this.clickTabbarHandler, this, null, null, null, null, 520, 90);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;

            if(!Api.SwitchVoApi.checkAchievement()){
                this.tabbarGroup.setLocked(1, true);
            }
        }
    }

    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{
		//暂时将皮肤页面置灰
		if(index == 1)
		return !!Api.SwitchVoApi.checkAchievement();
		else
		return true;
	}

    protected getTabbarTextArr():Array<string>{

        let tem = [LangMger.getlocal("readytask")]
        if(!!Api.SwitchVoApi.checkAchievement()){
            tem.push(LangMger.getlocal("achievement"));
        }
        return tem;
    }

    protected getTabbarName():string|string[]{
        return `tasktabbtn`;
    }

    protected setTabBarPosition():void{
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.tabbarGroup, this._titleBg, [33,this._titleBg.height + 4]);
    }

    protected resetBgSize(){
        super.resetBgSize();
        this.viewBg.touchEnabled = true;
        let bg2:BaseBitmap = BaseBitmap.create(`taskviewbg2`);
        this.addChildAt(bg2, this.getChildIndex(this.container));
        bg2.width = 506;
        bg2.height = 700;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, this.viewBg, [0,135]);
        this.addRedPoint();
    }

    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_ACHIEVEMENT, MsgConst.MODEL_DAILYTASK,
		];
	}

    protected msgEventCallBack(evt : egret.Event){
        switch(evt.type){
            case MsgConst.MODEL_DAILYTASK:
            case MsgConst.MODEL_ACHIEVEMENT:
                this.addRedPoint();
                break;
            default:
                break;
        }
    }

    public getResourceList(){
        return super.getResourceList().concat([
            "dicecardlevel1",
            "ab_readyscene_war_progress"
        ]);
    }

    protected clickTabbarHandler(data:any):void{
        super.clickTabbarHandler(data);
        let selidx = data.index;
        let arr = this.getTabbarTextArr();
        for (let index = 0; index < arr.length; index++) {
            let item = this.tabbarGroup.getTabBar(index);
            let reddot:BaseBitmap = <BaseBitmap>item.getChildByName("reddot");
            if(reddot){
                if(index === selidx){
                    reddot.setPosition(220, 10);
                } else {
                    reddot.setPosition(220, 20);
                } 
            } 
        }
    }

    public addRedPoint(){
        if((Api.AchievementVoApi.getAchCanRewardNum() > 0) && !!Api.SwitchVoApi.checkAchievement()){
            this.tabbarGroup.addRedPoint(1);
            let item = this.tabbarGroup.getTabBar(1);
            let reddot:BaseBitmap = <BaseBitmap>item.getChildByName("reddot");
            if(this.tabbarGroup.selectedIndex == 1){
                reddot.setPosition(220, 10);
            } else {
                reddot.setPosition(220, 20);
            }
        }else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if(Api.DailytaskVoApi.getDailyBox() > 0){
            this.tabbarGroup.addRedPoint(0);
            let item = this.tabbarGroup.getTabBar(0);
            let reddot:BaseBitmap = <BaseBitmap>item.getChildByName("reddot");
            reddot.setPosition(210, 10);
            if(this.tabbarGroup.selectedIndex == 0){
                reddot.setPosition(220, 10);
            } else {
                reddot.setPosition(220, 20);
            }
        } else {
            this.tabbarGroup.removeRedPoint(0);
        }
    }

    protected initBg(){
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.addChild(this.viewBg);
        this.viewBg.width = this.getShowWidth();
        this.viewBg.touchEnabled = true;
    }

    protected getBgName(){
        return "taskviewbg";
    }

    protected getShowHeight(){
        return 845;
    }
    
    // protected getCloseBtnName(){
    //     return "task_closebtn";
    // }

    dispose(){
        super.dispose();
    }
}