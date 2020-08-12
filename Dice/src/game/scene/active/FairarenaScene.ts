/**
 * 公平竞技场
 * @author hwc
 */
class FairarenaScene extends BaseScene{

    private _joinGroup:FairJoin = null;
    private _list:ScrollList = null;
    protected startY:number = 0;
    private _pro:ProgressBar = null;
    /**当前界面的状态 1 选完 2 可选 3 选择中*/
    private _status:number = 1;
    private items:Array<ChooseItem> = [];
    private _top:BaseDisplayObjectContainer = null;
    private _choose:BaseDisplayObjectContainer = null;
    private _bigbtn:BaseButton = null;
    private _btnstatus:number = 0;
    private _listgruop:BaseDisplayObjectContainer = null;
    private _scrollTop:ScrollView = null;
    private _bullbe:BubbleBox = null;
    private _txtBullbe:BaseTextField = null;
    private _topitems:Array<FairarenaTopItem> = [];
    private _magicCirele:MagicCirele = null;
    /**列表在下部分的 y */
    private _listY:number = 0;

    private fistopen:boolean = true;

	public constructor() {
		super();
    }
    
    protected getMsgConstEventArr():string[]{
		return [
			MsgConst.MODEL_FAIRARENA
		];
    }
    
    protected getNetConstEventArr():string[]{
		return [
			NetConst.FAIRARENA_END, NetConst.FAIRARENA_GETREWARD
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

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.FAIRARENA_END:
                view.goBack();
                break;
            case NetConst.FAIRARENA_GETREWARD:
                view.getReward(evt);
                break;
		}
    }

    public dispose():void{
        App.MsgHelper.removeEvt(NetConst.FAIRARENA_GETREWARD, this.getReward, this);
        this._magicCirele = null;
        this.fistopen = true;
        this._bullbe = null;
        this._txtBullbe = null;
        this._btnstatus = 0;
        this._joinGroup = null;
        this._top = null;
        this._bigbtn = null;
        this._listgruop = null;
        this._list = null;
        this._pro = null;
        this.items = [];
        this._scrollTop = null;
        super.dispose();
	}

	protected init():void{
        super.init();
        let mc = new MagicCirele();
        mc.init();
        this.addChild(mc);
        mc.visible = false;
        this._magicCirele = mc;
        // mc.setPosition(GameConfig.stageWidth, GameConfig.stageHeigth);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, mc, this, [0,0]);
        
        this.name = "FairarenaScene";
        let titlebg = BaseBitmap.create("fairarenascenrtitlebg");
        this.addChild(titlebg);
        titlebg.x = 0; 
        titlebg.y = 82;

        let titleBit = BaseBitmap.create("fairarena_banner_title");
        this.addChild(titleBit);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleBit, titlebg, [0,0]);

        let rulebtn = ComponentMgr.getButton(ButtonConst.AC_RULE_BTN, "", this.ruleBtnOnclick, this);
        this.addChild(rulebtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rulebtn, titlebg, [5,0]);

        let gobackbtn = ComponentMgr.getButton("gobackbtn", "", this.goBack, this);
        this.addChild(gobackbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gobackbtn, titlebg, [5,0]);
        
