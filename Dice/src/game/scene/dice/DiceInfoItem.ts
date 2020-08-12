
class DiceInfoItem extends ScrollListItem {
    
    private _infoGroup : BaseDisplayObjectContainer = null;
    private _inuse : BaseDisplayObjectContainer = null;
    private _data : any = null;
    private _levelTxt : BaseTextField = null;
    private _bg : BaseBitmap = null;
    private _maxlevel : BaseBitmap = null;
    private _progressbar : ProgressBar = null;
    private _arrow : BaseBitmap = null;
    private _teamid : number = 1;

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : string, param:any) {
        let view = this;
        view._teamid = param;

        view._data = data;
        let islock = !Api.DiceVoApi.isHaveDiceById(data);
        view.width = 152 + 3;
        view.height = 293;//islock ? 198 : 293;

        let group = new BaseDisplayObjectContainer();
        group.width = view.width;
        group.height = view.height;
        view.addChild(group);

        let dicecfg = Config.DiceCfg.getCfgById(data);

        let bg = BaseBitmap.create(`bird_item_${dicecfg.quality}`);
        // let bg = BaseBitmap.create(`bird_item_bg_${dicecfg.quality}`);
        // if(dicecfg.quality != 4){
            // bg.width = 144;
            // bg.height = 198;
        // }
    
        let dy = dicecfg.quality == 4 ? -10 : 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view, [0,7+dy], true);
        // bg.x = view.width/2 - bg.width/2;
        // bg.y = dy+7;
        group.addChild(bg);
        view._bg = bg;

        if(dicecfg.quality == 4){
            // 传奇卡牌的特效
            let clip = ComponentMgr.getCustomMovieClip("guangxiao", 10); 
            group.addChild(clip);
            clip.blendMode = egret.BlendMode.ADD;
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
            },this);
            clip.playWithTime(0);
            clip.setPosition(10,10);
            let glow = ComponentMgr.getCustomMovieClip("glow");
            view.addChild(glow);
            glow.playWithTime(0);
            glow.blendMode = egret.BlendMode.ADD;
            glow.y = -15;
        }

        let nameTxt = ComponentMgr.getTextField(dicecfg.name, TextFieldConst.SIZE_CONTENT_NORMAL_POPUP,GameConfig.getQualityColor(dicecfg.quality));
        nameTxt.bold = true;
        nameTxt.stroke = 1;
        // nameTxt.x = bg.x + bg.width/2 - nameTxt.width/2;
        // nameTxt.y = bg.y + 10 - dy;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,10 - dy]);
        this.addChild(nameTxt);

        let icon = App.CommonUtil.getDiceIconById(data,1);
        // icon.x = bg.x + bg.width/2 - icon.width/2;
        // icon.y = bg.y + bg.height/2 - icon.width/2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        group.addChild(icon);

        let level = Api.DiceVoApi.getDiceLvById(data);
        let levelTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysLevel`, [level.toString()]), TextFieldConst.SIZE_18);
        levelTxt.bold = true;
       
        if(dicecfg.quality == 4)
        {
            // levelTxt.x = bg.x + bg.width - levelTxt.width - 22;
            // levelTxt.y = bg.y + bg.height - levelTxt.height - 17;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [22,17]);
        }
        else
        {
            // levelTxt.x = bg.x + bg.width - levelTxt.width - 9;
            // levelTxt.y = bg.y + bg.height - levelTxt.height - 14;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [9,14]);
        }
        group.addChild(levelTxt);
        view._levelTxt = levelTxt;

        if(islock){
            //未获得
            levelTxt.visible = false;
            //App.DisplayUtil.changeToGray(view);
            //无论解锁与否名字都不置灰
            let lock = BaseBitmap.create(`royalpasslock`);
            group.addChild(lock);
            // if(dicecfg.quality == 4){
            //     lock.x = bg.x + bg.width - lock.width - 10;
            //     lock.y = bg.y + bg.height - lock.height - 4;
            // }
            // else{
            //     lock.x = bg.x + bg.width - lock.width;
            //     lock.y = bg.y + bg.height - lock.height;
            // }
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, lock, bg, dicecfg.quality == 4 ? [10,4] : [0,0]);
            // App.DisplayUtil.changeToGray(group);

            group.addTouchTap(()=>{
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                    dice : data,
                    islock : true
                });
            },view);
        }
        else{
            
            let ismaxlevel = level == dicecfg.maxGrade;
            //使用中
            let inuse = BaseBitmap.create(`diceinuse`);
            if(dicecfg.quality == 4)
            {
                // inuse.x = bg.x + bg.width - inuse.width - 1;
                // inuse.y = bg.y - 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, inuse, bg, [1,-2]);
            }
            else
            {
                // inuse.x = bg.x + bg.width - inuse.width - 7;
                // inuse.y = bg.y - 6; 
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, inuse, bg, [-7,-6]);
            }

            let usedCon = new BaseDisplayObjectContainer();
            usedCon.addChild(inuse);

            let isinuse = Api.LineVoApi.getDiceIsInLineById(data, view._teamid);
            usedCon.visible = isinuse;
            view._inuse = usedCon;
            //最大等级
            let maxlevel = BaseBitmap.create(`dicelevelmax`);
            // maxlevel.x = bg.x + bg.width - maxlevel.width - 7;
            // maxlevel.y = bg.y + bg.height - maxlevel.height - 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, maxlevel, bg, [7,40]);
            group.addChild(maxlevel);
            maxlevel.visible = ismaxlevel;
            view._maxlevel = maxlevel;

            //已获得
            let havenum = Api.DiceVoApi.getDiceNumById(data);
            let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
            let ishave = Api.DiceVoApi.isHaveDiceById(data);
            let canlevelup = ishave && havenum >= neednum && !ismaxlevel;
            //进度条
            let progressbg = `progress24`;
            let arrowres = `public_arrowblue`;
            if(ismaxlevel){
                progressbg = `progress26`;
                arrowres = ``;
            }
            else if(canlevelup){
                arrowres = `public_arrowgreen`;
                progressbg = `progress25`;
            }
            let progressbar = ComponentMgr.getProgressBar(progressbg,`progress_bg_1`,120);
            progressbar.setTextSize(TextFieldConst.SIZE_18);
            
            if(dicecfg.quality == 4)
            {
                // progressbar.x = bg.x + (bg.width - progressbar.width)/2;
                // progressbar.y = bg.y + bg.height + 6;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0,bg.height+6]);
            }
            else
            {
                // progressbar.x = bg.x + (bg.width - progressbar.width)/2;
                // progressbar.y = bg.y + bg.height + 10;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0,bg.height+10]);
            }

            group.addChild(progressbar);
            progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1,havenum/neednum));
            progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
            progressbar.setTextColor(ColorEnums.white);
            view._progressbar = progressbar;

            if(arrowres != ``){
                let arrow = BaseBitmap.create(arrowres);
                arrow.setScale(0.55);
                // arrow.x = progressbar.x + (progressbar.width - arrow.width)/2 - 9;
                // arrow.y = progressbar.y + (progressbar.height - arrow.height)/2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrow, progressbar, [-9,0]);
                group.addChild(arrow);
                view._arrow = arrow;
            }
            else{
                if(view._arrow){
                    view._arrow.visible = false;
                }
            }

            //信息弹窗
            let infogroup = new BaseDisplayObjectContainer();
            infogroup.width = 152;
            infogroup.height = 293;
            infogroup.y = 7;
            view.addChild(infogroup);
            infogroup.visible = false;
            view._infoGroup = infogroup;

            this.addChild(this._inuse);

            //是新获得的
            let newState = BaseBitmap.create(`dicenewget`);
            newState.setScale(0.7);
            newState.setPosition(-6, 0);

            this.addChild(newState);
            newState.visible = Api.DiceVoApi.isNewGet(data);

            group.addTouchTap(()=>{
                if(Api.GameinfoVoApi.checlIsInGuideId(19)){
                    App.CommonUtil.sendNewGuideId(19);
                    Api.GameinfoVoApi.setCurGudingId(20);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                view._infoGroup.removeChildren();
                view.createInfoGroup();
                SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
                newState.visible = newState.visible = false;
                Api.DiceVoApi.deleteNew(data);
                App.MsgHelper.dispEvt(MsgConst.MODEL_DICE, {});
                App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
                    idx : index,
                    dice : data
                });
                view._infoGroup.visible = true;
                view._bg.visible = false;
                view._progressbar.visible = false;
                view._arrow && (view._arrow.visible = false);
                view._levelTxt.visible = false;
                view._maxlevel.visible = false;
            },view);
        }
    }

    protected initBg():void
	{
		let bg:BaseBitmap=BaseBitmap.create("public_alphabg");
		let rect = this.getBounds();
		bg.width=this.width+this.getSpaceX();
		bg.height=this.height+this.getSpaceY();
		this.addChildAt(bg,0);
        bg.alpha = 0;
        
        bg.touchEnabled = true;
        bg.addTouchTap(()=>{
            App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
				idx : -1,
				dice : ``
			});	
        }, this);
	}

    protected checkBounds():boolean
	{
		return false;
	}
    
    public hideInfo():void{
        let view = this;
        view._infoGroup.visible = false;
        this._bg.visible = true;
        this._progressbar.visible = true;
        let level = Api.DiceVoApi.getDiceLvById(view._data)
        let dicecfg = Config.DiceCfg.getCfgById(view._data);
        let ismaxlevel = level == dicecfg.maxGrade;
        view._arrow && (view._arrow.visible = !ismaxlevel);
        this._levelTxt.visible = true;
        this._maxlevel.visible = ismaxlevel;
    }

    public checkInUse(teamid : number):void{
        let view = this;
        view._teamid = teamid;
        view._infoGroup.visible = false;
        view._bg.visible = true;
        view._progressbar.visible = true;
        let level = Api.DiceVoApi.getDiceLvById(view._data)
        let dicecfg = Config.DiceCfg.getCfgById(view._data);
        let ismaxlevel = level == dicecfg.maxGrade;
        view._arrow && (view._arrow.visible = !ismaxlevel);
        view._inuse.visible = Api.LineVoApi.getDiceIsInLineById(view._data, teamid);
        view.freshInfo();
    }
    
    public freshInfo():void{
        let view = this;
        let data = view._data;
        let level = Api.DiceVoApi.getDiceLvById(data);
        view._levelTxt.text = LangMger.getlocal(`sysLevel`, [level.toString()]);
       
        let dicecfg = Config.DiceCfg.getCfgById(data);
        let ismaxlevel = level == dicecfg.maxGrade;
        view._maxlevel.visible = ismaxlevel;
        //已获得
        let havenum = Api.DiceVoApi.getDiceNumById(data);
        let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        let ishave = Api.DiceVoApi.isHaveDiceById(data);
        let canlevelup = ishave && havenum >= neednum && !ismaxlevel;
        //进度条
        let progressbg = `progress24`;
        let arrowres = `public_arrowblue`;
        if(ismaxlevel){
            progressbg = `progress26`;
            arrowres = ``;
        }
        else if(canlevelup){
            arrowres = `public_arrowgreen`;
            progressbg = `progress25`;
        }
        view._progressbar.changeRes(progressbg,`progress_bg_1`);
        view._progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1,havenum/neednum));
        view._progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
        if(arrowres != `` && view._arrow){
            view._arrow.setRes(arrowres);
        }
        else{
            if(view._arrow){
                view._arrow.visible = false;
            }
        }

        let isinuse = Api.LineVoApi.getDiceIsInLineById(data,view._teamid);
        view._inuse.visible = isinuse;

        this.setChildIndex(this._inuse, 9999);
    }

    private createInfoGroup():void{
        let view = this;
        let data = view._data;
        let level = Api.DiceVoApi.getDiceLvById(data);
        let dicecfg = Config.DiceCfg.getCfgById(data);
        let havenum = Api.DiceVoApi.getDiceNumById(data);
        let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        let ismaxlevel = level == dicecfg.maxGrade;
        let ishave = Api.DiceVoApi.isHaveDiceById(data);
        let canlevelup = ishave && havenum >= neednum && !ismaxlevel;

        let isinuse = Api.LineVoApi.getDiceIsInLineById(data,view._teamid);
        let infogroup = view._infoGroup;
        let infobg = BaseBitmap.create(isinuse ? `diceselectbg${canlevelup ? 4 : 3}` : `diceselectbg${canlevelup ? 1 : 2}`); 
        infogroup.addChild(infobg);

        let infonameTxt = ComponentMgr.getTextField(dicecfg.name, TextFieldConst.SIZE_CONTENT_NORMAL_POPUP,GameConfig.getQualityColor(dicecfg.quality));
        infonameTxt.stroke = 1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infonameTxt, infobg, [0,10]);
        infogroup.addChild(infonameTxt);

        let infoicon = App.CommonUtil.getDiceIconById(data,1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoicon, infonameTxt, [0,infonameTxt.height + (105 - infoicon.height * infoicon.scaleY)/2]);
        infogroup.addChild(infoicon);

        let btn1 : BaseButton = null;
        if(canlevelup){
            btn1 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_GREEN, ``, ()=>{
                //详细信息弹窗
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                    dice : data,
                    callback : ()=>{
                        if(Api.GameinfoVoApi.checlIsInStepId(30)){
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                        else{
                            App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                                idx : view._index,
                                dice : data,
                            });
                        }
                    },
                    handle : view,
                    isinuse : isinuse,
                    closecallback : ()=>{
                        if(Api.GameinfoVoApi.checlIsInStepId(30)){
                            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                        }
                    },
                    handler : view
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn1, infobg, [0,170]);
            infogroup.addChild(btn1);

            let costGruop = new BaseDisplayObjectContainer();
            costGruop.width = btn1.width;
            costGruop.height = btn1.height;

            let levelupTxt = ComponentMgr.getTextField(LangMger.getlocal(`syslevel`), TextFieldConst.SIZE_18);
            costGruop.addChild(levelupTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, levelupTxt, costGruop, [0,-8], true);
            levelupTxt.strokeColor = ColorEnums.black;
           
            let costicon = BaseBitmap.create(`ab_mainui_gold`);
            costicon.setScale(0.7);
            costGruop.addChild(costicon);

            let costTxt = ComponentMgr.getTextField(dicecfg.getNextLvCostGoldByLv(level + 1).toString(), TextFieldConst.SIZE_18);
            costGruop.addChild(costTxt);
            costTxt.strokeColor = ColorEnums.black;

            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, costicon, costGruop, [(costGruop.width - costicon.width * costicon.scaleX - costTxt.width)/2-3, 10], true);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width * costicon.scaleX, 0]);
            btn1.addGroup(costGruop);
        }
        else{
            btn1 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_BLUE, LangMger.getlocal(`sysinfo`), ()=>{
                //详细信息弹窗
                if(Api.GameinfoVoApi.checlIsInGuideId(20)){
                    return;
                }
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                    dice : data,
                    callback : ()=>{
                        App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                            idx : view._index,
                            dice : data
                        });
                    },
                    handle : view,
                    isinuse : isinuse
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn1, infobg, [0,170]);
            infogroup.addChild(btn1);
        }

        if(!isinuse){
            let btn2 = ComponentMgr.getButton(ButtonConst.BTN_COMMON_YELLOW, LangMger.getlocal(`sysuse`), ()=>{
                if(Api.GameinfoVoApi.checlIsInStepId(28) && Api.DiceVoApi.getDiceCanLevelUpNum()){
                    return;
                }
                if(Api.GameinfoVoApi.checlIsInGuideId(20)){
                    App.CommonUtil.sendNewGuideId(20);
                    Api.GameinfoVoApi.setCurGudingId(21);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
                //使用
                App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                    idx : view._index,
                    dice : data
                });
                view.hideInfo();
            }, view, null, 0, TextFieldConst.SIZE_20);
            infogroup.addChild(btn2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn2, btn1, [0,59]);
        }
    }

	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        view._inuse = null;
        view._infoGroup = null;
        view._data = null;
        view._levelTxt = null;
        view._bg = null;
        view._maxlevel = null;
        view._progressbar = null;
        view._arrow = null;
        view._teamid = 1;
		super.dispose();
	}
}