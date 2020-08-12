
class ActiveItem extends ScrollListItem {

    private _joinGroup : BaseDisplayObjectContainer = null;
    private _notjoinGroup : BaseDisplayObjectContainer = null;
    private _desbg: BaseBitmap = null;
    private _winbg:BaseLoadBitmap = null;
    private _winnum:BaseLoadBitmap = null;

	public constructor() {
		super();
    }

    protected getMsgConstEventArr():string[]{
		return [
			MsgConst.MODEL_FAIRARENA
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case MsgConst.MODEL_FAIRARENA:
				view.freshView();
                break;
		}
    }

    public dispose(): void {
        let view = this;
        view._desbg = null;
        view._joinGroup && view._joinGroup.dispose();
        view._joinGroup = null;
        view._notjoinGroup && view._notjoinGroup.dispose();
        view._notjoinGroup = null;
		super.dispose();
	}
    
	protected initItem(index : number, data : any) {
        let view = this;
        view.initEventListener();
        let islock = data.lock;
        view.width = GameConfig.stageWidth;
        view.height = 283 + 5;
        
        let itemgroup:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        view.addChild(itemgroup);
    
        let bg = null;
        if(islock){
            bg = BaseBitmap.create(`activelock`);
        }
        else{
            bg = BaseLoadBitmap.create(`${data.active}_banner`);
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0,0], true);
        itemgroup.addChild(bg);