        this.startY = titlebg.y + titlebg.height + 10;
        this.initView();
    }

    protected initView(){
        this._status = Api.FairArenaVoApi.getLine().length < 5 ? 2 : 1;
        let top = this.initTop();
        top.setPosition(0, this.startY);
        this._top = top;
        let y = top.y + top.height;

        let join = new FairJoin();
        join.initView();
        this._joinGroup = join;
        this.addChild(this._joinGroup);
        join.x = (GameConfig.stageWidth - join.width) / 2;
        this._joinGroup.y = y + 30;

        if(!this._listgruop){
            let lg = this.initList();
            this._listgruop = lg;
            this.addChild(this._listgruop);
        }
        this._listgruop.x = (GameConfig.stageWidth - this._listgruop.width) / 2;
        this._listgruop.y = this._joinGroup.y + this._joinGroup.height + 10;
        this._listY = this._listgruop.y;
        this.initBtn();
        this.freshView();
    }

    protected openChooseCard(){
        // this._joinGroup.visible = false;
        // this._top.visible = false;
        if(!this._listgruop){
            let lg = this.initList();
            this._listgruop = lg;
            this.addChild(this._listgruop);
        }
        this._status = 2;
        this._sceneBg.texture = ResMgr.getRes("active_scenebg");
        this._magicCirele.visible = true;
        // this._listgruop.y = this.startY;

        // top 透明度变为零
        egret.Tween.get(this._top)
        .to({alpha: 0}, 400)
        .call(()=>{
            this._top.visible = false;
        });

        // 分数面板透明度变为零
        egret.Tween.get(this._joinGroup)
        .to({alpha: 0}, 400)
        .call(()=>{
            this._joinGroup.visible = false;
        });

        // 列表向上移动
        egret.Tween.get(this._listgruop)
        .wait(500)
        .to({y: this.startY}, 500)
        .call(()=>{
            this._choose = this.createChooseCard();
            this.addChild(this._choose);
            this._choose.x = 0;
            this._choose.y = this._listgruop.y + this._listgruop.height + 10;
        });

    }
    
    protected createChooseCard(){
        let group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;

        let poolinfo = Api.FairArenaVoApi.getCurDicePool();
        let dx = 160 + 30;
        for(let index = 0; index < poolinfo.length; index++){
            let item = new ChooseItem(poolinfo[index]);
            this.items[index] = item;
            item.initView();
            group.addChild(item);
            item.setPosition(50 + dx*index, 0);
        }

        let tip = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        group.addChild(tip);
        tip.width = group.width;
        tip.textAlign = egret.HorizontalAlign.CENTER;
        tip.y = 350;
        tip.text = LangMger.getlocal("fairarenachoosetip");

        return group;
    }

    protected initTop() {
        let top:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        this.addChild(top);

        let topbg = BaseBitmap.create("fairarentopbg");
        top.addChild(topbg);
        topbg.setPosition(0,0);

        let con = new BaseDisplayObjectContainer();
        con.height = topbg.height;

        let dx = 160;
        let maxNum = Config.FairarenaCfg.getMaxWinNum();
        con.width = dx * maxNum;

        let alphabg = BaseBitmap.create("public_alphabg");
        con.addChild(alphabg);
        alphabg.width = con.width;
        alphabg.height = con.height;
        let pro = ComponentMgr.getProgressBar("fairarentopbg_progress", "fairarentop_bar", con.width);
        con.addChild(pro);
        pro.setPosition(0, 110);

        let bullbe = this.bullbeBox();
        con.addChild(bullbe);
        bullbe.y = pro.y + pro.height;
        bullbe.x = dx - bullbe.TryangleX;
        this._bullbe = bullbe;

        let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_24, ColorEnums.black);
        txt.width = bullbe.width;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.y = 20;
        bullbe.addChildCon(txt);
        this._txtBullbe = txt;

        this._pro = pro;
        for (let index = 0; index < maxNum; index++) {
            let slp = BaseBitmap.create("fairarentopbg_split");
            con.addChild(slp);
            slp.setPosition(index * dx, 110);
            if(index > 0){
                const item = this.createTopItem(index);
                con.addChild(item);
                item.setPosition(dx*(index), 50);
                // item.addTouchTap(this.boxOnclick, this, [index]);
                this._topitems.push(item);
                let numtxt = ComponentMgr.getTextField(`${index}`, TextFieldConst.SIZE_22, ColorEnums.white);
                con.addChild(numtxt);
                numtxt.x = index * dx - numtxt.width / 2;
                numtxt.y = 115;
            }
        }
        
        let scrollview = ComponentMgr.getScrollView(con,new egret.Rectangle(0,0, topbg.width, topbg.height));
        top.addChild(scrollview);
        scrollview.x = 0;
        scrollview.y = 0;
        this._scrollTop = scrollview;

        return top;
    }

    private bullbeBox(width?:number, height?:number):BubbleBox{
        width = width || 120;
        height = height || 57;
        let box = new BubbleBox();
        box.initView("fairarena_triangle", "fairarena_youbiao", width, height, null, 5);
        return box;
    }

    private createTopItem(index:number) {
        let item = new FairarenaTopItem();
        item.init(index);
        // item.width = 100;
        // item.height = 100; 
        return item;
    }

    protected initBtn(){
        let btnX = 20;
        let btnY = 40;

        let startbtn = ComponentMgr.getButton("fairsettingbtn", "开始", this.startBtnOnclick, this);
        this.addChild(startbtn);
        this._bigbtn = startbtn;
        startbtn.x = startbtn.width + btnX + 10;
        startbtn.y = this._listgruop.y + this._listgruop.height + btnY;

        let btnicon = BaseBitmap.create("fairsettingbtnicon");
        startbtn.addChild(btnicon);
        btnicon.x = (startbtn.width - btnicon.width) / 2;
        btnicon.y = - 20;
        btnicon.name = "bigbtnicon";
        this.freshBtn(this.getBtnStatus());
    }

    /**
     * 根据状态显示按钮的元素
     * @param status 按钮显示状态
     */
    protected freshBtn(status:number){
        if(!this._bigbtn || this._btnstatus == status){
            return;
        }
        let btn = this._bigbtn;
        let icon = btn.getChildByName("bigbtnicon");
        let tf = <BaseTextField>btn.getChildByName("btnTxt");
        switch (status) {
            case 1:
                // 设置卡组
                icon.visible = true;
                tf.text = LangMger.getlocal("fairarenaset");
                tf.size = TextFieldConst.SIZE_30;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, tf, btn, [0,0]);
                tf.y = 60;
                break;
            case 2:
                // 开始
                icon.visible = false;
                tf.text = LangMger.getlocal("fairarenastart");
                tf.size = TextFieldConst.SIZE_40;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tf, btn, [0,-10]);
                break;
            case 3:
                // 结束
                icon.visible = false;
                let url = Api.FairArenaVoApi.getWinNum() >= 12 ? "fairarenaend1" : "fairarenaend";
                tf.text = LangMger.getlocal(url);
                tf.size = TextFieldConst.SIZE_40;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tf, btn, [0,-10]);
                break;
            case 4:
                // 设置中
                icon.visible = true;
                tf.text = LangMger.getlocal("fairarenachoooseing");
                tf.size = TextFieldConst.SIZE_30;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, tf, btn, [0,10]);
                tf.y = 60;
                break;
            default:
                break;
        }
        this._btnstatus = status;
    }

    /**
     * 按钮显示状态 1: 设置卡组, 2: 开始, 3: 结束, 4: 设置中
     * 状态 4 只在选择卡组是出现
     */
    protected getBtnStatus():number{
        let status = 2;

        let num = Api.FairArenaVoApi.getLine().length;
        if(num < 5){
            status = 1;
        } else if (Api.FairArenaVoApi.getWinNum() >= 12 || Api.FairArenaVoApi.getLoseNum() >= 3) {
            status = 3;
        }

        return status;
    }

    protected initList(){
        let listG = new BaseDisplayObjectContainer();
        let birdbg = BaseBitmap.create("fairarenabirdbg");
        listG.addChild(birdbg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, birdbg, bottom, [0,0]);
        // birdbg.y = joinGroup.y + joinGroup.height + 10;

        let birdline = Api.FairArenaVoApi.getLine();
        let birdlist = ComponentMgr.getScrollList(DiceTeamItem1, birdline,new egret.Rectangle(0,0, 575, 160));
        listG.addChild(birdlist);
        birdlist.setPosition(birdbg.x + 20, birdbg.y + 20);
        this._list = birdlist;

        return listG;
    }

    protected getResourceList(){
        return super.getResourceList().concat([
            "activescene","active_scenebg"
        ]);
    }

    private freshView(){
        if(!Api.FairArenaVoApi.isJoinJJC() || !Api.FairArenaVoApi.getFreshFair()){
            return;
        }
        
        if(this._list){
            this._list.refreshData(Api.FairArenaVoApi.getLine());
        }
        if(this._status == 3){
            // this._status = Api.FairArenaVoApi.getLine().length < 5 ? 3 : 1;
            if(Api.FairArenaVoApi.getLine().length < 5) {
                this._status = 3;
            } else {
                let view = this;
                this._choose.visible = false;
                // this._magicCirele && (this._magicCirele.visible = false);
                // 先移除之前的Tween
                egret.Tween.removeTweens(this._top);
                egret.Tween.removeTweens(this._joinGroup);
                egret.Tween.removeTweens(this._listgruop);
                egret.Tween.removeTweens(this._magicCirele);

                this._top.visible = true;
                this._joinGroup.visible = true;
                
                egret.Tween.get(this._listgruop)
                .to({y:this._listY}, 750)
                .call(()=>{
                    view._status = 1;
                    if(this._magicCirele){
                        egret.Tween.get(this._magicCirele)
                        .to({alpha:0}, 1000)
                        .call(()=>{
                            this._magicCirele.visible = false;
                            this._magicCirele.alpha = 1;
                            view._sceneBg.texture = ResMgr.getRes("public_ab_scenebg");
                            view.freshView();
                        });
                    }
                    // top 透明度变为 1
                    egret.Tween.get(this._top)
                    .to({alpha: 1}, 800)
                    // .call(()=>{
                    //     this._top.visible = false;
                    // });

                    // 分数面板透明度变为 1
                    egret.Tween.get(this._joinGroup)
                    .to({alpha: 1}, 800)
                    // .call(()=>{
                    //     this._joinGroup.visible = false;
                    // });
                });
            }
        } else {
            this._status = Api.FairArenaVoApi.getLine().length < 5 ? 2 : 1;
        }
        if(this._status == 3 && this._choose){
            let poolinfo = Api.FairArenaVoApi.getCurDicePool();
            for (let index = 0; index < poolinfo.length; index++) {
                this.items[index].ID = poolinfo[index];   
            }
        } else if (this._status == 1 || this._status == 2){
            this._choose && (this._choose.visible = false);
            if(!this._top){
                let top = this.initTop();
                top.setPosition(0, this.startY);
                this._top = top; 
            }
            this._top.visible = true;
            // topitem 状态刷新
            this._topitems.forEach(item => {
                item.status = Api.FairArenaVoApi.getRewardStatusByID(item.index);
            });
            let dx = 160;
            let win = Api.FairArenaVoApi.getWinNum();
            if(win > 0){
                this._bullbe.visible = true;
                this._bullbe.x = dx * win - this._bullbe.TryangleX;
                this._txtBullbe.text = LangMger.getlocal("fairarenawinnum", [String(win)]);
                let tem = win > 10 ? 10 : win;
                if(FairarenaTopItem.freshSrcoll){
                    this._scrollTop.setScrollLeft(160 * (tem - 1), 500);
                } else {
                    FairarenaTopItem.freshSrcoll = true;
                }
            } else {
                this._bullbe.visible = false;
                this._scrollTop.setScrollLeft(0, 500);
            }
            if(Api.FairArenaVoApi.tweenPro){
                this._pro.setPercentage((win -1) / Config.FairarenaCfg.getMaxWinNum());
                this._pro.tweenTo(( win === 12 ? 13 : win) / Config.FairarenaCfg.getMaxWinNum(), 10000);
                Api.FairArenaVoApi.tweenPro = false;
            } else {
                this._pro.setPercentage(( win === 12 ? 13 : win) / Config.FairarenaCfg.getMaxWinNum());
            }
            this._joinGroup.visible = true;
            this._joinGroup.Winnum = win;
            this._joinGroup.Failnum = Api.FairArenaVoApi.getLoseNum();

            this._listgruop.x = (GameConfig.stageWidth - this._listgruop.width) / 2;
            this._listgruop.y = this._joinGroup.y + this._joinGroup.height + 10;
            this.freshBtn(this.getBtnStatus());
        }
    }

    private ruleBtnOnclick() {
        ViewController.getInstance().openView(ViewConst.ACTIVERULEVIEW, {
            title : LangMger.getlocal("fairArena"),
            needCancel : false,
            acInfoArr:[{index:1,acKey: "fairarena"}, {index:2,acKey: "fairarena"}, {index:3,acKey: "fairarena"}],
        });
    }

    private goBack() {
        SceneController.getInstance().go("ActiveScene",{});
    }

    private getReward(event:egret.Event){
        let data = event.data;
        if(data.ret){
           let rewards = data.data.data.rewards;
           if(Api.ShopVoApi.getIsBox()){
                ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                    rewards : rewards,
                    title : LangMger.getlocal(`sysGetReward`),
                    isBoxBuy : false,//连续购买模式
                    specialBoxId : Api.ShopVoApi.getBoxId(),
                    handler : this,
                    needCancel : true,
                    closecallback : ()=>{
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    },
                });
                Api.ShopVoApi.setIsBox(false,``);
            } 
            else{
                ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                    rewards : rewards,
                    title : LangMger.getlocal(`sysGetReward`),
                    callback: ()=>{
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    }
                });
            }
        }
    }

    private startBtnOnclick() {
        if(this._status == 2){
            this.openChooseCard();
            this._status = 3;
            this.freshBtn(4);
        } else if (this._status == 1) {
            let btnstatus = this.getBtnStatus();
            switch (btnstatus) {
                case 2:
                    // 开始战斗
                    App.LogUtil.log("开始战斗");
                    this.startBattle()
                    break;

                case 3:
                    // 结束逻辑
                    this.endFairarena();
                    break;
                default:
                    break;
            }
        }
    }

    private startBattle(){
        let view = this;
        
        ViewController.getInstance().openView(ViewConst.WARWAITINGPOPVIEW,{
            type : 3,
            cancelcallback : ()=>{
                view.alpha = 1;
            },
            findcallback : ()=>{
                view.hide();
            },
            handler : view
        });
    }

    private endFairarena(){
        if(Api.FairArenaVoApi.getHasReward()){
            // 判断是否还有奖励没有领取，有奖励则提示领取
            App.CommonUtil.showTip(LangMger.getlocal("fairarenaendtip"));
            let idx = Api.FairArenaVoApi.getFirstReward();
            if(this._scrollTop){
                let tem = Math.max(0, idx-1);
                this._scrollTop.setScrollLeft(tem*160, 300);
            }
        } else {
            NetManager.request(NetConst.FAIRARENA_END, {});
        }
    }

    protected refreshAfterShow(bool:boolean=false):void{
        super.refreshAfterShow(bool);
        Api.FairArenaVoApi.sceneName = "fairarena";
        if(this.fistopen){
            this.fistopen = false;
        } else {
            this.freshView();
        }
    }
	
	protected tick(){
    }

    protected getBgName(){
        return "public_ab_scenebg";
    }

}

