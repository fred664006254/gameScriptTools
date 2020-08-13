/**
 * 结束展示界面
 * author qianjun
 */
class EmperorWarEndShowView extends CommonView {
    public constructor() {
		super();
    }
    private _time : number = 0;
    private _curRoleImg:PalaceRoleInfoItem = null;
    private _empBottom : BaseBitmap = null;
    private _rewardBtn : BaseButton = null;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "emparena_bottom","empgodbless_tip_bg",
            "empbmce","empbmce_down","servant_attributemap","empvsbattle","empvsbattle_down","gojndian","gojndian_down","empreward","empreward_down",
            "emperorwarbg5",
            "icon_fight_tex_png","icon_fight_tex_json","icon_fight_ske",
        ]);
    }

    protected getTitleStr():string
	{
		return "emperorWarEnterViewTitle";
    }

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_PALACE;
	}

    
    protected getRuleInfo():string
	{ 
        if(Api.switchVoApi.checkOpenSeat())
		{
			return "EmpWarEndShowRuleInfo_withNewMonthYear";
		}
		return "EmpWarEndShowRuleInfo";
    } 

    protected getRequestData():{requestType:string,requestData:any}{
        let view = this;
		return {requestType: NetRequestConst.REQUEST_EMPEROR_GETMODEL,requestData:{
            version : view.api.getVersion(),
        }};
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        let view = this;
        if(data.ret){
            let cmd = data.data.cmd;
            if(data.data.data.myemperor.version > view.api.getVersion()){
                return;
            }
            if (data.data.data.myemperor)
            {
                Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
            }
        }
    }

    private _empData:any = null;
    private userShotCallback(event:egret.Event)
    {
        let view = this;
        if(event.data.ret){
            let data = event.data.data.data;
            //ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
            this._empData = data;
        }
    }

    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;

            //this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
            // this.viewBg.height = GameConfig.stageHeigth;
            // let mask = BaseLoadBitmap.create('empvsmask');
            // this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
            // mask.height = GameConfig.stageHeigth;
            this.viewBg.y = (GameConfig.stageHeigth - 1136);
            
		}
	}

    // 背景图名称
	protected getBgName():string
	{
		return "emperorwarbg5";
	}
    
    protected initView():void{
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST),this.receiveBmlist,this);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_BMLIST, {
            version : view.api.getVersion(),
            sort : view.api.type <= 2 ? 1 : 2// 1报名时间排序 2消耗人望币排序
        });
        //活动详情
        // let detailBtn = ComponentManager.getButton(`empdetail`, ``, view.clickDetail, this);
        // view.setLayoutPosition(LayoutConst.lefttop, detailBtn, view.titleBg, [10,view.titleBg.height + 10]);
        // view.addChild(detailBtn);
        //
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        emparena_bottom.height = 108;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        view._empBottom = emparena_bottom;

        //倒计时提示
        let timeBg = BaseBitmap.create(`empgodbless_tip_bg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, emparena_bottom, [0,-timeBg.height-8]);
        view.addChild(timeBg);
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        let type = view.api.judge_time();
        let timedesc = ComponentManager.getTextField(LanguageManager.getlocal(`emperorTimeDesc5`), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timedesc, timeBg);
        view.addChild(timedesc);

        let distance = (emparena_bottom.width - 4 * 120 - 3 * 40) / 2;

        let bmcBtn = ComponentManager.getButton('empbmce', ``, view.bmcClick, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, bmcBtn, emparena_bottom, [distance,0]);
        view.addChild(bmcBtn);
        
        let vsBtn = ComponentManager.getButton('empvsbattle', ``, view.vsClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, vsBtn, bmcBtn, [bmcBtn.width + 40,0]);
        view.addChild(vsBtn);

        let goBtn = ComponentManager.getButton('gojndian', ``, view.goClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, goBtn, vsBtn, [vsBtn.width + 40,0]);
        view.addChild(goBtn);

        let rewardBtn = ComponentManager.getButton('empreward', ``, view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, rewardBtn, goBtn, [goBtn.width + 40,0]);
        view.addChild(rewardBtn);
        view._rewardBtn = rewardBtn;

        let cfg = Config.EmperorwarCfg;
        if(!Api.servantVoApi.getServantObj(String(cfg.servant))){
            let curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if(curNum >= cfg.exchangeNum){
                App.CommonUtil.addIconToBDOC(view._rewardBtn);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
    }

    protected tick():void{
        let view = this;
        let cfg = Config.EmperorwarCfg;
        if(!Api.servantVoApi.getServantObj(String(cfg.servant))){
            let curNum = Api.itemVoApi.getItemNumInfoVoById(cfg.itemNeed);
            if(curNum >= cfg.exchangeNum){
                App.CommonUtil.addIconToBDOC(view._rewardBtn);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
    }

      //奖励弹窗
    private rewardClick():void{
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW);
    }

    //活动详情弹窗
    private goClick():void{
        let view = this;
        let key = 31;
        let buildcfg = GameConfig.config.buildingCfg[key];
        let titleId = buildcfg.title;
        if(buildcfg && buildcfg.unlock == 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
        }else{
            let buildingId = key;
            if(Object.keys(titleId).length == 1)
            {
                let tid = titleId[0];
                let titlecfg = Config.TitleCfg.getTitleCfgById(tid);
                if(titlecfg.unlock == 0)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                    return;
                }
                Api.palaceVoApi.enterKingsHouse();
                view.hide();

            }
        }
    }

    //对战详情
    private vsClick():void{
        let view = this;
        if(!view.api.getBmlistData().length){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCancel2"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARVSVIEW);
    }

    //报名册弹窗
    private bmcClick():void{
        let view = this;
        if(!view.api.getBmlistData().length){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCancel2"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    }

    private receiveBmlist(evt : egret.Event):void{
        let view = this;
        let data = evt.data;
        if(data.ret){
            if(data.data.ret < 0){
                return;
            }
            let cmd = data.data.cmd;
            if(cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST){
                if (data.data.data.bmlist)
                {
                    view.api.setBmListData(data.data.data.bmlist);
                    //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
                    let empdata : any = view.api.getWinnerEmpData();//中部展示
                    if(empdata && !view._curRoleImg){
                        let roleinfo = new PalaceRoleInfoVo();
                        empdata['titleId'] = '3201';
                        roleinfo.initData(empdata);
                        
                        view._curRoleImg =  new PalaceRoleInfoItem();
                        view._curRoleImg.y = 50;
                        view._curRoleImg.refreshUIWithData(roleinfo);
                        view._curRoleImg.anchorOffsetX = view._curRoleImg.width / 2;
                        view._curRoleImg.anchorOffsetY = view._curRoleImg.height / 2;
                        view._curRoleImg.scaleX = view._curRoleImg.scaleY = 0.8;
    
                        view._curRoleImg.visible = true;
                        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curRoleImg, view.titleBg, [view._curRoleImg.width / 2 * 0.8, view.titleBg.height+ (view._empBottom.y - view.titleBg.y - view.titleBg.height - view._curRoleImg.height * view._curRoleImg.scaleX)/2 + view._curRoleImg.height / 2 * 0.8]);
                        view.addChild(view._curRoleImg);
                        view._curRoleImg.setHeadHeight();
                    };
                }
            }
        }
    }

    public dispose():void{
        let view = this;
        view._empBottom = null;
        view._curRoleImg = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST),this.receiveBmlist,this);
        super.dispose();
    }
}