        if(islock){
            let lockTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysUnlock`), TextFieldConst.SIZE_30);
            lockTxt.stroke = 2;
            lockTxt.strokeColor = 0x401869;
            itemgroup.addChild(lockTxt);
            bg.x = 15;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, lockTxt, bg, [0,35]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemgroup, view, [0,0]);
            let ruleBtn = ComponentMgr.getButton(`activerulebtn`, ``, ()=>{
                //弹说明
                App.MsgHelper.dispEvt(MsgConst.END_TOUCH_LIST, {});
                ViewController.getInstance().openView(ViewConst.ACTIVERULEVIEW, {
                    title : LangMger.getlocal("fairArena"),
                    needCancel : false,
                    acInfoArr:[{index:1,acKey: data.active}, {index:2,acKey: data.active}, {index:3,acKey: data.active}],
                });
            }, view);
            view.addChild(ruleBtn);
            ruleBtn.setPosition(558, 2);
            ruleBtn.forbidClickBubble = true;

            let descbg = BaseBitmap.create(Api.FairArenaVoApi.isJoinJJC() ? "activedescbg2" : "activedescbg");
            itemgroup.addChild(descbg);
            this._desbg = descbg;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, descbg, bg, [40,40]);

            let title = BaseBitmap.create(`${data.active}_banner_title`);
            itemgroup.addChild(title);
            title.x = bg.x + 329;
            title.y = bg.y + 17;

            let joinGroup = new BaseDisplayObjectContainer();
            joinGroup.width = descbg.width;
            joinGroup.height = descbg.height;
            itemgroup.addChild(joinGroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, joinGroup, descbg);
            view._joinGroup = joinGroup;

            let notjoinGroup = new BaseDisplayObjectContainer();
            notjoinGroup.width = descbg.width;
            notjoinGroup.height = descbg.height;
            itemgroup.addChild(notjoinGroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notjoinGroup, descbg);
            view._notjoinGroup = notjoinGroup;

            let joinTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaProgress`), TextFieldConst.SIZE_24);
            joinGroup.addChild(joinTxt);
            joinTxt.strokeColor = 0x3c3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, joinTxt, joinGroup, [0,-joinTxt.height/2]);
            
            let winnum = Api.FairArenaVoApi.getWinNum();
            let winbg = BaseLoadBitmap.create(this.getWinBgurl(winnum));
            joinGroup.addChild(winbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, joinGroup, [20,31]);
            this._winbg = winbg;

            let wintxt = BaseLoadBitmap.create(`activewinnum${winnum}`);
            joinGroup.addChild(wintxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wintxt, winbg, [0,0]);
            this._winnum = wintxt;

            let winNameTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaWin`), TextFieldConst.SIZE_20, 0xFFF091);
            joinGroup.addChild(winNameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, winNameTxt, joinGroup, [49,15]);

            let line = BaseBitmap.create(`activeline`);
            line.height = 130;
            joinGroup.addChild(line);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line, joinGroup, [135,0]);

            let tmpX = 150; 
            let startX = 145;
            for(let i = 1; i <= Config.FairarenaCfg.getFailNum(); ++ i){
                let losebg = BaseBitmap.create(`activefailbg`);
                losebg.setPosition(startX + losebg.width * (i - 1) + 3, 48);
                joinGroup.addChild(losebg);

                let loseIcon = BaseBitmap.create(`activefailicon`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, loseIcon, losebg);
                joinGroup.addChild(loseIcon);
                loseIcon.name = `loseIcon${i}`;
                loseIcon.visible = i <= Api.FairArenaVoApi.getLoseNum();
            }
            let loseNameTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaLose`), TextFieldConst.SIZE_20);
            loseNameTxt.width = 147;
            loseNameTxt.textAlign = egret.HorizontalAlign.CENTER;
            loseNameTxt.setPosition(startX, winNameTxt.y);
            joinGroup.addChild(loseNameTxt);

            let notjoinTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysJJCJoin`), TextFieldConst.SIZE_24);
            notjoinGroup.addChild(notjoinTxt);
            notjoinTxt.strokeColor = 0x3c3c3c;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, notjoinTxt, notjoinGroup, [0,-notjoinTxt.height/2]);

            let costIcon = BaseBitmap.create(`public_icon1`);
            notjoinGroup.addChild(costIcon);

            let costTxt = ComponentMgr.getTextField(`${Config.FairarenaCfg.getCostGem()}`, TextFieldConst.SIZE_24);
            notjoinGroup.addChild(costTxt);

            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costIcon, notjoinGroup, [(notjoinGroup.width - costIcon.width - costTxt.width - 15)/2,0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costIcon, [costIcon.width+15,0]);

            let isJoin = Api.FairArenaVoApi.isJoinJJC();
            view._joinGroup.visible = isJoin;
            view._notjoinGroup.visible = !isJoin;

            App.CommonUtil.addTouchScaleEffect(view, view.onClick, view);
            view.touchEnabled = !islock;
        }
    }

    private getWinBgurl(winnum:number):string{
        let bgid = `1`;
        if(winnum >= 1 && winnum <= 3){
            bgid = `2`;
        }
        else if(winnum >= 4 && winnum <= 6){
            bgid = `3`;
        }
        else if(winnum >= 7 && winnum <= 9){
            bgid = `4`;
        }
        else if(winnum >= 10 && winnum <= 11){
            bgid = `5`;
        }
        if(winnum == 12){
            bgid = `6`;
        }
        return `activewinbg${bgid}`;
    }

    private onClick(evt){
        let view = this;
        if(!Api.FairArenaVoApi.isJoinJJC()){
            ViewController.getInstance().openView(ViewConst.BUYRESCONFIRMPOPUPVIEW, {
                title : LangMger.getlocal("purchase_admission_title"),
                msg : LangMger.getlocal("purchase_admission_des", [String(Config.FairarenaCfg.getCostGem())]),
                handler : view,
                needCancel : false,
                callback : ()=>{
                    //发消息去买公平竞技场的门票
                    if(Api.UserinfoVoApi.getGem() >= Config.FairarenaCfg.getCostGem()){
                        NetManager.request(NetConst.FAIRARENA_START, {});
                    } else {
                        App.CommonUtil.gemNotEnough(1);
                    }
                },
                needClose : 1,
                costnum : 100,
                costIcon : `ab_mainui_gem`
            });
        } else {
            App.LogUtil.log("打开公平竞技场界面");
            SceneController.getInstance().go("FairarenaScene",{});
        }
    }

    public freshView():void{
        let view = this;
        if(view._index == 0){
            for(let i = 1; i <= Config.FairarenaCfg.getFailNum(); ++ i){
                let loseIcon = view._joinGroup.getChildByName(`loseIcon${i}`);
                if(loseIcon){
                    loseIcon.visible = i <= Api.FairArenaVoApi.getLoseNum();
                }
            }
    
            let isJoin = Api.FairArenaVoApi.isJoinJJC();
            this._desbg.texture = ResMgr.getRes(isJoin ? "activedescbg2" : "activedescbg");
            if(view._joinGroup){
                view._joinGroup.visible = isJoin;
                let win = Api.FairArenaVoApi.getWinNum();
                this._winbg.setload(this.getWinBgurl(win));
                this._winnum.setload(`activewinnum${win}`);
            }
            if(view._notjoinGroup){
                view._notjoinGroup.visible = !isJoin;
            }
        }
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
}