class FairJoin extends BaseDisplayObjectContainer {

    private winnum:number = 0;
    private winbg:BaseLoadBitmap = null;
    private winbitnum:BaseLoadBitmap = null;
    private failnum:number = 0;
    private iconList:Array<BaseBitmap> = [];

    public dispose(){

        this.winnum = -1;
        this.winbg = null;
        this.winbitnum = null;
        this.failnum = -1;
        this.iconList = [];

        super.dispose();
    }

    
    public set Winnum(v : number) {
        if(v >= Config.FairarenaCfg.getMaxWinNum() || v < 0){
            return;
        }
        if(v!=0 && v == this.winnum){
            return;
        }
        this.winnum = v;
        if(this.winbg){
            this.winbg.setload(this.getWinBgurl(this.winnum));
        }

        if(this.winbitnum){
            this.winbitnum.setload(`activewinnum${this.winnum}`);
        }
    }

    
    public set Failnum(v : number) {
        if(v > Config.FairarenaCfg.getFailNum() || v < 0 || v == this.failnum){
            return;
        }
        let old = this.failnum;
        this.failnum = v;
        if(old > v){
            for(let index = 0; index < Config.FairarenaCfg.getFailNum(); index++){
                this.iconList[index].visible = false;
            }
            old = 0;
        }

        for(let index = old; index < this.failnum; index++){
            this.iconList[index].visible = true;
        }
        
    }
    
    

