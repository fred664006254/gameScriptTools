/*
author : qianjun
date : 2018.4.14
desc : 
*/
class ZhenqifangView extends CommonView{
    private _tabHeight = 0;
    private _topbg : BaseBitmap = null;
    private _levelbg : BaseBitmap = null;
    private _levelTxt : BaseTextField = null;
    private _progressBar : ProgressBar = null;
    private _taskNumBg = null;
    private _taskNumTxt = null;
    private _prevLevel = 0;
    public constructor(){
        super();
    }

    private get cfg(){
        return Config.ZhenqifangCfg;
    }
    private get api(){
        return Api.zhenqifangVoApi;
    }
    /*
    *重写标题、规则
    */
    protected getTitleStr():string{
        let view = this;
        return `zhenqifangtitle`
    }

    protected getRuleInfo():string{
        let view = this;
		return "zhenqifangrule";
    } 

    protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
			if(egret.is(this,"PopupView"))
			{
				tabX=this.viewBg.x+30;
				tabY=this.viewBg.y+60;
			}
			else
			{
				tabX=15;
				tabY=this.titleBg?this.titleBg.y+this.titleBg.height+157:100;
			}
			this.tabbarGroup.setPosition(tabX,tabY-18);
		}
    }
    
    protected getTabbarGroupY():number{
		return 205;
	}

    protected getTitleButtomY():number{
        return this.titleBg.y + this.titleBg.height;
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        if(data.ret){
            let rData = data.data;
            if(rData.ret == 0){
                let cmd = rData.cmd;
            }
        }
    }
	protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_ZQF_GETINFO,requestData:{}};
	}
	/**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	// protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	// {
    //     let key = `BattlePass-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
    //     let storage = LocalStorageManager.get(key);
    //     if (!storage) {
    //         LocalStorageManager.set(key, `1`);
    //         return {title:{key:`battlepassreporttitle-${this.code}`},msg:{key:`battlepassreportmsg-${this.code}`}};
    //     }
    //     else{
    //         return null;
    //     }
	// }

    protected getResourceList():string[]{
        let arr = [];
        arr = [
           `arena_bottom`,`servant_bottombg`,`battle_info_costbg`,`battlepassfntbg-1`,`progress5`,`progress3_bg`,`wifechatwodrsbg`,`rankactivenamebg`,`childview_addicon`,`discussclose`,`discussclose_down`,`achievement_state1`,`zqfliang`,
        ];
        return super.getResourceList().concat(arr);
    }

    protected getTabbarTextArr():Array<string>{
        return [
            `zhenqifangtab1`, 
            `zhenqifangtab2`
		];
    } 

    protected get uiType():string
	{
		return "2";
	}

    protected getContainerY():number
	{
		return 0;
	}

    protected getBigFrame():string
	{	
		return null;
	}

    /*
    * 初始化
    */
    public initView(){
        let view = this;
        view.width = GameConfig.stageWidth;
        view.container.width = view.width;

        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.freshView,this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.showUpgradeEffect, view);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        let topBg = BaseBitmap.create(`zqftopbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topBg, view.container, [0,0], true);
        view.addChildToContainer(topBg);
        view._topbg = topBg;

        let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 95;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);

        let midtop = BaseBitmap.create(`servant_bottombg`);
        midtop.width = 640;
        midtop.height = bottomBg.y - 89 - topBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midtop, topBg, [0,topBg.height]);
        view.addChildToContainer(midtop);
        view._tabHeight = midtop.height + bottomBg.height - 74;

        let tipNumBgGroup = new BaseDisplayObjectContainer();
        view.addChildToContainer(tipNumBgGroup);
        view._taskNumBg = tipNumBgGroup;

        let tipNumBg = BaseBitmap.create(`battle_info_costbg`);
        tipNumBg.width = 227;
        tipNumBg.height = 34;
        tipNumBgGroup.addChild(tipNumBg);

        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipNumBgGroup, topBg, [20,topBg.height + 25]);
     
        let chaishinumTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        chaishinumTxt.height = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, chaishinumTxt, tipNumBgGroup, [30,0], true);
        tipNumBgGroup.addChild(chaishinumTxt);
        view._taskNumTxt = chaishinumTxt;
        //等级部分
        let level = view.api.ZhenqifangLevel;
        view._prevLevel = level;
        let levelbg = BaseBitmap.create(`battlepassfntbg-1`);
        view.addChildToContainer(levelbg);
        view._levelbg = levelbg;

        let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifanglevel`, [level.toString()]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        levelbg.width = levelTxt.width + 25;
        view.addChildToContainer(levelTxt);
        view._levelTxt = levelTxt;

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, topBg, [170,44]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
        //经验进度
        let progressbar = ComponentManager.getProgressBar(`progress5`,`progress3_bg`,285);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, levelbg, [levelbg.width+5,0]);
        view.addChildToContainer(progressbar);
        view._progressBar = progressbar;
        //详情按钮
        let detailBtn = ComponentManager.getButton(`zqfdetail`, ``, ()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGBUILDLEVELDETAILVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, detailBtn, progressbar, [progressbar.width+15,0]);
        view.addChildToContainer(detailBtn);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip1`), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, progressbar, [0,progressbar.height+15]);
        view.addChildToContainer(tipTxt);

        //商城
        let shopBtn = ComponentManager.getButton(`zqfshop`, ``, ()=>{
            //打开商城
            ViewController.getInstance().openView(ViewConst.COMMON.ZHENQIFANGSHOPVIEW);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, shopBtn, topBg, [30,0]);
        view.addChildToContainer(shopBtn);

        let shopeff = ComponentManager.getCustomMovieClip(`zqfbuildtxt`, 8, 100);
        shopeff.width = 110;
        shopeff.height = 60;
        shopeff.x = 25;
        shopeff.y = 66;
        shopeff.playWithTime(-1);
        view.addChildToContainer(shopeff);
        shopeff.blendMode = egret.BlendMode.ADD;

        view.freshView();
        if(Api.rookieVoApi.getIsGuiding()){
            // let guideview =  ViewController.getInstance().getView(`RookieView`);
            // if(guideview){
            //     guideview.hide();
            // }
            // Api.rookieVoApi.insertWaitingGuide({"idx":"zhenqifang_4"},true);
            // Api.rookieVoApi.checkWaitingGuide();

            RookieCfg.rookieCfg["zhenqifang_7"].clickRect.x = 140;
            RookieCfg.rookieCfg["zhenqifang_7"].clickRect.y = this.container.y + this.getTabbarGroupY() + 120;
    
            RookieCfg.rookieCfg["zhenqifang_7"].handPos.x = RookieCfg.rookieCfg["zhenqifang_7"].clickRect.x + 30;
            RookieCfg.rookieCfg["zhenqifang_7"].handPos.y = RookieCfg.rookieCfg["zhenqifang_7"].clickRect.y + 30;

            RookieCfg.rookieCfg["zhenqifang_9"].clickRect.x = 250;
            RookieCfg.rookieCfg["zhenqifang_9"].clickRect.y = this.container.y + this.getTabbarGroupY() + 346+2;
    
            RookieCfg.rookieCfg["zhenqifang_9"].handPos.x = RookieCfg.rookieCfg["zhenqifang_9"].clickRect.x + 58;
            RookieCfg.rookieCfg["zhenqifang_9"].handPos.y = RookieCfg.rookieCfg["zhenqifang_9"].clickRect.y + 18+4;

            RookieCfg.rookieCfg["zhenqifang_11"].clickRect.x = 250;
            RookieCfg.rookieCfg["zhenqifang_11"].clickRect.y = this.container.y + this.getTabbarGroupY() + 346+2;
    
            RookieCfg.rookieCfg["zhenqifang_11"].handPos.x = RookieCfg.rookieCfg["zhenqifang_11"].clickRect.x + 58;
            RookieCfg.rookieCfg["zhenqifang_11"].handPos.y = RookieCfg.rookieCfg["zhenqifang_11"].clickRect.y + 18;

            Api.rookieVoApi.checkNextStep();
        }
        view.tick();
    }

    public get tabHeight():number{
        let view = this;
        return view._tabHeight;
    }

    public get tabWidth():number{
        let view = this;
        return view.width;
    }

    private freshView(): void{ 
        let view = this;
        let level = view.api.ZhenqifangLevel;
        if(level > view._prevLevel){//
            SoundManager.playEffect(SoundConst.EFFECT_UPD); 
            let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
            upgradeClip.width = 213;
            upgradeClip.height = 208;
            upgradeClip.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upgradeClip, this._levelbg, [0, -10]);
            this.addChildToContainer(upgradeClip);
            upgradeClip.playWithTime(-1);
            //egret.Tween.get(servant_upgrade_word,{loop:false}).to({y:this._levelbg.y - 150},800).to({alpha:0},100);

            
            let upBg = BaseBitmap.create("battlelvup")  ;
            upBg.setScale(0.5);
            this.addChildToContainer(upBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._levelbg, [0, 0]);
            egret.Tween.get(upBg).to({y:this._levelbg.y - 30},700).call(
                function(upBg:BaseBitmap){
                    BaseBitmap.release(upBg);
                    upBg = null;
                },
                this,
                [upBg]
            )
            

            egret.Tween.get(this,{loop:false}).wait(500).call(function(){
                this._levelTxt.text = LanguageManager.getlocal(`zhenqifanglevel`, [level.toString()]);
                //字体刷新加个延时
                this.container.removeChild(upgradeClip);
                upgradeClip = null;
            });
        }
        view._prevLevel = level;

        let curcfg = view.cfg.getTaskHouseCfgByLevel(level);
        view._levelTxt.text = LanguageManager.getlocal(`zhenqifanglevel`, [level.toString()]);
        view._levelbg.width = view._levelTxt.width + 25;
        App.DisplayUtil.setLayoutPosition(LayoutConst.left, view._levelbg, view._topbg, [170,30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._levelTxt, view._levelbg);
        //进度
        if(level == Object.keys(view.cfg.taskHouse).length){
            view._progressBar.setPercentage(1);
            view._progressBar.setText(LanguageManager.getlocal(`zhenqifangtip2`));
        }
        else{
            let curexp = view.api.curBuildExp;
            let nextcfg = view.cfg.getTaskHouseCfgByLevel(level + 1);
            let nextexp = nextcfg.needExp;
            view._progressBar.setPercentage(curexp/nextexp);
            view._progressBar.setText(LanguageManager.getlocal(`zhenqifanglevelexp`, [curexp.toString(), nextexp]));
        }
        //差事上限
        let tasknum = 0;
        let taskmax = 0;
        let str = ``;
        if(this.selectedTabIndex == 0){
            tasknum = view.api.curTaskNum;
            taskmax = curcfg.taskSlotIndiv;
        }else{
            tasknum = view.api.curFTaskNum;
            taskmax = curcfg.taskSlotFid;
        }
        if(tasknum == taskmax){
            str = `zhenqifangcdtip13`;
            //App.CommonUtil.addIconToBDOC(view._taskNumBg);
        }else{
            str = `zhenqifangtasknum`;
            //App.CommonUtil.removeIconFromBDOC(view._taskNumBg);
        }
        view._taskNumTxt.text = LanguageManager.getlocal(str, [tasknum.toString(), taskmax.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._taskNumTxt, view._taskNumBg, [30,0], true);
    } 

    protected clickTabbarHandler(data : any):void{
        let view = this;
        let index = data.index;
        let level = view.api.ZhenqifangLevel;
        let curcfg = view.cfg.getTaskHouseCfgByLevel(level);
        //差事上限
        let tasknum = 0;
        let taskmax = 0;
        let str = ``;
        if(index == 0){
            tasknum = view.api.curTaskNum;
            taskmax = curcfg.taskSlotIndiv;
        }else{
            tasknum = view.api.curFTaskNum;
            taskmax = curcfg.taskSlotFid;
        }
        if(tasknum >= taskmax){
            str = `zhenqifangcdtip13`;
            //App.CommonUtil.addIconToBDOC(view._taskNumBg);
        }else{
            str = `zhenqifangtasknum`;
            //App.CommonUtil.removeIconFromBDOC(view._taskNumBg);
        }
        view._taskNumTxt.text = LanguageManager.getlocal(str, [tasknum.toString(), taskmax.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._taskNumTxt, view._taskNumBg, [30,0], true);
        super.clickTabbarHandler(data);
    } 

    public tick():void{
        let view = this;
        for(let i = 1; i < 3; ++ i){
            if(Api.zhenqifangVoApi.getRedPoint(i)){
                view.tabbarGroup.addRedPoint(i - 1);
            }
            else{
                view.tabbarGroup.removeRedPoint(i - 1);
            }
        }
    }
    
    public dispose():void{   
        let view = this;
        Api.zhenqifangVoApi.sendList = [];
        Api.zhenqifangVoApi.friendsendList = [];
        view._topbg = null;
        view._prevLevel = 0;
        view._levelbg = null;
        view._levelTxt = null;
        view._progressBar = null;
        view._taskNumBg = null;
        view._taskNumTxt = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_DATAREFRESH,this.freshView,this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.showUpgradeEffect, view);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEPASS_JUMP, view.jump, view);
        super.dispose();
    }
}