    constructor(){
        super();
    }

    public initView(){
        let descbg = BaseBitmap.create(Api.FairArenaVoApi.isJoinJJC() ? "activedescbg2" : "activedescbg");
        this.addChild(descbg);
        let joinTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaProgress`), TextFieldConst.SIZE_24);
        this.addChild(joinTxt);
        joinTxt.strokeColor = 0x3c3c3c;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, joinTxt, this, [0,-joinTxt.height/2 + 10]);
        
        let winnum = Api.FairArenaVoApi.getWinNum();
        this.winnum = winnum;
        let winbg = BaseLoadBitmap.create(this.getWinBgurl(winnum));
        this.addChild(winbg);
        this.winbg = winbg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, this, [20,31]);

        let wintxt = BaseLoadBitmap.create(`activewinnum${winnum}`);
        this.winbitnum = wintxt;
        this.addChild(wintxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wintxt, winbg, [0,0]);

        let winNameTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaWin`), TextFieldConst.SIZE_20, 0xFFF091);
        this.addChild(winNameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, winNameTxt, this, [49,15]);

        let line = BaseBitmap.create(`activeline`);
        line.height = 130;
        this.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, line, this, [135,0]);

        let tmpX = 150; 
        let startX = 145;
        this.failnum = Api.FairArenaVoApi.getLoseNum();
        for(let i = 1; i <= Config.FairarenaCfg.getFailNum(); ++ i){
            let losebg = BaseBitmap.create(`activefailbg`);
            losebg.setPosition(startX + losebg.width * (i - 1) + 3, 48);
            this.addChild(losebg);

            let loseIcon = BaseBitmap.create(`activefailicon`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, loseIcon, losebg);
            this.addChild(loseIcon);
            loseIcon.name = `loseIcon${i}`;
            loseIcon.visible = i <= this.failnum;
            this.iconList[i-1] = loseIcon;
        }
        let loseNameTxt = ComponentMgr.getTextField(LangMger.getlocal(`fairArenaLose`), TextFieldConst.SIZE_20);
        loseNameTxt.width = 147;
        loseNameTxt.textAlign = egret.HorizontalAlign.CENTER;
        loseNameTxt.setPosition(startX, winNameTxt.y);
        this.addChild(loseNameTxt);
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
}

/**
 * 选择卡组 item
 */
class ChooseItem extends BaseDisplayObjectContainer {
    private id:string = "";
    private brid:BaseLoadBitmap = null;
    private bg:BaseLoadBitmap = null;
    private nameTF:BaseTextField = null;
    private clip:CustomMovieClip = null;
    private glow:CustomMovieClip = null;

    /**
     * dispose
     */
    public dispose() {
        this.id = "";
        this.brid = null;
        this.bg = null;
        this.nameTF = null;
        super.dispose();
    }
    
    public constructor(id:string){
        super();
        this.id = id;

    } 

    public initView(){
        let cfg = Config.DiceCfg.getCfgById( this.id);
        this.width = 167;
        this.height = 212;

        let bg = BaseLoadBitmap.create(`bird_item_${cfg.quality}`);
        this.addChild(bg);
        this.bg = bg;
        bg.addTouchTap(this.bgOnclick, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, this, [0,0]);

        // 传奇卡牌的特效
        let clip = ComponentMgr.getCustomMovieClip("guangxiao", 10); 
        this.addChild(clip);
        clip.blendMode = egret.BlendMode.ADD;
        clip.setEndCallBack(()=>{
            clip.dispose();
            clip = null;
        },this);
        clip.playWithTime(0);
        clip.setPosition(20,10);
        clip.visible = cfg.quality == 4;
        this.clip = clip;
        let glow = ComponentMgr.getCustomMovieClip("glow");
        this.addChild(glow);
        glow.playWithTime(0);
        glow.blendMode = egret.BlendMode.ADD;
        glow.y = -15;
        glow.visible = cfg.quality == 4;
        this.glow = glow;
        
        let brid = BaseLoadBitmap.create(`dice${this.id}`);
        this.addChild(brid);
        this.brid = brid;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, brid, bg, [0,0]);

        let name = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        this.addChild(name);
        name.text = cfg.name;
        this.nameTF = name;
        let dy = cfg.quality == 4 ? 20 : 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name, bg, [0,dy]);

        let btn = ComponentMgr.getButton(ButtonConst.BTN_COMMON_BLUE, LangMger.getlocal("sysinfo"), this.infoOnclick, this);
        this.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, btn, this, [0,0]);
        btn.y = this.height + 30;
        btn.forbidClickBubble = true;
    }

    
    public set ID(v : string) {
        if(!v|| this.id == v || v == ""){
            return;
        }
        this.id = v;
        let cfg = Config.DiceCfg.getCfgById(this.id);
        this.bg.setload(`bird_item_${cfg.quality}`, null, {
            callback:function(){
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.bg, this, [0,0]);
                let dy = 10;
                if(cfg.quality == 4){
                    this.bg.setPosition(0,0);
                    dy = 20;
                } else {
                    this.bg.setPosition(11.5,7);
                }
                this.clip.setPosition(20,10);
                this.glow.y = -15;
                
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this.brid, this.bg, [0,0]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.nameTF, this.bg, [0,dy]);
            },
            callbackThisObj:this,
        });
        this.brid.setload(`dice${this.id}`);
        this.nameTF.text = cfg.name;

        this.clip.visible = cfg.quality == 4;
        this.glow.visible = cfg.quality == 4;

    }

    private bgOnclick() {
        NetManager.request(NetConst.FAIRARENA_CHOOSE, {diceId:this.id});
    }

    private infoOnclick(){
        ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
            dice : this.id,
            // check : true,
            inbattle:true,
            info:{
                lv: Config.FairarenaCfg.getDiceLv(),
            }
        });
    }

}

/**
 * 特效背景
 */
class MagicCirele extends BaseDisplayObjectContainer {

    private img3_1:BaseBitmap = null;

    constructor(){
        super();
    }

    public dispose(){
        this.img3_1 = null;
        super.dispose();
    }

    public init(){
        let ft = 17;

        let img1 = BaseBitmap.create("magiccircle1");
        this.addChild(img1);
        img1.anchorOffsetX = img1.width / 2;
        img1.anchorOffsetY = img1.height / 2;
        
        let img2 = BaseBitmap.create("magiccircle2");
        this.addChild(img2);
        img2.anchorOffsetX = img2.width / 2;
        img2.anchorOffsetY = img2.height / 2;
        
        let tw2 = egret.Tween.get(img2, {loop:true});
        tw2.to({rotation:-360}, 50000);

        let img3 = BaseBitmap.create("magiccircle3");
        this.addChild(img3);
        img3.anchorOffsetX = img3.width / 2;
        img3.anchorOffsetY = img3.height / 2;

        let img3_1 = BaseBitmap.create("magiccircle3");
        this.addChild(img3_1);
        img3_1.blendMode = egret.BlendMode.ADD;
        img3_1.anchorOffsetX = img3_1.width / 2;
        img3_1.anchorOffsetY = img3_1.height / 2;
        img3_1.alpha = 0;
        this.img3_1 = img3_1;
        

        let img4 = BaseBitmap.create("magiccircle4");
        this.addChild(img4);
        img4.anchorOffsetX = img4.width / 2;
        img4.anchorOffsetY = img4.height / 2;

        let tw4 = egret.Tween.get(img4, {loop: true});
        tw4.to({rotation:9}, 40*ft).call(this.startB, this)
        .to({rotation:45}, 160*ft)

        // tw3.to({alpha:1, scaleY: 1.2, scaleX:1.2}, 40*ft).call(()=>{
        //     img3_1.alpha = 0;
        //     img3_1.setScale(1);
        // });

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    private startB(){
        if(!this.img3_1){
            return;
        }
        egret.Tween.removeTweens(this.img3_1);
        let tw = egret.Tween.get(this.img3_1);
        tw.to({alpha: 1, scaleX: 1.2, scaleY: 1.2}, 120*17)
        .to({alpha:0}, 20*17)
        .call(()=>{
            this.img3_1.alpha = 0;
            this.img3_1.setScale(1);
        })
    }
}

/**
 * 顶部滑动区域的 item
 */

class FairarenaTopItem extends BaseDisplayObjectContainer {
    public static freshSrcoll:boolean = true;
    private _status: number = 0;
    private _type:number = 0;
    private _index:number = -1;
    private _flag:BaseBitmap = null;
    private _reward:string|number = null;
    private _effect:CustomMovieClip = null;
    constructor() {
        super();
    }

    /**
     * dispose
     */
    public dispose() {
        this._status = 0;
        this._type = 0;
        this._index = -1;
        this._flag = null;
        this._reward = null;
        this._effect = null;
        super.dispose();
    }

    public init(index:number){
        this._index = index;
        let item = this;
        item.width = 100;
        item.height = 100;
        let itemBg = BaseBitmap.create(`fairarenatopitembg`);
        item.addChild(itemBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemBg, item, [0,0]);
        
        let itemInfo = Config.FairarenaCfg.getWinRewardItem(index);

        let bg = BaseLoadBitmap.create();
        item.addChild(bg);

        let numtxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        numtxt.width = 100;
        numtxt.textAlign = egret.HorizontalAlign.CENTER;
        this._type = itemInfo.type;
        this._reward = itemInfo.reward;
        switch (itemInfo.type) {
            case 1:
                // 获取金币
                bg.setload("item2");
                bg.setScale(0.5);
                bg.setPosition(25, 10);
                numtxt.text = String(itemInfo.reward);
                item.addChild(numtxt);
                numtxt.setPosition(0, itemBg.height - numtxt.height - 5);
                break;
            case 2:
                // 获取钻石
                bg.setload("item1");
                bg.setScale(0.5);
                bg.setPosition(25, 10);
                numtxt.text = String(itemInfo.reward);
                item.addChild(numtxt);
                numtxt.setPosition(0, itemBg.height - numtxt.height - 5);
                break;
            case 3:
                // 获取宝箱
                bg.setload(`itembox${itemInfo.reward}`);
                bg.setScale(0.23);
                bg.setPosition(20, 10);
                numtxt.text = `x1`;
                item.addChild(numtxt);
                numtxt.setPosition(0, itemBg.height - numtxt.height - 5);
                break;
        
            default:
                break;
        }

        let flag = BaseBitmap.create("fairgouhao");
        this.addChild(flag);
        flag.x = 40;
        flag.y = 40;
        this._flag = flag;
        flag.visible = false;

        let eff= ComponentMgr.getCustomMovieClip("getiteameffect", 8, 70);
        eff.setPosition(-50,-50);
        eff.width = 200;
        eff.height = 200;
        eff.blendMode = egret.BlendMode.ADD;
        eff.playWithTime(0);
        this.addChild(eff);
        item._effect = eff;

        this.status = Api.FairArenaVoApi.getRewardStatusByID(this._index);

        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        itemBg.addTouchTap(this.itemOnclick, this);
    }

    private itemOnclick(event:egret.Event){
        FairarenaTopItem.freshSrcoll = false;
        event.stopPropagation();
        // item 的状态
        let status = this._status;
        switch(status){
            case 2:
                Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
                NetManager.request(NetConst.FAIRARENA_GETREWARD, {key:String(this._index)});
                if(this._type == 3){
                    Api.ShopVoApi.setIsBox(true,``);
                }
                break;
            case 1:
            case 3:
                if(this._type == 3){
                    ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                        title : LangMger.getlocal(`boxname_${this._reward}`),
                        handler : this,
                        needCancel : false,
                        callback : ()=>{
                           
                        },
                        needClose : 1,
                        boxId : this._reward,
                        isbuy : false
                    });
                } else {
                    let str = Config.FairarenaCfg.getFormatStr(this._index);
                    let itemVo = GameData.formatRewardItem(str)[0];
                    ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                        title : itemVo.name,
                        handler : null,
                        needCancel : false,
                        needClose : 1,
                        param : itemVo,
                        costnum :LangMger.getlocal("sysconfirm"),
                        // costIcon : `ab_mainui_gem`
                    });
                }
                break;
            default:
                break;
        }
    }

    /**
     * 设置 item 的状态
     * 1 已经领取
     * 2 没有领取
     * 3 不可领取
     */
    public set status(v:number){
        if(v == this._status){
            return;
        }
        this._status = v;
        switch(this._status){
            case 1:
                if(this._flag){
                    this._flag.visible = true;
                } else {
                    let flag = BaseBitmap.create("fairgouhao");
                    this.addChild(flag);
                    flag.x = 40;
                    flag.y = 40;
                    this._flag = flag;
                }
                this._effect && (this._effect.visible = false);
                break;
            case 2:
                // 目前没有特效
                this._flag && (this._flag.visible = false);
                if(this._effect){
                    this._effect.visible = true;
                } else {
                    let eff= ComponentMgr.getCustomMovieClip("getiteameffect", 8, 70);
                    eff.setPosition(-50,-50);
                    eff.width = 200;
                    eff.height = 200;
                    eff.blendMode = egret.BlendMode.ADD;
                    eff.playWithTime(0);
                    this.addChild(eff);
                    this._effect = eff;
                }
                break;
            case 3:
                this._flag && (this._flag.visible = false);
                this._effect && (this._effect.visible = false);
                break;
            default:
                this._flag && (this._flag.visible = false);
                this._effect && (this._effect.visible = false);
                break;
        }
    }

    
    public get index() : number {
        return this._index;
    }
    
}